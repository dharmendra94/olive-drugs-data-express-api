const query = require("../db/db-connection");

class DrugInfoModel {
    drugSearch = async (searchTerm) => {
        let replacement = `'%${searchTerm}%'`;

        let sql = `SELECT MAX(A.NDC) NDC
                            , C.DrugName
                            , C.Strength
                            , C.DrugEquivNum
                    FROM NDCInfo A
                    LEFT JOIN PackageInfo B ON B.NDCPackageCode = A.FDA_NDCFormat
                    LEFT JOIN DrugsInfo C ON C.ProductId = B.ProductId
                    WHERE C.DrugName LIKE ${replacement} AND C.Strength IS NOT NULL
                    GROUP BY C.DrugName, C.Strength, C.DrugEquivNum
                    ORDER BY C.DrugName 
                    LIMIT 10
                    `;

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