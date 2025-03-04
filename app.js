import express from "express";
import mariadb from "mariadb";
import { validateForm } from "./services/validation.js";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log('Connected to the database');
    return conn;
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  };
};
  

//Instantiate an Express application
const app = express();


app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


const PORT = 3000;

app.get('/', (req, res) => {
    res.render('home');
});

//entries route
app.get('/entries', async(req, res) =>{
 
        const conn = await connect();
 
        try {
            const posts = await conn.query('SELECT * FROM posts ORDER BY created_at DESC');
            
            // Return posts as JSON for now
            res.render('entries', {posts});
    
        } catch (err) {
            console.error("Error fetching posts:", err);
            res.status(500).send("Error fetching posts");
        } finally {
            conn.release();
        }

});
 
app.post('/submit', async(req,res) => {

    const newPost = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    };

    const result = validateForm(newPost);
    if(!result.isValid){
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    const conn= await connect();
    
    //console.log(newPost);
    const insertQuery = await conn.query(`INSERT INTO posts (
      author,
      title,
      content
      ) VALUES (?, ?,?)`,
       [newPost.author,
        newPost.title,
        newPost.content
      
    ]);
      
    res.render('confirmation', { newPost });
});

    

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});