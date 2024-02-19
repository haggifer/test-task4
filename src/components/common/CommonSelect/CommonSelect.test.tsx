import React from 'react';
import { render } from '@testing-library/react';
import {
  CommonSelect,
  defaultStringSelectOption,
  ISelectOption,
} from './CommonSelect';

describe('CommonSelect Component', () => {
  const options: ISelectOption<string>[] = [
    defaultStringSelectOption,
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <CommonSelect
        value={defaultStringSelectOption}
        onChange={() => {}}
        options={options}
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it('applies custom styles', () => {
    const customStyles = {
      control: {
        backgroundColor: 'lightgray',
      },
    };

    const { container } = render(
      <CommonSelect
        value={defaultStringSelectOption}
        onChange={() => {}}
        options={options}
        styles={customStyles}
      />,
    );

    const controlElement = container.querySelector('.react-select__control');
    expect(controlElement).toHaveStyle('background-color: lightgray');
  });
});
