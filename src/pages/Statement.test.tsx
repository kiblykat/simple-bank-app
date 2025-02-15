import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Statement from "./Statement";
import "react-router-dom";
import { mockContextValue } from "../utils/testUtils";
import GlobalContext from "../GlobalContext";
import { GlobalContextType } from "../types/globalContextTypes";
import { formatDate } from "../utils/utils";

const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

// Mock test data
const mockTransactions = [
  { date: new Date("2024-02-16"), amount: 100.5, balance: 1050.5 },
  { date: new Date("2024-02-15"), amount: -50.25, balance: 950.25 },
  { date: new Date("2024-02-14"), amount: 75.0, balance: 1025.25 },
  { date: new Date("2024-02-13"), amount: -25.25, balance: 1000.0 },
];

const newMockContextValue: GlobalContextType = {
  ...mockContextValue,
  transactions: mockTransactions,
};

const renderWithContext = (
  component: React.ReactNode,
  context: GlobalContextType
) => {
  return render(
    <GlobalContext.Provider value={context}>{component}</GlobalContext.Provider>
  );
};

//render the document
describe("Statement Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should display Past Statements", () => {
    renderWithContext(<Statement />, newMockContextValue);

    expect(screen.getByText("Past Statements")).toBeInTheDocument();
  });

  it("should display correct number of rows", () => {
    renderWithContext(<Statement />, newMockContextValue);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(mockTransactions.length + 1); //+1 for header
  });

  it("redirects to landing page when not logged in", () => {
    const notLoggedInContext = { ...mockContextValue, isLoggedIn: false };
    renderWithContext(<Statement />, notLoggedInContext);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it('sets the active tab to "Statement" on mount', () => {
    renderWithContext(<Statement />, newMockContextValue);
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Statement");
  });

  it("displays past statements title", () => {
    renderWithContext(<Statement />, newMockContextValue);
    expect(screen.getByText("Past Statements")).toBeInTheDocument();
  });

  it("renders transactions correctly", () => {
    renderWithContext(<Statement />, newMockContextValue);
    // Ensure all transaction dates are displayed
    mockTransactions.forEach((transaction) => {
      expect(
        screen.getByText(formatDate(transaction.date))
      ).toBeInTheDocument();
    });

    // Ensure amounts and balance are displayed correctly
    expect(screen.getByText("+$100.50")).toBeInTheDocument();
    expect(screen.getByText("-$50.25")).toBeInTheDocument();
    expect(screen.getByText("+$75.00")).toBeInTheDocument();

    expect(screen.getByText("$1050.50")).toBeInTheDocument();
    expect(screen.getByText("$950.25")).toBeInTheDocument();
    expect(screen.getByText("$1025.25")).toBeInTheDocument();
  });

  it("applies the correct text color class based on amount", () => {
    renderWithContext(<Statement />, newMockContextValue);

    const positiveAmount = screen.getByText("+$100.50");
    const negativeAmount = screen.getByText("-$50.25");

    expect(positiveAmount).toHaveClass("text-success");
    expect(negativeAmount).toHaveClass("text-error");
  });
});
