# Portfolio Site

## Overview
This is a personal portfolio website built with Remix, Three.js, and Framer Motion. The site features 3D graphics, animations, and showcases projects and articles. Originally designed for deployment on Cloudflare Pages, it has been configured to run in the Replit environment.

## Recent Changes
- **2025-10-04**: Imported from GitHub and configured for Replit
  - Updated Vite config to bind to 0.0.0.0:5000 for Replit proxy compatibility
  - Configured HMR (Hot Module Replacement) for Replit environment
  - Created `.dev.vars` file from template for environment variables
  - Set up development workflow on port 5000
  - Configured deployment settings for Replit autoscale

## Tech Stack
- **Framework**: Remix (React-based full-stack framework)
- **3D Graphics**: Three.js
- **Animations**: Framer Motion
- **Styling**: CSS Modules with PostCSS
- **Content**: MDX for articles
- **Build Tool**: Vite
- **Originally designed for**: Cloudflare Pages

## Project Structure
```
app/
  ├── assets/          # Fonts and static assets
  ├── components/      # Reusable React components
  ├── hooks/          # Custom React hooks
  ├── layouts/        # Layout components (navbar, error, etc.)
  ├── routes/         # Remix route components
  │   ├── home/       # Home page with 3D sphere
  │   ├── projects.*/ # Project showcase pages
  │   ├── articles/   # Blog articles
  │   └── uses/       # Technologies used page
  └── utils/          # Utility functions

public/              # Static files (images, icons, etc.)
scripts/             # Build and development scripts
functions/           # Cloudflare Pages functions
```

## Development

### Environment Variables
The `.dev.vars` file contains environment variables for development:
- `ENVIRONMENT`: Set to 'development'
- `EMAIL`: Email address to receive contact form submissions
- `FROM_EMAIL`: Email address for sending (requires AWS SES setup)
- `AWS_ACCESS_KEY_ID`: AWS credentials for SES (optional)
- `AWS_SECRET_ACCESS_KEY`: AWS credentials for SES (optional)
- `SESSION_SECRET`: Secret for session cookie encryption

Note: The contact form requires AWS SES setup to work. If not configured, the form will not send emails but the rest of the site will work fine.

### Running the Site
The development server runs on port 5000 and is configured in the Server workflow:
- Command: `npm run dev`
- This runs the dev script which displays the ASCII logo and starts the Remix Vite dev server

### Key Features
1. **3D Displacement Sphere**: Interactive WebGL background animation on the home page
2. **Dark/Light Theme**: Toggle between dark and light modes (persisted via session cookie)
3. **Project Showcases**: Detailed pages for featured projects with images and descriptions
4. **Blog Articles**: MDX-based articles with syntax highlighting
5. **Responsive Design**: Mobile-friendly layout with smooth transitions

## Configuration Notes

### Replit-Specific Configuration
- **Port**: Configured to use port 5000 (required for Replit)
- **Host**: Binds to 0.0.0.0 to allow external access
- **HMR**: Configured with clientPort 443 for Replit proxy compatibility
- The site is accessible through Replit's webview

### Known Issues in Development
- Hydration warnings in console (common in Remix development mode, doesn't affect functionality)
- Some Draco WASM file route warnings (related to 3D model compression, can be ignored)

## Deployment
The site is configured for Replit's autoscale deployment:
- **Build command**: `npm run build`
- **Run command**: `npm start` (uses Wrangler Pages dev server)

For production deployment to Cloudflare Pages (original target):
```bash
npm run deploy
```

## Additional Features
- **Storybook**: Component development environment
  - Run with: `npm run dev:storybook`
  - Deploy to Cloudflare: `npm run deploy:storybook`

## User Preferences
None set yet.

## Links
- Original Repository: https://github.com/HamishMW/portfolio
- Live Site (Original): https://hamishw.com
- Storybook (Original): https://storybook.hamishw.com
