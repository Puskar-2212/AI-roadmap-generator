import Groq from "groq-sdk";
import "dotenv/config";
import express from "express";
import cors from "cors";

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/generate-roadmap", async (req, res) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate learning roadmap for: ${req.body.topic}. Include atleast 5 to 10 steps with title,description and id. Format as JSON array`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    let aiContent = chatCompletion.choices[0]?.message?.content;
    console.log(aiContent);
    //cleaning of aiContent
  } catch (error) {
    console.log(error);
  }

  // Print the completion returned by the LLM.
  //console.log(chatCompletion.choices[0]?.message?.content || "");
});
app.listen(port, "localhost", () => {
  console.log(`Example app listening on port ${port}`);
});

//main();
