"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/app/components/atoms";
import { useGetUser } from "@/app/hooks/useUser";
import { organizations, screens } from "@/app/utils/constants";

export default function WrappedScreen() {
  const { user } = useGetUser();
  const { screen } = useParams();

  const screenData = useMemo(() => {
    const wrapped = screens.find(({ name }) => name === screen);
    const value = wrapped?.value(user);
    const formattedValue =
      screen === "estimated_profit" ? `$${value?.toLocaleString("en-us", { maximumFractionDigits: 0 })}` : value;

    const numberValue = Number(value);
    const conditionMatch = wrapped?.conditions?.find(({ condition }, index) => {
      if (index === 0 && numberValue < condition[0]) return true;
      if (index === 1 && numberValue >= condition[0] && numberValue < condition[1]) return true;
      if (index === 2 && numberValue >= condition[0]) return true;
      return false;
    }) || { title: "-", description: "-" };

    const organization = wrapped?.organization ? organizations[wrapped.organization] : organizations.talent;

    return {
      organization,
      wrapped,
      value: formattedValue,
      title: conditionMatch.title,
      description: conditionMatch.description
    };
  }, [screen, user]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }
        }}
        className="flex flex-1 flex-col items-center justify-center gap-2 text-white"
      >
        <h1 className="text-2xl font-semibold">{screenData.title}</h1>
        <p className="text-center">{screenData.description}</p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          className="w-full sm:w-96 flex flex-col items-center gap-3 my-2 sm:my-6 p-6 border border-white/60 rounded-3xl bg-gradient-to-r from-white/30 via-white/40 to-white/30 backdrop-blur-sm shadow-lg text-white"
        >
          <span className="font-bold text-4xl">{screenData.value}</span>
          <span className="font-semibold text-xs uppercase">{screenData.wrapped?.label}</span>
        </motion.div>
        <span className="px-3 py-0.5 border rounded-[64px] bg-white/10 text-white text-sm font-medium font-mono bg-gradient-to-r from-white/30 via-white/40 to-white/30 backdrop-blur-sm shadow-lg uppercase">
          {`Powered By ${screenData.organization.name}`}
        </span>
        <span className="font-semibold text-2xl uppercase">{screenData.organization.role}</span>
      </motion.div>
      <Link href={`/wrapped/${user?.talent_id}/${screenData.wrapped?.next_page}`} prefetch={true} className="w-full">
        <Button variant="secondary" className="w-full">
          Next
        </Button>
      </Link>
    </>
  );
}
