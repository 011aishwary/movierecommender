import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
    const body = await request.json();
    const { movie_title } = body;
  
    
    // External API seems to use GET
    const apiUrl = `https://01doodle-movie-recommender.hf.space/predict?movie_title=${encodeURIComponent(movie_title)}`;

    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Error from Python API:", response.statusText);
      return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
    }
    const data = await response.json();

    return NextResponse.json({ prediction: data.prediction || [] });
  } catch (error) {
    console.error("Error in POST /api/recommend:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}