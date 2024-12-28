import { Schema, model, Document,Types} from 'mongoose';

//definicion de la interfaz
interface ILocation extends Document {
    address: string;
    place_id: string;
    latitude: number;
    longitude: number;
    uid: Types.ObjectId;
}
//Schema
const LocationSchema = new Schema<ILocation>({
    address:{
        type: String,
        required: true
    },
    place_id:{
        type: String,
        required: true,
        unique: true
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
});
// metodo para renombrar _id a uid y excluir __v cuando mandamos las res.json()
LocationSchema.methods.toJSON = function () {
    const { __v, _id, ...location } = this.toObject();
    location.uid = _id;  // Renombrar _id a uid
    return location;
};

export const Location = model<ILocation>('Location', LocationSchema);