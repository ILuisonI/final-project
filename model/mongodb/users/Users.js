const mongoose = require("mongoose");
const Name = require("./Name");
const Address = require("./Address");
const Image = require("./Image");

const {
  URL,
  DEFAULT_STRING_SCHEMA,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const schema = new mongoose.Schema({
  firstName: DEFAULT_STRING_SCHEMA_REQUIRED,
  middleName: DEFAULT_STRING_SCHEMA,
  lastName: DEFAULT_STRING_SCHEMA_REQUIRED,
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
  },
  imageUrl: URL,
  imageAlt: DEFAULT_STRING_SCHEMA_REQUIRED,
  state: DEFAULT_STRING_SCHEMA,
  country: DEFAULT_STRING_SCHEMA_REQUIRED,
  city: DEFAULT_STRING_SCHEMA_REQUIRED,
  street: DEFAULT_STRING_SCHEMA_REQUIRED,
  houseNumber: {
    type: Number,
    required: true,
    trim: true,
    minLength: 1,
  },
  zip: {
    type: Number,
    trim: true,
    minLength: 4,
    default: 0,
  },
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", schema);

module.exports = User;
