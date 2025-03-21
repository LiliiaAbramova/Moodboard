'use client';

import { useState } from "react";

export default function TestLambda(){
    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTestLambdaRequest = async () => {
        setLoading(true);

        try {

            const response = await fetch('/api/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: 'test promt' })
            });

            const data = await response.json();
            console.log(data.text);
            setResponseMessage(data.text);
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
