import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Landing from "./Landing";
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

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <GlobalContext.Provider value={mockContextValue}>
      {component}
    </GlobalContext.Provider>
  );
};

// Mock the SlideInText component
vi.mock("../components/SlideInText", () => ({
  SlideInText: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Landing Component", () => {
  //SETUP
  beforeEach(() => {
    vi.clearAllMocks();
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    renderWithContext(<Landing />);
  });

  //TEARDOWN
  afterEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    expect(screen.getByText("GIC Banking")).toBeInTheDocument();
    expect(screen.getByText("Fast, secure")).toBeInTheDocument();
    expect(screen.getByText("and trusted.")).toBeInTheDocument();
  });

  it('displays the "Get Started" button', () => {
    const button = screen.getByRole("button", { name: /get started/i });
    expect(button).toBeInTheDocument();
  });

  it('handles login correctly when "Get Started" is clicked', () => {
    const button = screen.getByRole("button", { name: /get started/i });

    fireEvent.click(button);

    expect(mockContextValue.setIsLoggedIn).toHaveBeenCalledWith(true);
    expect(mockContextValue.setActiveTab).toHaveBeenCalledWith("Home");
    expect(navigateMock).toHaveBeenCalledWith("/home");
  });

  it("renders all SlideInText components with correct content", () => {
    expect(screen.getByText("GIC Banking")).toHaveClass(
      "font-bold",
      "mb-5",
      "text-lg"
    );
    expect(screen.getByText("Fast, secure")).toHaveClass(
      "text-6xl",
      "font-bold",
      "text-navy-900"
    );
    expect(screen.getByText("and trusted.")).toHaveClass(
      "text-6xl",
      "font-bold",
      "text-navy-900"
    );
  });
});
