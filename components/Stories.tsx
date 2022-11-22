import React, { useEffect, useState } from "react";

import Story from "./Story";
import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";

interface profile {
  id: number;
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: Date;
  registeredAt: Date;
}

function Stories() {
  const [suggestions, setSuggestions] = useState<profile[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      id: i,
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story
          img={session.user?.image || ""}
          // @ts-ignore
          username={session.user.username}
        />
      )}
      {suggestions.map((profile) => {
        return (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.username}
          />
        );
      })}
    </div>
  );
}

export default Stories;
