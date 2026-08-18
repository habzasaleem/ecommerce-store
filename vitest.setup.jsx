import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));