import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    originalUrl: String,
    clicks: [
        {
            insertedAt: Date,
            ipAddress: String,
            targetParamValue: String
        }
    ],
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    targetParamName:String,
    targetValues: [{
        name: String,
        value: String
    }
    ]
});

export default mongoose.model("links", LinkSchema);
