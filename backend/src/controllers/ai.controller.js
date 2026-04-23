import { GoogleGenerativeAI } from "@google/generative-ai";
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 
export async function getAIResponse(req, res) {
  try {
    const { message, targetLanguage, nativeLanguage } = req.body;
 
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
 
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
 
    const result = await model.generateContent(prompt);
    const aiMessage = result.response.text();
 
    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error("Error in AI controller:", error);
    res.status(500).json({ message: "Failed to get AI response" });
  }
}