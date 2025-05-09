//Instalar "npm i express -E"
//instalar lo primero "npm init -y"
//instalar lo segundo "npm i express axios"
//Quitamos el caret ^
//instalar lo tercero "npm i cors -E" esto sirve para que pueda trabajar el servidor con el front dado que no se encuentran en el mismo orígen las carpetas

const express=require('express');//requerimos express para levantar nuestro servidor
const PORT=3000; //configuración del puerto
const URLUSERS='https://api-books-ac3j.onrender.com/users';//api de usuarios
const URLBOOKS='https://api-books-ac3j.onrender.com/books';//api de libros

const app=express(); //inicializamos el servidor
const axios=require('axios');//requerimos axios para el control de las solicitudes hhtp
const cors=require('cors');//requerimos cors permitir que una página web cargada en un dominio pueda acceder a recursos de otro dominio, cuando la política de "mismo origen" del navegador web por defecto no lo permitiría.

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/users',async(req,res)=>{
  try{
        const users= await axios.get(URLUSERS);//Obtenemos los datos de la api libros
        const userJson=users.data;
        if(userJson){
            const newUser=userJson.map(datas=>{
                const {nombre,apellidos,correo,coleccion,wishlist}=datas;
                const users={
                    nombre,
                    apellidos,
                    correo,
                    coleccion,
                    wishlist
                }
                return users
            })
            res.json(newUser); //pasamos los datos de los usuarios
        }else{
            res.status(404).json({mensaje:`error 404 al obtener la información del usuario`})//mensaje de error al obtener los datos de los usuarios
            res.status(500).json({error:`error 500 al obtener la información de la api de libros`});//mensaje de error al obtener los datos de la api    
        }
        
  }catch{
        res.status(404).json({mensaje:`error 404 al obtener la información del usuario`})//mensaje de error al obtener los datos de los usuarios
        res.status(500).json({error:`error 500 al obtener la información de la api de libros`});//mensaje de error al obtener los datos de la api
  }
})

app.get('/books',async(req,res)=>{//async
    try{
        const books=await axios.get(URLBOOKS);//Obtenemos los datos de la api libros
        const libJson=books.data;
        if(libJson){
            const newDatalibro=libJson.map(datas=>{
                const {titulo,autor,fechaPublicacion,imagen}=datas;
                const libros={
                    titulo,
                    autor,
                    fechaPublicacion,
                    imagen
                }
                return libros;
            })
            res.json(newDatalibro);//devolvemos los datos obtenidos
        }else{
            res.status(404).json({mensaje:`error 404 al obtener la información de los libros`})//mensaje de error al obtener los datos de los usuarios
            res.status(500).json({error:`error 500 al obtener la información de la api de libros`});//mensaje de error al obtener los datos de la api    
        }
        
    }catch{
        res.status(404).json({mensaje:`error 404 al obtener la información de los libros`})//mensaje de error al obtener los datos de los usuarios
        res.status(500).json({error:`error 500 al obtener la información de la api de libros`});//mensaje de error al obtener los datos de la api
    }
})

app.listen((PORT),()=>console.log(`Servidor activo en http://localhost:${PORT}`)); //levantamos el puerto del servidor
