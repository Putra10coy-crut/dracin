'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { Movie } from '@/types/movie'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      // Menggunakan API route yang membaca dari db.json
      const moviesUrl = '/api/movies'
      
      const response = await fetch(moviesUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setMovies(data)
      setFilteredMovies(data)
      setError('') // Clear any previous errors
    } catch (err) {
      setError('Failed to load movies. Please check if the database is accessible.')
      console.error('Error fetching movies:', err)
    } finally {
      setLoading(false)
    }
  }



  const handleSearch = (searchTerm: string) => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMovies(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary-text-light dark:text-secondary-text-dark">Loading movies...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-secondary-text-light dark:text-secondary-text-dark mb-4">{error}</p>
          <button
            onClick={fetchMovies}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        {/* Movies Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
            Daftar Film
          </h2>
          {filteredMovies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary-text-light dark:text-secondary-text-dark text-lg">No movies found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
