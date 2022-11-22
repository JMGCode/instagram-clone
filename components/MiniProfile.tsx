import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import React from "react";
import { userAgent } from "next/server";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <div className="relative h-16 aspect-square">
        <Image
          className=" rounded-full border p-[2px]"
          fill
          src={session?.user?.image || ""}
          alt="mini-profile-img"
        />
      </div>
      <div className="flex-1 mx-4">
        {/* @ts-ignore */}
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-500">Welcome to Instagram</h3>
      </div>
      <button
        onClick={() => signOut()}
        className="text-blue-400 text-sm font-semibold"
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
