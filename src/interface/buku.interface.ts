import { Document } from "mongoose";

export interface IBuku extends Document {
    readonly name: string;
    readonly description: string;
    readonly types: string;
    readonly author: string;
}