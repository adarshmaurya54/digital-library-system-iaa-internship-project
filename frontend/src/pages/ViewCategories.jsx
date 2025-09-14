import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../services/apiService";

export default function ViewCategories({ openViewCategories, setOpenViewCategories }) {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (openViewCategories) {
            fetchCategories();
        }
    }, [openViewCategories]);

    const fetchCategories = async () => {
        try {
            const { data } = await API.get('materials/categories/');
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories");
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            await API.delete(`materials/categories/${categoryId}/delete/`);
            setCategories(categories.filter(cat => cat.id !== categoryId));
            toast.success("Category deleted successfully");
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category");
        }
    };

    // Filter categories based on search term
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!openViewCategories) return null;

    return (
        <div className="fixed inset-0 p-6 overflow-y-auto backdrop-blur-sm bg-black/20 z-50 flex justify-center items-center md:py-10">
            <div className="bg-white p-6 rounded-2xl md:w-[50%] w-full max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
                    <h2 className="md:text-2xl text-xl font-bold text-gray-800">All Categories</h2>
                    <RxCross2
                        title="Close"
                        onClick={() => setOpenViewCategories(false)}
                        className="text-gray-600 hover:text-red-500 cursor-pointer md:text-3xl text-2xl"
                    />
                </div>

                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: '60vh' }}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <div key={category.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                                <span className="text-gray-800 font-medium">{category.name}</span>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-full text-xs font-medium transition duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm text-center">No categories found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
