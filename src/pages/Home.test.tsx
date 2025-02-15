import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Home from "./Home";
import GlobalContext from "../GlobalContext";
import { mockContextValue } from "../utils/testUtils";

// Create navigate mock
const navigateMock = vi.fn();

// Mock react-router-dom
vi.mock("react-router-dom", () => {
  return {
    useNavigate: () => navigateMock,
  };
});

// Mock test data
const mockTransactions = [
  { date: new Date("2024-02-15"), amount: 100.5, balance: 1050.5 },
  { date: new Date("2024-02-14"), amount: -50.25, balance: 950.25 },
  { date: new Date("2024-02-13"), amount: 75.0, balance: 1025.25 },
  { date: new Date("2024-02-13"), amount: -25.25, balance: 1000.0 },
];

//create a new mock context value with 4 transactions
const newMockContextValue = {
  ...mockContextValue,
  transactions: mockTransactions,
};

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <GlobalContext.Provider value={newMockContextValue}>
      {component}
    </GlobalContext.Provider>
  );
};

describe("Home Component", () => {
  //SETUP prior to each test
  beforeEach(() => {
    vi.clearAllMocks();
    renderWithContext(<Home />);
  });

  //TEARDOWN previous tree render after each test
  afterEach(() => {
    cleanup();
  });

  it("redirects to landing page when not logged in", () => {
    const notLoggedInContext = { ...mockContextValue, isLoggedIn: false };
    render(
      <GlobalContext.Provider value={notLoggedInContext}>
        <Home />
      </GlobalContext.Provider>
    );
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("displays the correct balance", () => {
    expect(screen.getByText("$1000.00")).toBeInTheDocument();
  });

  it("displays 3 most recent transactions", () => {
    expect(screen.getByText("+$100.50")).toBeInTheDocument();
    expect(screen.getByText("-$50.25")).toBeInTheDocument();
    expect(screen.getByText("+$75.00")).toBeInTheDocument();
  });

  it('navigates to transfer page when "Transfer Funds" button is clicked', () => {
    const transferButton = screen.getByText("Transfer Funds");
    fireEvent.click(transferButton);
    expect(navigateMock).toHaveBeenCalledWith("/transfer");
  });

  it('ensures useEffect automatically sets the active tab to "Home" on render', () => {
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Home");
  });

  it("displays the correct number of recent transactions", () => {
    const rows = screen.getAllByRole("row"); //retrieves <tr> elements
    // cutoff at 3 for recent transactions, +1 for header row
    expect(rows.length).toBe(Math.min(mockTransactions.length, 3) + 1);
  });
});
