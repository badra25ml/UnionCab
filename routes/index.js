var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});
// Get home page
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

// Get Services
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});
// Get Cab fares
router.get('/Fares', function(req, res, next) {
  res.render('Cab Fares', { title: 'Cab Fares' });
});
//  Get Contact Us page
router.get('/booking', function(req, res, next) {
  res.render('booking', { title: 'Booking' });
});
// About Us
router.get('/aboutus', function(req, res, next) {
  res.render('About Us', { title: 'About Us' });
});

//  Post to booking
router.post('/booking', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var subject = req.body.subject;
  var user = 'badrasadja@gmail.com';

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  });
  var mailOptions = {
    from: user,
    to: email,
    cc: user,
    subject: subject,
    text: 'Thank you for booking with Union Cab, we appreciate your business. We will get back to you as soon as possible.  '+'\n\n\n' + name + "'s message: "+ '\n\n\n\n'+ message
  };
 if(message && email){
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      req.flash('success_msg', 'Thank you for booking with us. A confirmation email was sent to ' + email);
      res.status('200').redirect('booking');
    }
  });
}else{
  req.flash('error_msg', 'Please make sure message and email fields are not empty');
  res.redirect('booking')
}
  // res.status('ok').redirect('confirmation');
});
module.exports = router;
