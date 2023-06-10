const Author = require('../models/author');
const Book = require('../models/book');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');

exports.author_list = asyncHandler(async (req, res, next) => {
    const allAthors = await Author.find().sort({ family_name: 1 }).exec();
    res.render('author_list', {
        title: 'Author List',
        author_list: allAthors,
    });
});

// 为每位作者显示详细信息的页面
exports.author_detail = asyncHandler(async (req, res, next) => {
    const [author, allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({ author: req.params.id }, "title summary").exec(),
    ]);
    if (author === null) {
        const err = new Error('Author not found');
        err.status = 404;
        return next(err);
    }
    res.render('author_detail', {
        title: 'Author Detail',
        author: author,
        author_books: allBooksByAuthor
    });
});

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res, next) => { 
    res.render('author_form', { title: 'Create Author' });
};

// 由 POST 处理作者创建操作
exports.author_create_post = [
    // validate and sanitize fields
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Firstname must be specified.')
        .isAlphanumeric()
        .withMessage('Firstname has non-alphanumeric characters.'),
    
    body('family_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Family name must be specified.')
        .isAlphanumeric()
        .withMessage('Family name has non-alphanumeric characters.'),
    
    body('date_of_birth', 'Invalid date of birth')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    
    body('date_of_death', 'Invalid date of death')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    
    // process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        // create Author object with escaped and trimmed data
        const author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
        });

        if (!errors.isEmpty()) {
            res.render('author_form', {
                title: 'Create Author',
                author: author,
                errors: errors
            });
            return;
        } else {
            await author.save();
            res.redirect(author.url);
        }
    })
];

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => { res.send('未实现：作者删除表单的 GET'); };

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => { res.send('未实现：删除作者的 POST'); };

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => { res.send('未实现：作者更新表单的 GET'); };

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => { res.send('未实现：更新作者的 POST'); };
