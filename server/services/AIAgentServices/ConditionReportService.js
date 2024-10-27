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

async function generateConditionReport(userId, apiKey = null) {
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

  // generate Condition report
  const prompt = `
    You are a financial assistant. Based on the following financial data, write a financial condition report:
    Monthly Income: ${JSON.stringify(user.incomes)}
    Debt: ${JSON.stringify(user.debts)}
    Property: ${JSON.stringify(user.properties)}
    Transaction Record: ${JSON.stringify(user.accountbook)}
    The report should not include phrases like "If you have more questions, feel free to ask" or similar.The report should not contain client name and date Return the report in a string.
    The report should be in a formal report format.
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
  //   // Get the OpenAI API Key
  //   if (!apiKey) {
  //     apiKey = process.env.OPENAI_API_KEY;
  //   }

  //   // Set request headers
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${apiKey}`,
  //   };

  //   // Create the payload for the API request
  //   const payload = {
  //     model: "gpt-4o-mini",
  //     messages: [
  //       {
  //         role: "user",
  //         content: [
  //           {
  //             type: "text",
  //             text: `
  //               Please analyze theseinformation and generate a personal finance report return a JSON following this format:
  //               {
  //                 "date":,
  //                 "report":,
  //               }

  //               Make sure the information is accurate. If you can't recognize the text, leave it as empty strings. Your response should only contain the JSON object.
  //             `,
  //           },
  //           {
  //             type: "text",
  //             text: `Incomes: ${user.incomes.toString()}`, // 将 incomes 添加为 text 类型
  //           },
  //           {
  //             type: "text",
  //             text: `Properties: ${user.properties.toString()}`, // 将 properties 添加为 text 类型
  //           },
  //           {
  //             type: "text",
  //             text: `Debts: ${user.debts.toString()}`, // 将 debts 添加为 text 类型
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   try {
  //     // Send a POST request to the OpenAI API
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/chat/completions",
  //       payload,
  //       { headers }
  //     );
  //     let result = response.data.choices[0].message.content;
  //     console.log(result);
  //     //去掉返回值中多余的符号
  //     const cleanedData = result.replace(/json|`/g, "").trim();

  //     return cleanedData;
  //   } catch (error) {
  //     throw new Error(error.response ? error.response.data : error.message);
  //   }
}
module.exports = { generateConditionReport };
