import axios from 'axios';

export async function doPost(number: string) {
    const value = parseInt(number, 10);
    const response = await axios.post('/api/convert', {
        number: value
    });

    return response.data;
}
