const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 4000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} `;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express by Uzo!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request',
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//SSH KEY FOR GITHUB:
// Your identification has been saved in /c/Users/Uzor/.ssh/id_rsa
// Your public key has been saved in /c/Users/Uzor/.ssh/id_rsa.pub
// The key fingerprint is:
// SHA256:k6It22wcXhtHn+aBc/EESYEmmwmxE66RwwQk/SyOQIo uzochukwuaronu@gmail.com
// The key's randomart image is:

//Agent pid 2793
