import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Header = async () => { 

  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <header className="py-4 bg-white border-b">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-2" href={"/"}>
            <FontAwesomeIcon className="h-7 w-7 text-blue-500" icon={faLink} />
            <span className="font-bold">LinkHub</span>
          </Link>

          <nav className="flex gap-3 text-slate-500 text-sm items-center">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div className="flex gap-4 text-sm items-center text-slate-500">
          {!!session && (
            <>
              <Link href={"/account"}>
                Hello <b>{session?.user?.name}</b>
              </Link>

              <LogoutButton />
            </>
          )}

          {!session && (
            <>
              <Link href="/login">Sign In</Link>
              <Link href="/login">Create Account</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header