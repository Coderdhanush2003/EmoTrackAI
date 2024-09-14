import express from 'express';
import cors from 'cors';  // Import cors
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import from GoogleGenerativeAI
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); 

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', 
}));

const PORT = process.env.PORT || 8000;

const convert = 'I dont want you to ask any questions and dont reply, just sentiment analyse the sentence and display the relevant emoji, only one emoji';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api', async (req, res) => {
    try {
        const userText = req.body.contents[0].parts[0].text;  
        const content = `${userText}. ${convert}`;
        
        await generateContentWithRetry(content, res);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

async function generateContentWithRetry(prompt, res, retries = 5, delay = 1000) {
    try {
        const result = await model.generateContent(prompt);
        res.json({ emoji: result.response.text() });  // Send the response as JSON
    } catch (error) {
        if (retries > 0 && error.status === 503) {
            console.log(`Service is overloaded, retrying in ${delay}ms...`);
            setTimeout(() => generateContentWithRetry(prompt, res, retries - 1, delay * 2), delay);
        } else {
            console.error("Error generating content:", error);
            res.status(500).json({ error: "Failed to generate content" });
        }
    }
}

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
