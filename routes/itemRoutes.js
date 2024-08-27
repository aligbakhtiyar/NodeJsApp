const express = require('express')
const Item = require('../models/RecipeModel');
const { getallItems } = require('../controller/itemController');
const router = express.Router()



router.get("/", getallItems)


module.exports = router;