import mongoose from "mongoose";

//conceccion a la bd
const dbConnection = async () =>{
    //validar varEntorno
    const mongo = process.env.MONGODB;
    if(!mongo){
        throw new Error('La variablde de entorno no esta definida')
    }
    try {
        await mongoose.connect(process.env.MONGODB || '');
        console.log('Base de datos activa');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la bd');
    }
}

export default dbConnection;