import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import '@/styles/globals.css'
import store from "../redux/store";
import { Provider } from "react-redux";
import Search from "@/components/Search";
import {SessionProvider} from "next-auth/react";
import {useEffect, useState} from "react";
import Preloader from '../components/Preloader'

export default function App({ Component, pageProps }: AppProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating an asynchronous operation (e.g., fetching data)
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust the delay time as needed
    }, []);

    if (isLoading) {
        return <Preloader />;
    }
    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <div className={'scroll-smooth bg-gray-950 text-white'}>
                    <Navbar />
                    <Component {...pageProps} />
                    <Search />
                    <Footer />
                </div>
            </Provider>
        </SessionProvider>
    )
}
