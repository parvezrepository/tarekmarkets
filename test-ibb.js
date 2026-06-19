import fs from 'fs';
const url = 'https://ibb.co.com/TqB9gXLp';
fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  .then(res => res.text())
  .then(html => {
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) console.log('DIRECT URL:', match[1]);
    else {
      console.log('No direct URL found');
      console.log(html.substring(0, 500));
    }
  }).catch(console.error);
