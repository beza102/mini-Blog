import express from "express";
import mariadb from "mariadb";
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
 
app.post('/submit', async(req,res) => {

    const newPost = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    };

    const conn= await connect();
    
    //console.log(newPost);
    const orders = await conn.query(`INSERT INTO posts (
      author,
      title,
      content
      ) VALUES (?, ?,?)`,
       [ posts.author,
        posts.title,
        posts.content
      
      ]);
      
    res.render('confirmation', { post: newPost });
});

    

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});