import { describe, it, expect, vi, beforeEach } from 'vitest'
import helpCrud from '../components/helpers/helpCrud'
import React from 'react'

global.fetch = vi.fn()
describe('helpCrud', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('realiza un GET correctamente', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'ok' })
    })
    const api = helpCrud()
    const res = await api.get('/tests')
    expect(fetch).toHaveBeenCalledWith(
      '/tests',
      expect.objectContaining({
        method: 'GET',
        headers: { accept: 'application/json' }
      })
    )
    expect(res).toEqual({ data: 'ok' })
  })
  it('realiza un POST con body serializado', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ created: true })
    })
    const api = helpCrud()
    const res = await api.post('/users', {
      body: { name: 'Jenny' }
    })
    expect(fetch).toHaveBeenCalledWith(
      '/users',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Jenny' }),
        headers: {
          accept: 'application/json'
        }
      })
    )
    expect(res).toEqual({ created: true })
  })
  it('maneja errores HTTP correctamente', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    })
    const api = helpCrud()
    const res = await api.get('/error')
    expect(res).toEqual({
      err: true,
      message: 'Network error'
    })
  })
  it('maneja timeout (AbortError)', async () => {
    fetch.mockRejectedValueOnce({
      name: 'AbortError'
    })
    const api = helpCrud()
    const res = await api.get('/timeout')
    expect(res).toEqual({
      err: true,
      message: 'Request timeout'
    })
  })
})