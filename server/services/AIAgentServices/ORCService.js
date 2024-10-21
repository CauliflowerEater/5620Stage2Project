// Import necessary modules
const axios = require("axios");
const path = require("path");

// Load environment variables
require("dotenv").config();

// Function: OCR Processing
async function ORCService(b64img, apiKey = null) {
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
Here is a base64 encoded image of a receipt. For each item, please classify it into "food","chemist","entertainment","transportation","others" one of these five types,Please analyze it and return the details in the following JSON format:
[
    {
        "item name": ,
        "type":,
        "price": ,
        "transaction time":,
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
    console.error(
      `Error: ${error.response ? error.response.data : error.message}`
    );
    return;
  }
}
module.exports = ORCService;
