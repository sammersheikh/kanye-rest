var express = require('express');
const { get } = require('express/lib/response');
var router = express.Router();
const fetch = require('node-fetch')
const auth ='Basic cHViX29hbWZ1Y215eWJkeXdtZWVrbDpwa19mNGZiZmE4NC02YzQzLTQzY2MtOTcyZS1hNDZkODMyODQyNTk='

const model_id = "ecc9388c-51d1-4c8a-8674-c0a6be2e9149"
let kanyeQuote
let uuid
let audioFile
let first = []
let speakReq = `?uuid=${first[0]}`

const rootURL = 'https://api.kanye.rest'
const voiceURL = 'https://api.uberduck.ai/voices'
const speakURL = 'https://api.uberduck.ai/speak'
const speakStatus = 'https://api.uberduck.ai/speak-status'

/* GET home page. */
router.get('/', function(req, res, next) {

  async function getApi() {
    let response = await fetch(`${rootURL}`)
    let data = await response.json()
    kanyeQuote = await data.quote
    console.log(kanyeQuote)
    const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: auth
            },
            body: JSON.stringify({
              speech: kanyeQuote,
              voice: "kanye-west-rap",
              model_id: model_id,
              pace: 1,
            })
          };
          const options2 = {method: 'GET', headers: {Accept: 'application/json'}};
      let speak = await fetch('https://api.uberduck.ai/speak', options)
      let voice = await speak.json()
      let uuid = await voice
      first = await uuid.uuid
      first = await first
      console.log(first)
      async function getVoice() {
        let res1 = await fetch(`${speakStatus}?uuid=${first}`, options2)
        let speechData = await res1.json()  
        console.log(res1)  
        audioFile = await speechData
        audioFile = await audioFile.path
        if (audioFile === null) {
          getVoice()
        }
        console.log(audioFile) 
      }
      getVoice()
  }
  getApi()
  .then(
    res.render('index', {title: "speakYeezy", kanyeQuote, audioFile})
    )

})

// router.get('/', async function(req, res, next) {
 
//   fetch(`${rootURL}`)
//   .then(function(res) { return res.json() })
//   .then(function(quotes) {
//     kanyeQuote = quotes.quote
//     // console.log(kanyeQuote) 
//     const options = {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: auth
//       },
//       body: JSON.stringify({
//         speech: kanyeQuote,
//         voice: "kanye-west-rap",
//         model_id: model_id,
//         pace: 1,
//       })
//     };
//     const options2 = {method: 'GET', headers: {Accept: 'application/json'}};
 
//     fetch('https://api.uberduck.ai/speak', options)
//       .then(response => response.json())
//       .then(response => {
//         uuid = response
//         first = Object.values(uuid)
//         console.log(first[0])
//       })
//       .catch(err => console.error(err));
//     setTimeout(() => {

//     fetch(`${speakStatus}?uuid=${first}`, options2)
//       .then(res => res.json())
//       .then(function(response) {
//         audioFile = response
//         audioFile = audioFile.path
//         console.log(audioFile)
//         // if (audioFile) {
//           res.render('index', {title: "speakYeezy", kanyeQuote, audioFile} )
//           // } 
//         })
        
//         }, 4000);
//     })

// }) 



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