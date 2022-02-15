import supertest from 'supertest';

import {
    Index
} from '../Index.js';


let app = Index.app;

describe('Blog API', () => {
    it('POST /api/v1/blogpost --> Blogpost creado',
        async function () {

        const response = await supertest(app)
            .post('/api/v1/blogpost')
            .send({
                title: 'Titulo de ejemplo',
                body: 'Cuerpo de ejemplo'
        });

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                status: 'success',
                blogPost: expect.objectContaining({
                    _id: expect.any(String),
                    title: 'Titulo de ejemplo',
                    body: 'Cuerpo de ejemplo'
                })
            })
        );
    });

    it('GET /api/v1/blogpost --> Objeto para paginar con array de blogpost',
        async function () {

        const response = await supertest(app)
            .get('/api/v1/blogpost');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                blogPosts: expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        body: expect.any(String)
                    })
                ]),
                entries_per_page: expect.any(Number),
                page: expect.any(Number),
                total_results: expect.any(Number),
                filters: expect.any(Object)
            })
        );
    });

    it('GET /api/v1/blogpost --> Objeto para paginar con array de blogpost conteniendo el recientemente creado BlogPost',
        async function () {
            const response = await supertest(app)
                .get('/api/v1/blogpost?title=titulo');

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    blogPosts: expect.arrayContaining([
                        expect.objectContaining({
                            title: expect.any(String),
                            body: expect.any(String)
                        })
                    ]),
                    entries_per_page: expect.any(Number),
                    page: expect.any(Number),
                    total_results: expect.any(Number),
                    filters: expect.any(Object)
                })
            );
    });

    it('GET /api/v1/blogpost --> Objeto para paginar con array de blogpost vacio',
        async function () {
        const response = await supertest(app)
            .get('/api/v1/blogpost?title=cualquiercosa');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                blogPosts: [],
                entries_per_page: expect.any(Number),
                page: 0,
                total_results: 0,
                filters: expect.any(Object)
            })
        );
    });

    it('GET /api/v1/blogpost/id --> BlogPost con el id especificado',
        async function () {

            let response = await supertest(app)
                .get('/api/v1/blogpost?title=titulo')
                .set('Accept', 'application/json');

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    blogPosts: expect.arrayContaining([
                        expect.objectContaining({
                            title: expect.any(String),
                            body: expect.any(String)
                        })
                    ]),
                    entries_per_page: expect.any(Number),
                    page: expect.any(Number),
                    total_results: expect.any(Number),
                    filters: expect.any(Object)
                })
            );

            const blogPostId = response.body.blogPosts[0]._id;

            response = await supertest(app)
                .get('/api/v1/blogpost' + '/' + blogPostId);

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: blogPostId
                })
            );
        });

    it('GET /api/v1/blogpost/id --> 404, ID not found',
        async function () {

        const response = await supertest(app)
            .get('/api/v1/blogpost/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(404);
    });

    it('PUT /api/v1/blogpost --> BlogPost modificado',
        async function () {

        let response = await supertest(app)
            .get('/api/v1/blogpost?title=titulo')
            .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                blogPosts: expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        body: expect.any(String)
                    })
                ]),
                entries_per_page: expect.any(Number),
                page: expect.any(Number),
                total_results: expect.any(Number),
                filters: expect.any(Object)
            })
        );

        const blogPostId = response.body.blogPosts[0]._id;

        response = await supertest(app)
            .put('/api/v1/blogpost')
            .send({
                _id: blogPostId,
                title: 'Titulo Modificado'
            });

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                status: 'success'
            })
        );
    });

    it('DELETE /api/v1/blogpost --> Objeto con status: success',
        async function () {

        let response = await supertest(app)
            .get('/api/v1/blogpost?title=Modificado')
            .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                blogPosts: expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        body: expect.any(String)
                    })
                ]),
                entries_per_page: expect.any(Number),
                page: expect.any(Number),
                total_results: expect.any(Number),
                filters: expect.any(Object)
            })
        );

        const blogPostId = response.body.blogPosts[0]._id;

        response = await supertest(app)
            .delete('/api/v1/blogpost')
            .send({
                _id: blogPostId
            });

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                status: 'success'
            })
        );
    });
});