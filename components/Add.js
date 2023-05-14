import RegisterPopUp from "@/components/RegisterPopUp";
import Image from "next/image";
import poster from '../images/regsiterPoster.png'
import {useState} from "react";
import {BiGhost} from "react-icons/bi";

const Add = () => {
    // Define the state variable to track the visibility of the popup
    const [showPopup, setShowPopup] = useState(false);

    // Define a function to open the popup
    const openPopup = () => {
        setShowPopup(true);
    };

    // Define a function to close the popup
    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div id={'add'} className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
            <h1 className={'flex text-3xl md:text-5xl font-bold mb-4'}>Register as an artist <BiGhost className={'text-white mx-2'} size={45}/></h1>
            <div className="flex justify-between max-w-6xl text-xl mx-auto p-8 shadow-gray-800 shadow-sm">
                <div className={'flex flex-col justify-around'}>
                    <p>
                        By registering with us, you will have access to a range of tools and resources to
                        help you promote and sell your artwork. We offer a user-friendly platform with a
                        seamless checkout process, secure payment options, and personalized support from our
                        team. Plus, you'll have the opportunity to connect with other artists and receive
                        valuable feedback on your work. Don't wait any longer to share your talent with the
                        world - sign up now and start selling your art today!
                    </p>
                    <div>
                        <button className={'text-white p-4 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90'} onClick={openPopup}>Register Now!</button>
                    </div>
                </div>
                <Image src={poster} alt={''} width={300} className={'rounded-sm'}/>
            </div>
            {
                showPopup && (
                    <RegisterPopUp handleClose={closePopup} />
                )
            }
        </div>
    );
};

export default Add;
