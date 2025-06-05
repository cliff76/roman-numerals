import React, {useState} from 'react';
import {Button, Flex, Heading, TextField, View} from "@adobe/react-spectrum";
import { useTranslation } from 'react-i18next';
import {doPost} from "../actions/do.post";
import {useMutation} from "@tanstack/react-query";

export default function ToRomanConverter() {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const handleInputChange = (value: string) => {
        setValue(value);
    };

    // Define the mutation for sending the text
    const sendNumberMutation = useMutation({
        mutationFn: doPost,
        onSuccess: (data) => {},
        onError: (error) => {}
    });

    const handleClick = () => {
        sendNumberMutation.mutate(value)
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
                <title>{t('converter.title')}</title>
                <Heading level={4}>{t('converter.title')}</Heading>
                <TextField
                    marginBottom="size-150"
                    label={t('converter.labelEnterNumber')}
                    type="text"
                    description={t('converter.descriptionRange')}
                    value={value}
                    onChange={handleInputChange}
                />
                <Button onPress={handleClick} variant="primary">{t('converter.buttonConvert')}</Button>
            </Flex>
        </View>
    );
}
