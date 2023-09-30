export default function BookCard({ book }) {
    return (
        <div className="h-[100%] group relative overflow-hidden rounded-2xl" key={book.bookId}>
            <div className=" h-[100%] ">
                <img src={book.img} className="object-cover h-[100%]" alt='book_img'></img>
            </div>
            <div className="absolute flex flex-col overflow-y-scroll scrollgutter justify-between p-10 text-slate-600 bg-[rgba(114,115,115,0.5)] backdrop-blur-md w-[100%] h-[100%] top-[100%] transition-all ease-in-out duration-700  group-hover:top-0 z-2">
                <div className="bg-transparent">
                    <h3 className="text-3xl mb-1 underline bg-transparent">Title</h3>
                    <p className="bg- mb-8 bg-transparent">{book.title}</p>
                    <h3 className="text-3xl mb-1 underline bg-transparent">Author</h3>
                    <p className=" mb-8 bg-transparent">{book.author}</p>
                    <h3 className="text-3xl mb-1 underline bg-transparent">Publisher</h3>
                    <p className=" mb-8 bg-transparent">{book.publisher}</p>
                </div>
                <div className="bg-transparent flex justify-between">
                    <div className="bg-transparent">

                        <h3 className=" mb-1 underline bg-transparent">Price</h3>
                        <p className="bg-transparent ">$ {book.price}.00</p>
                    </div>
                    <div className="bg-transparent">
                        <h3 className=" mb-1 underline bg-transparent">Published Date</h3>
                        <p className="bg-transparent ">{book.pubdate}</p>

                    </div>
                </div>

            </div>

        </div>
    )
}