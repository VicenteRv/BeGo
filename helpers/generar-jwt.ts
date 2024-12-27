import jwt from "jsonwebtoken";

const generarJWT = (uid:string= '')=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY || '',{
            expiresIn: '6h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudeo generar el token')
            }else{
                resolve(token);
            }
        });
    })
}
export default generarJWT;