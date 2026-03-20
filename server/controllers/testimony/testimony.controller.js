const { desc } = require("drizzle-orm");
const {testimoniesTable, db}= require("../useImports");
const { validTestimonyToClient, validTestimony } = require("./testimony.utils");

class testimonyController {
    static async getTestimonies(req, res) {
        try {
            const testimonies = await db.select().from(testimoniesTable).orderBy(desc(testimoniesTable.created_at)).where(testimoniesTable.isDeleted, false);
           
            if (!testimonies || testimonies.length === 0) {
                return res.status(404).json({ message: "No testimonies found." });
            }
           
            return res.status(200).json({data: validTestimonyToClient(testimonies)});
        } catch (error) {
            console.error("Error fetching testimonies:", error);
            return res.status(500).json({ message: "An error occurred while fetching testimonies." });
        }
    }

    static async createTestimony(req, res) {
        try {
            if (!validTestimony(req.body)) {
                return res.status(400).json({ message: "Invalid testimony data. Please provide all required fields." });
            }

            const newTestimonyData = validTestimonyToServer(req.body);

            await db.insert(testimoniesTable).values(newTestimonyData);

            // fetch the newly created testimony to return in the response
            const createdTestimony = await db.select().from(testimoniesTable).orderBy(desc(testimoniesTable.created_at)).limit(1);

            return res.status(201).json({ message: "Testimony created successfully.", data: validTestimonyToClient(createdTestimony)[0] });
        }
        catch (error) {
            console.error("Error creating testimony:", error);
            return res.status(500).json({ message: "An error occurred while creating the testimony." });
        }
    }

    static async updateTestimony(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                return res.status(400).json({ message: "Testimony ID is required." });
            }

            if (!validTestimony(req.body)) {
                return res.status(400).json({ message: "Invalid testimony data. Please provide all required fields." });
            }

            const updatedTestimonyData = validTestimonyToServer(req.body);

            await db.update(testimoniesTable).set(updatedTestimonyData).where(testimoniesTable.id, id);

            // fetch the updated testimony to return in the response
            const updatedTestimony = await db.select().from(testimoniesTable).where(testimoniesTable.id, id);

            return res.status(200).json({ message: "Testimony updated successfully.", data: validTestimonyToClient(updatedTestimony)[0] });
            
        } catch (error) {
            console.error("Error updating testimony:", error);
            return res.status(500).json({ message: "An error occurred while updating the testimony." });
        }
    }

    static async deleteTestimony(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                return res.status(400).json({ message: "Testimony ID is required." });
            }

            await db.update(testimoniesTable).set({isDeleted: true}).where(testimoniesTable.id, id);

            return res.status(200).json({ message: "Testimony deleted successfully." });
            
        } catch (error) {
            console.error("Error deleting testimony:", error);
            return res.status(500).json({ message: "An error occurred while deleting the testimony." });
        }
    }
}

module.exports = testimonyController;