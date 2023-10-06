import React, { useState } from 'react';
import axios from 'axios';

const ArtworksUpdateForm = ({ artwork, onUpdate }) => {
    const [artworkName, setArtworkName] = useState(artwork.name);
    const [artUrl, setArtUrl] = useState(artwork.imageUrl);
    const [price, setPrice] = useState(artwork.price);
    const [discount, setDiscount] = useState(artwork.discount);
    const [paintingType, setPaintingType] = useState(artwork.paintingType);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState(artwork.description);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const artworkData = {
                id: artwork.id,
                name: artworkName,
                imageUrl: artUrl,
                price: price,
                discount: discount,
                paintingType: paintingType,
                description: description
            };

            console.log(artworkData);
            const res = await axios.post('/api/updateArtworks', artworkData);
            console.log('updated successfully', res.data);

            // Call the onUpdate callback to notify the parent component of the update
            onUpdate();

            // Reset the form fields
            setArtworkName('');
            setArtUrl('');
            setPrice('');
            setDiscount('');
            setPaintingType('');
            setDescription('');
        } catch (err) {
            console.error(err);
        }

        setIsLoading(false);
    };

    return (
        <div className={'z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'}>
            <div className="bg-gray-950 shadow-gray-800 shadow-sm rounded-sm p-10 w-10/12">
                <h1 className={'text-3xl'}>Update your artwork details!</h1>
                <form className={'flex flex-col'} onSubmit={handleFormSubmit}>
                    <input
                        className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                        type="text"
                        name="name"
                        placeholder="Artwork Name"
                        defaultValue={artworkName}
                        onChange={(e) => setArtworkName(e.target.value)}
                    />
                    <input
                        className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        defaultValue={artUrl}
                        onChange={(e) => setArtUrl(e.target.value)}
                    />
                    <input
                        className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                        type="number"
                        name="price"
                        placeholder="Enter the Price"
                        defaultValue={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                        type="number"
                        name="discount"
                        step={0.1}
                        placeholder="Enter the discount (if any)"
                        defaultValue={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    <select
                        className={'bg-gray-950 p-2 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                        id="countries"
                        defaultValue={paintingType}
                        onChange={(e) => setPaintingType(e.target.value)}
                    >
                        <option value="">Choose painting type</option>
                        <option value="Acrylic">Acrylic</option>
                        <option value="Oil">Oil</option>
                        <option value="Watercolor">Watercolor</option>
                        <option value="Pastel">Pastel</option>
                        <option value="Encaustic">Encaustic</option>
                    </select>
                    <textarea
                        className={'resize-none bg-gray-950 p-2 h-20 shadow-sm shadow-gray-800 rounded-sm m-1 focus:outline-none'}
                        name="description"
                        placeholder="Enter the description about the art piece"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className={'flex justify-center'}>
                        <button
                            className="text-white p-2 mt-2 text-lg transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArtworksUpdateForm;
