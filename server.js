const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// API: Get current count
app.get('/api/count', (req, res) => {
  const data = JSON.parse(fs.readFileSync('counter.json', 'utf8'));
  res.json({ count: data.count });
});

// API: Update counter (admin only)
app.post('/api/update', (req, res) => {
  const { user, password, count } = req.body;

  if (user === process.env.USER_ID && password === process.env.PASSWORD) {
    fs.writeFileSync('counter.json', JSON.stringify({ count: count }));
    res.send('Counter updated successfully.');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Serve index.html at root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
