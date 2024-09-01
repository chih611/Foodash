import express from 'express';
// dotenv.config({ path: `.env.${process.env.NODE_ENV}`,encoding: 'utf8',debug:true});
import item from './models/item.js';
import openapi from './openapi.js';

const port = process.env.SEVER_PORT;

const app = express();

// Connect App routes
app.use('/api-docs', openapi);
app.use('/items', item);
app.use('*', (_, res) => {
    res.redirect('/api-docs/items');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});