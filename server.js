const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.get('/api/count', (req, res) => {
  const data = JSON.parse(fs.readFileSync('counter.json', 'utf-8'));
  res.json({ count: data.count });
});

app.post('/api/update', (req, res) => {
  const { user, password, count } = req.body;
  if (user === process.env.USER_ID && password === process.env.USER_PASS) {
    fs.writeFileSync('counter.json', JSON.stringify({ count: parseInt(count) }));
    res.send('Counter updated successfully.');
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Serve index.html at root path "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
