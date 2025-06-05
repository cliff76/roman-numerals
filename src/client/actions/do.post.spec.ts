import {describe, it, expect, beforeEach, afterEach, vi, Mock} from 'vitest';
import axios from 'axios';
import { doPost } from './do.post';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);
const mockedAxiosPost = mockedAxios.post as Mock;

describe('doPost', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock console.log
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should successfully convert a valid number and return the response data', async () => {
        const mockResponse = {
            data: { converted: 'V' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        const result = await doPost('5');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: 5
        });
        expect(result).toEqual({ converted: 'V' });
    });

    it('should handle string numbers correctly by parsing them to integers', async () => {
        const mockResponse = {
            data: { converted: 'X' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        await doPost('10');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: 10
        });
    });

    it('should handle decimal strings by truncating to integer', async () => {
        const mockResponse = {
            data: { converted: 'VII' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        await doPost('7.9');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: 7
        });
    });

    it('should handle invalid number strings by sending NaN', async () => {
        const mockResponse = {
            data: { error: 'Invalid input' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        await doPost('invalid');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: NaN
        });
    });

    it('should handle empty string input', async () => {
        const mockResponse = {
            data: { error: 'Invalid input' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        await doPost('');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: NaN
        });
    });

    it('should handle axios errors and re-throw them', async () => {
        const mockError = new Error('Network error');
        mockedAxiosPost.mockRejectedValue(mockError);

        await expect(doPost('5')).rejects.toThrow('Network error');
        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: 5
        });
    });

    it('should handle response with undefined data', async () => {
        const mockResponse = {
            data: undefined
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        const result = await doPost('5');

        expect(result).toBeUndefined();
    });

    it('should handle response with null data', async () => {
        const mockResponse = {
            data: null
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        const result = await doPost('5');

        expect(result).toBeNull();
    });

    it('should handle large numbers', async () => {
        const mockResponse = {
            data: { converted: 'MMMCMXCIX' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        await doPost('3999');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: 3999
        });
    });

    it('should handle negative numbers', async () => {
        const mockResponse = {
            data: { error: 'Number out of range' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        await doPost('-5');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: -5
        });
    });

    it('should handle zero input', async () => {
        const mockResponse = {
            data: { converted: '' }
        };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        await doPost('0');

        expect(mockedAxios.post).toHaveBeenCalledWith('/api/convert', {
            number: 0
        });
    });
});
