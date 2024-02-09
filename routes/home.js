const express = require('express')
const router = express.Router()

// Last known Valid Token for Admin; eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkNzNyTlBvMC9iYjlBMlltLldFc1ZnLmJ1aTBTMlBmQ2o3QTRONEtubEF0QjdMcVNuaXhHTDYiLCJpYXQiOjE2ODkzNDUxMDB9.d23jBS7943IsgR-1vFq3rCfoAk-lJDARf_rfwf0kQHo

// Create initial homepage (will be website homepage eventually)
router.get('/', (req, res)=> {
    res.send('Welcome to Provider API | By Swegnesium')
})

module.exports = router