# Vivaha (React + Vite)

This project is configured to deploy automatically to **GitHub Pages**.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages setup

1. Push this repository to GitHub (branch: `main`).
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Pushes to `main` will trigger `.github/workflows/deploy-gh-pages.yml` and publish the app.

### Notes

- The Vite `base` path is set to `/vivaha/` for production builds.
- If your repository name is different, update `repoName` in `vite.config.js`.
