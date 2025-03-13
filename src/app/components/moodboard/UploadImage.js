'use client';

import { useState } from "react";

export default function UploadImage({ onAdd }) {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 1 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("File size must not exceed 1 MB.");
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null); // Очистити завантажене зображення
    };

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-md h-fit flex flex-col mb-4">
            <h2 className="text-xl font-semibold mb-4">Upload image</h2>
            <div className="flex gap-4 mb-4">
                <div className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors block text-center"
                    >
                        Upload
                    </label>
                </div>
                {uploadedImage && (
                    <div className="flex-1">
                        <button
                            onClick={handleRemoveImage}
                            className="cursor-pointer w-full bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors block text-center"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>
            {uploadedImage && (
                <div className="grid grid-cols-2 gap-2 cursor-pointer">
                    <img
                        src={uploadedImage}
                        alt="Uploaded Preview"
                        className="w-full h-auto rounded-lg shadow-md object-cover"
                        onClick={() => onAdd({ urls: { small: uploadedImage } })}
                    />
                </div>
            )}
        </div>
    );
}
