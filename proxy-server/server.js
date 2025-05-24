import express from 'express';
import https from 'https';
import cors from 'cors';

const app = express();
const ESP32_URL = 'https://27a7-109-108-224-135.ngrok-free.app/sustain?stream=0'; // або /stream

app.use(cors());

app.get('/proxy-stream', (req, res) => {
  http.get(ESP32_URL, (espRes) => {
    res.writeHead(200, {
      'Content-Type': 'multipart/x-mixed-replace; boundary=frame',
    });
    espRes.pipe(res);
  }).on('error', (err) => {
    // console.error(err);
    // res.status(500).send('ESP32 stream error' + err.message);
    console.error('ESP32 error:', err.message);
    res.status(500).send('Proxy failed: ' + err.message);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
