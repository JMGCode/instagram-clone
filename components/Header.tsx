import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="sticky shadow-sm border-b bg-white top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 xl:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24  cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            fill
            alt="instagram-logo"
            className="object-contain"
          />
        </div>
        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            fill
            alt="instagram-mobile-logo"
            className="object-contain"
          />
        </div>
        {/* Center */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
              <MagnifyingGlassIcon className="h-5 w-5 to-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon
            onClick={() => {
              router.push("/");
            }}
            className="navBtn"
          />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn -rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <Bars3Icon className="h-6 w-6 md:hidden cursor-pointer" />
              <div className="relative h-10  aspect-square cursor-pointer">
                <Image
                  className="rounded-full object-contain"
                  src={session?.user?.image || ""}
                  fill
                  alt="profile-img"
                  onClick={() => signOut()}
                />
              </div>
            </>
          ) : (
            <>
              <button onClick={() => signIn()}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
