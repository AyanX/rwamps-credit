const { desc } = require("drizzle-orm");
const {statsTable , db} = require("../useImports");
const { statsToClient, validateStatsInput, statsToDb } = require("./stats.utils");


class statsController {
    static async getStats(req, res) {
        try {
            const stats = await db.select().from(statsTable).orderBy(desc(statsTable.created_at)).limit(1);

            if (stats.length === 0) {
                return res.status(404).json({ message: "Stats not found" });
            }
            const statsData = stats[0];
            return res.status(200).json({data: statsToClient(statsData) });
            
        } catch (error) {
            console.error("Error fetching stats:", error);
            return   res.status(500).json({ message: "An error occurred while fetching stats" });
        }
    }

    static async updateStats(req, res) {
        try {
            if(!validateStatsInput(req.body)) {
                return res.status(400).json({ message: "Invalid stats data" });
            }

            await db.insert(statsTable).values(statsToDb(req.body));

            //fetch the latest stats after update
            const stats = await db.select().from(statsTable).orderBy(desc(statsTable.created_at)).limit(1);

            return res.status(200).json({ message: "Stats updated successfully", data: statsToClient(stats[0]) });
        } catch (error) {
            console.error("Error updating stats:", error);
            return res.status(500).json({ message: "An error occurred while updating stats" });
        }
    }


}

module.exports = statsController