<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6e8daadc-39b4-4b99-8a1e-7aa5f3ac1c50

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy

If your deployed site shows:
`Failed to load module script ... MIME type of "application/octet-stream"`

it usually means the host is serving the project root `index.html` instead of the built `dist/index.html`.

For Netlify, use these settings:

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Base directory: leave empty unless the app is inside a subfolder

This repo now includes:

- [netlify.toml](./netlify.toml) to publish `dist`
- [public/_redirects](./public/_redirects) for SPA route fallback
- [server.js](./server.js) if you ever deploy it to a Node host instead
