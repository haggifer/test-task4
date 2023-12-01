import { validateRateInputValue } from "../../../utils/helpers/common";

describe('ExchangeTable', () => {
  it('properly validates rate edit input value', () => {
    expect(validateRateInputValue(8, 10)).toBe(false)
    expect(validateRateInputValue(9, 10)).toBe(true)
    expect(validateRateInputValue(10, 10)).toBe(true)
    expect(validateRateInputValue(11, 10)).toBe(true)
    expect(validateRateInputValue(12, 10)).toBe(false)
  })
})