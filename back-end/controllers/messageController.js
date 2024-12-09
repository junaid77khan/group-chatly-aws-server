const Messages = require("../models/messageModel");
const User = require("../models/userModel");

// Controller to get all previous messages 
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from } = req.body;

    if (!from) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const messages = await Messages.find().populate({
      path: 'sender',
      select: 'username avatarImage email _id'
    }).sort({ createdAt: 1 });

    const projectedMessages = messages.map((msg) => {
      if (!msg.sender) {
        return null;
      }
      
      return {
        fromSelf: msg.sender._id.toString() === from,
        message: msg.message.text,
        sender: {
          _id: msg.sender._id,
          username: msg.sender.username,
          avatar: msg.sender.avatarImage,
          email: msg.sender.email
        }
      };
    }).filter(msg => msg !== null);

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

// For adding the message
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, message } = req.body;

    // Store sender of the message - to show messages left or right according to the user
    const data = await Messages.create({
      message: { text: message },  
      sender: from,              
    });

    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database" });
    }
  } catch (ex) {
    next(ex);  
  }
};

