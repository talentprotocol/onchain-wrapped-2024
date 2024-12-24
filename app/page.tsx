"use client";

import Image from "next/image";

import Wallet from "@/app/assets/icons/wallet.svg";
import { Button } from "@/app/components/atoms";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const redirectToTalentProtocolSignIn = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_TALENT_PROTOCOL_LOGIN_URL}/sign_in?redirect_url=${location.origin}/login_callback`
    );
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Onchain Wrapped 2024</h1>
      <div className="h-full flex items-center justify-center">
        <div
          data-aos="zoom-in"
          className="w-min h-64 flex flex-col items-start justify-between p-6 border rounded-[40px] bg-white shadow font-mono uppercase"
        >
          <h2 className="flex flex-col -gap-1 text-4xl text-accent-foreground">
            <span>
              onchain
              <span className="bg-gradient-to-br from-chart-3 to-chart-4 text-transparent bg-clip-text">20</span>
            </span>
            <span>
              wrapped
              <span className="bg-gradient-to-br from-chart-3 to-chart-4 text-transparent bg-clip-text">24</span>
            </span>
          </h2>
          <div className="flex flex-col gap-2 text-[14px]">
            <span className="w-max px-3 py-0.5 rounded-[64px] text-white bg-gradient-to-br from-chart-3 to-chart-4">
              Powered By
            </span>
            <span className="text-start">talent protocol, base, zerion & zora</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 w-full sm:w-96">
        <Button className="w-full flex items-center gap-2" onClick={redirectToTalentProtocolSignIn}>
          <Image src={Wallet} alt="" width={16} height={16} />
          <span>Continue with Talent Protocol</span>
        </Button>
        <span className="mt-2 text-xs font-semibold text-muted-foreground">
          <p>By continuing you agree and you&apos;ve read the</p>
          <p>
            <span className="text-primary">Terms & Conditions</span> and{" "}
            <span className="text-primary">Privacy and Policy</span>.
          </p>
        </span>
      </div>
    </>
  );
}
