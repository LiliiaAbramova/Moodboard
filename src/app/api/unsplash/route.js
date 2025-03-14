export async function POST(req) {
    try {
        const { query } = await req.json();
        if (!query) {
            return Response.json({ error: "Query is required" }, { status: 400 });
        }

        const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
        if (!UNSPLASH_ACCESS_KEY) {
            throw new Error("Missing Unsplash API key");
        }

        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=8&client_id=${UNSPLASH_ACCESS_KEY}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0] || "Failed to fetch images from Unsplash");
        }

        const data = await response.json();
        return Response.json(data.results ?? []);
    } catch (error) {
        console.error("API Error:", error.message);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
