const Genre = require('../models/genre');
const Book = require('../models/book');

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');

exports.genre_list = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();
    res.render('genre_list', {
        title: 'Genre List',
        genre_list: allGenres,
    });
});

// 为每位genre显示详细信息的页面
exports.genre_detail = asyncHandler(async(req, res, next)=> {
    // get details of genre and all associated books in parallel
    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, "title summary").exec(),
    ]);
    if (genre === null) {
        const err = new Error('Genre not found');
        err.status = 404;
        return next(err);
    }

    res.render('genre_detail', {
        title: 'Genre Detail',
        genre: genre,
        genre_books: booksInGenre
    });
});

// 由 GET 显示创建genre的表单
exports.genre_create_get = (req, res, next) => { 
    res.render('genre_form', { title: 'Create Genre' });
};

// 由 POST 处理genre创建操作
exports.genre_create_post = [
    // validate and sanitize the name field
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

    // process request after validation and sanitization
    asyncHandler(async(req, res, next) => {
        // extract the validation errors from a request
        const errors = validationResult(req);

        // create a genre object with escaped and trimmed data.
        let genre = new Genre({ name: req.body.name });

        if (!errors.isEmpty()) {
            // there are errors. render the form again with sanitized values/error message.
            res.render('genre_form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array(),
            });
            return;
        } else {
            // data from form is valid.
            // check if Genre with same name already exists.
            const genreExists = await Genre.findOne({ name: req.body.name }).exec();
            if (genreExists) {
                res.redirect(genreExists.url);
            } else {
                await genre.save();
                // new genre saved. redirect to genre detail page.
                res.redirect(genre.url);
            }
        }
    }),
];

// 由 GET 显示删除genre的表单
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    const [genre, allBooksByGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, 'title summary').exec(),
    ]);
    if (genre === null) {
        res.redirect('/catalog/genres');
        return;
    }

    res.render('genre_delete', {
        title: 'Delete Genre',
        genre: genre,
        genre_books: allBooksByGenre,
    });
});

// 由 POST 处理genre删除操作
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    const [genre, allBooksByGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, 'title summary').exec(),
    ]);
    if (genre === null) {
        res.redirect('/catalog/genres');
        return;
    }

    if (allBooksByGenre.length > 0) {
        res.render('genre_delete', {
            title: 'Delete Genre',
            genre: genre,
            genre_books: allBooksByGenre,
        });
        return;
    } else {
        await Genre.findByIdAndRemove(req.body.genreid);
        res.redirect('/catalog/genres');
    }
});


// 由 GET 显示更新genre的表单
exports.genre_update_get = asyncHandler(async (req, res, next) => { 
    const genre = await Genre.findById(req.params.id).exec();
    if (genre === null) {
        const err = new Error('Genre not found');
        err.status = 404;
        return next(err);
    }
    res.render('genre_form', { title: 'Update Genre', genre: genre });
});

// 由 POST 处理genre更新操作
exports.genre_update_post = [
    // validate and sanitize the name field
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

    // process request after validation and sanitization
    asyncHandler(async(req, res, next) => {
        // extract the validation errors from a request
        const errors = validationResult(req);

        let genre = new Genre({ name: req.body.name, _id: req.params.id });

        if (!errors.isEmpty()) {
            // there are errors. render the form again with sanitized values/error message.
            res.render('genre_form', {
                title: 'Update Genre',
                genre: genre,
                errors: errors.array(),
            });
            return;
        } else {            
            const theGenre = await Genre.findByIdAndUpdate(req.params.id, genre, {});
            res.redirect(theGenre.url);
        }
    }),
];
