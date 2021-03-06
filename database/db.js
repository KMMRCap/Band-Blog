import mongoose from 'mongoose'

export default async function connectToDb() {
    if (mongoose.connection.readyState >= 1) return

    return mongoose.connect(process.env.MONGODB_URI)
}