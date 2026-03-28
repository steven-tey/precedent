import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/layout/navbar'

describe('Navbar component', () => {
  it('should render logo and title', () => {
    render(<Navbar />)
    expect(screen.getByText('Precedent')).toBeInTheDocument()
  })

  it('should render sign in button when signed out', () => {
    render(<Navbar />)
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument()
  })

  it('should render user button when signed in', () => {
    render(<Navbar />)
    expect(screen.getByTestId('user-button')).toBeInTheDocument()
  })
})
