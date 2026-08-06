export default function ImageCard({
                                      img,
                                      onClick,
                                      ...props
                                  }) {
    const author = img?.author;

    return (
        <div className="relative cursor-pointer group overflow-hidden rounded-lg aspect-[3/4]" onClick={onClick}>
            <img src={img.url} {...props} alt={img.alt_description} className="absolute inset-0 rounded-lg shadow-md w-full h-full object-cover object-cover transition-transform duration-300 group-hover:brightness-110" />

                <a
                    href={author.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="image-author"
                >
                    ©
                    <span className="author-name">
                        {author.name}
                    </span>
                </a>
        </div>
    );
}
