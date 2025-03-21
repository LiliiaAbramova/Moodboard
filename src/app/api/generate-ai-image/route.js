export async function POST(req) {
    const { prompt } = await req.json();

    const static_prompt = `A high-quality, aesthetic image of ${prompt}.
Ultra-detailed, cinematic lighting, soft shadows, high contrast. 
Using a 50mm f/1.2 lens, film grain texture. 
Professional composition, depth of field, artistic mood. 
Trending on ArtStation, hyperrealistic, visually stunning.`;

    try {
        const response = await fetch("https://u17fzn1u03.execute-api.us-east-1.amazonaws.com/dev/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "X-Api-Key": process.env.AWS_KEY_API
            },
            body: JSON.stringify({
                prompt: static_prompt
            }),
        });
        
        const data = await response.json();

        if (data.error) {
            return new Response(JSON.stringify({ error: data.error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ image: data.data[0].url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
