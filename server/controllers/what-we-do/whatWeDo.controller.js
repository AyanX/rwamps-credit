const { db, whatWeDoTable } = require("../useImports");
const { v4: uuidv4 } = require("uuid");
const { eq, desc } = require("drizzle-orm");
const { generateBlurImage } = require("../utils");
const { validWhatWeDo, validWhatWeDoToClient } = require("./what-we-do.utils");

class whatWeDoController {
  static async getWhatWeDo(req, res) {
    try {
      const whatWeDo = await db
        .select()
        .from(whatWeDoTable)
        .where(eq(whatWeDoTable.isDeleted, false));

      return res.json({ data: validWhatWeDoToClient(whatWeDo) });
    } catch (error) {
      console.error("Error fetching what we do:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching what we do." });
    }
  }

  static async createWhatWeDo(req, res) {
    try {
      if (!req.fileUrl && !req.body.image_url) {
        console.error("Image URL is missing in the request");
        return res.status(400).json({ message: "Image URL is required" });
      }

      if (!validWhatWeDo(req.body)) {
        console.log("Invalid what we do data:", req.body);
        return res.status(400).json({ message: "Invalid what we do data" });
      }

      const fake_id = uuidv4();
      let imgUrl = req.fileUrl ?? req.body.image_url;

      if (!imgUrl) {
        return res.status(400).json({ message: "Image URL is required" });
      }

      // Normalize URL
      imgUrl = imgUrl.trim();

      if (!/^https?:\/\//i.test(imgUrl)) {
        imgUrl = `https://${imgUrl}`;
      }

      const dataToInsert = {
        image: imgUrl,
        fake_id,
        title: req.body.title,
      };
      await db.insert(whatWeDoTable).values(dataToInsert);

      // fetch the newly added what we do and return it in the response
      const newWhatWeDo = await db
        .select()
        .from(whatWeDoTable)
        .where(eq(whatWeDoTable.fake_id, fake_id))
        .limit(1);

      res.status(201).json({ data: validWhatWeDoToClient(newWhatWeDo)[0] });

      try {
        const blurImgUrl = await generateBlurImage(imgUrl);
        await db
          .update(whatWeDoTable)
          .set({ blur_image: blurImgUrl })
          .where(eq(whatWeDoTable.fake_id, fake_id));
      } catch (error) {
        console.error("Error generating blur image:", error);
        //blur img = real img
        await db
          .update(whatWeDoTable)
          .set({ blur_image: imgUrl })
          .where(eq(whatWeDoTable.fake_id, fake_id));
      }

      return;
    } catch (error) {
      console.error("Error creating what we do:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while creating what we do." });
    }
  }

  static async updateWhatWeDo(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID parameter is required" });
      }

      if (!validWhatWeDo(req.body)) {
        console.log("Invalid what we do data:", req.body);
        return res.status(400).json({ message: "Invalid what we do data" });
      }
      const imgUrl = req.fileUrl
      let dataToUpdate = {
        title: req.body.title,
      };

      console.log("Updating what we do with data:", { ...dataToUpdate, image: imgUrl });

      if (imgUrl && imgUrl !== null && imgUrl !== undefined) {
        dataToUpdate.image = imgUrl.trim();
      }
      //if image exists, update the record with the new image and title, else update only the title
      await db
        .update(whatWeDoTable)
        .set(dataToUpdate)
        .where(eq(whatWeDoTable.id, id));

      console.log("What we do updated successfully with data:", { id, ...dataToUpdate });

      //fetch the updated what we do and return it in the response
      const updatedWhatWeDo = await db
        .select()
        .from(whatWeDoTable)
        .where(eq(whatWeDoTable.id, +id))
        .limit(1);


        if (updatedWhatWeDo.length === 0) {
          return res.status(404).json({ message: "What we do not found" });
        }

      res
        .status(200)
        .json({
          message: "What we do updated successfully",
          data: { id, ...validWhatWeDoToClient(updatedWhatWeDo)[0]},
        });
      // if req.fileUrl exists, generate blur image and update the record
      if (!req.imgUrl) {
        return;
      }

      try {
        const blurImgUrl = await generateBlurImage(imgUrl);
        await db
          .update(whatWeDoTable)
          .set({ blur_image: blurImgUrl })
          .where(eq(whatWeDoTable.id, id));
        return;
      } catch (error) {
        console.error("Error generating blur image:", error);
        await db
          .update(whatWeDoTable)
          .set({ blur_image: imgUrl })
          .where(eq(whatWeDoTable.id, id));
        return;
      }
    } catch (error) {
      console.error("Error updating what we do:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating what we do." });
    }
  }

  static async deleteWhatWeDo(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID parameter is required" });
      }

      // mark isDeleted to true for the record with the given id
      await db
        .update(whatWeDoTable)
        .set({ isDeleted: true })
        .where(eq(whatWeDoTable.id, id));

      return res.json({ message: "What we do deleted successfully" });
    } catch (error) {
      console.error("Error deleting what we do:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting what we do." });
    }
  }
}

module.exports = whatWeDoController;
