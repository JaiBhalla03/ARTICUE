import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import test from '../images/user.png';
import Image from 'next/image';
import {FaEdit} from 'react-icons/fa';
import {
    AiFillCrown,
    AiFillDelete, AiFillDollarCircle,
    AiFillEdit,
    AiFillHeart,
    AiOutlinePlus,
    AiTwotoneMoneyCollect
} from "react-icons/ai";
import { formatDistanceToNow } from 'date-fns';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {MdCancel, MdOutlineCancel, MdOutlineCancelPresentation} from "react-icons/md";
import ArtworksUpdateForm from "../components/ArtworksUpdateForm";
import OrdersDashboard from "../components/OrdersDashboard";


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
                artistName: details?.fullName
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
        return Math.floor(price - price * dis/100);
    }


    // Define a function to handle the "Escape" key press
    const handleEscapeKeyPress = (event) => {
        if (event.key === 'Escape') {
            setIsFormOpen(false);
        }
    };

    // Add an event listener to handle the "Escape" key press
    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKeyPress);
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []);

    const [deleteBox, setDeleteBox] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteName, setDeleteName] = useState('');

    const deleteArt = async(id)=>{
        const data = {id: id};
        try {
            const res = await axios.post('/api/deleteArtworks',data);
            console.log('artworks deleted successfully');
        }
        catch(err){
            console.error(err);
        }
    }

    const deleteArtwork = ()=>{
        console.log(deleteId);
        deleteArt(deleteId)
            .then(()=>{
                setDeleteBox(false);
            });
    }

    const handleDeleteButton = (id, name)=>{
        setDeleteBox(true);
        setDeleteName(name);
        setDeleteId(id);
    }

    const [updateBox , setUpdateBox] = useState(false);
    const [updateArtwork, setUpdateArtwork] = useState(null);

    const handleEditButton = (uArtwork)=>{
        setUpdateBox(true);
        setUpdateArtwork(uArtwork);
    }
    const handleUpdateComplete = () => {
        setUpdateBox(false);
        // You may also want to refresh the artworks list or update the specific artwork in the state if needed.
    };

    return (
        <main className="bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:py-20">
            <div className="shadow-gray-800 shadow-sm px-2 py-2 md:px-8 md:p-8 lg:py-8 lg:px-32 flex items center justify-between flex-col-reverse md:flex-row">
                <div className="flex items-center flow-col justify-center">
                    <div>
                        <div className="mb-1">
                            <p className="text-sm text-gray-800">Name</p>
                            <div className="text-sm md:text-xl font-bold">
                                {details?.fullName || (
                                    <div className="h-3 bg-gray-800 rounded-full dark:bg-gray-900 w-64 mb-4 animate-pulse"></div>
                                )}
                            </div>
                        </div>
                        <div className="mb-1">
                            <p className="text-sm text-gray-800">Phone-Number</p>
                            <div className="text-sm md:text-xl font-bold">
                                {details?.phoneNumber || (
                                    <div className="h-3 bg-gray-800 rounded-full dark:bg-gray-900 w-64 mb-4 animate-pulse"></div>
                                )}
                            </div>
                        </div>
                        <div className="mb-1">
                            <p className="text-sm text-gray-800">Email</p>
                            <div className="text-sm md:text-xl font-bold">
                                {details?.email || (
                                    <div className="h-3 bg-gray-800 rounded-full dark:bg-gray-900 w-64 mb-4 animate-pulse"></div>
                                )}
                            </div>
                        </div>
                        <div className="mb-1">
                            <p className="text-sm text-gray-800">Address</p>
                            <div className="text-sm md:text-xl font-bold">
                                {details?.address || (
                                    <div className="h-3 bg-gray-800 rounded-full dark:bg-gray-900 w-64 mb-4 animate-pulse"></div>
                                )}
                            </div>
                        </div>
                        <div className="mb-1">
                            <p className="text-sm text-gray-800">Interest-Type</p>
                            <div className="text-sm md:text-xl font-bold">
                                {details?.interestType || (
                                    <div className="h-3 bg-gray-800 rounded-full dark:bg-gray-900 w-64 mb-4 animate-pulse"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative">
                        {
                            details?.userImage ? (<Image className="rounded-full" src={details?.userImage} alt="" width={250} height={250} />) : (
                                <div className="h-56 bg-gray-800 rounded-full dark:bg-gray-900 w-56 mb-4 animate-pulse"></div>
                            )
                        }
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
                    <div role="status" class="max-w-2xl p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-900">
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-900 w-32 mb-2.5"></div>
                        <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-900"></div>
                        <div class="flex items-baseline mt-4 space-x-6">
                            <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-900"></div>
                            <div class="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-900"></div>
                            <div class="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-900"></div>
                            <div class="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-900"></div>
                            <div class="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-900"></div>
                        </div>
                        <span class="sr-only">Loading...</span>
                    </div>

                </div>
                <div className={'relative h-[500px] overflow-y-scroll shadow-sm m-1 shadow-gray-800 p-3 w-2/5 custom-scrollbar'}>
                    <div className={'sticky top-0 bg-gray-950'}>
                        <div className={'flex justify-between shadow-gray-800 shadow-sm p-2'}>
                            <h1 className={'text-2xl flex items-center'}>
                                My Artworks
                            </h1>
                            <button
                                onClick={handleAddButtonClick}
                                className={'flex text-xl bg-green-400 p-2 rounded-sm hover:bg-green-500 hover:scale-105 active:scale-95 duration-300 transition-all focus:outline-none focus:border-none'}>
                                Add<AiOutlinePlus size={25} />
                            </button>
                        </div>
                    </div>
                    {
                        details ? (<div className={''}>
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
                                                <AiFillEdit
                                                    onClick={()=>handleEditButton(artwork)}
                                                    title={'Edit'}
                                                    size={'20'}
                                                    className={'hover:scale-110 active:scale-90 duration-300 transition-all'}/>
                                                <AiFillDelete
                                                    onClick={()=>handleDeleteButton(artwork.id, artwork.name)}
                                                    title={'Delete'}
                                                    size={'20'}
                                                    className={'hover:scale-110 active:scale-90 duration-300 transition-all'}
                                                />
                                            </div>
                                            <div className={'text-gray-400'}>
                                                {getTimeAgo(artwork.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>) : (
                            <div className={'w-full'}>
                                <div className={'h-[92px] bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-full my-2'}></div>
                                <div className={'h-[92px] bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-full my-2'}></div>
                                <div className={'h-[92px] bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-full my-2'}></div>
                                <div className={'h-[92px] bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-full my-2'}></div>
                            </div>
                        )
                    }
                </div>
            </div>
            <OrdersDashboard/>
            <div className={'flex justify-between shadow-gray-800 shadow-sm my-4 h-16'}>
                <div className={'flex items-center p-2 shadow-gray-800 shadow-sm m-2'}>
                    {
                        details ? (
                            <p>
                                [TOTAL LIKES]
                            </p>
                        ):(
                            <p className={'bg-gray-800 rounded-sm dark:bg-gray-900 animate-pulse w-[40px]'}></p>
                        )
                    }

                     <AiFillHeart size={25} className={'ml-2'}/>
                </div>
                <div className={'flex items-center p-2 shadow-gray-800 shadow-sm m-2'}>
                    <p>
                        [TOTAL ARTWORKS SOLD: ]
                    </p>
                     <AiFillDollarCircle size={25} className={'ml-2'}/>
                </div>
                <div className={'flex items-center group p-2 shadow-gray-800 shadow-sm m-2'}>
                    <p>
                        Become a featured artist
                    </p>
                     <AiFillCrown size={25} className={'ml-2 group-hover:text-yellow-500 group-hover:scale-110 active:scale-90 duration-300 transition-all transform'}/>
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
            {
                deleteBox && (
                    <div className={'z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'}>
                        <div className={'flex flex-col justify-between bg-gray-950 shadow-gray-800 shadow-sm rounded-sm p-4 w-[300px] h-[150px]'}>
                            <p>Are you sure, you want to delete '{deleteName}'?</p>
                            <div className={'text-xl flex justify-around'}>
                                <button className={'shadow-sm shadow-gray-800 w-14 rounded-sm p-1 hover:scale-105 active:scale-95 duration-300 transition-all'} onClick={deleteArtwork}>Yes</button>
                                <button className={'shadow-sm shadow-gray-800 w-14 rounded-sm p-1 hover:scale-105 active:scale-95 duration-300 transition-all'} onClick={()=>setDeleteBox(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                updateBox && (
                    <ArtworksUpdateForm artwork={updateArtwork} onUpdate={handleUpdateComplete} />
                )
            }
        </main>
    );
};

export default Dashboard;
