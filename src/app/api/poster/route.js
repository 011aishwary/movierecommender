export async function POST(request) {
    try {
        // const movie = 'Avatar'; // Example movie title
        const inputData1 = await request.json();
        console.log('Input data for poster:', inputData1);
        const movie = inputData1.movie_title
        console.log('Fetching poster for movie:', movie);
        const res = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=f6976cf9`, {
            headers: {
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${process.env.API_TOKEN}`
            }
        });

        const data = await res.json();
        console.log('Poster data:', data.Poster);
        return Response.json(data.Poster);

    } catch (error) {
        return Response.json({ error: 'Failed to fetch data' }, { status: 500 });

    }

}



