'use client'
import grabUsername from "@/actions/grabUsername";
import RightArrow from "../Icons/RightArrow";
import { useState } from "react";
import { redirect } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";

const UserNameForm = ({desiredUsername}) => {

    // for checking wheather username is already taken or not 
    const [taken , setTaken] = useState(false);

    const handelSubmit =  async (formData) => {

        // grabUsername checks for the usename in the db 
        // if present then returns false
        // if not then create a username save it to db and send newly created document
        const result =  await grabUsername(formData);

        setTaken(result === false);  // jevha username allready taken ahe => true kara state 

        // jar grabusername ne already aslela doc send kela tar
        if(result) {
            redirect('/account?created=' + formData.get('username'));
        }

    }



  return (
    <form action={handelSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>

      <p className="text-center mb-6 text-gray-500">Choose your username</p>

      <div className="max-w-xs mx-auto">
        <input
          name="username"
          placeholder="username"
          defaultValue={desiredUsername}
          className="block p-2 border mx-auto w-full mb-2 text-center"
        />

        {taken && (  // if user name is already taken
          <div className="bg-red-100 text-center border border-red-500 p-2 mb-2">
            User name already Taken
          </div>
        )}

        <SubmitButton>
          <span>Claim your username</span>
          <RightArrow />
        </SubmitButton>
      
      </div>
    </form>
  );
}

export default UserNameForm