import React from 'react';
import ExchangeConverter from './ExchangeConverter';
import { fireEvent, render } from '@testing-library/react';
import { exchangeData } from '../../../api/api';
import { IRate } from '../../../typescript/entities';

jest.mock('../../../stores/exchangeStore', () => {
  let mockData = [
    {
      ccy: 'CHF',
      base_ccy: 'UAH',
      buy: '41.26220',
      sale: '41.26220',
    },
    {
      ccy: 'CZK',
      base_ccy: 'UAH',
      buy: '1.63420',
      sale: '1.63420',
    },
    {
      ccy: 'GBP',
      base_ccy: 'UAH',
      buy: '45.87550',
      sale: '45.87550',
    },
    {
      ccy: 'ILS',
      base_ccy: 'UAH',
      buy: '9.82400',
      sale: '9.82400',
    },
    {
      ccy: 'JPY',
      base_ccy: 'UAH',
      buy: '0.24485',
      sale: '0.24485',
    },
    {
      ccy: 'NOK',
      base_ccy: 'UAH',
      buy: '3.40140',
      sale: '3.40140',
    },
    {
      ccy: 'PLZ',
      base_ccy: 'UAH',
      buy: '9.15860',
      sale: '9.15860',
    },
    {
      ccy: 'SEK',
      base_ccy: 'UAH',
      buy: '3.48460',
      sale: '3.48460',
    },
    {
      ccy: 'PLZ',
      base_ccy: 'EUR',
      buy: '1.23456',
      sale: '1.23456',
    },
  ];

  return {
    useExchangeStore: jest.fn(() => ({
      data: mockData,
      updateData: (newData: IRate[]) => {
        mockData = newData;
      },
    })),
  };
});

describe('ExchangeConverter', () => {
  it('render inputs and switcher', () => {
    const { getByLabelText, getByTestId } = render(<ExchangeConverter />);

    const firstInput = getByLabelText('Change');
    expect(firstInput).toBeInTheDocument();

    const secondInput = getByLabelText('Get');
    expect(secondInput).toBeInTheDocument();

    const swapButton = getByTestId('swap-button');
    expect(swapButton).toBeInTheDocument();
  });

  it('properly updates values on input change', () => {
    const { getByLabelText } = render(<ExchangeConverter />);

    const firstInput = getByLabelText('Change');
    const secondInput = getByLabelText('Get');

    fireEvent.change(firstInput, { target: { value: '10' } });
    expect(firstInput).toHaveValue('10');

    fireEvent.change(firstInput, { target: { value: `10q\'\",\`!@#$%^&*()` } });
    expect(firstInput).toHaveValue('10');

    fireEvent.change(secondInput, { target: { value: '20' } });
    expect(secondInput).toHaveValue('20');

    fireEvent.change(secondInput, {
      target: { value: `20q\'\",\`!@#$%^&*()` },
    });
    expect(secondInput).toHaveValue('20');
  });

  it('properly swaps values', () => {
    const { getByLabelText, getByTestId } = render(<ExchangeConverter />);

    const firstInput = getByLabelText('Change');
    const secondInput = getByLabelText('Get');
    const swapButton = getByTestId('swap-button');

    fireEvent.change(firstInput, { target: { value: '10' } });

    fireEvent.click(swapButton);

    expect(secondInput).toHaveValue('10');
  });
});
