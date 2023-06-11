const BookInstance = require('../models/bookinstance');
const Book = require('../models/book');

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
    const allBookInstances = await BookInstance.find().populate('book').exec();
    res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list: allBookInstances
    });
});

// 为每位bookinstance显示详细信息的页面
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec();
    if (bookInstance === null) {
        const err = new Error('Book Instance not found');
        err.status = 404;
        return next(err);
    }
    res.render('bookinstance_detail', {
        title: 'Book:',
        bookinstance: bookInstance
    });
});

// 由 GET 显示创建bookinstance的表单
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({}, "title").exec();
    res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list: allBooks,
    });
});

// 由 POST 处理bookinstance创建操作
exports.bookinstance_create_post = [
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if (!errors.isEmpty()) {
            const allBooks = await Book.find({}, 'title').exec();
            res.render('bookinstance_form', {
                title: 'Create BookInstance',
                book_list: allBooks,
                selected_book: bookInstance.book._id,
                errors: errors.array(),
                bookinstance: bookInstance,
            });
            return;
        } else {
            await bookInstance.save();
            res.redirect(bookInstance.url);
        }
    })
];

// 由 GET 显示删除bookinstance的表单
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec();

    if (bookInstance === null) {
        res.redirect('/catalog/bookinstances');
        return;
    }

    res.render('bookinstance_delete', {
        title: 'Delete Book Instance',
        bookinstance: bookInstance,
    });
});

// 由 POST 处理bookinstance删除操作
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
    await BookInstance.findByIdAndRemove(req.body.bookinstanceid);
    res.redirect('/catalog/bookinstances'); 
});

// 由 GET 显示更新bookinstance的表单
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
    const [bookInstance, allBooks] = await Promise.all([
        BookInstance.findById(req.params.id).populate('book').exec(),
        Book.find().exec(),
    ]);
    if (bookInstance === null) {
        const err = new Error('Book Instance not found');
        err.status = 404;
        return next(err);
    }
    res.render('bookinstance_form', {
        title: 'Update Book Instance',
        bookinstance: bookInstance,
        book_list: allBooks,
        selected_book: bookInstance.book._id,
    });
});

// 由 POST 处理bookinstance更新操作
exports.bookinstance_update_post = [
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            const allBooks = await Book.find({}, 'title').exec();
            res.render('bookinstance_form', {
                title: 'Update BookInstance',
                book_list: allBooks,
                selected_book: bookInstance.book._id,
                errors: errors.array(),
                bookinstance: bookInstance,
            });
            return;
        } else {
            const theBookInstance = await BookInstance.findByIdAndUpdate(req.params.id, bookInstance);
            res.redirect(theBookInstance.url);
        }
    })
];
