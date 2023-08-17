const mongoose = require("mongoose");
const {
  URL,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const plantSchema = new mongoose.Schema({
  title: DEFAULT_STRING_SCHEMA_REQUIRED,
  description: { ...DEFAULT_STRING_SCHEMA_REQUIRED, maxLength: 1024 },
  phone: {
    type: String,
    required: true,
    match: RegExp(/^[0-9]{9}$/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  web: URL,
  imageUrl: URL,
  imageAlt: DEFAULT_STRING_SCHEMA_REQUIRED,
  likes: [String],
  cart: [String],
  price: {
    type: Number,
    trim: true,
    minLength: 1,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Plant = mongoose.model("plants", plantSchema);

module.exports = Plant;