// Import necessary modules
const axios = require("axios");
const path = require("path");
const mutler = require("multer");
const multer = require("multer");
const fs = require("fs");
const User = require("../../models/User");
const OpenAI = require("openai");
const { text } = require("express");

// Load environment variables
require("dotenv").config();

async function generateAdviceReport(userId, apiKey = null) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log("前面");
  console.log(User);
  //查找用户数据
  const user = await User.findById(userId);
  console.log("后面");

  if (!user) {
    throw new Error("User not found");
  }

  console.log(user.properties);
  console.log(user.debts);

  // generate Advice report
  const prompt = `
    You are a financial assistant. Based on the following financial data, write a financial condition report:
    Monthly Income: ${JSON.stringify(user.incomes)}
    Debt: ${JSON.stringify(user.debts)}
    Property: ${JSON.stringify(user.properties)}
    Transaction Record: ${JSON.stringify(user.accountbook)}
    Goals:${JSON.stringify(user.goals)}
    The report should not include phrases like "If you have more questions, feel free to ask" or similar. Return the report in a string.
    The report should be in a formal report format.The report should be in a formal report format. Don't include the financial conditions list in the report, only focusing on how to achieve goals.
    Don't include client name and Data. Add an advice type, either "investment type" or "saving type"
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful financial assistant." },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const report = {
    date: new Date(),
    content: completion.choices[0].message.content,
  };

  console.log(report);
  return report;
}
module.exports = { generateAdviceReport };
