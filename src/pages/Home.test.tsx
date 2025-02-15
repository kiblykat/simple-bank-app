import "@testing-library/jest-dom/vitest";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter, useNavigate } from "react-router-dom";
import Home from "./Home";
import GlobalContext from "../GlobalContext";

// Mock react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
    HashRouter: (({ children }) => children) as typeof HashRouter,
  };
});

// Create navigate mock
const navigateMock = vi.fn();

// Mock test data
const mockTransactions = [
  { date: "2024-02-15", amount: 100.5 },
  { date: "2024-02-14", amount: -50.25 },
  { date: "2024-02-13", amount: 75.0 },
];

const mockContextValue = {
  isLoggedIn: true,
  setActiveTab: vi.fn(),
  balance: 1000.0,
  transactions: mockTransactions,
};

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <GlobalContext.Provider value={mockContextValue}>
      <HashRouter>{component}</HashRouter>
    </GlobalContext.Provider>
  );
};

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    renderWithContext(<Home />);
    expect(screen.getByText("$1000.00")).toBeInTheDocument();
  });

  it("displays recent transactions", () => {
    renderWithContext(<Home />);
    expect(screen.getByText(/\+\$100\.50/)).toBeInTheDocument();
    expect(screen.getByText(/\-\$50\.25/)).toBeInTheDocument();
    expect(screen.getByText(/\+\$75\.00/)).toBeInTheDocument();
  });

  it('navigates to transfer page when "Transfer Funds" button is clicked', () => {
    renderWithContext(<Home />);
    const transferButton = screen.getByText("Transfer Funds");
    fireEvent.click(transferButton);
    expect(navigateMock).toHaveBeenCalledWith("/transfer");
  });

  it('sets the active tab to "Home"', () => {
    renderWithContext(<Home />);
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Home");
  });

  it("displays the correct number of recent transactions", () => {
    renderWithContext(<Home />);
    const rows = screen.getAllByRole("row");
    // +1 for header row
    expect(rows.length).toBe(mockTransactions.length + 1);
  });
});
