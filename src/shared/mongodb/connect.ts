import {connect} from 'mongoose'

export async function connectMongo(){
    await connect(process.env.MONGO_URI);
}
