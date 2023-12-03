const request = require('supertest');
const startServer = require('../index');

let server;
let app;

before(async () => {
  const result = await startServer();
  server = result.server;
  app = result.app;
});

after(() => {
  if (server) {
    server.close();
  }
});

describe('GET /api', () => {
  it('responds with JSON containing fake data', (done) => {
    const num = 10;

    request(app)
      .get(`/api/fake?num=${num}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it('responds with 400 if num is not provided', (done) => {
    request(app)
      .get('/api/fake')
      .expect(400, done);
  });

  it('responds with 400 if num is not a valid number', (done) => {
    request(app)
      .get('/api/fake?num=abc')
      .expect(400, done);
  });

  
  it('responds with tracking information for a valid sno', (done) => {
    const validSno = '129261720';

    request(app)
      .get(`/api/query?sno=${validSno}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it('responds with 404 for an invalid sno', (done) => {
    const invalidSno = '11111111';

    request(app)
      .get(`/api/query?sno=${invalidSno}`)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('responds with 400 if sno is not provided', (done) => {
    request(app)
      .get('/api/query')
      .expect(400, done);
  });
});
