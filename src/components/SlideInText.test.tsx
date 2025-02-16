import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { SlideInText } from "./SlideInText";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReset();
  mockObserve.mockReset();
  mockUnobserve.mockReset();

  mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: vi.fn(),
  });

  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
});

describe("SlideInText", () => {
  const renderComponent = (props = {}) => {
    return render(
      <SlideInText {...props}>
        <p>Test Content</p>
      </SlideInText>
    );
  };

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("initializes with correct default classes", () => {
    const { container } = renderComponent();
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("transform");
    expect(element).toHaveClass("-translate-y-full");
    expect(element).toHaveClass("opacity-0");
    expect(element).toHaveClass("transition-all");
    expect(element).toHaveClass("duration-1000");
    expect(element).toHaveClass("ease-out");
  });

  it("creates IntersectionObserver with correct threshold", () => {
    renderComponent();
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 }
    );
  });

  it("observes the element on mount", () => {
    renderComponent();
    expect(mockObserve).toHaveBeenCalled();
  });

  it("unobserves the element on unmount", () => {
    const { unmount } = renderComponent();
    unmount();
    expect(mockUnobserve).toHaveBeenCalled();
  });

  it("adds correct classes when element intersects with delay", async () => {
    vi.useFakeTimers();
    const delay = 500;
    const { container } = renderComponent({ delay });

    // Simulate intersection
    const [[callback]] = mockIntersectionObserver.mock.calls;
    callback([{ isIntersecting: true, target: container.firstChild }]);

    // Fast-forward past the delay
    await vi.advanceTimersByTimeAsync(delay);

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("translate-y-0");
    expect(element).toHaveClass("opacity-100");
    expect(element).not.toHaveClass("-translate-y-full");
    expect(element).not.toHaveClass("opacity-0");

    vi.useRealTimers();
  });

  it("respects custom delay prop", async () => {
    vi.useFakeTimers();
    const delay = 1000;
    const { container } = renderComponent({ delay });

    // Simulate intersection
    const [[callback]] = mockIntersectionObserver.mock.calls;
    callback([{ isIntersecting: true, target: container.firstChild }]);

    // Check that classes haven't changed before delay
    await vi.advanceTimersByTimeAsync(500);
    const elementBeforeDelay = container.firstChild as HTMLElement;
    expect(elementBeforeDelay).toHaveClass("-translate-y-full");
    expect(elementBeforeDelay).toHaveClass("opacity-0");

    // Fast-forward past the delay
    await vi.advanceTimersByTimeAsync(500);
    const elementAfterDelay = container.firstChild as HTMLElement;
    expect(elementAfterDelay).toHaveClass("translate-y-0");
    expect(elementAfterDelay).toHaveClass("opacity-100");

    vi.useRealTimers();
  });

  it("renders children correctly", () => {
    render(
      <SlideInText>
        <div data-testid="custom-child">Custom Child Content</div>
      </SlideInText>
    );
    expect(screen.getByTestId("custom-child")).toBeInTheDocument();
    expect(screen.getByText("Custom Child Content")).toBeInTheDocument();
  });

  it("does not trigger animation when not intersecting", async () => {
    vi.useFakeTimers();
    const { container } = renderComponent();

    // Simulate non-intersection
    const [[callback]] = mockIntersectionObserver.mock.calls;
    callback([{ isIntersecting: false, target: container.firstChild }]);

    // Fast-forward time
    await vi.advanceTimersByTimeAsync(1000);

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("-translate-y-full");
    expect(element).toHaveClass("opacity-0");
    expect(element).not.toHaveClass("translate-y-0");
    expect(element).not.toHaveClass("opacity-100");

    vi.useRealTimers();
  });
});
