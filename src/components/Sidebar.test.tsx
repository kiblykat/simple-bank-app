import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Sidebar from "./Sidebar";
import GlobalContext from "../GlobalContext";
import { Tabs } from "../types/globalContextTypes";
import { mockContextValue } from "../utils/testUtils";

// Mock navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Sidebar", () => {
  const sidebarMockContextValue = {
    ...mockContextValue,
    isMenuOpen: false,
    activeTab: "Home" as Tabs,
  };

  const renderComponent = (contextOverrides = {}) => {
    const contextValue = { ...sidebarMockContextValue, ...contextOverrides };
    return render(
      <GlobalContext.Provider value={contextValue}>
        <Sidebar />
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
    renderComponent();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Transfer")).toBeInTheDocument();
    expect(screen.getByText("Statement")).toBeInTheDocument();
  });

  it("shows sidebar when isMenuOpen is true", () => {
    const { container } = renderComponent({ isMenuOpen: true });
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass("translate-x-0");
    expect(sidebar).not.toHaveClass("-translate-x-full");
  });

  it("hides sidebar when isMenuOpen is false", () => {
    const { container } = renderComponent({ isMenuOpen: false });
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass("-translate-x-full");
    expect(sidebar).not.toHaveClass("translate-x-0");
  });

  it("handles tab changes correctly", () => {
    renderComponent();

    // Test Home navigation
    fireEvent.click(screen.getByText("Home"));
    expect(sidebarMockContextValue.setActiveTab).toHaveBeenCalledWith("Home");
    expect(mockNavigate).toHaveBeenCalledWith("/home");
    expect(sidebarMockContextValue.setIsMenuOpen).toHaveBeenCalledWith(false);

    // Test Transfer navigation
    fireEvent.click(screen.getByText("Transfer"));
    expect(sidebarMockContextValue.setActiveTab).toHaveBeenCalledWith(
      "Transfer"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/transfer");
    expect(sidebarMockContextValue.setIsMenuOpen).toHaveBeenCalledWith(false);

    // Test Statement navigation
    fireEvent.click(screen.getByText("Statement"));
    expect(sidebarMockContextValue.setActiveTab).toHaveBeenCalledWith(
      "Statement"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/statement");
    expect(sidebarMockContextValue.setIsMenuOpen).toHaveBeenCalledWith(false);
  });

  it("is hidden on desktop view", () => {
    const { container } = renderComponent();
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass("md:hidden");
  });
});
