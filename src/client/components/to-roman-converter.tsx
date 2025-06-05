import React, {useState} from 'react';
import {Button, Flex, Heading, Text, TextField, View} from "@adobe/react-spectrum";
import { useTranslation } from 'react-i18next';
import {doPost} from "../actions/do.post";
import {useMutation} from "@tanstack/react-query";

export default function ToRomanConverter() {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [error, setError] = useState<string|null>(null);
    function validateInput(value: string) {
        if (value.length === 0)
            return null;
        const errorMessage = t('error.inputNotInteger');
        try {
            const result = parseInt(value, 10);
            if (Number.isNaN(result)) {
                setError(errorMessage);
                return errorMessage
            }
        } catch (e) {
            setError(errorMessage);
            return errorMessage
        }
        setError(null);
    }

    const handleInputChange = (value: string) => {
        setValue(value);
    };

    // Define the mutation for sending the text
    const sendNumberMutation = useMutation({
        mutationFn: doPost,
        onSuccess: (_) => {},
        onError: (error) => {
            console.log('Error caught!', error);
        }
    });

    const handleClick = () => {
        sendNumberMutation.mutate(value)
    };

    function disableConvert() {
        return value.length < 1 || error != null || sendNumberMutation.isPending;
    }

    return (
        <View
            borderWidth="thin"
            borderColor="dark"
            borderRadius="medium"
            padding="size-500">
            <Flex direction={{ base: 'row', M: 'column'}} alignItems="start"
                  width="size-2400" margin="size-100" gap="size-100"
            >
                <title>{t('converter.title')}</title>
                <Heading level={4}>{t('converter.title')}</Heading>
                <TextField
                    validate={validateInput}
                    marginBottom="size-150"
                    label={t('converter.labelEnterNumber')}
                    type="text"
                    description={t('converter.descriptionRange')}
                    value={value}
                    onChange={handleInputChange}
                />
                <Button onPress={handleClick} variant="primary" isDisabled={disableConvert()}>
                    {sendNumberMutation.isPending ? t('loading') : t('converter.buttonConvert')}
                </Button>
                {
                    sendNumberMutation.isError &&
                    <Text>
                        {sendNumberMutation?.error?.message}
                    </Text>
                }
                {
                    sendNumberMutation.isSuccess &&
                    <Text data-testid="converted-number">
                        {sendNumberMutation?.data?.converted}
                    </Text>
                }
            </Flex>
        </View>
    );
}
