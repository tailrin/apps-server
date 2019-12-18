const request = require('supertest');
const expect = require('chai').expect;
const app = require('../apps-server');

describe('Apps-server', () => {
    it('should return the full list of apps with no query', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                let application = res.body[0];
                expect(application).to.have.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver');
            });
    })
})