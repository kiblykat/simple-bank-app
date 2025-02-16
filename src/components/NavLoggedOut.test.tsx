import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import NavLoggedOut from "./NavLoggedOut";
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

describe("NavLoggedOut", () => {
  const LoggedOutContextValue = {
    ...mockContextValue,
    isLoggedIn: false,
    isMenuOpen: false,
  };

  const renderWithContext = () => {
    return render(
      <GlobalContext.Provider value={LoggedOutContextValue}>
        <NavLoggedOut />
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
    expect(screen.getByText("LOG IN")).toBeInTheDocument();
  });

  it("handles login button click correctly", () => {
    renderWithContext();
    const loginButton = screen.getByText("LOG IN");
    fireEvent.click(loginButton);

    expect(LoggedOutContextValue.setIsLoggedIn).toHaveBeenCalledWith(true);
    expect(LoggedOutContextValue.setActiveTab).toHaveBeenCalledWith("Home");
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  it("navigates to home page when logo is clicked", () => {
    renderWithContext();
    const logo = screen.getByRole("img");
    fireEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigation buttons are hidden when logged out", () => {
    renderWithContext();
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button.className).toContain("hidden");
    });
  });

  it("login button has correct styling", () => {
    renderWithContext();
    const loginButton = screen.getByText("LOG IN");
    expect(loginButton.className).toContain("border-2");
    expect(loginButton.className).toContain("rounded-full");
    expect(loginButton.className).toContain("hover:bg-white/20");
  });

  it("maintains responsive layout classes", () => {
    renderWithContext();
    const container = screen.getByText("LOG IN").closest(".flex");
    expect(container).toHaveClass("flex-col", "sm:flex-row");
  });

  it("logo has correct styling and attributes", () => {
    renderWithContext();
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "gic3.png");
    expect(logo.className).toContain("rounded-full");
    expect(logo.className).toContain("cursor-pointer");
  });
});
