const express = require('express')

const { getallItems, postItem } = require('../controller/itemController');
const router = express.Router()



router.get("/", getallItems)
router.post("/blog", postItem)


module.exports = router;