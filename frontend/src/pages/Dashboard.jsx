import React, { useEffect, useState } from "react";
import { Search, Funnel, FileText, Video, ClipboardList, File } from "lucide-react";
import { useSelector } from "react-redux";
import { API } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/AlertModel";
import toast from "react-hot-toast";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import ViewMaterial from "./ViewMaterial";
import { RxCross2 } from "react-icons/rx";
import ViewCategories from "./ViewCategories";


export default function Dashboard() {
    const [dateFilter, setDateFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [dateFilterLabel, setDateFilterLabel] = useState("All Time");
    const { user } = useSelector(state => state.auth)
    const [alertModel, setAlertModel] = useState(false);
    const [deletingMaterialId, setDeletingMaterialId] = useState(null)
    const [materials, setMaterials] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // show 6 materials per page
    const [openFilter, setOpenFilter] = useState(false)
    const [openAddCategory, setOpenAddCategory] = useState(false)
    const [openViewCategories, setOpenViewCategories] = useState(false);
    const [newCategory, setNewCategory] = useState('')

    const handleDelete = async () => {
        const toastId = toast.loading("Deleting...")
        try {
            const { data } = await API.delete(`/materials/${deletingMaterialId}/delete/`)
            if (data.success) {
                toast.success(data.message, { id: toastId })
                setAlertModel(false)
                getAllMaterials()
            }
        } catch (error) {
            console.error(error)
            toast.error('Deletion failed!', { id: toastId });
        }
    }

    const getAllMaterials = async () => {
        try {
            const { data } = await API.get('materials/approved/')
            setMaterials(data)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        getAllMaterials()
    }, [])

    const approvedMaterials = materials?.filter(item => item.approval_status === "Approved") || [];

    const filteredMaterials = approvedMaterials.filter(item => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        const matchesType = typeFilter ? item.file_type === typeFilter : true;

        const matchesDate = (() => {
            if (dateFilter === "all") return true;
            const now = new Date();
            const uploaded = new Date(item.uploaded_at);
            if (dateFilter === "1d") {
                return (now - uploaded) <= 24 * 60 * 60 * 1000;
            }
            if (dateFilter === "7d") {
                return (now - uploaded) <= 7 * 24 * 60 * 60 * 1000;
            }
            if (dateFilter === "14d") {
                return (now - uploaded) <= 14 * 24 * 60 * 60 * 1000;
            }
            if (dateFilter === "30d") {
                return (now - uploaded) <= 30 * 24 * 60 * 60 * 1000;
            }
            return true;
        })();

        return matchesSearch && matchesType && matchesDate;
    });


    // Pagination logic
    const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentMaterials = filteredMaterials.slice(indexOfFirst, indexOfLast);

    const formatTimeAgo = (uploadedAt) => {
        const now = new Date();
        const uploaded = new Date(uploadedAt);
        const diff = now - uploaded; // difference in milliseconds

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) {
            return `${seconds}s`;
        } else if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else if (days < 7) {
            return `${days}d`;
        } else if (weeks < 5) {
            return `${weeks}w`;
        } else if (months < 12) {
            return `${months}mo`;
        } else {
            return `${years}y`;
        }
    };

    const handleAddCategory = async () => {
        const loadingToast = toast.loading("Adding category..."); // Show loading toast

        try {
            const { data } = await API.post('materials/categories/add/', { name: newCategory });

            if (data.success) {
                toast.dismiss(loadingToast); // Remove loading toast
                toast.success(data.message || "Category added successfully");
                setNewCategory(""); // Clear input field
            } else {
                toast.dismiss(loadingToast);
                toast.error("Failed to add category");
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error("Error adding category:", error);

            if (error.response && error.response.data && error.response.data.errors) {
                const messages = Object.values(error.response.data.errors).flat().join(" ");
                toast.error(messages);
            } else {
                toast.error("Something went wrong while adding the category");
            }
        }
    };



    return (
        <div className="flex md:flex-row flex-col">
            {/* Sidebar */}
            <aside className="md:w-64 bg-white md:min-h-screen shadow-md p-4">
                <div className="border-b font-semibold pb-3 mb-6 text-sm text-nowrap md:block hidden">
                    <p>Welcome, {user?.first_name + " " + user?.last_name}!</p>
                </div>
                <div className="space-y-3">
                    {/* Filter Toggle Button - ONLY visible on small screens */}
                    <div className="flex md:hidden justify-between w-full cursor-pointer px-4 py-2 rounded-full text-md items-center gap-2 font-medium mb-2 bg-gray-100">
                        <div className="flex items-center gap-2">
                            <Funnel className="w-5 h-5 text-[#0257a7]" />
                            <span>Filters</span>
                        </div>
                        {openFilter ? (
                            <FaCaretDown onClick={() => setOpenFilter(false)} className="w-5 h-5" />
                        ) : (
                            <FaCaretRight onClick={() => setOpenFilter(true)} className="w-5 h-5" />
                        )}
                    </div>

                    {/* Filter Section */}
                    <div
                        className={`space-y-3 ${openFilter ? "block" : "hidden"
                            } md:block`} // always show on md+ screens
                    >
                        <div className="flex flex-wrap gap-4">
                            {/* Type Filter */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="typeFilter" className="text-sm font-medium text-blue-900 mb-1">
                                    All Types
                                </label>
                                <select
                                    id="typeFilter"
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm"
                                >
                                    <option value="">All Types</option>
                                    <option value="pdf">PDF Document</option>
                                    <option value="mp4">Video Document</option>
                                    <option value="pptx">PowerPoint Document</option>
                                    <option value="docx">Word Document</option>
                                </select>
                            </div>

                            {/* Date Filter */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="dateFilter" className="text-sm font-medium text-blue-900 mb-1">
                                    All Time
                                </label>
                                <select
                                    id="dateFilter"
                                    value={dateFilterLabel}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        let filterValue = "all";
                                        if (value === "Past 24 hours") filterValue = "1d";
                                        if (value === "Past Week") filterValue = "7d";
                                        if (value === "Past 2 Weeks") filterValue = "14d";
                                        if (value === "Past Month") filterValue = "30d";
                                        setDateFilter(filterValue);
                                        setDateFilterLabel(value);
                                    }}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm"
                                >
                                    <option>All Time</option>
                                    <option>Past 24 hours</option>
                                    <option>Past Week</option>
                                    <option>Past 2 Weeks</option>
                                    <option>Past Month</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </aside >

            {/* Main Content */}
            < main className="flex-1 p-6" >
                <div className="flex md:flex-row flex-col w-full justify-between md:items-center items-start md:mb-0 mb-3">
                    <div className="py-4">
                        <h1 className="text-3xl font-bold mb-1">Study Materials</h1>
                        <p className="text-gray-600">Explore and find all your learning resources in one place.</p>
                    </div>
                    {user?.role === 'Admin' && <button onClick={() => setOpenAddCategory(true)} className="add-category-btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1e70bf] to-[#0277bd] hover:from-[#0257a7] hover:to-[#014f8c] text-white font-semibold rounded-lg shadow-md transition duration-200 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </button>}
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 border rounded-xl shadow-sm px-3 py-2 md:w-[80%] w-full bg-white">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by catergory, discription and title"
                            className="flex-1 placeholder:text-sm outline-none bg-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {
                    currentMaterials.length === 0 ? (
                        <p className="text-center w-full text-xl text-gray-400 mt-20 font-semibold">No material available!</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {currentMaterials.map((item, index) => {
                                    const fileIcons = {
                                        mp4: <Video className="text-[#0257a7]" />,
                                        docx: <ClipboardList className="text-[#0257a7]" />,
                                        pdf: <FileText className="text-[#0257a7]" />,
                                        default: <File className="text-[#0257a7]" />
                                    };
                                    return (
                                        <div key={index} className="bg-white relative p-4 pb-6 rounded-xl border hover:shadow-md hover:scale-105 transition-all duration-500">
                                            <div onClick={() => {
                                                window.open(`${import.meta.env.VITE_BASEURL}${item.file}`, "_blank");
                                            }} className="flex h-[30%] cursor-pointer items-center justify-center gap-3 mb-3">
                                                <div className="text-2xl w-[15%]">{fileIcons[item.file_type] || fileIcons.default}</div>
                                                <div className="flex-1 w-[85%] text-lg">
                                                    <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                                                    <p className="text-sm text-gray-500">{item.category.name} · <span className="text-gray-400">{formatTimeAgo(item.uploaded_at)}</span></p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start justify-between h-[70%]">
                                                <div className="flex flex-col items-start">
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.tags.map((tag, i) => (
                                                            <span key={i} className="text-xs bg-blue-50 text-[#0257a7] px-2 py-1 rounded-full capitalize">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                {user.role === 'Admin' && (
                                                    <button
                                                        onClick={() => { setAlertModel(true); setDeletingMaterialId(item.id) }}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg shadow-sm transition duration-200 text-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Pagination Section */}
                            {materials.length > itemsPerPage && (
                                <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
                                    <p>
                                        Page {currentPage} of {totalPages} · {approvedMaterials.length} materials
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1 rounded-md border ${currentPage === 1 ? "text-gray-400 border-gray-200" : "hover:bg-gray-100 border-gray-300"}`}>
                                            Prev
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? "text-gray-400 border-gray-200" : "hover:bg-gray-100 border-gray-300"}`}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }
            </main >

            <AlertModal
                isOpen={alertModel}
                onClose={() => setAlertModel(false)}
                title="Delete Material"
                message={
                    <>
                        Are you sure you want to <span className="text-red-600 font-semibold">delete this material?</span>
                        <br />
                        This action cannot be undone.
                    </>
                }
                type="danger"
                actions={[
                    { label: "Delete", type: "danger", onClick: () => handleDelete() },
                ]}
            />
            {openAddCategory && <div className="fixed inset-0 md:p-0 p-6 overflow-y-auto backdrop-blur-sm bg-black/30 z-50 flex justify-center items-center md:py-10">
                <div className="bg-white p-6 rounded-2xl md:w-[40%] w-full h-fit overflow-y-auto relative">
                    {/* Header */}
                    <div className="flex justify-between items-center pb-3 mb-4">
                        <h2 className="md:text-2xl text-xl font-bold text-gray-800">
                            Add Category
                        </h2>
                        <RxCross2
                            title="Close"
                            onClick={() => setOpenAddCategory(false)}
                            className="text-gray-600 hover:text-red-500 cursor-pointer md:text-3xl text-2xl"
                        />
                    </div>
                    <div className="mb-3">
                        <button onClick={() => setOpenViewCategories(true)} className="flex items-center gap-1 mb-3 px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full text-xs font-medium transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            View All Categories
                        </button>
                        <ViewCategories openViewCategories={openViewCategories} setOpenViewCategories={setOpenViewCategories} />
                        <label className="block mb-2 text-sm font-medium text-gray-700">Category Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="Enter catergory"
                            className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            required
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                    </div>
                    <div className="text-end">
                        <button
                            onClick={() => handleAddCategory()}
                            type="submit"
                            className="inline-block w-fit bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition duration-200"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>}
        </div >
    );
}

