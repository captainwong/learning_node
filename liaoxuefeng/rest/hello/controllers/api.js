var products = [
    {
        name: 'iPhone',
        price: 6999,
    }, {
        name: 'Kindle',
        price: 999,
    }
];

module.exports = {
    'GET /api/products': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            products: products
        };
    },

    'POST /api/products': async (ctx, next) => {
        var prod = {
            name: ctx.request.body.name,
            price: ctx.request.body.price,
        };
        products.push(prod);
        ctx.response.type = 'application/json';
        ctx.response.body = prod;
    }
};
