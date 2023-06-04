
var index = 0;

module.exports = {
    'GET /signin': async (ctx, next) => {
        let names = '甲乙丙丁戊己庚辛壬癸';
        let name = names[index % 10];
        ctx.render('signin.html', {
            name: `路人${name}`,
        });
    },

    'POST /signin': async (ctx, next) => {
        index++;
        let name = ctx.request.body.name || '路人甲';
        let user = {
            id: index,
            name: name,
            image: index % 10,
        };
        let cookie = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie for user ${name}: ${cookie}`);
        ctx.cookies.set('name', cookie);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};
