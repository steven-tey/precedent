import { describe, it, expect, vi } from 'vitest'
import { cn, timeAgo, fetcher, nFormatter, capitalize, truncate } from '@/lib/utils'

describe('cn function', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo', { bar: true })).toBe('foo bar')
    expect(cn('foo', { bar: false })).toBe('foo')
    expect(cn('foo', 'bar', 'foo')).toBe('foo bar foo')
  })
})

describe('timeAgo function', () => {
  it('should return "never" for invalid timestamp', () => {
    expect(timeAgo(null as unknown as Date)).toBe('never')
  })

  it('should return time ago string', () => {
    const now = Date.now()
    const oneMinuteAgo = new Date(now - 60 * 1000)
    expect(timeAgo(oneMinuteAgo)).toContain('1m')
    expect(timeAgo(oneMinuteAgo, true)).toBe('1m')
  })
})

describe('fetcher function', () => {
  it('should fetch data successfully', async () => {
    const mockData = { message: 'success' }
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    }) as unknown as typeof fetch

    const result = await fetcher('/api/test')
    expect(result).toEqual(mockData)
  })

  it('should throw error for failed request', async () => {
    const mockError = { error: 'Not found' }
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => mockError,
    }) as unknown as typeof fetch

    await expect(fetcher('/api/test')).rejects.toThrow('Not found')
  })

  it('should throw generic error for non-ok response without error message', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    }) as unknown as typeof fetch

    await expect(fetcher('/api/test')).rejects.toThrow('An unexpected error occurred')
  })
})

describe('nFormatter function', () => {
  it('should format numbers correctly', () => {
    expect(nFormatter(0)).toBe('0')
    expect(nFormatter(123)).toBe('123')
    expect(nFormatter(1000)).toBe('1K')
    expect(nFormatter(1234)).toBe('1.2K')
    expect(nFormatter(1234567)).toBe('1.2M')
    expect(nFormatter(1234567890)).toBe('1.2G')
  })

  it('should format with custom digits', () => {
    expect(nFormatter(1234, 2)).toBe('1.23K')
  })
})

describe('capitalize function', () => {
  it('should capitalize strings correctly', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('')).toBe('')
    expect(capitalize(null as unknown as string)).toBeNull()
    expect(capitalize(123 as unknown as string)).toBe(123)
  })
})

describe('truncate function', () => {
  it('should truncate strings correctly', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
    expect(truncate('hello', 10)).toBe('hello')
    expect(truncate('', 5)).toBe('')
  })
})
