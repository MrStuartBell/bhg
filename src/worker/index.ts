import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// MTA-STS policy route
app.get("/.well-known/mta-sts.txt", (c) => {
  const policy = `version: STSv1
mode: testing
mx: aspmx.l.google.com
mx: alt1.aspmx.l.google.com
mx: alt2.aspmx.l.google.com
mx: alt3.aspmx.l.google.com
mx: alt4.aspmx.l.google.com
mx: smtp.google.com
max_age: 86400`;
  
  return c.text(policy);
});

// API route
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Serve pricing page with explicit HTML content
app.get("/pricing", async (c) => {
  // You can put your pricing HTML content directly here for now
  return c.html(`<!DOCTYPE html>
<html>
<head><title>Pricing</title></head>
<body><h1>Pricing Page</h1><p>Your pricing content here</p></body>
</html>`);
});

export default app;
