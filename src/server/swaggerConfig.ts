import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Roman Numeral Converter API',
            version: '1.0.0',
            description: 'API for converting numbers to Roman numerals',
        },
        servers: [
            {
                url: '/api',
            },
        ],
    },
    apis: ['./src/server/routes/**/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
