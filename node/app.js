const express = require("express");
const mysql = require("mysql2");
//middleware of express which is used to interpret data sent in the body of HTTP requests
const bodyParser = require("body-parser");
//path is module native of node.js, is used for work with paths of files and folders
const path = require("path");

const app = express();

console.log("Diretório atual (__dirname):", __dirname);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_test_node"
});
db.connect((err) => {
    if(err){
      console.error("Erro ao conectar no banco:", err);
    }
    else{
      console.log("Conectado ao MySQL.");
    }
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/enviar", (req, res) => {
    const {nome , email} = req.body;
    const sql = "INSERT INTO infoUsers (nome, email) VALUES (?, ?)";

    db.query(sql, [nome, email], (err, result) => {
        if(err){
            console.error("Erro ao inserir:", err);
            return res.status(500).send(err);
        }
        else{
            res.redirect("/");
        }
    });
});

app.get("/user", (req, res) => {
    const sql = "SELECT * FROM infoUsers";

    db.query(sql, (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
            return res.status(500).send(err);
        }
        else{
            res.render("user.ejs", {
                user: result
            });
        }
    });
});

app.get("/user-info", (req, res) => {
    const sql = "SELECT * FROM infoUsers";

    db.query(sql, (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
            return res.status(500).send(err);
        }
        else{
            res.render("user-info.ejs", {
                user: result
            });
        }
    });
});

app.post("/user/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM infoUsers WHERE id = ?", [id], (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
        }
        else{
            res.redirect("/user");
        }
    })
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});