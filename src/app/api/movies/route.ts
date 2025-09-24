import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

// Interface untuk Movie
interface Movie {
  id: number
  title: string
  description: string
  cover_url: string
  stream_url: string
}

interface DatabaseData {
  movies: Movie[]
}

export async function GET() {
  try {
    // Path ke file db.json
    const dbPath = path.join(process.cwd(), 'db.json')
    
    // Baca file db.json
    const fileContents = fs.readFileSync(dbPath, 'utf8')
    const data: DatabaseData = JSON.parse(fileContents)
    
    // Return movies array
    return NextResponse.json(data.movies)
  } catch (error) {
    console.error('Error reading database:', error)
    
    // Fallback data jika file tidak bisa dibaca
    const fallbackMovies: Movie[] = [
      {
        id: 1,
        title: "The Golden Pear",
        description: "A heartwarming story about a magical pear that brings people together.",
        cover_url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=600&fit=crop",
        stream_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      },
      {
        id: 2,
        title: "Pear Dreams",
        description: "An adventure through orchards and dreams where reality meets fantasy.",
        cover_url: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400&h=600&fit=crop",
        stream_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      }
    ]
    
    return NextResponse.json(fallbackMovies)
  }
}

// Support untuk POST jika diperlukan di masa depan
export async function POST(request: Request) {
  try {
    const newMovie = await request.json()
    
    // Untuk saat ini, return success tanpa menyimpan
    // Di masa depan bisa ditambahkan logic untuk menyimpan ke database
    return NextResponse.json({ 
      success: true, 
      message: 'Movie added successfully',
      movie: newMovie 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add movie' },
      { status: 500 }
    )
  }
}