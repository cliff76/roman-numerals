import "./App.css";
import ToRomanConverter from "./components/to-roman-converter";
import {useEffect, useState} from "react";
import {defaultTheme, Provider} from "@adobe/react-spectrum";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        // Listen for changes in system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setColorScheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <Provider theme={defaultTheme} colorScheme={colorScheme}>
            <QueryClientProvider client={new QueryClient()}>
                <ToRomanConverter/>
            </QueryClientProvider>
        </Provider>
    );}

export default App;
