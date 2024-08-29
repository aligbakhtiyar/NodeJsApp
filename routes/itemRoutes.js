const express = require('express')

const { getallItems, postItem, searchItem, singleItem } = require('../controller/itemController');
const router = express.Router()



router.get("/", getallItems)
router.get("/single/:id", singleItem)
router.get("/search", searchItem)
router.post("/", postItem)


module.exports = router;