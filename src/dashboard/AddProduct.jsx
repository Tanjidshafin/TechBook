import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import AxiosPublic from '../context/AxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import UseProducts from '../hooks/UseProducts';
import IsSubscription from '../hooks/IsSubscription';
import UseAcceptedProduct from '../hooks/UseAcceptedProduct';

const AddProduct = () => {
    const [isSubscription] = IsSubscription()
    const [acceptedProducts] = UseAcceptedProduct()
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const AxiosLink = AxiosPublic()
    const date = new Date()
    const [, productRefetched] = UseProducts()
    const searchedProduct = acceptedProducts.find(product => product?.email === user?.email)
    const [formData, setFormData] = useState({
        name: '',
        tags: ['', '', ''],
        description: '',
        upvoteCounts: parseInt(0),
        externalLinks: {
            website: '',
            github: '',
            twitter: ''
        },
        speciality: 'trending',
        time: date.toLocaleTimeString(),
        mainImage: '',
        images: ['', '', ''],
        email: user.email,
        status: "pending"
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTagChange = (index, value) => {
        const newTags = [...formData.tags];
        newTags[index] = value;
        setFormData(prevState => ({
            ...prevState,
            tags: newTags
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prevState => ({
            ...prevState,
            images: newImages
        }));
    };

    const handleExternalLinkChange = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            externalLinks: {
                ...prevState.externalLinks,
                [key]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (isSubscription) {
                await AxiosLink.post("/add-products", formData)
                    .then(res => {
                        Swal.fire({
                            title: "Your Product is Added",
                            text: "Waiting for the moderator to accept your product. ",
                            icon: "success"
                        });
                    })
                navigate("/dashboard/my-products")
                productRefetched()
            } else {
                if (!searchedProduct) {
                    await AxiosLink.post("/add-products", formData)
                        .then(res => {
                            Swal.fire({
                                title: "Your Product is Added",
                                text: "Waiting for the moderator to accept your product. ",
                                icon: "success"
                            });
                        })
                    navigate("/dashboard/my-products")
                    productRefetched()
                } else {
                    Swal.fire({
                        title: "Limit Exceeded",
                        text: "Product Posting limit exceeded, Please purchase premium membership to post unlimited products",
                        icon: "warning"
                    });
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="text-center mb-2 text-amber-600 text-sm">---What's new?---</div>
            <h1 className="text-center text-2xl font-semibold mb-8">ADD AN ITEM</h1>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                            Product name*
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                            Tags*
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {formData.tags.map((tag, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={tag}
                                    onChange={(e) => handleTagChange(index, e.target.value)}
                                    placeholder={`Tag ${index + 1}`}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                                    required
                                />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                            Description*
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                            required
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm text-gray-600 dark:text-gray-300">
                                Upvote Counts*
                            </label>
                            <input
                                type="number"
                                name="upvoteCounts"
                                value={formData.upvoteCounts}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                            External Links*
                        </label>
                        <div className="space-y-2">
                            <input
                                type="url"
                                placeholder="Website URL"
                                value={formData.externalLinks.website}
                                onChange={(e) => handleExternalLinkChange('website', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                                required
                            />
                            <input
                                type="url"
                                placeholder="GitHub URL"
                                value={formData.externalLinks.github}
                                onChange={(e) => handleExternalLinkChange('github', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                                required
                            />
                            <input
                                type="url"
                                placeholder="Twitter URL"
                                value={formData.externalLinks.twitter}
                                onChange={(e) => handleExternalLinkChange('twitter', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                            Main Image URL*
                        </label>
                        <input
                            type="url"
                            name="mainImage"
                            value={formData.mainImage}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                            Additional Images*
                        </label>
                        <div className="space-y-2">
                            {formData.images.map((image, index) => (
                                <input
                                    key={index}
                                    type="url"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    placeholder={`Image URL ${index + 1}`}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-600"
                                    required
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition-colors"
                    >
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

