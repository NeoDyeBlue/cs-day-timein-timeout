import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Wave from "react-wavify";
const Clock = dynamic(() => import("@/components/Clock"), {
  ssr: false,
});
import useStudentStore from "@/stores/useStudentStore";
// import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

export default function Actions() {
  const router = useRouter();
  const { studentData } = useStudentStore();
  // const [logSuccess, setLogSuccess] = useState(false);

  function logout() {
    router.push("/");
    // setStudentData(null);
  }

  async function log() {
    try {
      const res = await fetch("/api/log", {
        method: "PATCH",
        body: JSON.stringify({ studentId: studentData.id }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (result && result.success) {
        toast.success(
          `${
            !studentData?.timeLog ? "Time-in" : "Time-out"
          } successful, automatically logged out for another student`
        );
        router.push("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  if (!studentData) {
    return (
      <>
        <Head>
          <title>Error - CS Day</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="relative h-screen min-h-[620px] w-full overflow-hidden bg-[#3c3744]">
          <div className="container z-50 mx-auto flex h-full flex-col gap-6 p-6 lg:py-12">
            <div className="m-auto flex flex-col items-center gap-6 text-center text-[#fbfff1]">
              <p className="text-8xl">🥲</p>
              <p className="text-2xl">Something went wrong!</p>
              <button
                onClick={() => router.push("/")}
                className="w-fit rounded-md bg-[#3066be] px-4 py-2 text-center font-display
          font-semibold text-white transition hover:scale-105 active:scale-100"
              >
                Home
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Time-in, time-out - CS Day</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* before:absolute before:h-full
      before:w-full before:rounded-b-[15%] before:bg-[#b4c5e4] after:absolute after:top-0 after:h-full
      after:w-full after:rounded-b-[30%] after:bg-[#fbfff1] */}
      <main className="relative h-screen min-h-[620px] w-full overflow-hidden bg-[#fbfff1]">
        <div
          style={{ height: `${10}%` }}
          className="absolute bottom-0 w-full overflow-hidden"
        >
          <Wave
            className="h-full"
            fill="#b4c5e4"
            paused={false}
            options={{
              height: 20,
              amplitude: 20,
              speed: 0.15,
              points: 3,
            }}
          />
        </div>
        <div className="container z-50 mx-auto flex h-full flex-col gap-6 p-6 lg:py-12">
          <div className="z-50 flex justify-between">
            <button
              onClick={logout}
              className="w-fit rounded-md bg-[#090c9b] px-4 py-2 text-center font-display
          font-semibold text-white transition hover:scale-105 active:scale-100"
            >
              ← Logout
            </button>
            <Clock />
          </div>
          <div className="z-50 flex flex-col gap-2 text-center">
            <p className="text-xl md:text-2xl">Hello there,</p>
            <p className="font-display text-4xl font-black md:text-6xl">
              {studentData?.firstName} {studentData?.lastName}
            </p>
            <p className="">
              {!studentData?.timeLog?.timeIn ||
              !studentData?.timeLog?.timeOut ? (
                studentData?.timeLog?.timeIn ? (
                  <>
                    📝You have timed-in at{" "}
                    <span className="font-semibold">
                      {format(new Date(studentData?.timeLog?.timeIn), "Pp")}
                    </span>
                    , click the button below to time-out.
                  </>
                ) : (
                  <>
                    📝Please click the time-in button to{" "}
                    <span className="font-semibold">record</span> your
                    attendance.
                  </>
                )
              ) : (
                "👀You have already timed-in and timed-out."
              )}
            </p>
          </div>
          <div
            className="z-50 mt-4 flex h-full w-full max-w-[800px] self-center
          border-y border-dashed border-gray-400"
          >
            {!studentData?.timeLog?.timeIn || !studentData?.timeLog?.timeOut ? (
              <button
                onClick={log}
                className={`${
                  !studentData?.timeLog?.timeIn
                    ? "bg-green-500 hover:shadow-green-300"
                    : "bg-red-500 hover:shadow-red-300"
                } m-auto w-full max-w-[200px] rounded-md
          px-8 py-6 font-display text-2xl font-semibold text-white transition
          hover:scale-105 hover:shadow-xl active:scale-100`}
              >
                {studentData?.timeLog?.timeIn ? "Time-out" : "Time-in"}
              </button>
            ) : (
              <p className="m-auto text-center text-xl">
                😄Thank you for your participation!
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
