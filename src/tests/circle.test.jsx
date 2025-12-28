import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Circle from '../components/atomic/Circle'
import React from 'react'

describe('Circle', () => {
  it('renderiza un div con el id proporcionado', () => {
    render(<Circle id="circle-1" />)
    const div = document.getElementById('circle-1')
    expect(div).toHaveAttribute('id', 'circle-1')
  })
})
