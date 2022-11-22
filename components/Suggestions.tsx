import React, { useEffect, useState } from "react";

import Image from "next/image";
import { faker } from "@faker-js/faker";

interface profile {
  id: number;
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: Date;
  registeredAt: Date;
  company: {
    name: string;
  };
}

function Suggestions() {
  const [suggestions, setSuggestions] = useState<profile[]>([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      id: i,
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      company: {
        name: faker.company.name(),
      },
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-500">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      {suggestions.map(({ username, company, avatar, id }) => (
        <div key={id} className="flex items-center justify-between mt-3">
          <div className="relative h-14 aspect-square ">
            <Image
              src={avatar}
              alt="suggestions-avatar"
              fill
              className="rounded-full border p-[2px]"
            />
          </div>
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{username}</h2>
            <h3 className="text-xs text-gray-400">Works at {company.name}</h3>
          </div>
          <button
            className="text-blue-400 text-sm font-bold pl-4
          "
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
