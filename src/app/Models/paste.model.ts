import { Schema, model, Document } from 'mongoose'
import shortid from 'shortid'

const Paste = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    paste: { type: String },
    syntax: {
        type: String,
        default: "text"
    },
    expiresAt: {
        type: Date,
        expires: 0,
        default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    },
}, {
    timestamps: true
})

export type IPaste = Document & {
    _id: string,
    paste: string,
    syntax: string,
    expiresAt: Date,
    timestamps: Date
}

export default model<IPaste>('Paste', Paste)
