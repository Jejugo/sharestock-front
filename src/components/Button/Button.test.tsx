import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    render(<Button text="Click Me" width={100} />)

    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toBeInTheDocument()
  })

  it('handles the onClick event', async () => {
    const handleClick = jest.fn()

    render(<Button text="Click Me" width={100} onClick={handleClick} />)
    const buttonElement = screen.getByText(/Click Me/i)
    await userEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders the button with the disabled attribute', () => {
    render(<Button text="Click Me" width={100} disabled={true} />)

    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toBeDisabled()
  })
})
