import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema  = new Schema({
    title: String,
    body: String,
})

const userSchema = new Schema({
    username: String,
    password: String,
    notes:[noteSchema]
})

export default mongoose.model('User', userSchema);