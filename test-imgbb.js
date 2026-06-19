const url = 'https://ibb.co/6PZbbjH'; // valid public imgbb viewer link
fetch(url).then(res => res.text()).then(html => {
  const match = html.match(/<meta property="og:image" content="([^"]+)"/);
  console.log('Match:', match ? match[1] : 'No match');
}).catch(console.error);
