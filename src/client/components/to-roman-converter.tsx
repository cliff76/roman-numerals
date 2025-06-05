import React, {useState} from 'react';
import {Button, Flex, Heading, TextField, View} from "@adobe/react-spectrum";

export default function ToRomanConverter() {
    const [value, setValue] = useState('');

    const handleInputChange = (value: string) => {
        setValue(value);
    };

    const handleClick = () => {
        if (value) {
            // navigate(`?number=${value}`);
        }
    };

    return (
        <View
            borderWidth="thin"
            borderColor="dark"
            borderRadius="medium"
            padding="size-500">
            <Flex direction={{ base: 'row', M: 'column'}} alignItems="start"
                  width="size-2400" margin="size-100" gap="size-100"
            >
                <title>Roman Numeral Converter</title>
                <Heading level={4}>Roman Numeral Converter</Heading>
                <TextField
                    marginBottom="size-150"
                    label="Enter a number"
                    type="text"
                    description="1-3999"
                    value={value}
                    onChange={handleInputChange}
                />
                <Button onPress={handleClick} variant="primary">Convert</Button>
            </Flex>
        </View>
    );
}