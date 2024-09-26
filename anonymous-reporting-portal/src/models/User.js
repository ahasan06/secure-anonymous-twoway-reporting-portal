import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email'],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin','moderator'],
        default: 'user',
    },
    isAcceptingReport: {
        type: Boolean,
        default: true, 
        required: function() {
            return this.role === 'admin';
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema)
export default UserModel