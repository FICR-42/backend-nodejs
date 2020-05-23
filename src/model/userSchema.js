const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

  name: { type: String, require: true, },
  email: { type: String, require: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false, },
  createAdd: { type: Date, default: Date.now, }

});

/**Metodo responsavel por criptografar a senha. */
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash;
  next()
})

const User = mongoose.model('users', UserSchema);

