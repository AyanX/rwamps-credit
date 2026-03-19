const { eq, desc } = require("drizzle-orm");
const { contactBranchesTable, db } = require("../useImports");  
const {formattedResToClient ,validBranchDataToDbFormat} = require("./branches.utils")

class BranchesController {
  
    static async createBranch(req, res) {
        try {

            if (!validBranchDataToDbFormat(req.body)) {
                return res.status(400).json({ error: "All fields are required." });
            }
             await db.insert(contactBranchesTable).values(validBranchDataToDbFormat(req.body))
            const newestBranch = await db.select().from(contactBranchesTable).orderBy(desc(contactBranchesTable.created_at)).limit(1);

            res.status(201).json({ message: "Branch created successfully.", data: formattedResToClient(newestBranch)[0] });
        } catch (error) {
            console.error("Error creating branch:", error);
            res.status(500).json({ error: "An error occurred while creating the branch." });
        }
    }

    static async getAllBranches(req, res) {
        try {

            const branches = await db.select().from(contactBranchesTable).where(eq(contactBranchesTable.isDeleted, false)).orderBy(desc(contactBranchesTable.created_at)).limit(2);
            const formattedBranches = formattedResToClient(branches);
            res.json({data: formattedBranches , message: "Branches fetched successfully."});

        } catch (error) {
                        console.error("Error fetching branches:", error);
            res.status(500).json({ error: "An error occurred while fetching  the branch." });
        }
    }

    static async updateBranch(req, res) {
        try {
               const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Branch ID is required." });
            }

             if (!validBranchDataToDbFormat(req.body)) {
                return res.status(400).json({ error: "All fields are required." });
            }
            await db.update(contactBranchesTable).set(validBranchDataToDbFormat(req.body)).where(eq(contactBranchesTable.id, id));

            //fetch the updated branch to return in the response
            const updatedBranch = await db.select().from(contactBranchesTable).where(eq(contactBranchesTable.id, id)).limit(1);

            const dataToClient = formattedResToClient(updatedBranch)[0];


            res.json({ message: "Branch updated successfully.", data: dataToClient });
        } catch (error) {
            console.error("Error updating branch:", error);
            res.status(500).json({ error: "An error occurred while updating the branch." });
        }
    }

    static async deleteBranch(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Branch ID is required." });
            }

           
            // mark isDeleted to true instead of deleting the record from the database
            await db.update(contactBranchesTable).set({ isDeleted: true }).where(eq(contactBranchesTable.id, id));
            res.json({ message: "Branch deleted successfully." });
        } catch (error) {
            console.error("Error deleting branch:", error);
            res.status(500).json({ error: "An error occurred while deleting the branch." });
        }
    }
}

module.exports = BranchesController;