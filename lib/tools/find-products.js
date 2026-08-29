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
        "Free-text description of what the user wants, e.g. 'cozy blanket' or 'diamond ring'."
      ),
    maxPrice: z
      .number()
      .optional()
      .describe("Maximum price in USD, if the user mentioned a budget."),
    category: z
      .string()
      .optional()
      .describe(
        "Category the user seems to want, inferred from their words. One of: women, men, jewelry, gifts, candles, watches."
      ),
  }),
  execute: async ({ query, maxPrice, category }) => {
    // Simulate a small delay so the "input-available" (running) state
    // is actually visible in the UI instead of resolving instantly.
    await new Promise((resolve) => setTimeout(resolve, 700));

    // --- TEMPORARY SABOTAGE HOOK — delete before final submission ---
    if (query.toLowerCase().includes("sabotage-json")) {
      JSON.parse("{ this is not valid json");
    }
    // --- END SABOTAGE HOOK ---

    const validCategories = ["women", "men", "jewelry", "gifts", "candles", "watches"];
    const normalizedCategory = category?.toLowerCase().trim();

    if (normalizedCategory && !validCategories.includes(normalizedCategory)) {
      throw new Error(
        `This store doesn't carry a "${category}" category. Available categories: ${validCategories.join(", ")}.`
      );
    }

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    // Filter by hard constraints first (category, price)
    const candidates = products.filter((p) => {
      if (normalizedCategory && p.category !== normalizedCategory) return false;
      if (typeof maxPrice === "number" && p.price > maxPrice) return false;
      return true;
    });

    // Score each candidate: how many query terms appear in the NAME
    // (strong signal) vs. anywhere else (weak signal).
    const scored = candidates
      .map((p) => {
        const name = p.name.toLowerCase();
        const haystack = [p.description, p.category, ...p.tags]
          .join(" ")
          .toLowerCase();

        const nameMatches = terms.filter((t) => name.includes(t)).length;
        const otherMatches = terms.filter((t) => haystack.includes(t)).length;

        return { product: p, nameMatches, otherMatches };
      })
      .filter((s) => s.nameMatches > 0 || s.otherMatches > 0)
      .sort((a, b) => {
        if (b.nameMatches !== a.nameMatches) return b.nameMatches - a.nameMatches;
        return b.otherMatches - a.otherMatches;
      });

    let matches;

    if (scored.length === 0) {
      matches = [];
    } else if (scored[0].nameMatches === terms.length && terms.length > 0) {
      // Top result's NAME matches every word in the query — this is a
      // specific, near-exact lookup (e.g. "Diamond Solitaire Ring").
      // Only return products tied for that same strength of name match.
      const topNameMatches = scored[0].nameMatches;
      matches = scored
        .filter((s) => s.nameMatches === topNameMatches)
        .map((s) => s.product);
    } else {
      // Broader/browsing query (e.g. "something cozy") — return the
      // ranked list so the best matches come first.
      matches = scored.map((s) => s.product);
    }

    return {
      count: matches.length,
      products: matches.slice(0, 6),
    };
  },
});