'use client';

import { useState } from "react";

export default function TestLambda(){
    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTestLambdaRequest = async () => {
        setLoading(true);

        try {

            /*const response = await fetch('/api/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: 'test promt' })
            });*/
            const url_img = "https://generated-images-ai.s3.us-east-1.amazonaws.com/img-4zjy4A1wzAs55GvzuluZTWhd.png";

            const response = await fetch('/api/proxy', {
                method: 'GET',
                headers: {
                    'X-URL': url_img,
                },
            });


            const imageBlob = await response.blob(); // Перетворюємо відповідь в Blob
            const imageUrl = URL.createObjectURL(imageBlob);

            //const data = await response.json();
            //console.log(imageBlob);
            //setResponseMessage(data);
        } catch (error) {
            console.error("Error invoking Lambda:", error);
            setResponseMessage("Error invoking Lambda");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Test Lambda Function</h1>
            <button onClick={handleTestLambdaRequest} disabled={loading}>
                {loading ? "Loading..." : "Test Lambda"}
            </button>

            <p>Response: {responseMessage}</p>
        </div>
    );
};
