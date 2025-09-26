import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";


export function registerRoutes(app: Express): Server {

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)
  app.get("/api/portfolio", async (req, res) => {
    try {
      const __dirname = path.dirname(new URL(import.meta.url).pathname);
      const filePath = path.join(__dirname, '..\client\src\data\portfolio.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const portfolioItems = JSON.parse(fileContent);
      res.json(portfolioItems);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
