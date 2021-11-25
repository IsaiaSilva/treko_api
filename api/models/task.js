import mongoose from 'mongoose';

let Task = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Oops! Title is required'],
        unique: true
    },
    //title: String,
    owner: {
        type: String,
        required: [true, 'Oops! Owner is required']
    },
    //owner: String,
    done: Boolean
});

export default mongoose.model('Task', Task);