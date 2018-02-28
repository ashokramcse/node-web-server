const express = require('express');

var app = express();
const hbs = require('hbs');

/*
Argument 1: The first argument is going to be a URL in app.get

Argument 2: The second argument is going to be the function to run;
The function that tells Express what to send back to the person who made at the request

Param explaintion for Argument 2

req :
          The first argument is request (req) stores a ton of information about the request coming in.
          Things like the headers that were used, any body information, or the method that was made with a request to the path.
          All of that is stored in request.

res:
          The second argument, respond (res),
          has a bunch of methods available so we can respond to the HTTP request in whatever way we like.
          We can customize what data we send back and we could set our HTTP status codes.
*/
app.get('/', (req, res) => {
  // Normal Text Repsonse
  // res.send('Hello Express!');

  // HTML Repsonse
  // res.send('<h1>Hello Express!</h1>');

  // JSON Repsonse
  res.send({
    name: 'Ashok',
    likes: [
      'Biking',
      'Cities'
    ]
  });
});

app.get('/bad', (req, res) => {
  // JSON Repsonse
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

/*
      Now express.static takes the absolute path to the folder you want to serve up.
      If we want to be able to serve up /help, we'll need to provide the path to the public folder.
      This means we need to specify the path from the root of our hard drive,
      which can be tricky because your projects move around.
      Luckily we have the __dirname variable

       The __dirname variable stores the path to your projects directory.
*/

// http://localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

/*
      A partial is a partial piece of your website. It's something you can reuse throughout your templates.
      For example, we might have a footer partial that renders the footer code.
      You can include that partial on any page you need a footer.
*/
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// http://localhost:3000/aboutus
app.set('view engine', 'hbs');
app.get('/aboutus', (req, res) => {
  res.render('aboutus.hbs');
});

app.get('/employee', (req, res) => {
  res.render('employee.hbs');
});

// http://localhost:3000/about
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.use((req, res, next) => {
 var now = new Date().toString();
 console.log(`${now};`);
 next();
});

// This line will make the current application to listen in the port number 3000
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
