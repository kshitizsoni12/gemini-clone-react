
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1.Vite uses 'import.meta.env' to read the secret variables -> gemini api key is in .env file
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Initialize the Google Gemini AI tool
const genAI = new GoogleGenerativeAI(apiKey);

// 3. Create the function that will send your prompt to Google and get the answer back
async function runChat(prompt) {
  // We use 'gemini-1.5-flash' because it is the newest, fastest free model
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // Send the prompt to the AI
    const result = await model.generateContent(prompt);
    
    // Extract the text from the AI's response
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    return "Sorry, I ran into an error. Please check your console.";
  }
}

// Export this function so you can use it in your Context API!
export default runChat;