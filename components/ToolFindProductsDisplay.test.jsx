import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolFindProductsDisplay } from "./ToolFindProductsDisplay";

describe("ToolFindProductsDisplay", () => {
  test("shows a thinking message while input is still streaming", () => {
    render(
      <ToolFindProductsDisplay
        part={{ state: "input-streaming", input: { query: "cozy blanket" } }}
      />
    );

    expect(
      screen.getByText(/thinking about what to search for/i)
    ).toBeInTheDocument();
  });

  test("shows a searching message once the tool call is running", () => {
    render(
      <ToolFindProductsDisplay
        part={{
          state: "input-available",
          input: { query: "cozy blanket", maxPrice: 30 },
        }}
      />
    );

    expect(screen.getByText(/searching products/i)).toBeInTheDocument();
    expect(screen.getByText(/under \$30/i)).toBeInTheDocument();
  });

  test("shows results when the search returns products", () => {
    render(
      <ToolFindProductsDisplay
        part={{
          state: "output-available",
          input: { query: "blanket" },
          output: {
            count: 2,
            products: [
              { id: "1", name: "Cozy Throw Blanket", price: 25 },
              { id: "2", name: "Fleece Blanket", price: 18 },
            ],
          },
        }}
      />
    );

        expect(screen.getByText(/found/i)).toBeInTheDocument();
    expect(screen.getByText("Cozy Throw Blanket")).toBeInTheDocument();
    expect(screen.getByText("Fleece Blanket")).toBeInTheDocument();
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });

  test("shows a no-results message when the search returns nothing", () => {
    render(
      <ToolFindProductsDisplay
        part={{
          state: "output-available",
          input: { query: "unobtainium", maxPrice: 5 },
          output: { count: 0, products: [] },
        }}
      />
    );

    expect(
      screen.getByText(/no products matched "unobtainium" under \$5/i)
    ).toBeInTheDocument();
  });

  test("shows an error message when the tool fails", () => {
    render(
      <ToolFindProductsDisplay
        part={{ state: "output-error", errorText: "Catalog service timed out" }}
      />
    );

    expect(screen.getByText(/search didn't work/i)).toBeInTheDocument();
    expect(screen.getByText(/catalog service timed out/i)).toBeInTheDocument();
  });

  test("falls back to a generic error message when no errorText is given", () => {
    render(<ToolFindProductsDisplay part={{ state: "output-error" }} />);

    expect(
      screen.getByText(/something went wrong while searching the catalog/i)
    ).toBeInTheDocument();
  });
});