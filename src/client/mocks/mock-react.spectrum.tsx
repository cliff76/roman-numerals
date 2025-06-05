// Mock Adobe React Spectrum components
import {vi} from "vitest";
import React from "react";

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