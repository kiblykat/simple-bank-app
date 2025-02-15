import { vi } from "vitest";

export const mockContextValue = {
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
