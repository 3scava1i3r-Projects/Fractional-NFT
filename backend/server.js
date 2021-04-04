import express from 'express';


const app = express();

app.get('/' , (req,res) => {
    res.send('Server is ready');
});

const port = process.env.port || 5000;
app.listen(port , () => {
    console.log(`Serve at local at ${port}`);
});