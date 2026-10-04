import { formatNumber, parseNumberInput } from './numbers'

describe('parseNumberInput', () => {
  it.each([
    ['19781.30', 19781.3],
    ['19 781,30', 19781.3],
    ['19 781,30 €', 19781.3],
    ['1.250.000,5', 1250000.5],
    ['1,250,000.5', 1250000.5],
    ['-1 250', -1250],
    ['− 42', -42],
    ['12,5 %', 12.5],
    ['.5', 0.5],
  ])('lit « %s »', (raw, expected) => {
    expect(parseNumberInput(raw)).toBeCloseTo(expected, 6)
  })

  it.each(['', 'abc', '12a', '1,2,3x', '--3'])('refuse « %s »', (raw) => {
    expect(parseNumberInput(raw)).toBeNull()
  })

  it('formate à la française', () => {
    expect(formatNumber(19781.3, 2).replace(/\s/g, ' ')).toBe('19 781,30')
  })
})
