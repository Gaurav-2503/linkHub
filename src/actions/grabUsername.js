'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const grabUsername = async (formdata) => {

    const username = formdata.get('username');

    mongoose.connect(process.env.MONGO_URI);

        const existingPageDoc = await Page.findOne({uri: username}); 
        
        if(existingPageDoc) {
            return false;
            // return redirect('/account?usernameTaken=1');
        } else {
            const session = await getServerSession(authOptions);
            const createdDoc = await Page.create({ 
                uri: username,
                owner : session?.user?.email
             });
            return JSON.parse(JSON.stringify(createdDoc));
            // return redirect('/account/' + username);
        }   
}

export default grabUsername