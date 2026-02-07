import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        productId: Number,
        title: String,
        price: Number,
        image: String,
        quantity: Number
      }
    ]
  },
  { timestamps: true } 
);

export default mongoose.model('Order', orderSchema);
