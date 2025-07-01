import { users, type User, type InsertUser, portfolioItems, PortfolioItem } from "@shared/schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import dotenv from 'dotenv';

dotenv.config();

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPortfolioItems(): Promise<PortfolioItem[]>;
}

export class DbStorage implements IStorage {
  private db;

  constructor(connectionString: string) {
    const client = postgres(connectionString);
    this.db = drizzle(client, { schema });
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, id) });
    return result;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.query.users.findFirst({ where: (users, { eq }) => eq(users.username, username) });
    return result;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    const result = await this.db.query.portfolioItems.findMany();
    return result;
  }
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

export const storage = new DbStorage(connectionString);
