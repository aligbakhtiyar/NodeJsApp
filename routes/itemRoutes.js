const express = require('express')

const { getallItems, postItem, searchItem, singleItem } = require('../controller/itemController');
const router = express.Router()



router.get("/", getallItems)
router.get("/:id", singleItem)
router.get("/", searchItem)
router.post("/", postItem)


module.exports = router;