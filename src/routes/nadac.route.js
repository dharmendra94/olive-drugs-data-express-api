const express = require("express");
const drugsinfoController = require("../controllers/drugsinfo.controller");
const router = express.Router();
const awaitHandlerFactory = require("../middleware/awaitHandlerFactor.middleware");

router.get("/drugSearch/:drugName", awaitHandlerFactory(drugsinfoController.drugSearch)); 
router.get("/drugEquivalentsCost/:ndc", awaitHandlerFactory(drugsinfoController.drugEquivalentsCost));

module.exports = router;