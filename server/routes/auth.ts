import { Hono } from 'hono'
import { kindeClient, sessionManager } from '../kinde'

export const authRoute = new Hono()
.get("/login", kindeClient.login(sessionManager), (c) => {
    return c.redirect("/");
  });

.get("/register", kindeClient.register(sessionManager), (c) => {
    return c.redirect("/");
});