import { tool } from "ai";
import { z } from "zod";
import { products } from "@/lib/products";

/**
 * findProducts tool
 * ------------------
 * Lets the AI search the store's product catalog based on a natural
 * language request (e.g. "something cozy under $30").
 *
 * Input:  { query: string, maxPrice?: number, category?: string }
 * Output: { count: number, products: Product[] }
 */
export const findProducts = tool({
  description:
    "Search the store's product catalog for items matching a description, " +
    "optional price ceiling, and optional category. Use this whenever the " +
    "user asks to find, browse, or recommend products.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "Free-text description of what the user wants, e.g. 'cozy blanket' or 'cheap headphones'."
      ),
    maxPrice: z
      .number()
      .optional()
      .describe("Maximum price in USD, if the user mentioned a budget."),
    category: z
      .string()
      .optional()
      .describe(
        "Category the user seems to want, inferred from their words (e.g. 'home', 'electronics', 'kitchen', 'apparel', or anything else they mention like 'toys' or 'garden')."
      ),
  }),
  execute: async ({ query, maxPrice, category }) => {
    // Simulate a small delay so the "input-available" (running) state
    // is actually visible in the UI instead of resolving instantly.
    await new Promise((resolve) => setTimeout(resolve, 700));

    const validCategories = ["home", "electronics", "kitchen", "apparel"];
    const normalizedCategory = category?.toLowerCase().trim();

    // Real, reachable failure path: the AI is free to pass ANY category
    // text it infers from the user's message, so if it's not one this
    // store actually carries, we throw — this is what triggers the
    // designed output-error state in the UI.
    if (normalizedCategory && !validCategories.includes(normalizedCategory)) {
      throw new Error(
        `This store doesn't carry a "${category}" category. Available categories: ${validCategories.join(", ")}.`
      );
    }

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    const matches = products.filter((p) => {
      if (normalizedCategory && p.category !== normalizedCategory) return false;
      if (typeof maxPrice === "number" && p.price > maxPrice) return false;

      const haystack = [p.name, p.description, p.category, ...p.tags]
        .join(" ")
        .toLowerCase();

      return terms.length === 0 || terms.some((t) => haystack.includes(t));
    });

    return {
      count: matches.length,
      products: matches.slice(0, 6),
    };
  },
});