// import mongoose from 'mongoose'

// const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
// lib/dbConnect.tsx

import _mongoose, { connect } from "mongoose";

declare global {
    var mongoose: {
        promise: ReturnType<typeof connect> | null;
        conn: typeof _mongoose | null;
    };
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        console.log('Cached connection: ' + cached.conn)
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = connect(MONGODB_URI!, opts).then((mongoose) => {
            console.log('New connection: ' + mongoose.connection);
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log('Connection to mongoDB established')
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;