import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ToRomanConverter from './to-roman-converter';

// Mock Adobe React Spectrum components
vi.mock('@adobe/react-spectrum', () => ({
  Button: ({ children, onPress, ...props }: any) => (
    <button onClick={onPress} {...props}>{children}</button>
  ),
  Flex: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Heading: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
  TextField: ({ label, value, onChange, description, ...props }: any) => (
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
  ),
  View: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

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

const renderComponent = () => {
  return render(<ToRomanConverter />);
};

describe('ToRomanConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    expect(button).not.toBeDisabled();
  });

  it('button is enabled by default', () => {
    renderComponent();
    
    const button = screen.getByRole('button', { name: 'Convert' });
    
    // Button should be enabled even with empty input based on current implementation
    expect(button).not.toBeDisabled();
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
