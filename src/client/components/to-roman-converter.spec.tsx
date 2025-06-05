import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, Mock, vi} from 'vitest';
import ToRomanConverter from './to-roman-converter';
import {doPost} from "../actions/do.post";
import * as ReactQuery from '@tanstack/react-query';

vi.mock('@tanstack/react-query')

// Mock Adobe React Spectrum components
const mocks = vi.hoisted(() => {
  return {
    reactSpectrum: {
      Button: vi.fn(({ children, onPress, isDisabled, ...props }: any) => (
          <button onClick={onPress} disabled={isDisabled} {...props}>{children}</button>
      )),
      Flex: vi.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
      Heading: vi.fn(({ children, ...props }: any) => <h4 {...props}>{children}</h4>),
      TextField: vi.fn(({ label, value, onChange, description, ...props }: any) => (
          <div>
            <label htmlFor="test-input">{label}</label>
            <input
                id="test-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
            {description && <div>{description}</div>}
          </div>
      )),
      Text: vi.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
      View: vi.fn(({ children, ...props }: any) => <div {...props}>{children}</div>)
    }
  };
})

vi.mock('@adobe/react-spectrum', () => mocks.reactSpectrum);

// Mock the useTranslation hook for testing
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'converter.title': 'Roman Numeral Converter',
        'converter.labelEnterNumber': 'Enter a number',
        'converter.descriptionRange': 'Enter a number between 1 and 3999',
        'converter.buttonConvert': 'Convert'
      };
      return translations[key] || key;
    }
  })
}));

vi.mock('../actions/do.post');

const renderComponent = () => {
  return render(<ToRomanConverter />);
};
const mutateMock = vi.fn();

describe('ToRomanConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(ReactQuery, 'useMutation').mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    } as any);
  });

  it('renders the component with all elements', () => {
    renderComponent();
    
    expect(screen.getByText('Roman Numeral Converter')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter a number')).toBeInTheDocument();
    expect(screen.getByText('Enter a number between 1 and 3999')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Convert' })).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Enter a number') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '42' } });
    
    expect(input.value).toBe('42');
  });

  it('handles empty input value', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Enter a number') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Convert' });
    
    fireEvent.click(button);
    
    expect(input.value).toBe('');
  });

  it('handles button click with valid input', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Enter a number');
    const button = screen.getByRole('button', { name: 'Convert' });
    
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);
    
    // Since the component doesn't currently implement navigation,
    // we just verify the click doesn't cause errors
    expect(button).toBeInTheDocument();
  });

  it('clears input when empty string is entered', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Enter a number') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
    
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });

  it('handles special characters in input', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Enter a number') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'abc123!@#' } });
    expect(input.value).toBe('abc123!@#');
  });

  it('renders with correct accessibility attributes', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Enter a number');
    const button = screen.getByRole('button', { name: 'Convert' });
    
    expect(input).toHaveAttribute('type', 'text');
    expect(button).toBeDisabled(); // Button is disabled when input is empty
  });

  it('button is disabled by default when input is empty', () => {
    renderComponent();
    
    const button = screen.getByRole('button', { name: 'Convert' });
    
    // Button should be disabled when input is empty
    expect(button).toBeDisabled();
  });

  it('maintains state across multiple input changes', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Enter a number') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '1' } });
    expect(input.value).toBe('1');
    
    fireEvent.change(input, { target: { value: '12' } });
    expect(input.value).toBe('12');
    
    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });
});

describe('ToRomanConverter behaviors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock useMutation
    vi.spyOn(ReactQuery, 'useMutation').mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    } as any);
  });

  it('configures a mutation call for the backend API', ()=> {
    renderComponent();

    expect(ReactQuery.useMutation).toHaveBeenCalledWith(expect.objectContaining({
      mutationFn: doPost,
      onSuccess: expect.any(Function),
      onError: expect.any(Function)
    }));

  });

  it('fires API request when the button is clicked', async () => {
    renderComponent();
    const input = screen.getByLabelText('Enter a number') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12' } });
    await waitFor(() => expect(input.value).toBe('12'));

    const button = screen.getByRole('button', { name: 'Convert' });
    fireEvent.click(button);
    expect(mutateMock).toHaveBeenCalledWith('12');
  });

  it('shows pending status while query executes', () => {
    (ReactQuery.useMutation as Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
      isError: false,
    } as any)
    renderComponent();
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('shows error status when query fails', () => {
    const errorMessage = 'Unknown error';
    (ReactQuery.useMutation as Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: true,
      error: new Error(errorMessage),
    } as any)
    renderComponent();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows result when query succeeds', () => {
    (ReactQuery.useMutation as Mock).mockReturnValue({
      mutate: mutateMock,
      isSuccess: true,
      isPending: false,
      isError: false,
      data: {converted: 'CXII'},
    } as any)
    renderComponent();
    const convertedResult = screen.getByTestId('converted-number');
    expect(convertedResult).toBeInTheDocument();
    expect(convertedResult.innerHTML).toEqual('CXII');
  });
});
