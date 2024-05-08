import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    const data = await restaurantSchema.find()
    console.log(data);
    return NextResponse.json({ result: true })
}
export async function POST(request) {
    let payload = await request.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    let result;
    let success = false;
    if (payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if (result) {
            success = true
        }
    } else {
        let restaurants = new restaurantSchema(payload)
        result = await restaurants.save()
        if (result) {
            success = true
        }
    }


    return NextResponse.json({ result, success: true })
}