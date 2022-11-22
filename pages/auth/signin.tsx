import { getProviders, signIn as signInAuth } from "next-auth/react";

import { FC } from "react";
import Header from "../../components/Header";
import Image from "next/image";

interface singInProps {
  providers: any;
}
const signIn: FC<singInProps> = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <div className="relative w-80 h-36">
          <Image
            src="https://links.papareact.com/ocw"
            alt="instagram-logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="font-xs italic">
          This is not a Real app, it's build for educational purposes only
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => signInAuth(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signIn;
