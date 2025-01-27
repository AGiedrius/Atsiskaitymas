const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  filterBooks,
} = require('../models/bookModel');
const AppError = require('../utilities/appError');

//2. pagination and validation
exports.getAllBooks = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    // Default values if not provided
    page = parseInt(page); // page
    limit = parseInt(limit); // items per page

    // Calculate offset, kiek books praleist iki kito puslapio
    const offset = (page - 1) * limit;

    //get paginated books
    const { books, totalCount } = await getAllBooks(limit, offset);

    if (!books.length === 0) {
      throw new AppError('No books found', 404);
    }

    // response format is JSend
    res.status(200).json({
      //statusai gali būti success, fail arba error
      status: 'success',
      data: books,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

//3. filter books using query string
exports.getFilteredBooks = async (req, res, next) => {
  try {
    const filter = req.query;
    console.log(filter);

    // If no query string, return all books
    if (Object.keys(filter).length === 0) {
      const books = await getAllBooks();
      res.status(200).json({
        status: 'success',
        data: books,
      });
      return;
    }

    // If query string, return filtered books
    const filteredBooks = await filterBooks(filter);

    res.status(200).json({
      status: 'success',
      data: filteredBooks,
    });
  } catch (error) {
    next(error);
  }
};

// 4. get book by id
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);

    if (!book) {
      throw new AppError('Invalid id, book not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// 8. post book
exports.createBook = async (req, res, next) => {
  try {
    const newBook = req.body;
    const createdBook = await createBook(newBook);

    res.status(201).json({
      status: 'success',
      data: createdBook,
    });
  } catch (error) {
    next(error);
  }
};

// 9. update book, method put
exports.updateBook = async (req, res) => {
  try {
    // id nurodo kur book keičiame
    const id = req.params.id;

    //request body nurodo į ką keičiame, kadangi metodas put, tai body atsineša visą objektą
    const newBook = req.body;

    const updatedBook = await updateBook(id, newBook);

    if (!updatedBook) {
      throw new AppError('Invalid id, book not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: updatedBook,
    });
  } catch {
    next(error);
  }
};
