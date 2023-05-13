import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import '@/styles/globals.css'
import store from "../redux/store";
import {Provider} from "react-redux";
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider>
          <Provider store={store}>
              <div className={'bg-gray-950 text-white'}>
                  <Navbar/>
                  <Component {...pageProps} />
                  <Footer/>
              </div>
          </Provider>
      </SessionProvider>
  )
}
