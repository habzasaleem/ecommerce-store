## AI Tool: `findProducts`

**File:** `lib/tools/find-products.js`

### What it does
Lets the AI search the store's product catalog on the user's behalf, instead
of guessing or hallucinating what's in stock. The AI decides *when* to call
it based on the tool's `description` field, and extracts the input
parameters from the user's natural-language message.

### Input schema
| Field | Type | Required | Description |
|---|---|---|---|
| `query` | `string` | Yes | Free-text description of what the user wants (e.g. `"cozy blanket"`, `"cheap headphones"`). |
| `maxPrice` | `number` | No | Maximum price in USD, if the user mentioned a budget. |
| `category` | `string` | No | Category inferred from the user's words. Not restricted to a fixed list — the AI can pass anything it infers (e.g. `"toys"`), which lets the tool's error path be reachable through normal conversation. |

Schema is defined with [Zod](https://zod.dev) via `inputSchema` and validated
automatically by the AI SDK before `execute` ever runs.

### Return shape (success)
```ts
{
  count: number;      // total matches found
  products: Product[]; // up to 6 matches, each shaped as:
  // { id, name, price, originalPrice?, image, category, tags[], description }
}
```

### Error behavior
If the AI passes a `category` that isn't one this store actually carries
(`home`, `electronics`, `kitchen`, `apparel`), `execute` throws an `Error`
with a message listing the valid categories. This is a **reachable** failure
path — not a fake/simulated one — triggered by asking for something like
*"show me toys"* or *"find garden supplies."*

### UI states
The tool's 4 lifecycle states are rendered by
`components/ToolFindProductsDisplay.jsx`, each with distinct styling:

| State | Visual | Meaning |
|---|---|---|
| `input-streaming` | Gray box, bouncing dots | AI is still deciding what to search for |
| `input-available` | Indigo box, spinner | Search is running, shows the exact query/filters used |
| `output-available` | Product grid (`ProductGrid` component) | Real results rendered as cards, not JSON |
| `output-error` | Red box, warning icon | Search failed — shows the thrown error message |

### Example usage (from the assistant chat)
> "Find me something cozy under $30" → calls `findProducts({ query: "cozy", maxPrice: 30 })`
> "Show me toys" → calls `findProducts({ query: "toys", category: "toys" })` → throws → error card renders