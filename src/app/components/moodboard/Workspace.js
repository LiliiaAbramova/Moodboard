export default function Workspace({ images, onRemove, onSave, onClear, moveImage, collageRef }) {
    const handleDragStart = (e, index) => e.dataTransfer.setData("index", index);
    const handleDrop = (e, index) => {
        const fromIndex = e.dataTransfer.getData("index");
        moveImage(fromIndex, index);
    };

    return (
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Workspace</h2>
            <div className="flex justify-between items-right mb-4">
                <div className="flex gap-2">
                    <button onClick={onSave} className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Save collage
                    </button>
                    <button onClick={onClear} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Clear
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-2 bg-gray-200 rounded-lg w-full min-h-[300px]" ref={collageRef}>
                {images.map((img, index) => (

                    <div
                        key={index}
                        className="relative group cursor-pointer"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <img src={img.urls.small} alt={img.alt_description} className="rounded-lg shadow-md w-full h-full object-cover aspect-[3/4]" />
                        <button onClick={() => onRemove(index)} className="absolute cursor-pointer top-1 right-1 bg-red-500 text-white rounded-full px-2 text-sm opacity-0 group-hover:opacity-100">
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
