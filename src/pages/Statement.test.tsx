import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Statement from "./Statement";
import "react-router-dom";
import { mockContextValue } from "../utils/testUtils";
import GlobalContext from "../GlobalContext";

const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <GlobalContext.Provider value={mockContextValue}>
      {component}
    </GlobalContext.Provider>
  );
};

//render the document
describe("Statement Component", () => {
  beforeEach(() => {
    renderWithContext(<Statement />);
  });
  it("should display Past Statements", () => {
    expect(screen.getByText("Past Statements")).toBeInTheDocument();
  });
});
