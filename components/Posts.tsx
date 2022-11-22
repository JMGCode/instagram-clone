import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import Post from "./Post";
import { db } from "../firebase";

function Posts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, [db]);

  return (
    <div>
      {posts.map((e) => {
        const postData = e.data(); 
        const post = {
          key: e.id,
          id: e.id,
          username: postData.username,
          userImg: postData.profileImg,
          img: postData.image,
          caption: postData.caption,
        };
        return <Post {...post} />;
      })}
    </div>
  );
}

export default Posts;
