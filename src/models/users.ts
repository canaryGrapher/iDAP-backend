import mongoose, { Model } from 'mongoose'

const UsersSchema = new mongoose.Schema({
    employeeId: String,
    password: String
})

const Users = mongoose.models.Users || mongoose.model("Journey", UsersSchema)

export default Users