const express = require('express'); // To import express:
const app = express();  // To make app:

const bodyparser = require('body-parser')

const mongoose = require('mongoose'); // code from mongoose official docs.
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// define mongoose schema:-
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    address: String,
    more: String
  });

  var Contact = mongoose.model('Contact', contactSchema);

const PORT = process.env.PORT || 3000;
const path = require('path'); // To create views directory path:-

// EXPRESS SPECIFIC STUFF:-
app.use('/static', express.static('static'));  // For serving static files:-
app.use(express.urlencoded()); // for returns form data to express


// PUG SPECIFIC STUFF(CONFIGURATION):-
app.set('view engine', 'pug') // set the template engine as pug:-
app.set('views',path.join(__dirname,'views'))  // set the views directory:-

// ENDPOINTS:-
app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
});
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("Your form submitted successfully!Thanks")
    }).catch(()=>{
    res.status(404).send("Sorry, Your form not submitted")
    });
    // res.status(200).render('contact.pug');
});


// START THE SERVER:-
app.listen(PORT, ()=>{
console.log(`The app successfylly started with on port ${PORT}`)
})
