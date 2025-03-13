export default function ImageCard({ img, onClick }) {
    return (
        <div className="relative cursor-pointer group" onClick={onClick}>
            <img src={img.urls.small} alt={img.alt_description} className="rounded-lg shadow-md w-full h-full object-cover transition duration-300 group-hover:brightness-110" />
        </div>
    );
}
