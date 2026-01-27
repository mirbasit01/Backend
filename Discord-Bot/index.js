const { Client, GatewayIntentBits } = require('discord.js')
const express = require('express');
require('dotenv').config();
const app = express();
const { connectDB } = require('./connection');
const { nanoid } = require('nanoid');
const URL = require('./models/url');
const PORT = 5000;

// connect to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mirbasitBot';
const TOKEN = process.env.DISCORD_TOKEN;

connectDB(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });




    const ShortUrlForBot = require("./routes/url")
    app.use('/url',ShortUrlForBot)
    
    // Add redirect route for short URLs
    app.get('/url/:shortId', async (req, res) => {
        const { shortId } = req.params
        try {
            const entry = await URL.findOneAndUpdate(
                { shortId },
                { $push: { visitHistory: { timestamp: Date.now() } } }
            )
            if (!entry) {
                return res.status(404).json({ error: 'Short URL not found' })
            }
            res.redirect(entry.redirectURL)
        } catch (error) {
            console.error('Redirect error:', error)
            res.status(500).json({ error: 'Server error' })
        }
    })

    

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})


client.on('messageCreate', async (message) => {
    if(message.author.bot) return
    if(message.content.startsWith('Create')){
        const url = message.content.split('Create')[1].trim()
        
        if(!url) {
            return message.reply({
                content: 'Please provide a URL after "Create"'
            })
        }
        
        try {
            const shortId = nanoid(8)
            await URL.create({
                shortId: shortId,
                redirectURL: url,
                visitHistory: []
            })
            
            const shortUrl = `http://localhost:5000/url/${shortId}`
            return message.reply({
                content: `Short URL created: ${shortUrl}`
            })
        } catch (error) {
            console.error('Error creating short URL:', error)
            return message.reply({
                content: 'Error creating short URL. Please try again.'
            })
        }
    }
        
    message.reply({
        content: 'HI FROM BOT'
    })
    
    console.log(message.content)
})
client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return
    if(interaction.commandName === 'ping'){
        interaction.reply('PONG')
    }
})

client.login(TOKEN)

 app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));