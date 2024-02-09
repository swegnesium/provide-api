function middlewareLogger(req, res, next){
    console.log('Middleware being ran')
    next()
}

module.exports = middlewareLogger