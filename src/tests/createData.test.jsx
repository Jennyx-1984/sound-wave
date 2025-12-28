import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useCrud from '../components/helpers/createData'
import React from 'react'

const postMock = vi.fn()
vi.mock('../components/helpers/helpCrud', () => ({
  default: () => ({
    post: postMock
  })
}))
describe('useCrud', () => {
  const URL = 'http://localhost:3000/accounts'
  beforeEach(() => {
    postMock.mockReset()
  })
  it('crea un nuevo registro correctamente', async () => {
    const fakeResponse = { name: 'Jenny' }
    postMock.mockResolvedValue(fakeResponse)
    const { result } = renderHook(() => useCrud(URL))
    let response
    await act(async () => {
      response = await result.current.createData({ name: 'Jenny' })
    })
    expect(response).toEqual(fakeResponse)
    expect(postMock).toHaveBeenCalledTimes(1)
    expect(postMock.mock.calls[0][0]).toBe(URL)
    const bodySent = postMock.mock.calls[0][1].body
    expect(bodySent).toHaveProperty('id')
    expect(bodySent.name).toBe('Jenny')
  })

  it('maneja el error cuando la API falla', async () => {
    const errorResponse = { err: true }
    postMock.mockResolvedValue(errorResponse)
    const { result } = renderHook(() => useCrud(URL))
    let response
    await act(async () => {
      response = await result.current.createData({ name: 'Error test' })
    })
    expect(response).toEqual(errorResponse)
    expect(postMock).toHaveBeenCalled()
  })
})
