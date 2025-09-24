'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Movie } from '@/types/movie'

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchMovie(params.id as string)
      fetchAllMovies()
    }
  }, [params.id])

  const fetchMovie = async (id: string) => {
    try {
      setLoading(true)
      // Menggunakan API route untuk mendapatkan semua movies, lalu filter berdasarkan ID
      const moviesUrl = '/api/movies'
      
      const response = await fetch(moviesUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }
      const movies = await response.json()
      const foundMovie = movies.find((m: Movie) => m.id.toString() === id)
      
      if (!foundMovie) {
        throw new Error('Movie not found')
      }
      
      setMovie(foundMovie)
    } catch (err) {
      setError('Failed to load movie details')
      console.error('Error fetching movie:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllMovies = async () => {
    try {
      // Menggunakan API route yang membaca dari db.json
      const moviesUrl = '/api/movies'
      
      const response = await fetch(moviesUrl)
      if (response.ok) {
        const data = await response.json()
        setAllMovies(data.filter((m: Movie) => m.id.toString() !== params.id))
      }
    } catch (err) {
      console.error('Error fetching all movies:', err)
    }
  }

  const handlePlayVideo = () => {
    if (movie?.stream_url) {
      setIsPlaying(true)
    }
  }

  const handleStopVideo = () => {
    if (videoRef) {
      videoRef.pause()
      videoRef.currentTime = 0
      videoRef.src = ''
      videoRef.load()
    }
    setIsPlaying(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary-text-light dark:text-secondary-text-dark">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-secondary-text-light dark:text-secondary-text-dark mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="max-w-sm mx-auto p-4">
        {isPlaying ? (
          <div className="mb-8">
            <video 
              ref={setVideoRef}
              controls 
              autoPlay 
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              className="w-full rounded-lg shadow-lg"
              src={movie.stream_url}
              style={{
                outline: 'none'
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              Your browser does not support the video tag.
            </video>
            <button 
              onClick={handleStopVideo}
              className="w-full mt-4 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center shadow-md hover:bg-gray-700 transition-colors"
            >
              <span className="material-icons mr-2">stop</span>
              STOP VIDEO
            </button>
          </div>
        ) : (
          <div className="mb-8">
            {/* Gambar Cover */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-4">
              <Image
                src={movie.cover_url}
                alt={movie.title}
                width={400}
                height={600}
                className="w-full h-96 object-cover"
                priority
              />
            </div>

            {/* Movie Title & Description */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-3">{movie.title}</h1>
              <p className="text-text-light dark:text-text-dark leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Tombol PLAY NOW */}
            <button 
              onClick={handlePlayVideo}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              PLAY NOW
            </button>
          </div>
        )}

        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Movie Trending</h2>
        
        <div className="space-y-4">
          {allMovies.slice(0, 2).map((trendingMovie) => (
            <div key={trendingMovie.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => router.push(`/movie/${trendingMovie.id}`)}>
              <Image
                src={trendingMovie.cover_url}
                alt={trendingMovie.title}
                width={400}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-text-light dark:text-text-dark">{trendingMovie.title}</h3>
                <p className="text-text-light dark:text-text-dark">
                  {trendingMovie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
