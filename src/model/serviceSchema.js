const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({

  name: { type: String, require: true, },
  type: { type: String, required: true, select: false, },
  piece: { type: Date, default: Date.now, }

});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;