import React from 'react';
import { render } from '@testing-library/react';
import ApiError from './ApiError';

describe('ApiError Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ApiError message="Test message" />);

    expect(container).toBeInTheDocument();
  });

  it('render message', () => {
    const message = 'Test message';

    const el = render(<ApiError message={message} />);

    expect(el.getByText(message)).toBeInTheDocument();
  });
});
