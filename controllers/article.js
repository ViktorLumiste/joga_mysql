const con = require('../utils/db')

const getAllArticles = (req,res) => {
    let query = 'SELECT * FROM article';
    let articles = []
    con.query(query, (err,result)=>{
        if(err) throw err;
        articles = result
        console.log(articles)
        res.render('index', {
            articles:articles
        })
    })
}

const getArticleBySlug = (req,res)=>{
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
}

module.exports = {
    getAllArticles,
    getArticleBySlug
}