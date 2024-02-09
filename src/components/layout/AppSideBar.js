'use client';
import Link from "next/link";
import LogoutButton from "@/components/buttons/LogoutButton";
import {
  faChartLine,
  faHome,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";


const AppSideBar = () => {

    
    const path = usePathname(); // will log => /account or /analtyics
    // console.log(path);

  return (
    <nav className="inline-flex mx-auto flex-col p-2 gap-2 mt-8 text-gray-500">
      <Link
        href={"/account"}
        className={
          "flex gap-4 items-center p-2 hover:bg-blue-100 rounded-md" +
          (path === "/account" ? " text-blue-500  font-semibold" : "")
        }
      >
        <FontAwesomeIcon className="h-5 w-5" icon={faNewspaper} />
        <span>My Page</span>
      </Link>

      <Link
        href={"/analytics"}
        className={
          "flex gap-4 items-center p-2 hover:bg-blue-100 rounded-md " +
          (path === "/analytics" ? "text-blue-500 font-semibold" : "")
        }
      >
        <FontAwesomeIcon className="h-5 w-5" icon={faChartLine} />
        <span>Analytics</span>
      </Link>

      <LogoutButton
        iconclasses={"h-5 w-5"}
        iconleft={true}
        className="flex gap-4 p-2 items-center hover:bg-blue-100 rounded-md"
      />

      <Link
        href={"/"}
        className="flex gap-4 items-center text-sm pt-5 border-t-2 border-gray-100 hover:font-semibold"
      >
        <FontAwesomeIcon className="text-blue-500" icon={faHome} />
        <span>Back to Home</span>
      </Link>
    </nav>
  );
}

export default AppSideBar