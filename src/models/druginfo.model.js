const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");

class DrugInfoModel {
    nadacTableName = "NADAC";
    ndcsTable = "NDCInfo";
    packageInfoTableName = "PackageInfo";
    drugsInfoTable = "DrugsInfo";

    drugSearch = async (searchTerm) => {
        let replacement = `'%${searchTerm}%'`;

        let sql = `SELECT A.NDC
                            , B.DoseUse
                            , B.PkgQty
                            , B.PkgSize
                            , B.PkgTotalUnits
                            , B.PkgSizeUom
                            , C.DrugName
                            , C.DosageForm
                            , C.Strength
                            , C.DrugEquivNum
                    FROM NDCInfo A
                    LEFT JOIN PackageInfo B ON B.NDCPackageCode = A.FDA_NDCFormat
                    LEFT JOIN DrugsInfo C ON C.ProductId = B.ProductId
                    WHERE C.DrugName LIKE ${replacement} AND C.Strength IS NOT NULL
                    ORDER BY C.DrugName 
                    LIMIT 10`;

        const result = await query(sql);

        return result;
    }

    drugEquivalentsCost = async (ndc) => {
        let sql = `call spGetDrugEquivalentsCost(?)`;
        const result = await query(sql, [ndc]);
        return result;
    }
}

module.exports = new DrugInfoModel;