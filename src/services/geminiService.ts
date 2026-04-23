/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { DailyVibe, WeatherType, ZodiacInfo } from "../types";

export async function getDailyVibe(zodiac: ZodiacInfo, weather: WeatherType): Promise<DailyVibe> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `You are a celestial guide. Generate a daily productivity vibe and quote for a person whose zodiac sign is ${zodiac.name} (Element: ${zodiac.element}) and is currently experiencing ${weather} weather. 
  The response should be a JSON object with two fields: "quote" (a short motivational quote) and "vibe" (a 1-word or short phrase describing the energy of the day). 
  Language: Traditional Chinese.
  Return ONLY valid JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text || '{"quote": "專注當下，繁星指引。", "vibe": "平穩"}');
    return data;
  } catch (error) {
    console.error("AI Vibe generation failed", error);
    return {
      quote: "無論星象如何，專注是你的力量。",
      vibe: "沉穩"
    };
  }
}
