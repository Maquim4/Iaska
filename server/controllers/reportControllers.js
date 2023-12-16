const asyncHandler = require("express-async-handler");
const Report = require("../models/report")

const sendReport = asyncHandler(async (req, res) => {
  const { messageId } = req.body;
  // check for error
  if (!messageId) {
    return res.status(400).json({
      error: "Bad request",
      message: "Server could not process Invalid request",
    });
  }
  // report object
  var newReport = {
    messageId: messageId
  };
  // query DB
  try {
    var report = await Report.create(newReport);
    report = await report.populate("messageId", "content");

    report = await report.populate({
      path: 'messageId',
      populate: {
        path: 'chatId',
        model: 'Chat',
      }
    })

    res.json(report);
  } catch (err) {
    res.status(400);
    throw new Error("Server could not process request");
  }
});


const fetchReports = asyncHandler(async (req, res) => {
  try {
    const allReports = await Report.find({})
      .populate("messageId", "content")
      .populate({
        path: 'messageId',
        populate: {
          path: 'chatId',
          model: 'Chat',
        }
      })
      .populate({
        path: 'messageId',
        populate: {
          path: 'sender',
          model: 'User',
        }
      })
    res.json(allReports);
  } catch (err) {
    res.status(400);
    throw new Error("Server could not process request");
  }
});

const deleteReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  try {
    await Report.findByIdAndDelete(reportId);
    res.status(204).end()
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

module.exports = { sendReport, fetchReports, deleteReport };
