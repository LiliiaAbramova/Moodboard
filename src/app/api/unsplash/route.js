export async function POST(req) {
    try {
        const { query } = await req.json();
        const trimmedQuery = query?.trim();

        // Validate search query
        if (!trimmedQuery) {
            return Response.json(
                { error: 'Please enter a valid search query.' },
                { status: 400 }
            );
        }

        const UNSPLASH_ACCESS_KEY =
            process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

        if (!UNSPLASH_ACCESS_KEY) {
            throw new Error('Missing Unsplash API key');
        }

        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(trimmedQuery)}&per_page=8&client_id=${UNSPLASH_ACCESS_KEY}`
        );

        if (!response.ok) {
            const errorData = await response.json();

            throw new Error(
                errorData.errors?.[0] ||
                'Failed to fetch images from Unsplash'
            );
        }

        const data = await response.json();

        const formattedResults = data.results
            .filter(photo => photo.urls && photo.user)
            .map(photo => ({
                key: photo.id,
                url: photo.urls.small,
                alt_description: photo.alt_description,
                author: {
                    name: photo.user.name,
                    profileUrl: photo.user.links.html
                },
                source: 'Unsplash'
            }));

        return Response.json(formattedResults);

    } catch (error) {
        console.error('API Error:', error);

        return Response.json(
            {
                error: 'Unable to load images. Please try again later.'
            },
            {
                status: 500
            }
        );
    }
}