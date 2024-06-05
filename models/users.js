import mongoose from "mongoose";
import links from "./links.js";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: "Israel Israeli"
    },
    email: String,
    password: String,
    link:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: links
    }],

});

export default mongoose.model("users", UserSchema);
