import { Schema, model, Document, Types} from 'mongoose';

//Definicion de la Interfaz
interface Iorder extends Document {
    user:   Schema.Types.ObjectId;
    truck:  Schema.Types.ObjectId;
    status: string;
    pickup: Schema.Types.ObjectId;
    dropoff:Schema.Types.ObjectId;
    uid: Types.ObjectId;
}
//Schema
const OrderSchema = new Schema<Iorder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true,
    },
    truck:{
        type: Schema.Types.ObjectId,
        ref: 'Truck',
        required: true,
    },
    status:{
        type: String,
        enum: ['created', 'in transit', 'completed'],
        required:true,
    },
    pickup:{
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required:true,
    },
    dropoff:{
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required:true,
    }
});
// metodo para renombrar _id a uid y excluir __v
OrderSchema.methods.toJSON = function() {
    const { __v, _id, ...order } = this.toObject();
    order.uid = _id; // Renombramos _id a uid
    return order;
};
export const Order = model<Iorder>('Order', OrderSchema);