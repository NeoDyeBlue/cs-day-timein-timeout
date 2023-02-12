import "@/styles/globals.css";
import { Karla, Montserrat } from "@next/font/google";
import { SWRConfig } from "swr";
import { Toaster } from "react-hot-toast";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        revalidateOnFocus: false,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <main className={`${karla.variable} ${montserrat.variable} font-body`}>
        <Toaster
          position="bottom-center"
          containerStyle={{
            top: 40,
            left: 40,
            bottom: 40,
            right: 40,
          }}
          toastOptions={{
            duration: 5000,
            className:
              "max-w-[200px] font-body text-white rounded-md shadow-md p-3",
            style: {
              background: "#3c3744",
              color: "#fff",
            },
          }}
        />
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
}
