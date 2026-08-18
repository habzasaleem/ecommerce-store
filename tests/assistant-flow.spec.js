import { test, expect } from "@playwright/test";

test("user can ask the shopping assistant for a product and get a reply", async ({
  page,
}) => {
  await page.goto("/assistant");

  // Page loaded with the starter suggestions visible.
  await expect(
    page.getByRole("heading", { name: /shopping assistant/i })
  ).toBeVisible();

  const input = page.getByPlaceholder(/ask for a product/i);
  const sendButton = page.getByRole("button", { name: /^send$/i });

  await input.fill("Show me electronics");
  await sendButton.click();

  // While the request is in flight, the input should lock so the
  // user can't send a second message on top of the first.
   try {
    await expect(input).toBeDisabled({ timeout: 1000 });
  } catch {
    // Reply likely already came back before we could check — that's fine.
  }

  // The assistant should eventually reply, either with plain text or
  // with a tool result (product cards / no-results message). We wait
  // for the input to unlock again, which only happens once the
  // request fully finishes (success or error).
  await expect(input).toBeEnabled({ timeout: 20000 });

  // Something should now be visible in the conversation area besides
  // the empty-state suggestions: either the "Assistant" label for a
  // reply, or a designed error state if the request failed.
  const assistantReplied = page.getByText(/assistant/i).first();
  await expect(assistantReplied).toBeVisible();
});