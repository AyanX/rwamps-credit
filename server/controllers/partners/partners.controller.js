const { desc ,eq} = require("drizzle-orm");
const {partnersTable, db} = require("../useImports");
const { partnerToClientRes } = require("./partners.utils");

class partnersController {
    static async getAllPartners(req, res) {
        try {
            const partners = await db.select().from(partnersTable).where(eq(partnersTable.isDeleted, false)).orderBy(desc(partnersTable.created_at));
            return res.status(200).json({ data: partnerToClientRes(partners) });
        } catch (error) {
            console.error("Error fetching partners:", error);
            return res.status(500).json({ message: "An error occurred while fetching partners." });
        }
    }

    static async createPartner(req, res) {
    try {
        const {client} = req.body

        if (!client) {
            return res.status(400).json({ message: "Client name is required." });
        }

        await db.insert(partnersTable).values({ client });

        //fetch the newly created partner to return in the response

        const newPartner = await db.select().from(partnersTable).orderBy(desc(partnersTable.created_at)).limit(1);

        if (!newPartner || newPartner.length === 0) {
            return res.status(500).json({ message: "Partner created but failed to retrieve the new partner." });
        }

        return res.status(201).json({ message: "Partner created successfully." , data: partnerToClientRes(newPartner)[0]});




    } catch (error) {
        console.error("Error creating partner:", error);
       return  res.status(500).json({ message: "An error occurred while creating the partner." });
    }}

    static async updatePartner(req, res) {
        try {
            const { id } = req.params;

            const { client } = req.body;

            if(!id) {
                return res.status(400).json({ message: "Partner ID is required." });
            }

            if (!client) {
                return res.status(400).json({ message: "Client name is required." });
            }

            await db.update(partnersTable).set({ client }).where(eq(partnersTable.id, Number(id)));

            return res.status(200).json({ message: "Partner updated successfully." , data: { id: Number(id), client } });

        } catch (error) {
            console.error("Error updating partner:", error);
            return res.status(500).json({ message: "An error occurred while updating the partner." });
        }
    }

    static async deletePartner(req, res) {
        try {
            const { id } = req.params;

            if(!id) {
                return res.status(400).json({ message: "Partner ID is required." });
            }

            await db.update(partnersTable).set({ isDeleted: true }).where(eq(partnersTable.id, Number(id)));

            return res.status(200).json({ message: "Partner deleted successfully." });

        } catch (error) {
            console.error("Error deleting partner:", error);
            return res.status(500).json({ message: "An error occurred while deleting the partner." });
        }
    }
}
module.exports = partnersController;