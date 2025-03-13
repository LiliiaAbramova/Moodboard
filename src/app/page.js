'use client';

import { useState, useEffect, useRef } from "react";
import * as htmlToImage from 'html-to-image';
import Gallery from "@/app/components/moodboard/Gallery";
import Workspace from "@/app/components/moodboard/Workspace";
import GenerateImageAI from "@/app/components/moodboard/GenerateImageAI";
import UploadImage from "@/app/components/moodboard/UploadImage";

export default function Moodboard() {
    const [images, setImages] = useState([]);
    const [workspaceImages, setWorkspaceImages] = useState([]);
    const [queryUnsplash, setQueryUnsplash] = useState("nature art");
    const [loadingUnsplash, setLoadingUnsplash] = useState(false);
    const collageRef = useRef(null);

    const fetchUnsplashImages = async () => {
        if (!queryUnsplash.trim()) return;
        setLoadingUnsplash(true);
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${queryUnsplash}&per_page=8&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();
            setImages(data.results);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoadingUnsplash(false);
        }
    };

    useEffect(() => {
        fetchUnsplashImages();
    }, []);

    const addToWorkspace = (img) => {
        if (workspaceImages.length < 9) {
            setWorkspaceImages((prev) => [...prev, img]);
        }
    };

    const removeFromWorkspace = (index) => {
        setWorkspaceImages((prev) => prev.filter((_, i) => i !== index));
    };

    const moveImage = (fromIndex, toIndex) => {
        const updatedImages = [...workspaceImages];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setWorkspaceImages(updatedImages);
    };

    const saveCollage = async () => {
        if (!workspaceImages.length || !collageRef.current) return;
        try {
            const dataUrl = await htmlToImage.toPng(collageRef.current, { backgroundColor: 'white' });
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'collage.png';
            link.click();
        } catch (error) {
            console.error('Error saving collage:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Moodboard Generator</h1>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
                <div className="flex flex-col w-full md:w-1/3 gap-6">
                    <Gallery
                        images={images}
                        query={queryUnsplash}
                        setQuery={setQueryUnsplash}
                        onSearch={fetchUnsplashImages}
                        onAdd={addToWorkspace}
                        loading={loadingUnsplash}
                    />
                    <GenerateImageAI onAdd={addToWorkspace} />
                    <UploadImage onAdd={addToWorkspace} />
                </div>

                <Workspace
                    images={workspaceImages}
                    onRemove={removeFromWorkspace}
                    onSave={saveCollage}
                    onClear={() => setWorkspaceImages([])}
                    moveImage={moveImage}
                    collageRef={collageRef}
                />
            </div>
        </div>
    );
}
