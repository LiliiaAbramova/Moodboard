'use client';

import { useState, useEffect } from "react";
import {signIn, useSession} from "next-auth/react";
import ImageCard from "@/app/components/moodboard/ImageCard.js";

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
                body: JSON.stringify({ prompt: queryAI }),
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

    const default_img = { urls: { small: "/images/default_ai-image.png" }, alt_description: "" };

    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-md h-fit  mb-4">
            <h2 className="text-xl font-semibold mb-4">AI images</h2>
            {!session ? (
                <button onClick={() => signIn('google')} className="cursor-pointer text-white bg-red-300 p-2 rounded-lg text-center font-semibold mb-4">
                    Please log in to generate AI images
                </button>
            ) : (
                <div className="flex mb-4">
                        <input
                            type="text"
                            value={queryAI}
                            onChange={(e) => setQueryAI(e.target.value)}
                            className={`w-full p-2 border rounded-l-lg border-gray-300 ${(isGeneratingAI || hasGenerated) ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                            placeholder="Theme for AI image"
                            disabled={hasGenerated}
                        />
                        <button
                            onClick={handleGenerateAiImage}
                            className={`cursor-pointer bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 ${(isGeneratingAI || hasGenerated) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            disabled={isGeneratingAI || hasGenerated}
                        >
                            {isGeneratingAI ? "Generating..." : "Generate"}
                        </button>
                </div>
            )}

            {/* show AI-image */}
            {loadingAI && <p className="text-center text-gray-600">Generation AI-image...</p>}
            {aiImage ? (
                <div className="grid grid-cols-4 gap-2">
                    <img
                        src={aiImage}
                        alt="AI generated"
                        className="cursor-pointer max-w-full rounded-lg shadow-md"
                        onClick={() => onAdd({ urls: { small: aiImage } })}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-2">
                    <p className="text-center"></p>
                </div>
            )}

            <div className="grid grid-cols-4 gap-2">
                {s3images.length > 0 ? (
                    s3images.map((img) => (
                        <ImageCard key={img.key} img={img} onClick={() => onAdd(img)} />
                    ))
                ) : (
                    <ImageCard key={"default_img"} img={default_img} onClick={() => onAdd(default_img)} />
                )}
            </div>

        </div>
    )
}