const url = 'https://ibb.co/6PZbbjH';
fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  .then(res => res.text())
  .then(html => {
    const fs = require('fs');
    fs.writeFileSync('imgbb.html', html);
    console.log('Saved to imgbb.html');
  }).catch(console.error);
