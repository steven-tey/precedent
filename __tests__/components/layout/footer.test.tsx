import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/footer'

describe('Footer component', () => {
  it('should render project author information', () => {
    render(<Footer />)
    expect(screen.getByText(/A project by/)).toBeInTheDocument()
    expect(screen.getByText('Steven Tey')).toBeInTheDocument()
  })

  it('should render buy me a coffee link', () => {
    render(<Footer />)
    expect(screen.getByText('Buy me a coffee')).toBeInTheDocument()
  })
})
