const { eq, desc } = require("drizzle-orm");
const { db, aboutUsTable } = require("../useImports");
const { aboutCardToClientFormat, aboutCardValidator, aboutCardToDbFormat } = require("./about.utils");

class AboutController {
  static async getAboutUsInfo(req, res) {
    try {
      const aboutUsInfo = await db
        .select()
        .from(aboutUsTable)
        .where(eq(aboutUsTable.isDeleted, false))
        .orderBy(desc(aboutUsTable.created_at));

        if(aboutUsInfo.length === 0){
            return res.status(200).json({data:[], message: "No about us info found." });  ;
        }

        const validDataToClientFormat = aboutUsInfo.map((info) => aboutCardToClientFormat(info));

      return res.status(200).json({data:validDataToClientFormat , message: "About us info fetched successfully." });  ;
    } catch (error) {
      console.error("Error fetching about us info:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching about us info." });
    }
  }

  static async createAboutUsInfo(req, res) {
    try {
        if(!aboutCardValidator(req.body)){
            return res.status(400).json({ message: "Invalid about us info data." });
        }
        const aboutUsDbFormat = aboutCardToDbFormat(req.body);

      await db.insert(aboutUsTable).values(aboutUsDbFormat);
      
      // fetch the newly created about us info to return in the response

      const newestAboutUsInfo = await db
        .select()
        .from(aboutUsTable)
        .orderBy(desc(aboutUsTable.created_at))
        .limit(1);

      if (!newestAboutUsInfo[0]) {
        console.error("Error creating about us info:", error);
        return res
          .status(500)
          .json({ message: "An error occurred while creating about us info." });
      }

      const validDataToClientFormat = aboutCardToClientFormat(newestAboutUsInfo[0]);

      return res
        .status(201)
        .json({ message: "About us info created successfully.", data: validDataToClientFormat });


    } catch (error) {
        console.error("Error creating about us info:", error);
        return res
          .status(500)
          .json({ message: "An error occurred while creating about us info." });
    }
  }

  static async updateAboutUsInfo(req, res) {
    try {
           if(!aboutCardValidator(req.body)){
            return res.status(400).json({ message: "Invalid about us info data." });
        }

        if (!req.body.id) {
            return res.status(400).json({ message: "About us info ID is required for update." });
        }

        const aboutUsDbFormat = aboutCardToDbFormat(req.body);



        await db.update(aboutUsTable)
        .set(aboutUsDbFormat)
        .where(eq(aboutUsTable.id, +req.body.id));
      
      // fetch the updated about us info to return in the response

      const updatedAboutUsInfo = await db
        .select()
        .from(aboutUsTable)
        .where(eq(aboutUsTable.id, +req.body.id))
        .limit(1);

      if (!updatedAboutUsInfo[0]) {
        console.error("Error updating about us info:", error);
        return res
          .status(500)
          .json({ message: "An error occurred while updating about us info." });
      }

      const validDataToClientFormat = aboutCardToClientFormat(updatedAboutUsInfo[0]);

      return res
        .status(200)
        .json({ message: "About us info updated successfully.", data: validDataToClientFormat });
    } catch (error) {
        console.error("Error updating about us info:", error);
        return res
          .status(500)
          .json({ message: "An error occurred while updating about us info." });
    }
  }

  static async deleteAboutUsInfo(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "About us info ID is required for deletion." });
        }

        await db.update(aboutUsTable)
        .set({ isDeleted: true })
        .where(eq(aboutUsTable.id, +id));

      return res
        .status(200)
        .json({ message: "About us info deleted successfully." });
    } catch (error) {
        console.error("Error deleting about us info:", error);
        return res
          .status(500)
          .json({ message: "An error occurred while deleting about us info." });
    }
  }
}

module.exports = AboutController;
