import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Home from "./Home";
import GlobalContext from "../GlobalContext";

// Create navigate mock
const navigateMock = vi.fn();

// Mock react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
    HashRouter: (({ children }) => children) as typeof HashRouter,
  };
});

// Mock test data
const mockTransactions = [
  { date: new Date("2024-02-15"), amount: 100.5, balance: 1050.5 },
  { date: new Date("2024-02-14"), amount: -50.25, balance: 950.25 },
  { date: new Date("2024-02-13"), amount: 75.0, balance: 1025.25 },
];

const mockContextValue = {
  isLoggedIn: true,
  setIsLoggedIn: vi.fn(),
  activeTab: "Landing",
  setActiveTab: vi.fn(),
  isMenuOpen: false,
  setIsMenuOpen: vi.fn(),
  balance: 1000.0,
  setBalance: vi.fn(),
  transactions: mockTransactions,
  setTransactions: vi.fn(),
};

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <GlobalContext.Provider value={mockContextValue}>
      <HashRouter>{component}</HashRouter>
    </GlobalContext.Provider>
  );
};

describe("Home Component", () => {
  //ensure to setup prior to tests!!
  beforeEach(() => {
    vi.clearAllMocks();
    renderWithContext(<Home />);
  });

  //ensure to cleanup all previous tree renders!
  afterEach(() => {
    cleanup();
  });

  it("redirects to landing page when not logged in", () => {
    const notLoggedInContext = { ...mockContextValue, isLoggedIn: false };
    render(
      <GlobalContext.Provider value={notLoggedInContext}>
        <HashRouter>
          <Home />
        </HashRouter>
      </GlobalContext.Provider>
    );
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("displays the correct balance", () => {
    expect(screen.getByText("$1000.00")).toBeInTheDocument();
  });

  it("displays recent transactions", () => {
    expect(screen.getByText("+$100.50")).toBeInTheDocument();
    expect(screen.getByText("-$50.25")).toBeInTheDocument();
    expect(screen.getByText("+$75.00")).toBeInTheDocument();
  });

  it('navigates to transfer page when "Transfer Funds" button is clicked', () => {
    const transferButton = screen.getByText("Transfer Funds");
    fireEvent.click(transferButton);
    expect(navigateMock).toHaveBeenCalledWith("/transfer");
  });

  it('sets the active tab to "Home"', () => {
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Home");
  });

  it("displays the correct number of recent transactions", () => {
    const rows = screen.getAllByRole("row");
    // +1 for header row
    expect(rows.length).toBe(mockTransactions.length + 1);
  });
});
