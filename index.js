const express = require('express')
const app = express()

const path = require('path')
const hbs = require('express-handlebars')
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

app.use(express.static('public'))

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

var con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"qwerty",
    database: "joga_mysql",
})

con.connect(function(err){
    if(err) throw err;
    console.log("connected to joga_mysql db")
})
app.get('/', (req,res) =>{
    let query = 'SELECT * FROM article';
    let articles = []
    con.query(query, (err,result)=>{
        if(err) throw err;
        articles = result
        res.render('index', {
            articles:articles
        })
    })
})

app.use('/article/:slug', (req,res) =>{
    let query = `SELECT *, article.name as article_name, author.name as author_name FROM article JOIN author on article.author_id = author.id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) =>{
        if(err) throw err;
        article = result
        console.log(article)
        res.render('article',{
            article:article
        })
    })
})

app.listen(3000, () =>{
    console.log("App is started at http://localhost:3000")
    })