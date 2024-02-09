const mongoose = require('mongoose')
const Joi = require('joi')

// Import productSchema for the relationship
const { productSchema } = require('./product')

// Define our Schema for a Provider
const providerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    developer: {type: [String], required: true},
    productIds: {type: [productSchema], required: true},
    paymentMethods: {type: [String], required: true},
    isTrusted: {type: Boolean, required: true}
})

// Create Model, name of the collection, then using the Schema
// Model will allow us to talk to the DB
const Provider = mongoose.model('Provider', providerSchema);


function validateProvider(provider) {
    // Schema = what the data coming in SHOULD look like
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        developer: Joi.array().min(1).required(),
        productIds: Joi.array().required(),
        paymentMethods: Joi.array().min(1).required(),
        isTrusted: Joi.boolean().required()
    })
    // use schema to validate the data user is sending
    return schema.validate(provider)
}


module.exports.providerSchema = providerSchema;
module.exports.Provider = Provider;
module.exports.validateProvider = validateProvider;