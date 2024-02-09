'use client'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react"

const LogoutButton = ({
  className = "inline-flex items-center p-2 px-4 shadow-sm  gap-2",
  iconleft=false,
  iconclasses = ''
}) => {

  return (
    <button className={className} onClick={() => signOut()}>
      {iconleft && <FontAwesomeIcon className={iconclasses} icon={faRightFromBracket} />}
      <span>Log Out</span>
      {!iconleft && <FontAwesomeIcon className={iconclasses} icon={faRightFromBracket} />}
    </button>
  );
};

export default LogoutButton