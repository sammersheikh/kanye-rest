var express = require('express');
var router = express.Router();
const fetch = require('node-fetch')
const auth ='Basic cHViX29hbWZ1Y215eWJkeXdtZWVrbDpwa19mNGZiZmE4NC02YzQzLTQzY2MtOTcyZS1hNDZkODMyODQyNTk='

const model_id = "ecc9388c-51d1-4c8a-8674-c0a6be2e9149"
let kanyeQuote
let uuid

const rootURL = 'https://api.kanye.rest'
const voiceURL = 'https://api.uberduck.ai/voices'
const speakURL = 'https://api.uberduck.ai/speak'


/* GET home page. */
router.get('/', function(req, res, next) {
  fetch(`${rootURL}`)
  .then(function(res) { return res.json() })
  .then(function(quotes) {
    kanyeQuote = quotes.quote
    // console.log(kanyeQuote) 
    res.render('index', {title: "Kanye West's Best Quotes Fest", quotes} )
  })
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth
    },
    body: JSON.stringify({
      speech: kanyeQuote,
      model_id: model_id,
      pace: 1,
    })
  };
  fetch('https://api.uberduck.ai/speak', options)
    .then(response => response.json())
    .then(response => {
      uuid = response
      console.log(uuid)
    })
    .catch(err => console.error(err));
}) 


// {
//   "architecture": "talknet",
//   "category": "Rappers",
//   "controls": false,
//   "display_name": "Kanye West (rapping)",
//   "name": "kanye-west-rap",
//   "model_id": "850217a2-6839-4ddf-8dd5-4843d2a8b7fa",
//   "memberships": [],
//   "is_private": false,
//   "contributors": [
//     "Anonymous"
//   ]
// },

// {
//   "architecture": "fastpitch",
//   "category": "Rappers",
//   "controls": true,
//   "display_name": "Kanye West (rapping)",
//   "name": "kanye-west-rap",
//   "model_id": "ecc9388c-51d1-4c8a-8674-c0a6be2e9149",
//   "memberships": [],
//   "is_private": false,
//   "contributors": [
//     "zwf"
//   ]
// }

module.exports = router;