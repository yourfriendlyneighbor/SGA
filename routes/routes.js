const
express = require('express'),
events = require('../events.json'),
mongoose = require('mongoose'),
contact = require('../models/contact'),
nodemailer = require('nodemailer');
const router = express.Router();


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'carlperelman1960@gmail.com',
    pass: 'nysw4052'
  }
});

router.get('/', (req, res) => {
  res.render('pages/index', {
    events: events
  });
});
router.get('/events/:id', (req, res) => {
  res.render('pages/event', {
    event: events[req.params.id -1]
  })
});
router.get('/contact', (req, res) => {
  res.render('pages/contact', {

  })
});
router.get('/faq', (req, res) => {
  res.render('pages/faq', {

  })
});
router.get('/feedback', (req, res) => {
  res.render('pages/feedback', {

  })
});
router.post('/contact', (req, res) => {
  let formData = [];
    formData.name = req.body.name;
    formData.email = req.body.email;
    formData.decp = req.body.details;

  var contactdata = new contact(formData);

  contactdata.save(function(err){
    if(err){
      return 400
    }else{
      let mailOptions = {
        from    : '"Randolph SGA" <carlperelman1960@gmail.com>',

        to      : formData.email,

        subject : 'Thanks for contacting us!',

        text    : 'Thanks for contacting the SGA. We will respond to your question with 24-48 Business hours.'
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    }

  })

  res.render('pages/contact')
})

module.exports = router
