const { generateBlurImage } = require("../utils");
const {
  validService,
  validServiceToClient,
  pointsStringified,
} = require("./services.utils");
const { db, servicesTable } = require("../useImports");
const { v4: uuidv4 } = require("uuid");
const { eq, desc } = require("drizzle-orm");

class servicesController {
  static async getServices(req, res) {
    try {
      const services = await db
        .select()
        .from(servicesTable)
        .orderBy(desc(servicesTable.created_at))
        .where(eq(servicesTable.isDeleted, false));

      return res.json({ data: validServiceToClient(services) });
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ message: "Failed to fetch services" });
    }
  }

  static async addService(req, res) {
    try {
      if (!req.fileUrl && !req.body.image_url) {
        console.error("Image URL is missing in the request");
        return res.status(400).json({ message: "Image URL is required" });
      }

      if (!validService(req.body)) {
        console.log("Invalid service data:", req.body);
        console.error("Invalid service data");
        return res.status(400).json({ message: "Invalid service data" });
      }
      const fake_id = uuidv4();
      const imgUrl = req.fileUrl ?? req.body.image_url;

      await db.insert(servicesTable).values({
        image: imgUrl,
        fake_id,
        title: req.body.title,
        content: req.body.content,
        icon: req.body.icon,
        points: pointsStringified(req.body.points),
      });

      // fetch the newly added service and return it in the response
      const newService = await db
        .select()
        .from(servicesTable)
        .where(eq(servicesTable.fake_id, fake_id))
        .limit(1);


      res
        .status(201)
        .json({ message: "Service added successfully", imageUrl: imgUrl, data: validServiceToClient(newService)[0] });

      try {
        const blurImageUrl = await generateBlurImage(imgUrl);

        //update blur_image in the database for fake_id
        await db
          .update(servicesTable)
          .set({ blur_image: blurImageUrl })
          .where(eq(servicesTable.fake_id, fake_id));
      } catch (error) {
        await db
          .update(servicesTable)
          .set({ blur_image: imgUrl })
          .where(eq(servicesTable.fake_id, fake_id));

        console.error(
          "Error generating blur image, using original image as fallback:",
          error,
        );
      }

      return;
    } catch (error) {
      console.error("Error adding service:", error);
      return res.status(500).json({ message: "Failed to add service" });
    }
  }

  static async updateService(req, res) {
    try {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({message: "Service ID is required"});
    }

    if (!req.fileUrl && !req.body.image_url) {
        console.error("Image URL is missing in the request");
        return res.status(400).json({ message: "Image URL is required" });
      }

      if (!validService(req.body)) {
        console.log("Invalid service data:", req.body);
        console.error("Invalid service data");
        return res.status(400).json({ message: "Invalid service data" });
      }
      const fake_id = uuidv4();
      const imgUrl = req.fileUrl ?? req.body.image_url;

        await db.update(servicesTable).set({
            image: imgUrl,
            title: req.body.title,
            content: req.body.content,
            icon: req.body.icon,
            points: pointsStringified(req.body.points),
        }).where(eq(servicesTable.id, id));

        // fetch the updated service and return it in the response

        const updatedService = await db.select().from(servicesTable).where(eq(servicesTable.id, id)).limit(1);

        res.json({message: "Service updated successfully", imageUrl: imgUrl,  data: validServiceToClient(updatedService)[0]});

        //if no req.fileUrl but we have req.body.image_url,  image was never changed , no need to generate blur image again, we can return early
        if(!req.fileUrl && req.body.image_url){
            console.log("No new image uploaded, skipping blur generation");
            return;
        }

        try {
            const blurImageUrl = await generateBlurImage(imgUrl);

            //update blur_image in the database for fake_id
            await db
              .update(servicesTable)
              .set({ blur_image: blurImageUrl })
              .where(eq(servicesTable.fake_id, fake_id));
          } catch (error) {
            await db
              .update(servicesTable)
              .set({ blur_image: imgUrl })
              .where(eq(servicesTable.fake_id, fake_id));

            console.error(
              "Error generating blur image, using original image as fallback:",
              error,
            );
          }

        return 
    } catch (error) {
      console.error("Error updating service:", error);
      return res.status(500).json({ message: "Failed to update service" });
    }
  }

  static async deleteService(req, res) {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: "Service ID is required"});
        }

        await db.update(servicesTable).set({isDeleted: true}).where(eq(servicesTable.id, id));
        return res.json({message: "Service deleted successfully"});
    } catch (error) {
        console.error("Error deleting service:", error);
        return res.status(500).json({ message: "Failed to delete service" });
    }
  }
}

module.exports = servicesController;
