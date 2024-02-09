import { Inter } from "next/font/google";
import "../globals.css";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { faLink, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { headers } from "next/headers";
import AppSideBar from "@/components/layout/AppSideBar";
import { Toaster } from "react-hot-toast";
import Page from "@/models/page";
import mongoose from "mongoose";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AppTemplate({ children }) {
  const headerList = headers();
  const url = headerList.get("next-url");
  // console.log(url)

  const session = await getServerSession(authOptions);
  const uimg = session?.user?.image;

  if (!session) {
    return redirect("/");
  }

  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user.email });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <main className="flex min-h-screen">
          <aside className="bg-white shadow w-52 pt-6 p-4">
            <div className="sticky top-0 pt-4">
              <div className="rounded-full overflow-hidden mx-auto aspect-square w-24 border border-blue-800">
                {!uimg && (
                  <FontAwesomeIcon
                    className="mx-auto w-full h-full text-gray-600 "
                    icon={faUserAstronaut}
                  />
                )}

                {uimg && (
                  <Image
                    src={session?.user?.image}
                    alt="Avatar"
                    width={256}
                    height={256}
                  ></Image>
                )}
              </div>

              {page && (
                <Link
                  target="_blank"
                  href={"/" + page.uri}
                  className="text-center mt-4 flex gap-1 items-center justify-center"
                >
                  <FontAwesomeIcon
                    className="h-7 w-7 text-blue-500"
                    icon={faLink}
                  />
                  <span className="text-2xl text-gray-300">/</span>
                  <span> {page.uri}</span>
                </Link>
              )}

              <div className="text-center">
                <AppSideBar />
              </div>
            </div>
          </aside>

          <div className="grow">{children}</div>
        </main>
      </body>
    </html>
  );
}