const playstore = require('./playstore');
const express = require('express');
const app = express();

app.get('/apps', (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genres;
  const acceptableGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  if(Object.keys(req.query).length === 0 ){
    res.send(playstore);
  }

  if(!!sort && !!genres){
    const newArr = playstore.slice(0);
    if(sort !== 'rating'  && sort !== 'app' &&sort !== ''){
      res.status(400).send("Can only sort by rating or app")
    }

    if(!acceptableGenres.includes(genres)) {
      res.status(400).send(`Be sure to choose one of the following ${acceptableGenres.join(', ')}.`);
    }

    const filtArr = newArr.filter(game =>  game.Genres.includes(genres))



    if(sort === 'rating'){
      filtArr.sort(function(a, b){
        return b.Rating - a.Rating
      });
    }

    if(sort === 'app'){
      filtArr.sort((a,b) => {
        if ( a.App < b.App ){
          return -1;
        }
        if ( a.App > b.App ){
          return 1;
        }
        return 0;
      });
    }

    res.send(filtArr);
  }else if(!!sort){
    if(sort !== 'rating'  && sort !== 'app'){
      res.status(400).send("Can only sort by rating or app")
    }else if(sort === ''){
      res.send(playstore)
    }else if(sort === 'rating'){
      const newArr = playstore.slice(0)
      newArr.sort(function(a, b){return b.Rating - a.Rating});
      res.send(newArr);
    }else if(sort === 'app'){
      const newArr = playstore.slice(0);
      newArr.sort((a,b) => {
        if ( a.App < b.App ){
          return -1;
        }
        if ( a.App > b.App ){
          return 1;
        }
        return 0;
      });
      res.send(newArr);
    }
  }else if(!!genres) {
    if(!acceptableGenres.includes(genres)) {
      res.status(400).send(`Be sure to choose one of the following ${acceptableGenres.join(', ')}.`);
    }else {
      res.send(playstore.filter(game =>  game.Genres.includes(genres)));
    }
  }
console.log('get has been called')
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});