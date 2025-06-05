import { render } from "@testing-library/react";
import App from "./App";
import { vi } from 'vitest';

const mocks = vi.hoisted(() => {
    return {
        ToRomanConverter: vi.fn(() => {
            <div data-testid="to-roman-converter-mock">ToRomanConverter Mock</div>
        }),
        Provider: vi.fn(({ children }) => <div data-testid="provider-mock">{children}</div>),
    }
})

// Mock the Provider component from @adobe/react-spectrum
vi.mock('@adobe/react-spectrum', () => ({
    Provider: mocks.Provider,
    defaultTheme: { name: 'default' }, // Mock theme object
}));

// Mock the ToRomanConverter component
vi.mock('./components/to-roman-converter', () => ({
    default: mocks.ToRomanConverter,
}));

// Mock React's useState and useEffect
vi.mock('react', async () => {
    const actualReact = await vi.importActual('react');
    return {
        ...actualReact,
        useState: vi.fn((initialValue) => {
            return ['light', vi.fn()];
        }),
        useEffect: vi.fn(), // Mock useEffect to do nothing
    };
});

describe('App', () => {
    it('should render', () => {
        render(<App />);
        // Verify Provider is called with correct props
        expect(mocks.Provider).toHaveBeenCalledWith(
            expect.objectContaining({
                theme: { name: 'default' }, // defaultTheme mock
                colorScheme: 'light', // From useState mock
                children: expect.anything() // The child will be the ToRomanConverter mock
            }),
            undefined // No second argument expected here, as functional components receive a single props object
        );

        // Verify ToRomanConverter is called
        expect(mocks.ToRomanConverter).toHaveBeenCalled();

    });
});
