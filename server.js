const express=require("express");
const dotenv=require("dotenv");
const connectDatabase=require("./helpers/database/connectDatabase");
const routers = require("./routers"); //index.js ana dosya oldugu icin belirtilmese de olur
const customErrorHandler=require("./middlewares/errors/customErrorHandler");
const path=require("path");

dotenv.config({
    path:"./config/env/config.env"
});

connectDatabase();

const app=express();
//express - body middleware
app.use(express.json());

const PORT=process.env.PORT;
app.use("/api",routers);

app.get("/", (req,res) => {
    res.send("Hello Question Answer API -updated");
});

app.use(customErrorHandler);

app.use(express.static(path.join(__dirname,"public"))); //projemizin oldugu dizin ile public dosyasini birlestirdik su an  uploads/index.html sayfasina ulasilabilir

app.listen(PORT,()=>{
     console.log(`app started on ${PORT} and ${process.env.NODE_ENV}`);
})
