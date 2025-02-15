import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import Tr_Deposit from "./Tr_Deposit";
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

describe("Tr_Deposit Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders deposit form correctly", () => {
    renderWithContext(<Tr_Deposit />);

    expect(screen.getByText("Deposit Amount")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
    expect(screen.getByText("Deposit")).toBeInTheDocument();
  });

  it("handles valid deposit amount", () => {
    renderWithContext(<Tr_Deposit />);

    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "100.50" } });

    const depositButton = screen.getByText("Deposit");
    fireEvent.click(depositButton);

    expect(mockContextValue.setBalance).toHaveBeenCalledWith(1100.5);
    expect(mockContextValue.setTransactions).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "$100.50 has been deposited to your account"
    );
    expect(navigateMock).toHaveBeenCalledWith("/transfer");
  });

  it("handles invalid deposit amount", () => {
    renderWithContext(<Tr_Deposit />);

    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "-50" } });

    const depositButton = screen.getByText("Deposit");
    fireEvent.click(depositButton);

    expect(toast.error).toHaveBeenCalledWith("Please enter a valid amount");
    expect(mockContextValue.setBalance).not.toHaveBeenCalled();
    expect(mockContextValue.setTransactions).not.toHaveBeenCalled();
  });

  it("handles non-numeric input", () => {
    renderWithContext(<Tr_Deposit />);

    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "abc" } });

    const depositButton = screen.getByText("Deposit");
    fireEvent.click(depositButton);

    expect(toast.error).toHaveBeenCalledWith("Please enter a valid amount");
    expect(mockContextValue.setBalance).not.toHaveBeenCalled();
    expect(mockContextValue.setTransactions).not.toHaveBeenCalled();
  });

  it("navigates back when back arrow is clicked", () => {
    renderWithContext(<Tr_Deposit />);

    //add data-testid to backbutton in main code- avoid querying by classname (brittle)
    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith("/transfer");
  });

  it("updates input value correctly", () => {
    renderWithContext(<Tr_Deposit />);

    const input = screen.getByPlaceholderText("0");
    fireEvent.change(input, { target: { value: "150.75" } });

    expect(input).toHaveValue("150.75");
  });
});
