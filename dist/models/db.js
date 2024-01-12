"use strict";
// import mongoose from 'mongoose'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
// lib/dbConnect.tsx
const mongoose_1 = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
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
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cached.conn) {
            console.log('Cached connection: ' + cached.conn);
            return cached.conn;
        }
        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };
            cached.promise = (0, mongoose_1.connect)(MONGODB_URI, opts).then((mongoose) => {
                console.log('New connection: ' + mongoose.connection);
                return mongoose;
            });
        }
        try {
            cached.conn = yield cached.promise;
            console.log('Connection to mongoDB established');
        }
        catch (e) {
            cached.promise = null;
            throw e;
        }
        return cached.conn;
    });
}
exports.default = dbConnect;
//# sourceMappingURL=db.js.map