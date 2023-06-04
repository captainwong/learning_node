const
    request = require('supertest'),
    app = require('../app');

describe('#test koa app', () => {
    let server = app.listen(18080);

    it('#test GET /', async () => {
        let res = await request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200, '<h1>Hello, world!</h1>');
    });

    it('#test GET /path?name=Jack', async () => {
        let res = await request(server)
            .get('/path?name=Jack')
            .expect('Content-Type', /text\/html/)
            .expect(200, '<h1>Hello, Jack!</h1>');
    });
});
