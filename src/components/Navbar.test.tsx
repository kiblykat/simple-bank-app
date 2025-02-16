import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Navbar from "./Navbar";
import GlobalContext from "../GlobalContext";
import { mockContextValue } from "../utils/testUtils";

// Mock child components with data-testid
vi.mock("./NavLoggedIn", () => ({
  default: () => <div data-testid="nav-logged-in">NavLoggedIn Component</div>,
}));

vi.mock("./NavLoggedOut", () => ({
  default: () => <div data-testid="nav-logged-out">NavLoggedOut Component</div>,
}));

describe("Navbar", () => {
  // Mock context values
  const notLoggedInContextValue = {
    ...mockContextValue,
    isLoggedIn: false,
    isMenuOpen: false,
  };

  //allow contextOverrride for testing loggedIn/loggedOut parameters
  const renderWithContext = (contextOverrides = {}) => {
    const contextValue = { ...notLoggedInContextValue, ...contextOverrides };
    return render(
      <GlobalContext.Provider value={contextValue}>
        <Navbar />
      </GlobalContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    renderWithContext();
    expect(screen.getByTestId("nav-logged-out")).toBeInTheDocument();
  });

  it("renders NavLoggedOut when user is logged out", () => {
    renderWithContext({ isLoggedIn: false });
    expect(screen.getByTestId("nav-logged-out")).toBeInTheDocument();
    expect(screen.queryByTestId("nav-logged-in")).not.toBeInTheDocument();
  });

  it("renders NavLoggedIn when user is logged in", () => {
    renderWithContext({ isLoggedIn: true });
    expect(screen.getByTestId("nav-logged-in")).toBeInTheDocument();
    expect(screen.queryByTestId("nav-logged-out")).not.toBeInTheDocument();
  });
});
