const { sql } = require('../dbConnection');

exports.getAllBooks = async (limit, offset) => {
  const books = await sql`
  SELECT books.*
    FROM books
    ORDER BY books.id ASC
     ${
       !isNaN(limit) && !isNaN(offset)
         ? sql`LIMIT ${limit} OFFSET ${offset}`
         : sql``
     }  
    `;
  // he query will not guarantee that the results are returned in table order unless an explicit ORDER BY clause is included.
  const total = await sql`
      SELECT COUNT(*)::int AS count 
      FROM books
    `;

  return { books, totalCount: total[0].count };
};

//filter books using query string
exports.filterBooks = async (filter) => {
  // filter = { duration: '5', difficulty: 'easy', price: '100', sort: 'asc' }

  const books = await sql`
  SELECT books.*, difficulty.name as difficulty, categories.name as category
    FROM books
    JOIN difficulty ON books.difficulty_id = difficulty.id
    JOIN categories ON books.author_id = autors.id
    WHERE 
    books.duration <= ${filter.duration} AND difficulty.name = ${
    filter.difficulty
  } AND books.title <= ${filter.title}   
     
      ORDER BY books.title ${sql.unsafe(sortDirection)}  
   `;
  //DESC and ASC is numeric value, so we need to multiply by 1 to convert it to number
  return books;
};

exports.getBookById = async (id) => {
  const books = await sql`
  SELECT books.*
    FROM books
    WHERE books.id = ${id};
    `;
  return books[0]; //book is an array, so we need to return the first element
};

exports.createBook = async (newBook) => {
  const books = await sql`
    INSERT INTO books ${sql(newBook, 'title', 'summary', 'isbn', 'author_id')}
       RETURNING *;
    `;
  return books[0];
};

exports.updateBook = async (id, updatedBook) => {
  const books = await sql`
  update books set ${sql(updatedBook, 'title', 'summary', 'isbn', 'author_id')}
  where id = ${id}
  returning *;
`;
  return books[0];
};

// exports.getDifficultyById = async (id) => {
//   const diff =
//     await sql`SELECT difficulty.* FROM difficulty WHERE difficulty.id = ${id}`;
//   return diff[0];
// };

exports.getBookByTitle = async (title) => {
  const [books] = await sql`
  SELECT books.* 
    FROM books 
    WHERE books.title = ${title};
    `;
  return books;
};
