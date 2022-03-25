Kanye West Best Quotes Fest App:

1. Grab the ID of Kanye's voice and store it in global variable (model_ID)
2. Declare global variable for kanye quotes (kanyeQuote)
3. Store the incoming kanye quote in a global variable (kanyeQuote) 
4. Pass in the current Kanye Quote (kanyeQuote) into the speech string for /speak path
5. Pass in the ID of Kanye's voice (model_ID) into the model_id field
the model_id changes so i need to grab it each time and set it dynamically
6. Grab the uuid and make a call to /speak-status
7. Pass uuid and grab the .wav file
8. Store .wav file into variable and pass it down to view render
9. Figure out how to make audio play on screen load
10. Nice!