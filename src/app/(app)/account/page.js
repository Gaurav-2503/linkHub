import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import UserNameForm from "@/components/forms/UserNameForm";
import Page from "@/models/page";
import mongoose from "mongoose";
import PageSettingForm from "@/components/forms/PageSettingForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinkForm from "@/components/forms/PageLinkForm";


const Accountpage = async ({searchParams , ...rest}) => {
  console.log(rest)
  const session = await getServerSession(authOptions); 
  const desiredUsername = searchParams.desiredUsername;



  if(!session) {  // if no-one is login then go to home page
    return redirect('/'); 
  }

  mongoose.connect(process.env.MONGO_URI);
  const pageDoc = await Page.findOne({owner:session.user.email});

  const page = JSON.parse(JSON.stringify(pageDoc));

  if(page) {  // if user alrady have taken username then show his account page to him instead of grab username form
    return (
      <div>
        <PageSettingForm page={page} user={session?.user} />
        <PageButtonsForm page={page} user={session?.user} />
        <PageLinkForm page={page} user={session?.user} />
      </div>
    );
  }

  return (
    <div>

      <UserNameForm desiredUsername={desiredUsername} />

    </div>
  );
}

export default Accountpage;