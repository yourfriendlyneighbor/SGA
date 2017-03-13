const
express = require('express'),
events = require('../json/events.json'),
members = require('../json/members.json'),
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
  if(dimensions){
    if (dimensions >= 767) {
      return res.render('pages/index', {
        events: events,
        mobile: true
      });
    }else{
      return res.render('pages/index', {
        events: events,
        mobile: false
      });
    }
  }
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
    formData.descp = req.body.details;

    const contactdata = new contact(formData);

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
});
router.get('/members', (req, res) => {
  res.render('pages/members', {
    members: members
  })
});

const dimensions = []

router.post('/pageSize', (req, res) => {
  dimensions.width = req.body.width;
  dimensions.height = req.body.height;
  console.log(dimensions);
})
router.get('/login', (req, res) => {
  res.render('pages/login', {
    err: false
  })
});

router.post('/login', (req, res) => {
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  let email;
  for (var i = 0; i < req.body.length; i++) {
    email = req.body[i].email
  }
  if (validateEmail(email)) {
    return res.send('Succcess')
  } else {
    return res.send('Rip')
  }
  return false;
})


module.exports = router
