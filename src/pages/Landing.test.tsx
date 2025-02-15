import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Landing from "./Landing";
import GlobalContext from "../GlobalContext";
import { SlideInText } from "../components/SlideInText";

// Create navigate mock
const navigateMock = vi.fn();

// Mock react-router-dom
vi.mock("react-router-dom", () => {
  return {
    useNavigate: () => navigateMock,
    HashRouter: (({ children }) => children) as typeof HashRouter,
  };
});

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

// Mock the SlideInText component
vi.mock("../components/SlideInText", () => ({
  SlideInText: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock react-router-dom
vi.mock("react-router-dom", () => {
  return {
    useNavigate: () => navigateMock,
    HashRouter: (({ children }) => children) as typeof HashRouter,
  };
});

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <GlobalContext.Provider value={mockContextValue}>
      <HashRouter>{component}</HashRouter>
    </GlobalContext.Provider>
  );
};

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

// Separate test suite for SlideInText component
describe("SlideInText Component", () => {
  const IntersectionObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock IntersectionObserver
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  it("renders children correctly", () => {
    render(
      <SlideInText>
        <p>Test Content</p>
      </SlideInText>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
