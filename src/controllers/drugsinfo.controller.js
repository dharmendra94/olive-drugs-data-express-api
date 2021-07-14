const dotenv = require("dotenv");
const druginfoModel = require("../models/druginfo.model");
dotenv.config();

/***
 * Drug info controller
 */

class DrugInfoController {
    drugSearch = async (req, res, next) => {
        let drugs = await druginfoModel.drugSearch(req.params.drugName);
        res.send(drugs);
    }

    drugEquivalentsCost = async (req, res, next) => {
        let drugEquivalentsCost = await druginfoModel.drugEquivalentsCost(req.params.ndc);
        res.send(drugEquivalentsCost);
    }
}

module.exports = new DrugInfoController;