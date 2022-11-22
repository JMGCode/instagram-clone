import Feed from "../components/Feed";
import Head from "next/head";
import Header from "../components/Header";
import Modal from "../components/Modal";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal />
      <Header />
      <Feed />
    </div>
  );
};

export default Home;
