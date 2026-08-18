import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotifyMeForm } from "./NotifyMeForm";

describe("NotifyMeForm", () => {
  test("renders an email input properly connected to its label", () => {
    render(<NotifyMeForm />);

    expect(
      screen.getByRole("textbox", { name: /notify me when back in stock/i })
    ).toBeInTheDocument();
  });

  test("shows a required error when submitted empty", async () => {
    const user = userEvent.setup();
    render(<NotifyMeForm />);

    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /email is required/i
    );
  });

  test("shows a format error for an invalid email", async () => {
    const user = userEvent.setup();
    render(<NotifyMeForm />);

    await user.type(
      screen.getByRole("textbox", { name: /notify me when back in stock/i }),
      "not-an-email"
    );
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /enter a valid email address/i
    );
  });

  test("shows a success message after a valid email is submitted", async () => {
    const user = userEvent.setup();
    render(<NotifyMeForm productName="Cozy Throw Blanket" />);

    await user.type(
      screen.getByRole("textbox", { name: /notify me when back in stock/i }),
      "shopper@example.com"
    );
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(
      await screen.findByText(
        /we'll email shopper@example.com when cozy throw blanket is back in stock/i
      )
    ).toBeInTheDocument();
  });

  test("clears the format error once a valid email is typed and resubmitted", async () => {
    const user = userEvent.setup();
    render(<NotifyMeForm />);

    const input = screen.getByRole("textbox", {
      name: /notify me when back in stock/i,
    });
    const button = screen.getByRole("button", { name: /notify me/i });

    await user.type(input, "not-an-email");
    await user.click(button);
    expect(await screen.findByRole("alert")).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "shopper@example.com");
    await user.click(button);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});