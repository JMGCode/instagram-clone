import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import React, { FC, use, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import Image from "next/image";
import dayjs from "dayjs";
import { db } from "../firebase";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";

interface postProps {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

const Post: FC<postProps> = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLike, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    dayjs.extend(relativeTime);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    const isPresent =
      likes.findIndex((like) => {
        //@ts-ignore
        return like.id === session?.user?.uid;
      }) !== -1;

    setHasLiked(isPresent);
  }, [likes]);

  const likePost = async () => {
    if (hasLike) {
      //@ts-ignore
      const document = doc(db, "posts", id, "likes", session?.user?.uid);
      await deleteDoc(document);
    } else {
      await setDoc(
        doc(
          db,
          "posts",
          id,
          "likes",

          // @ts-ignore
          session?.user.uid
        ),
        {
          // @ts-ignore
          username: session.user.username,
        }
      );
    }
  };

  const sendComment = async (e: any) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      //@ts-ignore
      username: session?.user.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <div className="relative h-12 aspect-square object-contain border p-1 mr-3 rounded-full">
          <Image
            fill
            src={userImg}
            alt="post-profile-img"
            className="rounded-full"
          />
        </div>
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <div className="relative w-full aspect-square">
        <Image fill src={img} alt="post-img" />
      </div>
      {/* buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLike ? (
              <HeartIconFilled
                className="btn text-red-600"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}
            <ChatBubbleLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {/* comments */}
      {comments.map((comment) => {
        const { id } = comment;
        const {
          username,
          comment: commentText,
          userImage,
          timestamp,
        } = comment.data();
        return (
          <div
            key={id}
            className="ml-10 h20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="relative h-7 aspect-square ">
                <Image
                  className="rounded-full"
                  fill
                  src={userImage}
                  alt="comment-user-image"
                />
              </div>
              <span className="font-bold">{username}</span>
              <p className="text-sm flex-1">{commentText}</p>
              <p className="text-sm pr-5">
                {dayjs(timestamp?.toDate()).fromNow()}
              </p>
            </div>
          </div>
        );
      })}
      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="btn" />
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
