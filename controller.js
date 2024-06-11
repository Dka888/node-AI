import { cache } from "./index.js";
import { getArticle, getAIAnswer } from "./services.js";


export const summarizeText = async (req, res) => {
    const { url, textLong, modelAI } = req.body;  
    
    const cacheKey = `${url}_${modelAI}_${textLong}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const article = await getArticle(url);
        const responseLLM = await getAIAnswer(modelAI, textLong, article);
        // const summary = responseLLM.data.choices[0].text.trim();
        
        cache.set(cacheKey, responseLLM);

        res.status(200).json(responseLLM);
    } catch(e) {
        res.json(e.message)
        throw new Error(e);
    }
}