export async function GET() {
    try {
        const lambdaUrl = process.env.AWS_LAMBDA_GET_IMAGES_URL;
        const response = await fetch(lambdaUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': process.env.AWS_KEY_API
            }
        });

        if (!response.ok) throw new Error("Failed to fetch images");

        const images = await response.json();
        return Response.json(images.body);
    } catch (error) {
        console.error("Error fetching images:", error);
        return Response.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}
