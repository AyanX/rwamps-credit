const { eq, desc } = require("drizzle-orm");
const { db, messagesTable } = require("../useImports");
const {
  isMessageValid,
  messageToServer,
  messageToClient,
} = require("./messages.utils");

class messagesController {
  static async getMessages(req, res) {
    try {
      const messages = await db
        .select()
        .from(messagesTable)
        .where(eq(messagesTable.isDeleted, false))
        .orderBy(desc(messagesTable.created_at));

      return res
        .status(200)
        .json({
          data: messageToClient(messages),
          message: "Messages fetched successfully",
        });
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching messages" });
    }
  }

  static async createMessage(req, res) {
    try {
      if (!isMessageValid(req.body)) {
        return res
          .status(400)
          .json({ message: "Invalid message data / missing fields" });
      }
      const messageData = messageToServer(req.body);
      await db.insert(messagesTable).values(messageData);
      return res.status(201).json({ message: "Message created successfully" });
    } catch (error) {
      console.error("Error creating message:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while creating the message" });
    }
  }

  static async markMessageAsRead(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Message ID is required" });
      }
      const { id } = req.params;
      await db
        .update(messagesTable)
        .set({ isRead: true })
        .where(eq(messagesTable.id, +id));
      return res
        .status(200)
        .json({ message: "Message marked as read successfully" });
    } catch (error) {
      console.error("Error marking message as read:", error);
      return res.status(500).json({
        message: "An error occurred while marking the message as read",
      });
    }
  }

  static async deleteMessage(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Message ID is required" });
      }
      await db
        .update(messagesTable)
        .set({ isDeleted: true })
        .where(eq(messagesTable.id, +id));
      return res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the message" });
    }
  }
}

module.exports = messagesController;
