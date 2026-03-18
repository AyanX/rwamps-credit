const { desc,eq } = require("drizzle-orm");
const { faqsTable, db } = require("../useImports");
const { faqsToClientFormat, validToDbFormat,faqsValidatorAllFieldsRequired } = require("./faqs.utils");
class faqsController {
  static async getAllFaqs(req, res) {
    try {
      const faqs = await db.select().from(faqsTable).orderBy(desc(faqsTable.created_at));
      const formattedFaqs = faqsToClientFormat(faqs);
      return res.json({
        data: formattedFaqs,
        message: "Faqs fetched successfully.",
      });
    } catch (error) {
      console.error("Error fetching faqs:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  static async createFaq(req, res) {
    try {
      if (!faqsValidatorAllFieldsRequired(validToDbFormat(req.body))) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const faqToDbFormat = validToDbFormat(req.body);

      await db.insert(faqsTable).values(faqToDbFormat);

      //fetch the newly created faq to return in the response
      const newestFaq = await db
        .select()
        .from(faqsTable)
        .orderBy(desc(faqsTable.created_at))
        .limit(1);

      if (!newestFaq[0]) {
        console.error("Error creating faq:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while creating the faq." });
      }

      return res
        .status(201)
        .json({
          message: "Faq created successfully.",
          data: faqsToClientFormat(newestFaq)[0],
        });
    } catch (error) {
      console.error("Error creatingfaq:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  static async updateFaq(req, res) {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ error: "Faq ID is required." });
    }
    try {
      if (!faqsValidatorAllFieldsRequired(validToDbFormat(req.body))) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const faqToDbFormat = validToDbFormat(req.body);

      await db
        .update(faqsTable)
        .set(faqToDbFormat)
        .where(eq(faqsTable.id, id));

      //fetch the updated faq to return in the response
      const updatedFaq = await db
        .select()
        .from(faqsTable)
        .where(eq(faqsTable.id, id));

      if (!updatedFaq[0]) {
        console.error("Error updating faq:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while updating the faq." });
      }

      return res
        .status(200)
        .json({
          message: "Faq updated successfully.",
          data: faqsToClientFormat(updatedFaq)[0],
        });
    }catch(error) {
      console.error("Error updating faq:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  static async deleteFaq(req, res) {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ error: "Faq ID is required." });
    }
    try {
      await db
        .update(faqsTable)
        .set({ isDeleted: true })
        .where(eq(faqsTable.id, id));

      return res
        .status(200)
        .json({ message: "Faq deleted successfully." });
    }catch(error) {
      console.error("Error deleting faq:", error);
      return res.status(500).json({ error: error.message });
  }}
}

module.exports = faqsController;
