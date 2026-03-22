const { desc, eq } = require("drizzle-orm");
const { loansTable, db } = require("../useImports");
const {
  loansValidatorAllFieldsRequired,
  validToDbFormat,
  validDataToClientFormat,
} = require("./loans.utils");

class LoansController {
  static async createLoan(req, res) {
    try {
      const {
        title,
        "sub-title": sub_title,
        content,
        card_one_title,
        card_one_content,
        card_one_loan_amount_start,
        card_one_loan_amount_end,
        card_one_duration_start,
        card_one_duration_end,
        card_one_eligibility,
        card_one_bg_color,
        card_one_text_color,
        card_two_title,
        card_two_content,
        card_two_loan_amount_start,
        card_two_loan_amount_end,
        card_two_duration_start,
        card_two_duration_end,
        card_two_eligibility,
        card_two_bg_color,
        card_two_text_color,
      } = req.body;

      //all fields are required, so we check if any of them are missing
      if (!loansValidatorAllFieldsRequired(validToDbFormat(req.body))) {
        return res.status(400).json({ error: "All fields are required." });
      }

      await db.insert(loansTable).values({
        title,
        sub_title,
        content,
        card_one_title,
        card_one_content,
        card_one_loan_amount_start,
        card_one_loan_amount_end,
        card_one_duration_start,
        card_one_duration_end,
        card_one_eligibility,
        card_one_bg_color,
        card_one_text_color,
        card_two_title,
        card_two_content,
        card_two_loan_amount_start,
        card_two_loan_amount_end,
        card_two_duration_start,
        card_two_duration_end,
        card_two_eligibility,
        card_two_bg_color,
        card_two_text_color,
      });

      // fetch the newly created loan to return in the response

      const newestLoan = await db
        .select()
        .from(loansTable)
        .orderBy(desc(loansTable.created_at))
        .limit(1);

      if (!newestLoan[0]) {
        console.error("Error creating loan:", error);
        res
          .status(500)
          .json({ error: "An error occurred while creating the loan." });
      }

      res
        .status(201)
        .json({ message: "Loan created successfully.", data: validDataToClientFormat(newestLoan)[0] });
    } catch (error) {
      console.error("Error creating loan:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the loan." });
    }
  }
  static async getAllLoans(req, res) {
    try {
      const loans = await db
        .select()
        .from(loansTable)
        .where(eq(loansTable.isDeleted, false));

      if (loans.length === 0) {
        return res.status(200).json({ data: [], message: "No loans found." });
      }

      const formattedLoans = validDataToClientFormat(loans);
      res
        .status(200)
        .json({ data: formattedLoans, message: "Loans fetched successfully." });
    } catch (error) {
      console.error("Error fetching loans:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the loans." });
    }
  }

  static async updateLoan(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Loan ID is required." });
    }
    try {
      //all fields are required, so we check if any of them are missing
   if (!loansValidatorAllFieldsRequired(validToDbFormat(req.body))) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const loanUpdatedToDbFormat = validToDbFormat(req.body);

      await db
        .update(loansTable)
        .set(loanUpdatedToDbFormat)
        .where(eq(loansTable.id, Number(id)));

      //fetch the updated loan to return in the response
      const updatedLoan = await db
        .select()
        .from(loansTable)
        .where(eq(loansTable.id, Number(id)))
        .limit(1);

      if (!updatedLoan[0]) {
        return res.status(404).json({ error: "Loan not found." });
      }

      res
        .status(200)
        .json({ message: "Loan updated successfully.", data:validDataToClientFormat(updatedLoan)[0] });
    } catch (error) {
      console.error("Error updating loan:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the loan." });
    }
  }
  static async deleteLoan(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Loan ID is required." });
    }
    try {
      await db
        .update(loansTable)
        .set({ isDeleted: true })
        .where(eq(loansTable.id, Number(id)));

      res.status(200).json({ message: "Loan deleted successfully." });
    } catch (error) {
      console.error("Error deleting loan:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the loan." });
    }
  }
}

module.exports = LoansController;
