import express from "express";

//Instantiate an Express application
const app = express();


app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


const PORT = 3000;

app.get('/', (req, res) => {
    res.render('home');
});





app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});