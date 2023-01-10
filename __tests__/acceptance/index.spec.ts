import app from "../../src/app"
import { Config } from "../../src/config"
import request from "supertest"

let server;

beforeEach(async () => {
    server = app.listen(Config.testPort);
})

afterEach(async () => {
    await server.close();
})

xdescribe('API Test', () => {
    it('Should connect to "/" and get 404', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(404);
    });

    it('Should connect to "/search" and get 404', async () => {
        const response = await request(app).get('/search')
        expect(response.status).toBe(404);
    });

    it('Should connect to "/search?file=novel.txt" and get 404', async () => {
        const response = await request(app).get('/search?file=novel.txt')
        expect(response.status).toBe(404);
    });

    it('Should connect to "/search?file=novel.txt&term=Arthur" and get 200 and arthur as key', async () => {
        const response = await request(app).get('/search?file=novel.txt&term=Arthur')
        expect(response.status).toBe(200);
        const body = response.body;
        expect(body).toHaveProperty('arthur');
    });

    it('Should connect to "/search?file=novel.txt&term=Cachingabubu" and get 200 and empty body', async () => {
        const response = await request(app).get('/search?file=novel.txt&term=Cachingabubu')
        expect(response.status).toBe(403);
        const body = response.body;
        expect(JSON.stringify(body)).toBe('{}');
    });
})

