
// models/UserPackage.js
const mongoose = require("mongoose");
const userPackageSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true
    },
    messagesRemaining: {
      type: Number,
      required: true
    },
    whatsappNumber: {
      type: String,
      required: function() {
        return this.packageType === 'SELF_NUMBER';
      }
    },
    expiresAt: {
      type: Date,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('UserPackage', userPackageSchema);
  