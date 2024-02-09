'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {signIn} from 'next-auth/react'

const LoginWithGoogle = () => {
  return (
    <button 
        className="flex justify-center items-center gap-3 bg-white shadow-sm w-full text-center py-3"
        
        onClick={() => signIn('google')}
    >
      <FontAwesomeIcon icon={faGoogle} className="w-6  h-6" />
      Sign in with Google
    </button>
  );
};

export default LoginWithGoogle;
