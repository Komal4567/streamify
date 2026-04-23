import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAIResponse(req, res) {
  try {
    const { message, targetLanguage, nativeLanguage } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // ✅ Use model supported by your current SDK
    const model = genAI.getGenerativeModel({
      model: "gemini-pro"
    });

    const prompt = `You are a friendly and patient language exchange partner and tutor.
The user's native language is ${nativeLanguage || "English"} and they are learning ${targetLanguage || "English"}.

Your job is to:
1. Respond naturally in ${targetLanguage || "English"} to help them practice
2. If they make grammar mistakes, gently correct them at the end of your response
3. Teach new vocabulary when relevant
4. Be encouraging and supportive
5. Keep responses conversational and not too long
6. If they write in their native language, respond in ${targetLanguage || "English"} and encourage them to try in the target language

Always be warm, friendly and encouraging like a real language exchange partner!

User message: ${message}`;

    // ✅ Correct format for Gemini request
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const aiMessage = result.response.text();

    // ✅ Use "reply" (frontend-friendly)
    res.status(200).json({ reply: aiMessage });

  } catch (error) {
    console.error("🔥 Gemini FULL ERROR:", error);
    res.status(500).json({
      message: "Failed to get AI response",
      error: error.message
    });
  }
}