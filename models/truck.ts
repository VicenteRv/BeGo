import { Schema, model, Document, Types} from 'mongoose';

//Definicion de la Interfaz
interface ITruck extends Document {
    user: Schema.Types.ObjectId;
    year: string;
    color: string;
    plate: string;
    estado: boolean;
    uid: Types.ObjectId;
}
//Schema
const TruckSchema = new Schema<ITruck>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    },
    year: {
        type: String,
        required: true    
    },
    color: { 
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true,
        unique:true,
    },
    estado: {
        type: Boolean,
        required:true,
        default: true,
    }
});
// metodo para renombrar _id a uid y excluir __v
TruckSchema.methods.toJSON = function() {
    const { __v, _id, ...truck } = this.toObject();
    truck.uid = _id; // Renombramos _id a uid
    return truck;
};
export const Truck = model<ITruck>('Truck', TruckSchema);

// export default Truck;