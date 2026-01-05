
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Use proper Chat type instead of any for better type safety
let chatSession: Chat | null = null;

/**
 * Initialize or return the existing chat session.
 * Uses process.env.API_KEY directly as required by the integration guidelines.
 */
const getChatSession = (): Chat => {
  if (chatSession) return chatSession;

  // Initialize client with named apiKey parameter as per requirements
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'K-ASSIST', the AI Concierge for KOLLAB. 
      KOLLAB is a curated offline retail platform connecting Korean brands to the U.S. market.
      
      Tone: Professional, ambitious, efficient, and forward-thinking. 
      Always respond in ALL CAPS for brand names and section titles.
      
      Key Info:
      - Mission: 'WHERE SEOUL MEETS LA'.
      - Location: 731 S BROADWAY, DOWNTOWN LOS ANGELES.
      - Event: PRE-OPENING POP-UP EVENT (OCT 17-26, 2025).
      - Platform: 1F (POP-UP), B1 (RETAIL - OPENING DEC 2025), ROOFTOP (EVENTS - OPENING DEC 2025).
      - Participating Brands: MUZMAK, ARENCIA.
      - Benefits: PREMIUM LOCATION IN DTLA, FULL MANAGEMENT, MARKETING SUPPORT.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = getChatSession();
    // sendMessage returns GenerateContentResponse
    const response: GenerateContentResponse = await session.sendMessage({ message });
    // Use .text property directly as it is not a method
    return response.text || "NO RESPONSE RECEIVED.";
  } catch (error) {
    console.error("Gemini Communication Error:", error);
    // Clear session on error to allow re-initialization
    chatSession = null;
    return "COMMUNICATION ERROR: UNABLE TO REACH K-ASSIST. PLEASE CHECK YOUR CONNECTION.";
  }
};
