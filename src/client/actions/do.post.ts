import axios from 'axios';

export async function doPost(number: string) {
    const response = await axios.post('/api/convert', {
        number: parseInt(number, 10)
    });

    return response.data;
}
