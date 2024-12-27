import { Schema, model, Document} from "mongoose";

//Definicion de la Interfaz
interface IUsuario extends Document {
    email: string;
    password: string;
    isActive: boolean;
} 
//SCHEMA del usuario
const UsuarioSchema = new Schema<IUsuario>({
email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true, // para que no se repita el email
},
password: {
    type: String,
    required: [true, 'El password es obligatorio'],
},
isActive: {
    type: Boolean,
    required: true,
    default: true, // No esta eliminado
}
});
  
// Modificación para ocultar el campo _id y cambiarlo a uid
UsuarioSchema.methods.toJSON = function () {
const { __v, ...usuario } = this.toObject();
return usuario;
};

// Exportar el modelo
export default model<IUsuario>('Usuario', UsuarioSchema);
