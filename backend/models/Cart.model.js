import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  items: [
    {
      productId: Number,   // FakeStore product id
      title: String,
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model('Cart', cartSchema);
