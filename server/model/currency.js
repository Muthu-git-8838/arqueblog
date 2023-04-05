const mongoose = require('mongoose');

// schema with validation
const Schema = mongoose.Schema;
const CurrencySchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Coin name must be provided'],
        trim: true,
    },
    is_active: {
        type: Boolean,
        default: true
    },
},{ timestamps: true, _id: false });

module.exports = mongoose.model('Currency', CurrencySchema);