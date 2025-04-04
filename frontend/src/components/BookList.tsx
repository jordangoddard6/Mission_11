import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // Variables needed to keep track of information and create pagination and sorting
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortTitles, setSortTitles] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch JSON data from API when needed and update variables
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortTitles,
          selectedCategories
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortTitles, selectedCategories]);

  if (loading) return <p>Loading books...</p>;

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="d-flex flex-column gap-4">
        {/* Make a card for each book */}
        {books.map((b) => (
          <div id="bookCard" className="card p-3" key={b.bookID}>
            <h3 className="card-title">{b.title}</h3>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  <strong>Author:</strong> {b.author}
                </li>
                <li>
                  <strong>Publisher:</strong> {b.publisher}
                </li>
                <li>
                  <strong>ISBN:</strong> {b.isbn}
                </li>
                <li>
                  <strong>Classification:</strong> {b.classification}
                </li>
                <li>
                  <strong>Category:</strong> {b.category}
                </li>
                <li>
                  <strong>Number of Pages:</strong> {b.pageCount}
                </li>
                <li>
                  <strong>Price:</strong> {b.price}
                </li>
              </ul>
              <button
                className="btn btn-success" // Button will take appropriate data about book to BuyPage
                onClick={() =>
                  navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)
                }
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pageNum={pageNum}
        pageSize={pageSize}
        totalPages={totalPages}
        sortTitles={sortTitles}
        onPageChange={setPageNum}
        onPageSizeChange={setPageSize}
        onSortChange={setSortTitles}
      />
    </>
  );
}

export default BookList;
