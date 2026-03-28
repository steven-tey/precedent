import '@testing-library/jest-dom'

vi.mock('@clerk/nextjs', () => {
  const React = require('react')
  
  const UserButtonLink = ({ label, href }: { label: string; href: string; labelIcon?: React.ReactNode }) => 
    React.createElement('a', { 'data-testid': 'user-button-link', href }, label)
  
  const UserButtonMenuItems = ({ children }: { children: React.ReactNode }) => 
    React.createElement('div', { 'data-testid': 'user-button-menu-items' }, children)
  
  const UserButton = ({ children }: { children: React.ReactNode }) => 
    React.createElement('div', { 'data-testid': 'user-button' }, children)
  
  UserButton.MenuItems = UserButtonMenuItems
  UserButton.Link = UserButtonLink
  
  return {
    ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
    SignedIn: ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'signed-in' }, children),
    SignedOut: ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'signed-out' }, children),
    SignInButton: ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'sign-in-button' }, children),
    UserButton,
    useAuth: () => ({
      isLoaded: true,
      isSignedIn: true,
      userId: 'test-user-id',
    }),
    useUser: () => ({
      isLoaded: true,
      user: {
        id: 'test-user-id',
        firstName: 'Test',
        lastName: 'User',
        fullName: 'Test User',
      },
    }),
  }
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
