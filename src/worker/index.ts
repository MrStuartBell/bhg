import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// MTA-STS policy route
app.get("/.well-known/mta-sts.txt", (c) => {
  const policy = `version: STSv1
mode: enforce
mx: aspmx.l.google.com
mx: alt1.aspmx.l.google.com
mx: alt2.aspmx.l.google.com
mx: alt3.aspmx.l.google.com
mx: alt4.aspmx.l.google.com
max_age: 86400`;
  
  return c.text(policy);
});

// API route
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

export default app;
