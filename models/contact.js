const mongoose = require('mongoose'), express = require('express');
const Schema = mongoose.Schema;

const contactSchema = Schema(
{
  name: String,
  email: String,
  descp: String,
  date: {
    type: Date,
    default: Date.now
  }
},
{
  collection: 'contacts'
});

module.exports = mongoose.model('contact', contactSchema);
