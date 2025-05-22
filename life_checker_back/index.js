 // Expressの読み込み
const express = require("express");
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 // corsをインポート
const cors = require('cors')
 // corsをインポートして、アプリケーションに適用させる記述
app.use(cors({
 origin: 'http://localhost:5173',
 methods: ['GET', 'POST', 'PUT', 'DELETE'],
 credentials: true,
}));

app.get("/users",async(req,res) =>{
  try{
    const AllUsers = await prisma.users.findMany();
    res.json(AllUsers)
  }catch(error){
    console.log
  }
})
app.use(express.json());
 app.listen(3000, () => {
})

 console.log("listening on localhost 3000")