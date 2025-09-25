import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI (will use API key when provided)
let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey: string) => {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
};

export const askGemini = async (prompt: string): Promise<string> => {
  if (!genAI) {
    // Return a helpful message when API key is not configured
    return `I'm ready to help with your farming queries! Please configure the Gemini API key to enable AI-powered responses. 

In the meantime, I can help you with:
- Current mandi prices from Agmarknet
- Soil health analysis and recommendations  
- Market trends and crop forecasts
- Community connections and events
- GPS tracking for logistics

Your query: "${prompt}"

Once the API key is added, I'll provide detailed, personalized responses based on real-time agricultural data.`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Enhanced prompt with agricultural context
    const enhancedPrompt = `You are an expert agricultural advisor helping Indian farmers. 
    Please provide practical, actionable advice for this farming query: ${prompt}
    
    Consider factors like:
    - Indian farming conditions and practices
    - Seasonal variations and climate
    - Local market conditions
    - Sustainable farming methods
    - Cost-effective solutions
    
    Keep your response practical and easy to understand.`;
    
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm experiencing some technical difficulties. Please try again later or contact support if the issue persists.";
  }
};

// Agricultural context for better responses
export const getAgriculturalContext = () => {
  return {
    currentSeason: getCurrentSeason(),
    commonCrops: ['wheat', 'rice', 'cotton', 'sugarcane', 'maize', 'pulses'],
    regions: ['Punjab', 'Haryana', 'UP', 'Maharashtra', 'Karnataka', 'Gujarat']
  };
};

const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 4 && month <= 6) return 'Summer';
  if (month >= 7 && month <= 10) return 'Monsoon/Kharif';
  return 'Winter/Rabi';
};