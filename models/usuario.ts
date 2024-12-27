import { Schema, model, Document, Types} from "mongoose";

//Definicion de la Interfaz
interface IUsuario extends Document {
    email: string;
    password: string;
    estado: boolean;
    _id: Types.ObjectId;
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
estado: {
    type: Boolean,
    required: true,
    default: true, // No esta eliminado
}
});

// Exportar el modelo
export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);

