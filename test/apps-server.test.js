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
    });

    it('should return return the array sorted by app', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'app'})
            .expect(200)
            .then( res =>{
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                let i = 0;
                let sorted = true;
                while(sorted && i < res.body.length -1){
                    let name = res.body[i].App;
                    let nextName = res.body[i + 1].App;
                    sorted = sorted && name < nextName;
                    i++
                }
                expect(sorted).to.be.true;
            });
    });

    it('should return return the array sorted by rating', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'rating'})
            .expect(200)
            .then( res =>{
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                let i = 0;
                let sorted = true;
                while(sorted && i < res.body.length -1){
                    let rating = res.body[i].Rating;
                    let nextRating = res.body[i + 1].Rating;
                    sorted = sorted && rating >= nextRating;
                    i++
                }
                expect(sorted).to.be.true;
            });
    });

    it('should filter by genre', () => {
        return request(app)
            .get('/apps')
            .query({genres: 'Puzzle'})
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                let i = 0;
                let filtered = true;
                while(filtered && i < res.body.length - 1) {
                    filtered = res.body[i].Genres.includes('Puzzle');
                    i++
                }
                expect(filtered).to.be.true;
            })
    });

    it('should filter by genre and sort by rating', () => {
        return request(app)
            .get('/apps')
            .query({genres: 'Puzzle', sort: 'rating'})
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                let i = 0;
                let filtered = true;
                while(filtered && i < res.body.length - 1) {
                    filtered = res.body[i].Genres.includes('Puzzle');
                    i++
                }
                let j = 0;
                let sorted = true;
                while(sorted && j < res.body.length -1){
                    let rating = res.body[j].Rating;
                    let nextRating = res.body[j + 1].Rating;
                    sorted = sorted && rating >= nextRating;
                    j++
                }
                expect(filtered && sorted).to.be.true;

            });
    });

    it('should send a 400 status code for invalid sort options', () => {
        return request(app)
        .get('/apps')
        .query({sort: 'mistake'})
        .expect(400, "Can only sort by rating or app")
    });


    
});