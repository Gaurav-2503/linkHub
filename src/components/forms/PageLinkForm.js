"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/accountPageActions";
import toast from "react-hot-toast";

const PageLinkForm = ({ page, user }) => {
  const [links, setLinks] = useState(page.links || []);

  const save = async () => {
    // console.log(links);
    // toast.loading('Adding Link ...');
    await savePageLinks(links);
    toast.success("Saved ...");
  };

  const addNewLink = () => {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  };

  const handelUpload = (ev, linkKeyForUpload) => {
    upload(ev, (uploadedImgUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((l, ind) => {
          if (l.key === linkKeyForUpload) {
            l.icon = uploadedImgUrl;
            // console.log(l.icon);
          }
        });
        return newLinks;
      });
    });
  };

  const handelLinkChange = (keyOfLinkToChange, prop, ev) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((l) => {
        if (l.key === keyOfLinkToChange) {
          l[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  };

  function removeLink(LinkToRemoveKey) {
    setLinks((prev) => [...prev].filter((l) => l.key !== LinkToRemoveKey));
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>

        <button
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
          onClick={addNewLink}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-blue-500 text-white rounded-full p-1 aspect-square"
          />
          <span>Add new</span>
        </button>

        {/* {JSON.stringify(links)} */}

        <div className="">
          <ReactSortable handle=".handel" list={links} setList={setLinks}>
            {links.map((l) => (
              <div key={l.key} className="mt-8 flex gap-2 items-center">
                <div className="handel">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="text-gray-400 me-2 cursor-move"
                  />
                </div>
                <div className="text-center">
                  <div className="bg-gray-300   aspect-square overflow-hidden relative w-16 h-16 inline-flex justify-center items-center">
                    {l.icon && (
                      <Image
                        className="object-cover w-full h-full"
                        src={l.icon}
                        alt={"iocn"}
                        width={64}
                        height={64}
                      />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon
                        className="text-blue-500"
                        size="xl"
                        icon={faLink}
                      />
                    )}
                  </div>
                  <div>
                    {/* {JSON.stringify(l.icon)} */}
                    <input
                      onChange={(ev) => handelUpload(ev, l.key)}
                      type="file"
                      id={"icon" + l.key}
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + l.key}
                      type="button"
                      className="border text-gray-600 mt-2 p-2 cursor-pointer "
                    >
                      <FontAwesomeIcon icon={faCloudArrowUp} className="pe-1" />
                      <span>Change icon</span>
                    </label>
                  </div>
                </div>
                <div className="grow changedInput">
                  {/* <span>{l.key}</span> */}

                  <label className="input-label">Title :</label>
                  <input
                    value={l.title}
                    onChange={(ev) => handelLinkChange(l.key, "title", ev)}
                    type="text"
                    placeholder="title"
                  />

                  <label className="input-label">Sub Title :</label>
                  <input
                    value={l.subtitle}
                    onChange={(ev) => handelLinkChange(l.key, "subtitle", ev)}
                    type="text"
                    placeholder="subtitle (optional)"
                  />

                  {/* {l.subtitle} */}

                  <label className="input-label">Url :</label>
                  <input
                    value={l.url}
                    onChange={(ev) => handelLinkChange(l.key, "url", ev)}
                    type="text"
                    placeholder="url"
                  />

                  {/* {l.url} */}
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-red-200 p-2"
                    onClick={() => removeLink(l.key)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>

        <div className="max-w-xs mt-8 mx-auto ">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinkForm;
