// Import necessary modules
const axios = require("axios");
const path = require("path");
const mutler = require("multer");
const multer = require("multer");
const fs = require("fs");

// Load environment variables
require("dotenv").config();

const upload = multer({ storage: multer.memoryStorage() });

// Function: 将文件转换为 Base64 编码
function fileToBase64(file) {
  try {
    // 确保文件存在
    if (!file) {
      console.log("no file uploaded");
    }

    // 检查 buffer 是否存在
    if (!file.buffer) {
      console.log("File buffer is undefined");
    }

    console.log("image process successfully");
  } catch (error) {
    console.log(error);
  }
  // file.buffer 是从 multer 获取的文件的二进制数据
  return file.buffer.toString("base64");
}

// Function: OCR Processing
async function ORCService(image, apiKey = null) {
  const b64img = fileToBase64(image);

  // Get the OpenAI API Key
  if (!apiKey) {
    apiKey = process.env.OPENAI_API_KEY;
  }

  // Set request headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // Create the payload for the API request
  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
Here is a base64 encoded image of a receipt. For each item, please classify it into "food","chemist","entertainment","transportation","others" one of these five types.title means the product name, amount means product price,and date should be MM/DD/YYYY format. Please analyze it and return aJSON array:
[
    {
        "title": ,
        "transactionType":,
        "amount": ,
        "date":,
    },
    ...
]
Make sure the information is accurate. If you can't recognize the text, leave it as empty strings. Your response should only contain the JSON object.`,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${b64img}`,
            },
          },
        ],
      },
    ],
  };

  try {
    // Send a POST request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      { headers }
    );
    let result = response.data.choices[0].message.content;

    return result;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
}
module.exports = ORCService;
