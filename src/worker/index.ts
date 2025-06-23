import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono<{ Bindings: Env }>();

// MTA-STS policy route - keep this FIRST
app.get("/.well-known/mta-sts.txt", (c) => {
  const policy = `version: STSv1
mode: enforce
mx: *.aspmx.l.google.com
mx: *.googlemail.com
max_age: 86400`;
  
  return c.text(policy, 200, {
    'Content-Type': 'text/plain'
  });
});

// API route
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Serve static files from assets
app.get("*", serveStatic());

export default app;
