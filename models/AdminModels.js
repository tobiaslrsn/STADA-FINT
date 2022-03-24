const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  adminUsername: {
    type: Number,
    required: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  adminPasswordConfirm: {
    type: String,
    // required: true,
  },
  ifAdmin: {
    type: Boolean,
    default: true,
  },
});

const AdminModel = model("Admin", adminSchema);

module.exports = AdminModel;
