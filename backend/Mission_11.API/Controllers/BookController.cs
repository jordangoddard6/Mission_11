using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission_11.API.Data;

namespace Mission_11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, bool sortTitles = false)
        {
            IEnumerable<Book> bookList;

            if (sortTitles)
            {
                bookList = _bookContext.Books.OrderBy(x => x.Title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }
            else
            {
                bookList = _bookContext.Books
                    .Skip((pageNum-1)*pageSize)
                    .Take(pageSize)
                    .ToList();
            }


            int totalNumBooks = _bookContext.Books.Count();

            var returnObject = new
            {
                books = bookList,
                totalNumBooks = totalNumBooks
            };

            return Ok(returnObject);
        }
    }
}
