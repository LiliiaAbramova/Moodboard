import ImageCard from "./ImageCard";

export default function Gallery({ images, query, setQuery, onSearch, onAdd, loading }) {
    return (
        <div className="w-full bg-white p-4 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border rounded-l-lg border-gray-300"
                    placeholder="Search on Unsplash"
                />
                <button
                    onClick={onSearch}
                    className="cursor-pointer bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Search"}
                </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                    <ImageCard key={index} img={img} onClick={() => onAdd(img)} />
                ))}
            </div>
            <p className="text-xs w-full p-2"><i>* Pick for collage</i></p>
        </div>
    );
}
