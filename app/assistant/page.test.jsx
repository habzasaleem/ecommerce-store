import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AssistantPage from "./page";

// We replace the real useChat hook with a fake one we fully control.
// This lets us force the component into "submitted", "streaming", or
// "error" states on demand, without ever touching the real /api/chat
// route or the network.
vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(),
}));

import { useChat } from "@ai-sdk/react";

// Small helper so each test only has to specify what's different
// from the "nothing happening yet" baseline.
function mockUseChat(overrides = {}) {
  useChat.mockReturnValue({
    messages: [],
    sendMessage: vi.fn(),
    status: "ready",
    error: null,
    stop: vi.fn(),
    regenerate: vi.fn(),
    ...overrides,
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AssistantPage", () => {
  test("shows starter suggestions when there are no messages yet", () => {
    mockUseChat({ messages: [] });
    render(<AssistantPage />);

    expect(
      screen.getByRole("button", { name: /find me something cozy under \$30/i })
    ).toBeInTheDocument();
  });

  test("clicking a suggestion sends it as a message", async () => {
    const sendMessage = vi.fn();
    mockUseChat({ messages: [], sendMessage });
    render(<AssistantPage />);

    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", { name: /show me electronics/i })
    );

    expect(sendMessage).toHaveBeenCalledWith({ text: "Show me electronics" });
  });

  test("renders a plain text message from the assistant", () => {
    mockUseChat({
      messages: [
        {
          id: "1",
          role: "assistant",
          parts: [{ type: "text", text: "Here are a few options for you." }],
        },
      ],
    });
    render(<AssistantPage />);

    expect(
      screen.getByText("Here are a few options for you.")
    ).toBeInTheDocument();
  });

  test("renders a tool result inside a message", () => {
    mockUseChat({
      messages: [
        {
          id: "1",
          role: "assistant",
          parts: [
            {
              type: "tool-findProducts",
              state: "output-available",
              input: { query: "blanket" },
              output: { count: 0, products: [] },
            },
          ],
        },
      ],
    });
    render(<AssistantPage />);

    expect(screen.getByText(/no products matched/i)).toBeInTheDocument();
  });

  test("shows a loading skeleton and a cancel option while submitted", () => {
    mockUseChat({ status: "submitted" });
    render(<AssistantPage />);

    expect(
      screen.getByRole("button", { name: /taking too long\? cancel/i })
    ).toBeInTheDocument();
  });

  test("disables the input and send button while streaming", () => {
    mockUseChat({ status: "streaming" });
    render(<AssistantPage />);

    expect(screen.getByPlaceholderText(/ask for a product/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /send/i })).toBeDisabled();
  });

  test("re-enables the input once the request finishes", () => {
    mockUseChat({ status: "ready" });
    render(<AssistantPage />);

    expect(screen.getByPlaceholderText(/ask for a product/i)).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /send/i })).not.toBeDisabled();
  });

  test("shows an error message with a working retry button", async () => {
    const regenerate = vi.fn();
    mockUseChat({ error: new Error("network down"), regenerate });
    render(<AssistantPage />);

    expect(
      screen.getByText(/something went wrong sending that message/i)
    ).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /retry/i }));

    expect(regenerate).toHaveBeenCalledTimes(1);
  });

  test("does not lock the input forever just because a request errored", () => {
    mockUseChat({ status: "ready", error: new Error("network down") });
    render(<AssistantPage />);

    // Regression test for the exact bug the code comments call out:
    // an error should not leave send/input permanently disabled.
    expect(screen.getByPlaceholderText(/ask for a product/i)).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /send/i })).not.toBeDisabled();
  });
});