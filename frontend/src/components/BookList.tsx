import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';

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

      {/* Pagination buttons */}
      <div className="mt-4 d-flex justify-content-center gap-2">
        <button
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* User inputs: Results per page and sort by title */}
      <div className="mt-4 d-flex justify-content-center align-items-center gap-4">
        <label
          className="d-flex align-items-center"
          style={{ whiteSpace: 'nowrap', minWidth: '180px' }}
        >
          Results per page:
          <select
            className="form-select ms-2"
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
            style={{ width: '70px' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>

        <label
          className="d-flex align-items-center ms-3"
          style={{ whiteSpace: 'nowrap' }}
        >
          Sort by Title?
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={sortTitles}
            onChange={(cb) => setSortTitles(Boolean(cb.target.checked))}
          />
        </label>
      </div>
    </>
  );
}

export default BookList;
