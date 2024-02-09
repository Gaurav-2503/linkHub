'use client'

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
const { signIn } = require("next-auth/react");

const HeroForm = ({user}) => {

    const router = useRouter();


    useEffect(() => {

        if('localStorage' in window && 
            window.localStorage.getItem('desiredUsername') ) {
                const username = window.localStorage.getItem('desiredUsername');
                window.localStorage.removeItem('desiredUsername');
                redirect("/account/?desiredUsername=" + username);
            }

     } , [])

    const handelSubmit = async (ev) => {

        ev.preventDefault();

       const form = ev.target;
       const input = form.querySelector('input');
       const username = input.value;

        //    console.log(uname);

        if (username.length > 0) {
          
          if(user) { // if logged in 
            router.push("/account?desiredUsername="+ username);
          }else {
            window.localStorage.setItem("desiredUsername", username);
            await signIn("google");
          }
        }

    }

  return (
    <form
      onSubmit={handelSubmit}
      className="inline-flex items-center shadow-lg shadow-black/20"
    >
      <span className="bg-white py-4 pl-4">linkHub.to/</span>
      <input type="text" className="py-4" placeholder="username" />

      <button type="submit" className="bg-blue-500 text-white px-6 py-4">
        <span>Join for free</span>
      </button>
    </form>
  );

}

export default HeroForm