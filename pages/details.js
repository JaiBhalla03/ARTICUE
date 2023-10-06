import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Bounce } from 'react-awesome-reveal';
import { CheckCircleIcon, RefreshIcon } from '@heroicons/react/outline';

const Details = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();
    const [role, setRole] = useState(session?.user?.role);
    const [interestType, setInterestType] = useState(session?.user?.interestType);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleInterestTypeChange = (e) => {
        setInterestType(e.target.value);
    };

    const email = session?.user?.email;
    console.log(session?.user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const role = formData.get('role');
        const interestType = formData.get('interestType');
        const fullName = formData.get('fullName');
        const address = formData.get('address');
        const phoneNumber = formData.get('phoneNumber');
        const bio = formData.get('bio');

        try {
            setLoading(true);
            await axios.post('/api/updateDetails', {
                email,
                role,
                interestType,
                fullName,
                address,
                phoneNumber,
                bio
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
                                defaultValue={session?.user?.fullName}
                                type="text"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <input
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                id="address"
                                name="address"
                                defaultValue={session?.user?.address}
                                type="text"
                                placeholder="Enter your address"
                            />
                        </div>
                        <div>
                            <input
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                                id="phoneNumber"
                                name="phoneNumber"
                                defaultValue={session?.user?.phoneNumber}
                                type="text"
                                placeholder="Enter your phone-number"
                            />
                        </div>
                        <div>
                            <select
                                id={'role'}
                                name={'role'}
                                value={role}
                                onChange={handleRoleChange}
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                            >
                                <option value="" disabled selected>
                                    Select your role
                                </option>
                                <option value={'Seller'}>Seller</option>
                                <option value={'Buyer'}>Buyer</option>
                            </select>
                        </div>
                        <div>
                            <select
                                id={'interestType'}
                                name={'interestType'}
                                value={interestType}
                                onChange={handleInterestTypeChange}
                                className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full"
                            >
                                <option value="" disabled selected>
                                    Select your painting type
                                </option>
                                <option value={'Oil'}>Oil Painters</option>
                                <option value={'Watercolor'}>Watercolor Painters</option>
                                <option value={'Acrylic'}>Acrylic Painters</option>
                                <option value={'Pastel'}>Pastel Painters</option>
                                <option value={'Encaustic'}>Encaustic Painters</option>
                            </select>
                        </div>
                        <div>
                            <textarea
                                className="h-32 bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full resize-none"
                                id="bio"
                                name="bio"
                                defaultValue={session?.user?.bio}
                                placeholder="Tell something about yourself"
                            />
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
