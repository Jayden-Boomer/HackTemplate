# API Setup Guide for Vue/Vite Framework

This guide explains how to integrate your Express server endpoints with Vue/Vite. There are two main approaches:

## Approach 1: Separate Backend Server (Recommended) ✅

This approach keeps your backend and frontend as separate processes, which is the standard practice and provides better separation of concerns.

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run both servers:**
   ```bash
   # Option A: Run both servers concurrently
   npm run dev:all
   
   # Option B: Run servers separately (in separate terminals)
   npm run dev:server    # Backend on port 3000
   npm run dev           # Frontend on port 5173 (default Vite port)
   ```

### How it Works

- **Backend Server** (`src/server.ts`) runs on `http://localhost:3000`
- **Vite Dev Server** runs on `http://localhost:5173` (or next available port)
- **Vite Proxy** (`vite.config.js`) forwards API requests from the frontend to the backend:
  - `/signup` → `http://localhost:3000/signup`
  - `/signin` → `http://localhost:3000/signin`
  - `/gpt-submit` → `http://localhost:3000/gpt-submit`

### Frontend Usage

In your Vue components, you can make API calls like this:

```javascript
// In any Vue component or composable
const response = await fetch('/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
```

The proxy automatically forwards these requests to your Express backend.

### Production

For production, you'll need to:
1. Build your Vue app: `npm run build`
2. Deploy your Express server separately
3. Update the proxy configuration or use environment variables for API URLs

---

## Approach 2: Vite Middleware (Alternative)

This approach runs everything in a single process using Vite's middleware capabilities. This is useful for simpler deployments but less flexible.

### Setup

1. **Use the alternative config:**
   ```bash
   # Rename or use the middleware config
   mv vite.config.js vite.config.proxy.js
   mv vite.config.with-middleware.js vite.config.js
   ```

2. **Run only Vite:**
   ```bash
   npm run dev
   ```

### How it Works

- All API routes are handled within Vite's development server
- Express is used as middleware within Vite
- Single process, single port

### Limitations

- Less flexible for scaling
- Harder to deploy separately
- More complex configuration

---

## Which Approach Should You Use?

**Use Approach 1 (Separate Backend) if:**
- ✅ You want standard best practices
- ✅ You plan to scale your backend independently
- ✅ You want easier testing and deployment
- ✅ Your team works on frontend/backend separately

**Use Approach 2 (Vite Middleware) if:**
- ✅ You want a simpler single-process setup
- ✅ Your backend is very simple
- ✅ You're building a small prototype or demo

---

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, update the port in `src/server.ts` and update the proxy target in `vite.config.js`.

### CORS Issues
With the proxy approach, CORS shouldn't be an issue since requests are proxied. If you see CORS errors, make sure both servers are running.

### API Calls Not Working
1. Verify both servers are running (check console output)
2. Check that the proxy configuration matches your API routes
3. Verify your API calls use relative paths (e.g., `/signup` not `http://localhost:3000/signup`)

