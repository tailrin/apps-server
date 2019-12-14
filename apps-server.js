const playstore = require('./playstore');
const express = require('express');
const app = express();


function compare( a, b ) {
  if ( a.App < b.App ){
    return -1;
  }
  if ( a.App > b.App ){
    return 1;
  }
  return 0;
}

app.get('/apps', (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genres;
  console.log(req.query);
  if(Object.keys(req.query).length === 0 ){
    res.send(playstore);
  }

  if(!!sort){
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
        res.send(newArr)
      }
  }



  // res.send("this is a test")
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});