import { Event } from "@/models/event";
import mongoose from "mongoose";


export async function POST(req) {

    mongoose.connect(process.env.MONGO_URI);
    const url = new URL(req.url);

    const clickedLink = atob(url.searchParams.get("url"));
    // console.log(clickedLink)
    

    await Event.create({uri: clickedLink, type: 'click'});

    return Response.json(true);
}