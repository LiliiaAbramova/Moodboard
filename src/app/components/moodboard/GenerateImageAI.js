'use client';

import { useState, useEffect } from "react";
import {signIn, useSession} from "next-auth/react";

export default function GenerateImageAI({onAdd}){
    const { data: session } = useSession();

    const [aiImage, setAiImage] = useState(null);
    const [s3images, setS3Images] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);
    const [queryAI, setQueryAI] = useState("Nature art");
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false); // limit to one generation

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/s3images");
            const data = await res.json();
            setS3Images(data);
        } catch (err) {
            console.error("Error fetching images:", err);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleGenerateAiImage = async () => {
        if (isGeneratingAI || !queryAI.trim() || hasGenerated) return;
        setIsGeneratingAI(true);
        setLoadingAI(true);

        try {
            const response = await fetch('/api/generate-ai-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: queryAI })
            });
            const data = await response.json();
            setAiImage(data.image);
            setHasGenerated(true);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoadingAI(false);
            setIsGeneratingAI(false);
        }
    };
    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-md h-fit  mb-4">
            <h2 className="text-xl font-semibold mb-4">Generate AI image</h2>
            {!session ? (
                <button onClick={() => signIn('google')} className="cursor-pointer text-white bg-red-300 p-2 rounded-lg text-center font-semibold mb-4">
                    Please log in to generate AI images
                </button>
            ) : (
                <div className="flex mb-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={queryAI}
                            onChange={(e) => setQueryAI(e.target.value)}
                            className={`p-2 border border-gray-300 rounded ${(isGeneratingAI || hasGenerated) ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                            placeholder="Theme for AI image"
                            disabled={hasGenerated}
                        />
                    </div>
                    <div className="flex-1">
                        <button
                            onClick={handleGenerateAiImage}
                            className={`ml-4 w-full bg-blue-500 text-white p-2 rounded ${(isGeneratingAI || hasGenerated) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            disabled={isGeneratingAI || hasGenerated}
                        >
                            {isGeneratingAI ? "Generating..." : "Generate"}
                        </button>
                    </div>
                </div>
            )}

            {/* show AI-image */}
            {loadingAI && <p className="text-center text-gray-600">Generation AI-image...</p>}
            {aiImage ? (
                <div className="grid grid-cols-2 gap-2 relative group">
                    <img
                        src={aiImage}
                        alt="AI generated"
                        className="cursor-pointer max-w-full rounded-lg shadow-md"
                        onClick={() => onAdd({ urls: { small: aiImage } })}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 relative group">
                    <img
                        src="/images/default_ai-image.png"
                        alt="default AI image"
                        className="cursor-pointer max-w-full rounded-lg shadow-md"
                        onClick={() => onAdd({ urls: { small: "/images/default_ai-image.png" } })}
                    />
                </div>
            )}

            <div className="grid grid-cols-3 gap-4 mt-4">
                {s3images.length > 0 ? (
                    s3images.map((img) => (
                        <img key={img.key} src={img.url} alt={img.key} className="w-full h-auto rounded-lg shadow-md" />
                    ))
                ) : (
                    <p className="text-center col-span-3">No images found</p>
                )}
            </div>

        </div>
    )
}