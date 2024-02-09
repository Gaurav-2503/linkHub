import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/event";
import Page from "@/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const analyticsPage = async () => {

  mongoose.connect(process.env.MONGO_URI);

  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect('/');
  }
  
  const page = await  Page.findOne({owner: session?.user?.email});

  const viewCount = await Event.countDocuments({
    type: 'view',
    uri: page.uri
  })

  const clickCount = await Event.countDocuments({ type: 'click' , uri:page.links.map(l => l.url)})

  return (
    <div>
      <SectionBox>
          views = {viewCount} <br/>
          clicks = {clickCount}
      </SectionBox>
    </div>
  )
}

export default analyticsPage;