import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import NavLoggedIn from "./NavLoggedIn";
import GlobalContext from "../GlobalContext";
import { mockContextValue } from "../utils/testUtils";

// Mock the router navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NavLoggedIn", () => {
  const renderWithContext = () => {
    return render(
      <GlobalContext.Provider value={mockContextValue}>
        <NavLoggedIn />
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
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("displays all navigation buttons when in desktop view", () => {
    renderWithContext();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Transfer")).toBeInTheDocument();
    expect(screen.getByText("Statement")).toBeInTheDocument();
    expect(screen.getByText("LOG OUT")).toBeInTheDocument();
  });

  it("toggles menu when burger button is clicked", () => {
    renderWithContext();
    const burgerButton = screen.getByRole("button", { name: "" }); // The burger button has no text
    fireEvent.click(burgerButton);
    expect(mockContextValue.setIsMenuOpen).toHaveBeenCalledWith(true);
  });

  it("navigates to correct route when tab is changed", () => {
    renderWithContext();

    // Test Transfer navigation
    fireEvent.click(screen.getByText("Transfer"));
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Transfer");
    expect(mockNavigate).toHaveBeenCalledWith("/transfer");

    // Test Statement navigation
    fireEvent.click(screen.getByText("Statement"));
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Statement");
    expect(mockNavigate).toHaveBeenCalledWith("/statement");
  });

  it("navigates to home page when logo is clicked", () => {
    renderWithContext();
    const logo = screen.getByRole("img");
    fireEvent.click(logo);
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Landing");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("logs out user when logout button is clicked", () => {
    renderWithContext();
    fireEvent.click(screen.getByText("LOG OUT"));
    expect(mockContextValue.setIsLoggedIn).toHaveBeenCalledWith(false);
  });
});
