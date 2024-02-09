'use client'

import { faCloudArrowUp, faImage, faPalette, faSave, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioTogglers from "../formItems/RadioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";
import { savePageSettings } from "@/actions/accountPageActions";
import { upload } from "@/libs/upload";

const PageSettingForm =  ({page , user}) => {

  const [bgType , setBgType] = useState(page.bgType);
  const [bgColor , setBgColor] = useState(page.bgColor);
  const [bgImage , setBgImage] = useState(page.bgImage);
  const [avatar , setAvatar] = useState(user?.image);
  

  const uimg = user?.image;

  const saveBaseSettings = async (formdata) => {
      const result = await savePageSettings(formdata); 
     
      if(result) {
        toast.success("Saved")
      }
  } 

  const handelCoverImageChange = async (ev) => {

      await upload(ev , link => {
        setBgImage(link);
      });

  }

    const handelAvatarImageChange = async (ev) => {
      await upload(ev, (link) => {
        setAvatar(link);
      });
    };

  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className="py-4 -m-4 h-48 flex justify-center items-center bg-cover bg-center min-h-[250px]"
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: "color", icon: faPalette, label: "Color" },
                  { value: "image", icon: faImage, label: "Image" },
                ]}
                onChange={(val) => {
                  setBgType(val);
                }}
              />
              {bgType === "color" && (
                <div className="bg-gray-200 p-1 mt-2 text-gray-700 ">
                  <div className="flex justify-center gap-2 ">
                    <span>Background color</span>
                    <input
                      type="color"
                      name="bgColor"
                      defaultValue={page.bgColor}
                      onChange={(ev) => {
                        setBgColor(ev.target.value);
                      }}
                    />
                  </div>
                </div>
              )}

              {bgType === "image" && (
                <div className="flex justify-center">
                  <label className="bg-white shadow py-2 px-4 mt-2 cursor-pointer">
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      onChange={handelCoverImageChange}
                      className="hidden"
                    />
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        className="text-gray-500 hover:text-blue-500"
                        icon={faCloudArrowUp}
                      />
                      <span> Choose Image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center -mb-10">
            {!uimg && (
              <div className="rounded-full overflow-hidden relative -top-8  aspect-square w-32 h-32 border border-6 bg-white border-white shadow-lg shadow-black ">
                <FontAwesomeIcon
                  className="mx-auto w-full h-full text-gray-600 "
                  icon={faUserAstronaut}
                />
              </div>
            )}

            {uimg && (
              <div className="relative -top-7 w-[128px] h-[128px]">
                <div className=" overflow-hidden h-full rounded-full border-white border-4 shadow-lg shadow-black/50">
                  <Image
                    className="w-full h-full object-cover"
                    src={avatar}
                    alt="Avatar"
                    width={128}
                    height={128}
                  />
                </div>
                <label
                  htmlFor="avatarIn"
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
                >
                  <FontAwesomeIcon size="xl" icon={faCloudArrowUp} />
                </label>
                <input
                  onChange={handelAvatarImageChange}
                  className="hidden"
                  type="file"
                  id="avatarIn"
                />
                <input type="hidden" name="avatar" value={avatar} />
              </div>
            )}
          </div>

          <div className="p-0 changedInput ">
            <label className="input-label" htmlFor="nameIn">
              Display Name
            </label>
            <input
              name="displayName"
              defaultValue={page.displayName}
              type="text"
              id="nameIn"
              placeholder="Gaurav Bhagat"
            />

            <label className="input-label" htmlFor="loacationIn">
              Location
            </label>
            <input
              name="location"
              defaultValue={page.location}
              type="text"
              id="loacationIn"
              placeholder="Somewhere in the universe"
            />

            <label className="input-label" htmlFor="bioIn">
              Bio
            </label>
            <textarea
              name="bio"
              defaultValue={page.bio}
              id="bioIn"
              placeholder="your bio goes here .... "
            />

            <div className="max-w-[200px] mx-auto">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} />
                <span>Submit</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}

export default PageSettingForm