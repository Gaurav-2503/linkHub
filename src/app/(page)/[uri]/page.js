import { allButton } from "@/components/forms/PageButtonsForm";
import { Event } from "@/models/event";
import Page from "@/models/page";
import { User } from "@/models/users";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

const btnIcons = {
  email: faEnvelope,
  mobile: faMobile,
  linkedin: faLinkedin,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  telegram: faTelegram,
  github: faGithub,
};

function buttonLink(key, value) {
  if(key === 'mobile') {
    return 'tel:' + value;
  }

  if(key === 'email') {
    return 'mailto:'+ value;
  }

  return value;
}

const Userpage = async ({ params }) => {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });

  await Event.create({
    uri:uri,
    type:'view'
  })

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div
        className="h-48 bg-gray-400  bg-cover bg-center "
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>

      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className=" rounded-full w-full h-full object-cover"
          src={user.image}
          alt="avatar"
          width={265}
          height={256}
        />
      </div>

      <h2 className="text-2xl text-center mb-2">{page.displayName}</h2>

      <h2 className="text-md flex gap-2 justify-center items-center text-white/60">
        <FontAwesomeIcon icon={faLocationDot} className="h-5" />
        <span>{page.location}</span>
      </h2>

      <div className="max-w-xs mx-auto text-center my-2 text-white/80">
        <p>{page.bio}</p>
      </div>

      <div className="flex gap-2 justify-center pb-4 mt-4">
        {Object.keys(page.buttons).map((btnKey) => (
          <Link
            href={buttonLink(btnKey, page.buttons[btnKey])}
            key={btnKey}
            className="rounded-full border border-white p-2 flex items-center justify-center bg-white"
          >
            <FontAwesomeIcon
              className="w-5 h-5 text-blue-950"
              icon={btnIcons[btnKey]}
            />
          </Link>
        ))}
      </div>

      <div className="max-w-xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
        {page.links.map((link) => (
          <Link 
            // btoa = base 64 encoding function , we have to decode it at backend
            ping={process.env.URL+"api/click?url=" + btoa(link.url)}
            target="_blank"
            className="bg-indigo-900 p-2  flex items-center"
            href={link.url}
            key={link.key}
          >
            <div className="bg-blue-500 aspect-square relative -left-5 w-16 h-16 rounded-md inline-flex items-center justify-center">
              {link.icon && (
                <Image
                  className="object-cover w-full h-full rounded-md"
                  alt="Icon"
                  src={link.icon}
                  width={64}
                  height={64}
                />
              )}
              {!link.icon && (
                <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
              )}
            </div>

            <div className="flex items-center justify-center">
              <div>
                <h3>{link.title}</h3>
                <h3 className="text-white/50 h-6 overflow-hidden">
                  {link.subtitle}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Userpage;
