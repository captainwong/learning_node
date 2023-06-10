const BookInstance = require('../models/bookinstance');
const asyncHandler = require("express-async-handler");

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
exports.bookinstance_create_get = (req, res) => { res.send('未实现：藏书副本创建表单的 GET'); };

// 由 POST 处理bookinstance创建操作
exports.bookinstance_create_post = (req, res) => { res.send('未实现：创建藏书副本的 POST'); };

// 由 GET 显示删除bookinstance的表单
exports.bookinstance_delete_get = (req, res) => { res.send('未实现：藏书副本删除表单的 GET'); };

// 由 POST 处理bookinstance删除操作
exports.bookinstance_delete_post = (req, res) => { res.send('未实现：删除藏书副本的 POST'); };

// 由 GET 显示更新bookinstance的表单
exports.bookinstance_update_get = (req, res) => { res.send('未实现：藏书副本更新表单的 GET'); };

// 由 POST 处理bookinstance更新操作
exports.bookinstance_update_post = (req, res) => { res.send('未实现：更新bookinstance的 POST'); };
