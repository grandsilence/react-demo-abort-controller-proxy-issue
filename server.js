const express = require('express');
const app = express();
const port = 8080;

app.get('/api/test', (req, res) => {
  let executed = false;

  // any resource-intensive task can be simulated here
  const timeout = setTimeout(() => {
    res.end('OK!');
    console.log('[OK] Response completely handled.');
    executed = true;
  }, 3000);

  // on success or cancelled (close connection)
  req.on('close', () => {
    // you can also use AbortController and AbortController.signal
    // for cancel handling: https://leanylabs.com/blog/cancel-promise-abortcontroller/
    if (!executed) {
      clearInterval(timeout);
      console.log('[CANCELLED] Request cancelled.');
    } else {
      console.log('[DONE] Request Closed');
    }
  });
});

app.listen(port, () => {
  console.log('Example app listening on port: ' + port);
});
