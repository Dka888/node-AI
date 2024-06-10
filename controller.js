import { getArticle, getAIAnswer } from "./services.js";


export const summarizeText = async (req, res) => {
    const { url, textLong, modelAI } = req.body;  
    
    try {
        const article = await getArticle(url);
        const responseLLM = await getAIAnswer(modelAI, textLong, article);
        const summary = responseLLM.data.choices[0].text.trim();

        res.status(200).send(summary);
    } catch(e) {
        res.status(400)
    }
}