import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Bounce } from 'react-awesome-reveal';
import { CheckCircleIcon, RefreshIcon } from '@heroicons/react/outline';

const Details = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const email = session?.user?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const role = formData.get('role');
        const interestType = formData.get('interestType');
        const fullName = formData.get('fullName');
        const address = formData.get('address');
        const phoneNumber = formData.get('phoneNumber');

        try {
            setLoading(true);
            await axios.post('/api/updateDetails', {
                email,
                role,
                interestType,
                fullName,
                address,
                phoneNumber
            });
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            console.error('Error updating user details:', error);
            setLoading(false);
        }
    };

    return (
        <Bounce triggerOnce>
            <div className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20'}>
                <div className={'md:py-10 md:px-20 shadow-sm shadow-gray-800'}>
                    <h1 className={'my-2 flex text-5xl md:text-5xl font-bold'}>Specify your details here!</h1>
                    {success && (
                        <div className="flex items-center my-4 text-green-500">
                            <CheckCircleIcon className="h-6 h-6 mr-2" />
                            Details updated successfully!
                        </div>
                    )}
                    <form className={''} onSubmit={handleSubmit}>
                        <div>
                            <input
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <input
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Enter your address"
                            />
                        </div>
                        <div>
                            <input
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                placeholder="Enter your phone-number"
                            />
                        </div>
                        <div>
                            <select
                                id={'role'}
                                name={'role'}
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                            >
                                <option value="" disabled selected>
                                    Select your role
                                </option>
                                <option>Seller</option>
                                <option>Buyer</option>
                            </select>
                        </div>
                        <div>
                            <select
                                id={'interestType'}
                                name={'interestType'}
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                            >
                                <option value="" disabled selected>
                                    Select your painting type
                                </option>
                                <option>Oil Painters</option>
                                <option>Watercolor Painters</option>
                                <option>Acrylic Painters</option>
                                <option>Pastel Painters</option>
                                <option>Encaustic Painters</option>
                            </select>
                        </div>
                        <div className={'flex justify-center'}>
                            <button
                                className="text-white p-2 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                                type="submit"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <RefreshIcon className="animate-spin w-4 h-4 mr-2" />
                                        Loading...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Bounce>
    );
};

export default Details;
