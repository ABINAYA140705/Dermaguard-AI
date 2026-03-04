import express from "express";
import { createServer as createViteServer } from "vite";
import { ingredientDatabase } from "./src/data";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Analysis Engine API
  app.post("/api/analyze", async (req, res) => {
    const { ingredients, skinType } = req.body;
    
    if (!ingredients || !skinType) {
      return res.status(400).json({ error: "Missing ingredients or skin type" });
    }

    // Clean the input string
    const cleanedInput = ingredients
      .replace(/\[\+\/-\:?\]/g, ",") // Remove [+/-:] markers
      .replace(/[\[\]]/g, ",")       // Replace brackets with commas
      .replace(/\./g, ",")           // Replace dots with commas
      .replace(/\s+/g, " ");         // Normalize whitespace

    const ingredientList = cleanedInput
      .split(",")
      .map((i: string) => i.trim())
      .filter((i: string) => i.length > 2); // Filter out tiny fragments

    const findings: any[] = [];
    let riskScore = 0;
    const unknownIngredients: string[] = [];

    // 1. Check local database first
    for (const userIng of ingredientList) {
      const lowerIng = userIng.toLowerCase();
      const dbItem = ingredientDatabase.find(item => 
        lowerIng.includes(item.Ingredient.toLowerCase()) || 
        item.Ingredient.toLowerCase().includes(lowerIng)
      );
      
      if (dbItem) {
        if (!findings.some(f => f.Ingredient === dbItem.Ingredient)) {
          const isAvoid = dbItem.AvoidForSkinType.includes(skinType) || dbItem.AvoidForSkinType.includes("All");
          findings.push({
            ...dbItem,
            isHarmfulForUser: isAvoid
          });

          if (isAvoid) {
            if (dbItem.RiskLevel === "High") riskScore += 3;
            else if (dbItem.RiskLevel === "Medium") riskScore += 2;
            else riskScore += 1;
          }
        }
      } else {
        unknownIngredients.push(userIng);
      }
    }

    // 2. Use Gemini API for unknown ingredients (Infinite Dataset Capability)
    if (unknownIngredients.length > 0) {
      try {
        const prompt = `You are a dermatological expert. Analyze these cosmetic ingredients for a user with ${skinType} skin:
        ${unknownIngredients.join(", ")}

        Instructions:
        1. Identify ingredients that are harmful, irritating, or comedogenic for ${skinType} skin.
        2. Even if an ingredient is "natural" (like Wheat Germ Oil), flag it if it's high-risk for this skin type (e.g., comedogenic for Oily/Acne-prone skin).
        3. For each harmful ingredient, provide:
           - Ingredient name
           - Common use
           - Possible symptoms for ${skinType} skin
           - Risk Level (High, Medium, Low)
           - A safer alternative
        
        Return a JSON array of objects. If none are harmful, return an empty array [].`;
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  Ingredient: { type: Type.STRING },
                  CommonUse: { type: Type.STRING },
                  PossibleSymptoms: { type: Type.STRING },
                  RiskLevel: { type: Type.STRING, description: "High, Medium, or Low" },
                  SaferAlternative: { type: Type.STRING }
                },
                required: ["Ingredient", "CommonUse", "PossibleSymptoms", "RiskLevel", "SaferAlternative"]
              }
            }
          }
        });

        if (response.text) {
          const aiFindings = JSON.parse(response.text);
          for (const item of aiFindings) {
            // Only add if it's considered harmful (Medium or High risk)
            if (item.RiskLevel === "High" || item.RiskLevel === "Medium") {
              findings.push({
                ...item,
                AvoidForSkinType: [skinType],
                isHarmfulForUser: true
              });
              
              if (item.RiskLevel === "High") riskScore += 3;
              else if (item.RiskLevel === "Medium") riskScore += 2;
              else riskScore += 1;
            }
          }
        }
      } catch (error) {
        console.error("AI Analysis Error:", error);
      }
    }

    let overallRisk = "Low";
    if (riskScore >= 5) overallRisk = "High";
    else if (riskScore >= 2) overallRisk = "Medium";

    res.json({
      overallRisk,
      findings,
      skinType
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
