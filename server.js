import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');
const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(
  express.static(distDir, {
    index: 'index.html',
  }),
);

// SPA fallback so client-side routes still load the built app.
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`PortPhilo is running on port ${port}`);
});
