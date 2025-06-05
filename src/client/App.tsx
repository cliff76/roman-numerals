import "./App.css";
import ToRomanConverter from "./components/to-roman-converter";
import {useEffect, useState} from "react";
import {defaultTheme, Provider} from "@adobe/react-spectrum";

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
            <ToRomanConverter/>
        </Provider>
    );}

export default App;
