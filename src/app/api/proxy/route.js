export async function GET(req) {
    const url = req.headers.get('X-URL');

    if (!url) {
        return new Response(
            JSON.stringify({ error: "Missing URL" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch image");
        }

        const buffer = await response.arrayBuffer();
        return new Response(Buffer.from(buffer), {
            status: 200,
            headers: {
                "Content-Type": "image/png",
            },
        });
    } catch (error) {
        console.error("Error fetching image:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch image" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
