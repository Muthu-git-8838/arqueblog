const mongoose = require('mongoose');
const Currency = require('../model/currency');


const getCurrency = async (req, res) => {
    try {
        const coins = await Currency.find({})
        return res.sendResponse({ data: coins });
    } catch (err) {
        return res.sendError({ success: false, message: err.message });
    }
}

module.exports = { getCurrency };