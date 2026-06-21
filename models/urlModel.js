const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },

    shortId: {
      type: String,
      required: true,
      unique: true
    },

    visitHistory:[ { timestamp:{type: Number} } ],
 
    clicks: {
      type: Number,
      default: 0
    },
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

  },
  { timestamps: true } /* 
  { timestamps: true } means: Mongoose will automatically add two extra fields to your MongoDB document:
  1. createdAt  2. updatedAt */
);

const URL = mongoose.model('url', urlSchema);  

module.exports = URL;
