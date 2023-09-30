import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);


    const handleSort = (e) => {
        const sortValue = e.target.value;
        if (sortValue === "price") {
            const sortedBooks = [...filteredBooks].sort((a, b) => {
                return a.price - b.price;
            });
            setFilteredBooks(sortedBooks);
        }
        else if (sortValue === "title") {
            const sortedBooks = [...filteredBooks].sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            setFilteredBooks(sortedBooks);
        }
        else if (sortValue === "date") {
            const sortedBooks = [...filteredBooks].sort((a, b) => {
                return new Date(a.pubdate) - new Date(b.pubdate);
            });
            setFilteredBooks(sortedBooks);
        }
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        if (searchValue === "") {
            setFilteredBooks(books);
            return;
        }
        const filteredBooks = books.filter((book) => {
            return book.title.toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredBooks(filteredBooks);
    }

    const handleLogout = async () => {
        const res = await axios.get("http://127.0.0.1:8000/logout", { withCredentials: true })
        const data = await res.data;
        console.log(data);
        if (data === "success") {
            navigate("/");
        }
        else {
            alert("Something went wrong");
        }
    }


    useEffect(() => {
        async function getBooks() {
            const res = await axios.get("http://127.0.0.1:8000/getbooks", { withCredentials: true })
            const data = await res.data;
            console.log(data);
            setBooks(data.books);
        }
        async function checkAuth() {
            const res = await axios.get("http://127.0.0.1:8000/checkAuth", { withCredentials: true })
            const data = res.data;

            console.log(data);
            if (data == 'Unauthorized') {
                return navigate("/");
            }
            await getBooks();
            setLoading(false);
            return;
        }
        checkAuth();
    }, []);

    return (
        loading ? <div>Loading...</div> :
            <div>
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-[100%] flex md:flex-row">
                            <label htmlFor="sort">Sort By </label>
                            <select name="sorting" id="sort" className="w-max bg-[#4a4c5f] px-2 py-1 rounded-lg" onChange={handleSort} >
                                <option value="price" className="w-max bg-[#4a4c5f] mx-3 px-2 py-1 rounded-lg mr-8">Price</option>
                                <option value="title" className="w-max bg-[#4a4c5f] mx-3 px-2 py-1 rounded-lg mr-8">Title</option>
                                <option value="date" className="w-max bg-[#4a4c5f] mx-3 px-2 py-1 rounded-lg mr-8">Recently Published</option>
                            </select>
                        </div>
                        <input type="text" name="search" placeholder="Search" className="bg-[#4a4c5f] w-[100%] outline-none md:mt-0 mt-[0.75rem] px-4 py-2 rounded-xl" onChange={handleSearch} />
                    </div>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 grid-cols-2 my-8">
                    {filteredBooks.map((book) => (
                        <BookCard book={book} key={book.bookId} />
                    ))}
                </div>
                <div className="flex" >
                    <button className="mx-auto px-6 py-3 border border-gray-500 hover:bg-gray-700 rounded-lg" onClick={handleLogout}>Logout</button>
                </div>
            </div>
    );
}
