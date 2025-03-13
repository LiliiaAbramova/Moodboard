export async function POST(req) {
    const { prompt } = await req.json();

    const static_prompt = `A high-quality, aesthetic image of ${prompt}.
Ultra-detailed, cinematic lighting, soft shadows, high contrast. 
Using a 50mm f/1.2 lens, film grain texture. 
Professional composition, depth of field, artistic mood. 
Trending on ArtStation, hyperrealistic, visually stunning.`;

    if (!prompt) {
        return new Response(JSON.stringify({ error: 'Prompt is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: static_prompt,
                n: 1,
                size: '1024x1024',
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
