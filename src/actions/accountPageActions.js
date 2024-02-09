'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/page";
import { User } from "@/models/users";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";


export async function  savePageSettings(formdata) {

    mongoose.connect(process.env.MONGO_URI);

    const session = await getServerSession(authOptions);

    if(session) {
        const page = await Page.findOne({owner:session?.user?.email});

        if(page) {

            const dataToUpdate = {};

            const dataKeys = [
              "displayname",
              "location",
              "bio",
              "bgType",
              "bgColor",
              'bgImage'
            ];

            for (const key of dataKeys) {
                if(formdata.has(key)) {
                  dataToUpdate[key] = formdata.get(key);
                }
            }            
            
            await Page.updateOne(
                {owner:session?.user?.email} ,
                dataToUpdate
            ); 

            if(formdata.has('avatar')) {
              const avatarLink = formdata.get("avatar");
              await User.updateOne(
                {email: session.user?.email},
                {image: avatarLink}
              )
            }

            return true;
        }

        return false;

    }
}

export async function savePageButtons(formData) {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);

  
  if(session) { 

    const buttonsValues = {};
    formData.forEach((value, key) => {
      buttonsValues[key] = value;
    })

    // console.log(buttonsValues)

    const dataToUpdate = { buttons : buttonsValues };
    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate); 

    return true;
  }
  return false;
}


export async function savePageLinks(links) {

   mongoose.connect(process.env.MONGO_URI);

    const session = await getServerSession(authOptions);

    if(session) {

        await Page.updateOne(
          {owner: session?.user?.email},
          {links},
        )
      
    }else {
      return false;
    }
}