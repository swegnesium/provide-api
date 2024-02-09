// Import Models
const { Provider, validateProvider } = require('../models/provider')
const {Product} = require('../models/product')



module.exports = {
    // GET all providers
    async getAllProviders (req, res) {
        const providers = await Provider.find().sort('name')
        res.send(providers)
    },

    // GET provider by ID
    async getProviderById(req, res) {
        try {
            const provider = await Provider.findById(req.params.id)
            if(!provider) return res.status(404).send('The Provider with the given ID was not found.')
            res.send(provider);
        } catch (error) {
            console.log(error)
        }
    },

    // POST provider
    async postProvider(req, res) {
        // Validation
        const { error } = validateProvider(req.body)
        // If result contains error, send 400 with error message
        if (error) return res.status(400).send(error.details)

        const product = await Product.findById(req.body.productIds)
        if(!product) return res.status(404).send("Invalid Product ID")
          
        try {
            let provider = new Provider({
                name: req.body.name,
                developer: req.body.developer,
                productIds: {
                    _id: product._id,
                    productName: product.productName,
                    developer: product.developer,
                    verification: product.verification,
                    features: product.features,
                    detectionHistory: product.detectionHistory,
                    isDetected: product.isDetected,
                    isUpdating: product.isUpdating,
                    isUpdated: product.isUpdated
                },
                paymentMethods: req.body.paymentMethods,
                isTrusted: req.body.isTrusted
            });
            provider = await provider.save();
            res.send(provider);
        } catch (error) {
            console.log(error)
        }
    },

    // PUT provider
    async putProviderById(req, res) {
        // Validation
        const { error } = validateProvider(req.body)
        // If result contains error, send 400 with error message
        if (error) return res.status(400).send(error.details)
          
        try {
            // The data that CAN be updated
            let provider = await Provider.findByIdAndUpdate(req.params.id, 
                { name: req.body.name }, 
                { productIds: req.body.productIds },
                {paymentMethods: req.body.paymentMethods},
                {isTrusted: req.body.isTrusted},
                { new: true })
            if(!provider) return res.status(404).send('The Provider with the given ID was not found.')
            res.send(provider);
        } catch (error) {
            console.log(error)
        }
    },

    // DELETE provider by ID
    async deleteProviderById(req, res) {
        try {
            const provider = await Provider.findByIdAndRemove(req.params.id)
            if (!provider) res.status(404).send('The Provider with the given ID was not found')
            res.send(provider);
        } catch (error) {
            console.log(error)
        }
    },



}