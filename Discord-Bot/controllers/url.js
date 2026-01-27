const {nanoid } =  require("nanoid");
const URL = require("../../Discord-Bot/models/url");
 


const hadleGenerateShortUrlForBot = async (req , res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "URL is required"})
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    const shortUrl = `http://localhost:8000/${shortId}`;
    return res.render('home', { shortUrl });
};

const hadleAnalytics = async (req , res) => {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });
    if(!result) return res.status(404).json({ error: "URL not found"})
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}


module.exports = { hadleGenerateShortUrlForBot , hadleAnalytics}