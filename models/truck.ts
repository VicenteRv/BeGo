import { Schema, model, Document, Types} from 'mongoose';

//Definicion de la Interfaz
interface ITruck extends Document {
    user: Schema.Types.ObjectId;
    year: string;
    color: string;
    plates: string;
    _id: Types.ObjectId;
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
    plates: {
        type: String,
        required: true 
    }
});

export const Truck = model<ITruck>('Truck', TruckSchema);

// export default Truck;