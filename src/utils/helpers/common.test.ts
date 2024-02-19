import { validateRateInputValue } from './common';

describe('validateRateInputValue', () => {
  it('should work properly', () => {
    const validCase1 = validateRateInputValue(0.91, 1);
    const validCase2 = validateRateInputValue(1.09, 1);
    const invalidCase1 = validateRateInputValue(0.89, 1);
    const invalidCase2 = validateRateInputValue(1.11, 1);

    expect(validCase1).toEqual(true);
    expect(validCase2).toEqual(true);
    expect(invalidCase1).toEqual(false);
    expect(invalidCase2).toEqual(false);
  });
});
