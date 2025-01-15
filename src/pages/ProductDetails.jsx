import React, { useState } from 'react'

export default function ProductDetails() {
    const [currentImage, setCurrentImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState('black')
    const [quantity, setQuantity] = useState(1)

    const images = [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-15%20153656-f8HpwycPm693I8GFOJO235pex75ask.png',
        '/placeholder.svg?height=600&width=600',
        '/placeholder.svg?height=600&width=600',
        '/placeholder.svg?height=600&width=600'
    ]

    const colors = [
        { name: 'Black', value: 'black' },
        { name: 'Gray', value: 'gray-300' },
        { name: 'Red', value: 'red-500' }
    ]

    const reviews = [
        {
            id: 1,
            author: 'John Doe',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 5,
            comment: 'Great product! Exactly what I was looking for.',
            date: '2 days ago'
        },
        {
            id: 2,
            author: 'Jane Smith',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 4,
            comment: 'Good quality but shipping took longer than expected.',
            date: '1 week ago'
        }
    ]

    return (
        <div className="max-w-7xl min-h-screen mx-auto px-4 py-8">
            {/* Product Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square">
                        <span className="absolute top-4 left-4 z-10 bg-black text-white px-2 py-1 text-sm">NEW</span>
                        <span className="absolute top-4 left-16 z-10 bg-emerald-500 text-white px-2 py-1 text-sm">-50%</span>
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                            onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                        >
                            ←
                        </button>
                        <img
                            src={images[currentImage] || "/placeholder.svg"}
                            alt="Product"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                            onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                        >
                            →
                        </button>
                    </div>
                    <div className="flex gap-2 overflow-auto pb-2">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImage(idx)}
                                className={`flex-shrink-0 border-2 rounded-lg ${currentImage === idx ? 'border-blue-500' : 'border-transparent'
                                    }`}
                            >
                                <img src={img || "/placeholder.svg"} alt={`Thumbnail ${idx + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {'★'.repeat(5)}
                            </div>
                            <span className="text-gray-600">11 Reviews</span>
                        </div>
                        <h1 className="text-3xl font-bold">Tray Table</h1>
                        <p className="text-gray-600">
                            Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.
                        </p>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-3xl font-bold">$199.00</span>
                        <span className="text-gray-500 line-through">$400.00</span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Measurements</h3>
                            <p>17 1/2×20 5/8"</p>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Choose Color</h3>
                            <div className="flex gap-2">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.value)}
                                        className={`w-8 h-8 rounded-full bg-${color.value} ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="mt-2 text-gray-700">{colors.find(c => c.value === selectedColor)?.name}</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex items-center border rounded-md">
                                <button
                                    className="px-3 py-2 border-r"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center p-2"
                                />
                                <button
                                    className="px-3 py-2 border-l"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="flex-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                Add to Cart
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                                Report
                            </button>
                            <button className="flex-1 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                                Upvote (24)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

                {/* Post Review */}
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                    <div className="flex items-start gap-4">
                        <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">Your Name</span>
                            </div>
                            <textarea
                                placeholder="Write a comment..."
                                className="w-full p-3 rounded-lg border min-h-[100px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex gap-2">
                                    {'😊 😃 📷 🎥 💝'.split(' ').map((emoji, idx) => (
                                        <button key={idx} className="hover:bg-gray-200 p-1 rounded">
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                    Post Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                            <div className="flex items-start gap-4">
                                <img
                                    src={review.avatar || "/placeholder.svg"}
                                    alt={`${review.author}'s avatar`}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium">{review.author}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400 mb-2">
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

