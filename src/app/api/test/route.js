import fs from 'fs-extra';
import path from 'path';

export async function POST(req) {
    try {

        convertImageToBase64();

        const response = await fetch("https://u17fzn1u03.execute-api.us-east-1.amazonaws.com/dev/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "X-Api-Key": process.env.AWS_KEY_API
            },
            body: JSON.stringify({
                prompt: 'prompt'
            }),
        });

        const data = await response.json();

        if (data.error) {
            return new Response(JSON.stringify({ error: data.error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ text: data.body}), {
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

async function convertImageToBase64() {
    // process.cwd() - current project directory
    //const imagePath = path.join(process.cwd(), 'public/images/default_ai-image.png');

    const jsonFilePath = path.join(process.cwd(), 'public/images/imageData.json');

    try {
        const imageBuffer = await fs.readFile(imagePath);
        const imageBase64 = imageBuffer.toString('base64');
        const imageData = {
            image: imageBase64,
            fileName: 'test-image.png'
        };

        const imageDataString = JSON.stringify(imageData, null, 2);

        const jsonObject = {
            body: imageDataString
        };

        await fs.writeFile(jsonFilePath, JSON.stringify(jsonObject, null, 2));

        console.log('JSON file created:', jsonFilePath);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}
