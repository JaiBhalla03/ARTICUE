import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import test from '../images/user.png';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import {AiFillDelete, AiFillEdit, AiFillHeart, AiOutlinePlus} from "react-icons/ai";
import { formatDistanceToNow } from 'date-fns';


const Dashboard = () => {
    const { data: session, status } = useSession();
    const [details, setDetails] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [artworkName, setArtworkName] = useState('');
    const [artUrl, setArtUrl] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [paintingType, setPaintingType] = useState('');
    const handleAddButtonClick = () => {
        setIsFormOpen(true);
    };

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

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        try{
            const artworkData = {
                userId: details?.id,
                name: artworkName,
                imageUrl: artUrl,
                price: price,
                discount: discount,
                paintingType: paintingType,
                artistName: details?.name
            };
            console.log(artworkData);
            const res = await axios.post('/api/addArtworks', artworkData);
            console.log('added successfully', res.data);
        }
        catch (err){
            console.error(err)
        }
        setIsFormOpen(false);
        setArtworkName('');
        setArtUrl('');
        setPrice('');
        setDiscount('');
        setPaintingType('');

    };

    function getTimeAgo(createdAt) {
        const currentDate = new Date();
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true });
    }

    const createdAt = "2023-05-22T20:38:25.609Z";
    const timeAgo = getTimeAgo(createdAt);
    console.log(timeAgo);

    const artworks = details?.artworks
    console.log(details)
    const discountedPrice = (price, dis)=>{
        return Math.floor(price - price * dis/10);
    }
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
            <div className={'flex justify-between my-4'}>
                <div className={'shadow-sm m-1 shadow-gray-800 p-4 w-3/5'}>
                    this will be the graph
                </div>
                <div className={'h-[400px] overflow-y-scroll shadow-sm m-1 shadow-gray-800 p-4 w-2/5 custom-scrollbar'}>
                    <div className={'flex justify-between shadow-gray-800 shadow-sm p-2'}>
                        <h1 className={'text-2xl flex items-center'}>
                            Your Artworks
                        </h1>
                        <button
                            onClick={handleAddButtonClick}
                            className={'flex text-xl bg-green-400 p-2 rounded-sm hover:bg-green-500 hover:scale-105 active:scale-95 duration-300 transition-all'}>
                            Add<AiOutlinePlus size={25}/>
                        </button>
                    </div>
                    {
                        artworks?.map((artwork)=>(
                            <div className={'my-2 shadow-gray-800 shadow-sm py-2 px-4'}>
                                <div className={'flex justify-between '}>
                                    <div className={'w-4/5'}>
                                        <div className={'flex justify-between'}>
                                            <h1 className={'text-xl'}>{artwork.name}</h1>
                                            <div className={'flex'}>
                                                <p className={'flex text-lg'}>{artwork.likeCount}</p>
                                                <AiFillHeart size={'20'} className={'mt-1 ml-1 text-pink-600'}/>
                                            </div>
                                        </div>
                                        <div className={''}>
                                            {
                                                artwork.discount ?
                                                    <div className={'flex gap-1'}>
                                                        <div className={'text-gray-400 opacity-20 line-through'}>₹{artwork.price}</div>
                                                        <div className={'text-green-400'}>₹{discountedPrice(artwork.price, artwork.discount)}(-{artwork.discount}%)</div>
                                                    </div>
                                                    : <div className={'text-green-400'}>₹{artwork.price}</div>
                                            }

                                        </div>
                                    </div>
                                    <div className={'flex justify-center items-center shadow-gray-800 shadow-sm rounded-sm'}>
                                        <Image src={artwork.imageUrl} alt={''} width={50} height={50} className={'rounded-sm'}/>
                                    </div>
                                </div>
                                <div className={'flex justify-between'}>
                                    <div className={'flex'}>
                                        <AiFillEdit title={'Edit'} size={'20'} className={'hover:scale-110 active:scale-90 duration-300 transition-all'}/>
                                        <AiFillDelete title={'Delete'} size={'20'} className={'hover:scale-110 active:scale-90 duration-300 transition-all'}/>
                                    </div>
                                    <div className={'text-gray-400'}>
                                        {getTimeAgo(artwork.createdAt)}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
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
            {isFormOpen && (
                <div className={'z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'}>
                    <div className="bg-gray-950 shadow-gray-800 shadow-sm rounded-sm p-10 w-10/12">
                        <h1 className={'text-3xl'}>Enter your artwork details!</h1>
                        <form className={'flex flex-col'} onSubmit={handleFormSubmit}>
                            <input
                                className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                                type="text"
                                name="name"
                                placeholder="Artwork Name"
                                value={artworkName}
                                onChange={(e) => setArtworkName(e.target.value)}
                            />
                            <input
                                className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                                type="text"
                                name="imageUrl"
                                placeholder="Image URL"
                                value={artUrl}
                                onChange={(e) => setArtUrl(e.target.value)}
                            />
                            <input
                                className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                                type="number"
                                name="price"
                                placeholder="Enter the Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <input
                                className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                                type="number"
                                name="discount"
                                placeholder="Enter the discount (if any)"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            <select
                                className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                                id="countries"
                                value={paintingType}
                                onChange={(e) => setPaintingType(e.target.value)}
                            >
                                <option value="">Choose painting type</option>
                                <option value="Acrylic">Acrylic</option>
                                <option value="Oil">Oil</option>
                                <option value="Watercolor">Watercolor</option>
                                <option value="Pastel">Pastel</option>
                                <option value="Encaustic">Encaustic</option>
                            </select>
                            <div className={'flex justify-center'}>
                                <button
                                    className="text-white p-2 mt-2 text-lg transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
