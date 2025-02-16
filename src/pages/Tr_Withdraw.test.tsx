import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import Tr_Withdraw from "./Tr_Withdraw";
import GlobalContext from "../GlobalContext";
import toast from "react-hot-toast";
import { mockContextValue } from "../utils/testUtils";
import "@testing-library/jest-dom/vitest";

// Mock react-router-dom
const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const renderWithContext = (
  component: React.ReactNode,
  contextValue = mockContextValue
) => {
  return render(
    <GlobalContext.Provider value={contextValue}>
      {component}
    </GlobalContext.Provider>
  );
};

describe("Tr_Withdraw Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders withdraw form correctly", () => {
    renderWithContext(<Tr_Withdraw />);

    expect(screen.getByText("Withdraw Amount")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
    expect(screen.getByText("Withdraw")).toBeInTheDocument();
  });

  it("handles valid withdraw amount", () => {
    renderWithContext(<Tr_Withdraw />);

    //mimic typing 100.50
    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "100.50" } });

    //mimic pressing Withdraw 100.50
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);

    expect(mockContextValue.setBalance).toHaveBeenCalledWith(899.5);
    expect(mockContextValue.setTransactions).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "$100.50 has been withdrawn from your account"
    );
    expect(navigateMock).toHaveBeenCalledWith("/transfer");
  });

  it("handles invalid withdraw amount (insufficient funds)", () => {
    renderWithContext(<Tr_Withdraw />);

    const withdrawAmount = mockContextValue.balance + 0.1;
    //withdrawn amount > balance
    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: String(withdrawAmount) } });

    //mimic pressing Withdraw
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);

    expect(mockContextValue.setBalance).not.toHaveBeenCalledWith(
      withdrawAmount
    );
    expect(mockContextValue.setTransactions).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Insufficient funds");
    expect(navigateMock).not.toHaveBeenCalledWith("/transfer");
  });

  it("handles invalid withdraw amount", () => {
    renderWithContext(<Tr_Withdraw />);

    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "-50" } });

    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);

    expect(toast.error).toHaveBeenCalledWith("Please enter a valid amount");
    expect(mockContextValue.setBalance).not.toHaveBeenCalled();
    expect(mockContextValue.setTransactions).not.toHaveBeenCalled();
  });

  it("handles non-numeric input", () => {
    renderWithContext(<Tr_Withdraw />);

    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "abc" } });

    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);

    expect(toast.error).toHaveBeenCalledWith("Please enter a valid amount");
    expect(mockContextValue.setBalance).not.toHaveBeenCalled();
    expect(mockContextValue.setTransactions).not.toHaveBeenCalled();
  });

  it("navigates back when back arrow is clicked", () => {
    renderWithContext(<Tr_Withdraw />);

    //add data-testid to backbutton in main code- avoid querying by classname (brittle)
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith("/transfer");
  });

  it("updates input value correctly", () => {
    renderWithContext(<Tr_Withdraw />);

    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "150.75" } });

    expect(input).toHaveValue("150.75");
  });
});
