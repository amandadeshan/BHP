// api/save-data.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Here, you would typically save data to a database or file
    // For demonstration purposes, we'll just log it
    console.log('Data received:', data);

    res.status(200).json({ message: 'Data saved successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
