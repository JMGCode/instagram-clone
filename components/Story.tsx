import React, { FC } from "react";

import Image from "next/image";

interface storyProps {
  img: string;
  username: string;
}
const Story: FC<storyProps> = ({ img, username }) => {
  return (
    <div className="">
      <div className="relative h-14 aspect-square p-[1.5px] cursor-pointer">
        <Image
          fill
          src={img}
          className="object-cover rounded-full border-red-500 border-2 transition hover:scale-110 duration-200 ease-out"
          alt="story-profile-img"
        />
      </div>
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
