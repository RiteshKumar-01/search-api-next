export default async function handler(req, res) {
    const { q } = req.query;

    try {
        const response = await fetch(`https://serpapi.com/search?q=${q}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
