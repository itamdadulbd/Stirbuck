import { GoogleGenAI } from "@google/genai";

export const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined");
  }
  const ai = new GoogleGenAI({ apiKey: apiKey || '' });
  return ai.models.get({ model: "gemini-3-flash-preview" });
};

export const generateRecommendation = async (userContext: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  const prompt = `
    You are a professional Starbucks barista and conversion specialist. 
    Based on the following user context, recommend exactly 2 drinks from the menu that would maximize delight and upsell potential.
    
    Context:
    - Time: ${userContext.time}
    - Weather: ${userContext.weather}
    - User Preferences: ${JSON.stringify(userContext.preferences)}
    - Order History: ${JSON.stringify(userContext.history)}
    
    Return a JSON response with:
    {
      "recommendations": [
        { "name": "Drink Name", "reason": "Short catchy reason referring to weather/time", "upsell": "A focused add-on like extra shot or specific syrup" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{"recommendations": []}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { recommendations: [] };
  }
};
