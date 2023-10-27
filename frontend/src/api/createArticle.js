import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { title, description, slug, category, blocks, ...otherData } = req.body;

      // Construct the article object to send to Strapi
      const articleData = {
        title,
        description,
        slug,
        category,  // This depends on how you manage categories in Strapi
        blocks,    // This depends on how you structure the dynamic zone
        ...otherData,  // Add other fields as needed
      };

      // Make a POST request to Strapi's API
      const strapiResponse = await axios.post('https://your-strapi-api-url.com/articles', articleData, {
        headers: {
          'Authorization': 'Bearer YOUR_STRAPI_API_KEY',  // If authentication is required
        },
      });

      // Check if the article was successfully created
      if (strapiResponse.status === 200) {
        res.status(200).json({ message: 'Article created successfully.' });
      } else {
        res.status(500).json({ error: 'Failed to create the article.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the article.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
