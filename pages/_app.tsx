import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from "@/components/Navbar";
import '@/styles/globals.css'
import store from "../redux/store";
import {Provider} from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
          <div className={'bg-gray-950 text-white'}>
              <Navbar/>
              <Component {...pageProps} />
          </div>
      </Provider>

  )
}
