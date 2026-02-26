import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateStudentRemarks(studentName: string, marks: any[]) {
  try {
    const performanceSummary = marks.map(m => `${m.subject}: ${m.marks_obtained}/${m.total_marks}`).join(", ");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, professional, and encouraging principal's remark for a student named ${studentName} based on their performance: ${performanceSummary}. Keep it under 30 words.`,
    });
    return response.text || "Keep up the hard work!";
  } catch (error) {
    console.error("AI Remarks Error:", error);
    return "Satisfactory performance. Focus on consistent improvement.";
  }
}

export async function analyzePerformance(studentName: string, marks: any[]) {
  try {
    const performanceSummary = marks.map(m => `${m.subject}: ${m.marks_obtained}/${m.total_marks}`).join(", ");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the academic performance of ${studentName}: ${performanceSummary}. Provide a brief SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for their studies. Return as a JSON object with keys 'strengths', 'weaknesses', 'opportunities', 'threats'.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
}
