app.get('/json', (req, res) => {
  let message = 'Hello json';

  // Check the MESSAGE_STYLE environment variable inside the route handler
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({ message });
});
