import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Transfer from "./Transfer";
import GlobalContext from "../GlobalContext";
import "@testing-library/jest-dom/vitest";

// Mock react-router-dom
vi.mock("react-router-dom", () => {
  return {
    useNavigate: () => navigateMock,
    HashRouter: (({ children }) => children) as typeof HashRouter,
  };
});

// Create navigate mock
const navigateMock = vi.fn();

const mockContextValue = {
  isLoggedIn: true,
  setIsLoggedIn: vi.fn(),
  activeTab: "Landing",
  setActiveTab: vi.fn(),
  isMenuOpen: false,
  setIsMenuOpen: vi.fn(),
  balance: 1000.0,
  setBalance: vi.fn(),
  transactions: [],
  setTransactions: vi.fn(),
};

const renderWithContext = (
  component: React.ReactNode,
  contextValue = mockContextValue
) => {
  return render(
    <GlobalContext.Provider value={contextValue}>
      <HashRouter>{component}</HashRouter>
    </GlobalContext.Provider>
  );
};

describe("Transfer Component", () => {
  //create global var for tests to access
  let container: HTMLElement;

  //SETUP
  beforeEach(() => {
    vi.clearAllMocks();
    const renderResult = renderWithContext(<Transfer />);
    container = renderResult.container; //set global var to renderResult.container
  });

  //TEARDOWN
  afterEach(() => {
    cleanup();
  });

  it("redirects to landing page when not logged in", () => {
    const notLoggedInContext = { ...mockContextValue, isLoggedIn: false };
    renderWithContext(<Transfer />, notLoggedInContext);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it('sets the active tab to "Transfer"', () => {
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Transfer");
  });

  it("renders transfer options correctly", () => {
    expect(screen.getByText("Transfer Money")).toBeDefined();
    expect(screen.getByText("Deposit")).toBeDefined();
    expect(screen.getByText("Withdraw")).toBeDefined();
  });

  it("renders deposit section with correct text", () => {
    expect(screen.getByText("Deposit money")).toBeDefined();
    expect(
      screen.getByText("Deposit funds into your bank account")
    ).toBeDefined();
  });

  it("renders withdraw section with correct text", () => {
    expect(screen.getByText("Withdraw money")).toBeDefined();
    expect(
      screen.getByText("Withdraw funds out of your bank account")
    ).toBeDefined();
  });

  it("navigates to deposit page when deposit option is clicked", () => {
    const depositSection = screen
      .getByText("Deposit money")
      .closest("div")?.parentElement;
    expect(depositSection).toBeDefined();
    if (depositSection) {
      fireEvent.click(depositSection);
      expect(navigateMock).toHaveBeenCalledWith("/transfer/deposit");
    }
  });

  it("navigates to withdraw page when withdraw option is clicked", () => {
    const withdrawSection = screen
      .getByText("Withdraw money")
      .closest("div")?.parentElement;
    expect(withdrawSection).toBeDefined();
    if (withdrawSection) {
      fireEvent.click(withdrawSection);
      expect(navigateMock).toHaveBeenCalledWith("/transfer/withdraw");
    }
  });

  it("renders icons correctly", () => {
    // Find the parent elements that contain both text and icon
    const depositSection =
      screen.getByText("Deposit money").parentElement?.parentElement;
    const withdrawSection =
      screen.getByText("Withdraw money").parentElement?.parentElement;

    // Get the icons within their respective sections
    const depositIcon = depositSection?.querySelector("i");
    const withdrawIcon = withdrawSection?.querySelector("i");

    // Add null checks before assertions
    expect(depositIcon).not.toBeNull();
    expect(withdrawIcon).not.toBeNull();

    // Check icon classes
    expect(depositIcon).toHaveClass("fa-solid", "fa-arrow-right");
    expect(withdrawIcon).toHaveClass("fa-solid", "fa-arrow-left");
  });

  it("renders with correct styling", () => {
    // Check main container styling
    expect(container.querySelector(".bg-stone-100")).toBeDefined();

    // Check card styling
    const card = screen.getByText("Transfer Money").closest(".bg-white");
    expect(card).toHaveClass("bg-white", "rounded-lg", "shadow-md");

    // Check clickable areas have hover cursor
    const clickableAreas = container.querySelectorAll(
      ".hover\\:cursor-pointer"
    );
    expect(clickableAreas.length).toBe(2);
  });
});
