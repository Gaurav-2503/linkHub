'use client'
import SectionBox from '../layout/SectionBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faTelegram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import SubmitButton from '../buttons/SubmitButton'
import { savePageButtons } from '@/actions/accountPageActions'
import toast from 'react-hot-toast'
import {ReactSortable} from 'react-sortablejs'

export const allButtons = [
  {
    key: "email",
    label: "E-mail",
    icon: faEnvelope,
    placeholder: "youremail@gmail.com",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: faMobile,
    placeholder: "+91 12312 12312",
  },
  {
    key: "linkedin",
    label: "LinikedIn",
    icon: faLinkedin,
    placeholder: "https://linkedin.com/..",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: faInstagram,
    placeholder: "https://instagram.com/..",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/..",
  },
  {
    key: "discord",
    label: "Discord",
    icon: faDiscord,
    placeholder: "https://discord.com/..",
  },
  {
    key: "youtube",
    label: "Youtube",
    icon: faYoutube,
    placeholder: "https://youtube.com/..",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: faWhatsapp,
    placeholder: "https://whatsapp.com/..",
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: faTelegram,
    placeholder: "https://telegram.com/..",
  },
  {
    key: "github",
    label: "Github",
    icon: faGithub,
    placeholder: "https://github.com/..",
  },
];

const PageButtonsForm = ({user, page}) => {


    

        const pageSavedButtonsKeys = Object.keys(page.buttons);

        // console.log(pageSavedButtonsKeys)
        
        // const pageSavedButtonsInfo = pageSavedButtonsKeys.map(k => {
        //   allButtons.find(b => b.key === k );
        // });

        // const pageSavedButtonsInfo = allButtons.filter((b) =>
        //   pageSavedButtonsKeys.includes(b.key)
        // );

        const pageSavedButtonsInfo = allButtons
          .filter((b) => pageSavedButtonsKeys.includes(b.key))
          .sort((a, b) => {
            const indexOfA = pageSavedButtonsKeys.indexOf(a.key);
            const indexOfB = pageSavedButtonsKeys.indexOf(b.key);
            return indexOfA - indexOfB;
          });

        
        // console.log(pageSavedButtonsInfo)

        const [activeButtons, setactiveButtons] = useState(pageSavedButtonsInfo);
 

    const addProfileToButton = (button) => {

        setactiveButtons(prevButtons => {
            return [...prevButtons, button];
        })

    }

    // je button select kele ahe te sodun bakiche visible ahet
    // const availableButtons = allButtons.filter(
    //   b1 => !activeButtons.find((b2) => b1.key === b2.key)
    // );

    // console.log(activeButtons)

    const activeButtonsKeys = activeButtons.map(b => b.key);  // ['email', 'mobile']
    // console.log(activeButtonsKeys);

     const availableButtons = allButtons.filter( (b) => !activeButtonsKeys.includes(b.key) ); // ['linkedin', 'instagram' , ....]

    //  console.log(availableButtons)

  
    const saveButtons = async (formData) => {
        await savePageButtons(formData);
        toast.success("Settings Saved!")

    }

    function removebutton({key:keyToRemove}) {
      setactiveButtons(prevButtons => {
        return prevButtons.filter(button => button.key !== keyToRemove)
      })
    }

    // console.log(activeButtons)

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable
          handle=".handel"
          list={activeButtons}
          setList={setactiveButtons}
        >
          {activeButtons.map((b) => (
            <div
              className="mb-4 flex gap-2 items-center text-gray-700 addedLinkBtn"
              key={b.key}
            >
              <div className="w-60 flex h-full gap-2 items-center">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handel pe-1"
                />
                <FontAwesomeIcon icon={b.icon} />
                <span> {b.label} : </span>
              </div>
              <input
                type="text"
                name={b.key}
                defaultValue={page.buttons[b.key]}
                style={{ marginBottom: "0" }}
                placeholder={b.placeholder}
              />
              <button
                type="button"
                className="p-2 bg-red-200 cursor-pointer"
                onClick={() => removebutton(b)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ReactSortable>

        <div className="flex flex-wrap gap-3 mt-8 border-y py-4 ">
          {availableButtons &&
            availableButtons.map((b) => (
              <button
                type="button"
                key={b.key}
                className="flex gap-1 p-2 items-center bg-gray-200"
                onClick={() => addProfileToButton(b)}
              >
                <FontAwesomeIcon icon={b.icon} />
                <span>{b.label}</span>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ))}
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
}

export default PageButtonsForm;
