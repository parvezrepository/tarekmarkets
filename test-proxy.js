const url = encodeURIComponent('https://ibb.co/6PZbbjH');
fetch('https://api.allorigins.win/get?url=' + url)
  .then(res => res.json())
  .then(data => {
    const html = data.contents;
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    console.log('Match:', match ? match[1] : 'No match');
  }).catch(console.error);
