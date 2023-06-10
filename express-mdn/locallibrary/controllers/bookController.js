const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    // get details of books, book instances, authors and genre counts (in parallel)
    const [
        numBooks,
        numBookInstances,
        numAvailableBookInstances,
        numAuthors,
        numGenres,
    ] = await Promise.all([
        Book.countDocuments({}).exec(),
        BookInstance.countDocuments({}).exec(),
        BookInstance.countDocuments({ status: 'Available' }).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
    ]);

    res.render('index', {
        title: 'Local Library Home',
        book_count: numBooks,
        book_instance_count: numBookInstances,
        book_instance_available_count: numAvailableBookInstances,
        author_count: numAuthors,
        genre_count: numGenres,
    });
});

exports.book_list = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({}, "title author")
        .sort({ title: 1 })
        .populate("author")
        .exec();
    res.render('book_list', { title: 'Book List', book_list: allBooks });
});

// 为每本书籍显示详细信息的页面
exports.book_detail = asyncHandler(async (req, res, next) => {
    // get details of books, book instance for specific book
    const [book, bookInstances] = await Promise.all([
        Book.findById(req.params.id).populate('author').populate('genre').exec(),
        BookInstance.find({ book: req.params.id }).exec(),
    ]);
    if (book === null) {
        const err = new Error('Book not found');
        err.status = 404;
        return next(err);
    }
    res.render('book_detail', {
        title: book.title,
        book: book,
        book_instances: bookInstances
    });
});

// 由 GET 显示创建书籍的表单
exports.book_create_get = asyncHandler(async (req, res, next) => {
    // get all authors and genres, which we can use for adding to our book
    const [allAuthors, allGenres] = await Promise.all([
        Author.find().exec(),
        Genre.find().exec(),
    ]);
    res.render('book_form', {
        title: 'Create Book',
        authors: allAuthors,
        genres: allGenres
    });
});

// 由 POST 处理书籍创建操作
exports.book_create_post = [
    // convert the genre to an array
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    // validate and sanitize fileds
    body('title', 'Title must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    body('author', 'Author must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    body('summary', 'Summary must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    body('isbn', 'ISBN must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    body('genre.*').escape(),

    // process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre,
        });

        if (!errors.isEmpty()) {
            const [allAuthors, allGenres] = await Promise.all([
                Author.find().exec(),
                Genre.find().exec(),
            ]);

            // mark our selected genres as checked
            for (const genre of allGenres) {
                if (book.genre.indexOf(genre._id) > -1) {
                    genre.checked = 'true';
                }
            }
            res.render('book_form', {
                title: 'Create Book',
                authors: allAuthors,
                genres: allGenres,
                book: book,
                errors: errors.array(),
            });
        } else {
            await book.save();
            res.redirect(book.url);
        }
    })

    
];

// 由 GET 显示删除书籍的表单
exports.book_delete_get = (req, res) => { res.send('未实现：书籍删除表单的 GET'); };

// 由 POST 处理书籍删除操作
exports.book_delete_post = (req, res) => { res.send('未实现：删除书籍的 POST'); };

// 由 GET 显示更新书籍的表单
exports.book_update_get = (req, res) => { res.send('未实现：书籍更新表单的 GET'); };

// 由 POST 处理书籍更新操作
exports.book_update_post = (req, res) => { res.send('未实现：更新书籍的 POST'); };
