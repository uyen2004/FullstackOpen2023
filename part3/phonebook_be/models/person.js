const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        const phoneFormat = /^(?:\d{2,3}-\d+)$/
        return phoneFormat.test(value)
      },
      message: (props) =>
        `Please enter phone number in the format XX-XXXXXXX or XXX-XXXXXXXX.`,
    },
    required: true,
  },
})

module.exports = mongoose.model('Person', personSchema)
