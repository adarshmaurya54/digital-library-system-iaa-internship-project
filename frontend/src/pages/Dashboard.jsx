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


export default function Dashboard() {
    const [dateFilter, setDateFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("");
    const [dateFilterLabel, setDateFilterLabel] = useState("All Time");
    const { user } = useSelector(state => state.auth)
    const [alertModel, setAlertModel] = useState(false);
    const [deletingMaterialId, setDeletingMaterialId] = useState(null)
    const [materials, setMaterials] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // show 6 materials per page
    const navigate = useNavigate()
    const [openFilter, setOpenFilter] = useState(false)
    const [viewMaterialOpen, setViewMaterialOpen] = useState(false)
    const [viewMaterialData, setViewMaterialData] = useState({})

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

    // Pagination logic
    const totalPages = Math.ceil(approvedMaterials.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentMaterials = approvedMaterials.slice(indexOfFirst, indexOfLast);

    return (
        <div className="flex md:flex-row flex-col">
            {/* Sidebar */}
            <aside className="md:w-64 bg-white md:h-screen shadow-md p-4">
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
                                    <option value="pdf">PDF Document</option>
                                    <option value="video">Video Document</option>
                                    <option value="quiz">Quiz Document</option>
                                    <option value="word">Word Document</option>
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
                <h1 className="text-3xl font-bold mb-1">Study Materials</h1>
                <p className="text-gray-600 mb-4">Explore and find all your learning resources in one place.</p>

                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 border rounded-xl shadow-sm px-3 py-2 w-[80%] bg-white">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search materials by title, description or tag..."
                            className="flex-1 outline-none bg-transparent"
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
                                                // setViewMaterialData([{
                                                //     uri: `${import.meta.env.VITE_BASEURL}${item.file}`,
                                                //     fileType: item.file_type,
                                                //     fileName: item.title,
                                                // },])
                                                // setViewMaterialOpen(true)
                                            }} className="flex h-[30%]  cursor-pointer items-center justify-center gap-3 mb-3">
                                                <div className="text-2xl w-[15%]">{fileIcons[item.file_type] || fileIcons.default}</div>
                                                <div className="flex-1 w-[85%] text-lg">
                                                    <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                                                    <p className="text-sm text-gray-500">{item.category}</p>
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
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition duration-200 text-xs">
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
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
            {viewMaterialOpen && <div className="fixed flex items-center justify-center bg-black/20 backdrop-blur-md top-0 left-0 h-full w-full">
                <div className="md:w-[90%] rounded-2xl overflow-hidden md:h-[95%] w-full h-full">
                    <ViewMaterial materialData={viewMaterialData} />
                </div>
            </div>}
        </div >
    );
}

