const { desc } = require("drizzle-orm");
const { socialsTable, db } = require("../useImports");
const { validSocialToClient, validSocial, validSocialToDb } = require("./socials.utils");

class socialsController {
    static async getSocials(req, res) {
        try {
            const socials = await db.select().from(socialsTable).orderBy(desc(socialsTable.created_at));
             return res.status(200).json({data:validSocialToClient(socials[0])});
        } catch (error) {
            console.error("Error fetching socials:", error);
            return res.status(500).json({message: error.message});
        }
    }

    static async createSocial(req, res) {
        try {
            if(!validSocial(req.body)) {
                return res.status(400).json({message: "Invalid social data"});
            }

            await db.insert(socialsTable).values(validSocialToDb(req.body));
            return res.status(201).json({message: "Social created successfully", data: validSocialToClient(req.body)});
        } catch (error) {
            console.error("Error creating social:", error);
            return res.status(500).json({message: error.message});
        }
    }

    static async updateSocial(req, res) {
        try {
            if(!validSocial(req.body)) {
                return res.status(400).json({message: "Invalid social data"});
            }
            await db.insert(socialsTable).values(validSocialToDb(req.body));
            return res.status(201).json({message: "Social created successfully", data: validSocialToClient(req.body)});
        } catch (error) {
            console.error("Error updating social:", error);
            return res.status(500).json({message: error.message});
        }
    }  
}

module.exports = socialsController;