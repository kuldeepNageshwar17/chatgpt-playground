// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.USER_ORG);
console.log(process.env.USER_APIKEY);
const configuration = new Configuration({
  organization: process.env.USER_ORG,
  apiKey: process.env.USER_APIKEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Say this is a test",
//   max_tokens: 7,
//   temperature: 0,
// });

// create a simple api that calls above functions

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.get("/models", async (req, res) => {
  const response = await openai.listModels();
  res.json(response.data.data);
});

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.1,
  });
  // console.log(response.data.choices[0].text);
  res.json({ message: response.data.choices[0].text });
});

app.listen(port, () => {
  console.log(`example app listning at http://
    localhost:${port}`);
});
