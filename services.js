import axios from "axios";
import { JSDOM } from 'jsdom';
import { Readability } from "@mozilla/readability";
import DOMPurify from 'dompurify';
import { OpenAI } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const key_ai = process.env.KEY_AI;
const key = process.env.MY_SECRET_KEY;

const sanitizeDOM = (html) => {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    return new JSDOM(purify.sanitize(html));
};

export const getArticle = async (url) => {
    try {
        const { data } = await axios.get(url);
        const dom = sanitizeDOM(data);
        const reader = new Readability(dom.window.document);
        const article = reader.parse();

        return article.textContent;
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}

export const getAIAnswer = async (modelAI, textLong, articleText) => {

    try {
    const openai = new OpenAI({
        apiKey: key_ai,
        baseURL: "https://api.aimlapi.com",
    });
        const chatCompletion = await openai.chat.completions.create({
            model: modelAI,
            messages: [
                { role: "system", content: `Summarize the following article in ${textLong} sentences.` },
                { role: "user", content: `Text: ${articleText}` }
            ],
            temperature: 0.5,
            max_tokens: 50,
        });


        return chatCompletion.choices[0].message.content;
    } catch (e) {
        console.error(`Error! AI answer: ${e.message}`);
        throw Error(e.message)
    }
}
