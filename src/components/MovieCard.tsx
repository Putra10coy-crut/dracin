'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Movie {
  id: number
  title: string
  description: string
  cover_url: string
  stream_url: string
}

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <Image
          src={movie.cover_url}
          alt={movie.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {movie.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {movie.description}
          </p>
        </div>
      </div>
    </Link>
  )
}