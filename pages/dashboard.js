import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import test from '../images/user.png';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const [details, setDetails] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`/api/userdashboard/${session?.user?.id}`);
                setDetails(res.data.user);
            } catch (err) {
                console.error(err);
                setDetails(null);
            }
        };
        fetchUserData();
    }, [session]);

    const handleEditProfileImage = () => {
        setEditModalOpen(true);
    };

    const handleModalSubmit = async () => {
        try {
            const response = await axios.post('/api/updateImageUrl', {
                userImage: imageUrl,
                id: details?.id,
            });

            if (response.status !== 200) {
                throw new Error('Failed to update image URL');
            }

            console.log('Image URL updated:', imageUrl);
            setEditModalOpen(false);
            setDetails((prevDetails) => ({ ...prevDetails, userImage: imageUrl }));
        } catch (error) {
            console.error(error);
        }
    };

    console.log(details)
    return (
        <main className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20">
            <div className="shadow-gray-800 shadow-sm px-2 py-2 md:px-8 md:p-8 lg:py-8 lg:px-32 flex items center justify-between flex-col-reverse md:flex-row">
                <div className="flex items-center flow-col justify-center">
                    <div>
                        <p className="text-sm md:text-xl font-bold">Name: {details?.fullName}</p>
                        <p className="text-sm md:text-xl font-bold">Phone Number: {details?.phoneNumber}</p>
                        <p className="text-sm md:text-xl font-bold">Email: {details?.email}</p>
                        <p className="text-sm md:text-xl font-bold">Address: {details?.address}</p>
                        <p className="text-sm md:text-xl font-bold">Role: {details?.role}</p>
                        <p className="text-sm md:text-xl font-bold">Interest: {details?.interestType}</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative">
                        <Image className="rounded-full" src={(details?.userImage) ? details?.userImage : test} alt="" width={200} height={200} /> {/* Update the field name "userImage" to "image" */}
                        <div
                            onClick={handleEditProfileImage}
                            className="absolute bottom-0 right-5 rounded-full p-2 cursor-pointer flex justify-center items-center"
                        >
                            <FaEdit className="text-2xl hover:scale-110 active:scale-90 transition-all duration-300" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-950 shadow-gray-800 shadow-sm rounded-sm p-4 w-10/12">
                        <form className="flex w-[100%] justify-between">
                            <input
                                type="text"
                                value={imageUrl}
                                placeholder="Enter your profile image url"
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="text-center focus:outline-none border-none p-2 bg-gray-950 w-[100%]"
                            />
                            <button onClick={handleModalSubmit} className="bg-gray-950 p-2 shadow-gray-800 shadow-sm">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
