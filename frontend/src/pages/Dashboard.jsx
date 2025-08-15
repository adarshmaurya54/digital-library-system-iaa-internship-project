import React, { useEffect, useState } from "react";
import { BookOpen, Search, Funnel, Calendar, Download, Bookmark, Upload, User, Settings, FileText, Video, ClipboardList, File } from "lucide-react";
import ReusableDropdown from "../components/ReusableDropdown";
import { useSelector } from "react-redux";
import { API } from "../services/apiService";


export default function Dashboard() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [dateFilter, setDateFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState(""); // "PDF Document", etc.
    const [dateFilterLabel, setDateFilterLabel] = useState("All Time"); // For label control
    const { user } = useSelector(state => state.auth)

    const [materials, setMaterials] = useState(null)

    useEffect(() => {
        const getAllMaterials = async () => {
            try {
                const { data } = await API.get('materials/approved/')
                setMaterials(data)
            } catch (e) {
                console.error(e)
            }
        }

        getAllMaterials()
    }, [])
    const approvedMaterials = materials?.filter(item => item.approval_status === "Approved") || [];

    return (
        <div className="flex md:flex-row flex-col">
            {/* Sidebar */}
            <aside className="md:w-64 bg-white md:h-screen shadow-md p-4">
                <div className="border-b font-semibold pb-3 mb-6 text-sm text-nowrap md:block hidden">
                    <p>Welcome, {user?.first_name + " " + user?.last_name}!</p>
                </div>
                <div className="space-y-3">
                    <div className="flex md:bg-transparent bg-blue-50 cursor-pointer w-fit md:w-auto px-4 py-2 rounded-full text-sm items-center md:justify-center gap-2 font-medium md:mb-2">
                        <Funnel className="md:w-4 md:h-4 w-3 h-3 text-[#0257a7]" />
                        <span>Filters</span>
                    </div>
                    <div className="md:block hidden space-y-3">
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
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
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

                {approvedMaterials.length === 0 ? (
                    <p className="text-center w-full text-xl text-gray-400 mt-20 font-semibold">No material available!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {approvedMaterials.map((item, index) => {
                            const fileIcons = {
                                mp4: <Video className="text-[#0257a7]" />,
                                docx: <ClipboardList className="text-[#0257a7]" />,
                                pdf: <FileText className="text-[#0257a7]" />,
                                default: <File className="text-[#0257a7]" />
                            };
                            return (
                                <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <div className="text-2xl w-[15%]">{fileIcons[item.file_type] || fileIcons.default}</div>
                                        <div className="flex-1 w-[85%] text-lg">
                                            <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="text-xs bg-blue-50 text-[#0257a7] px-2 py-1 rounded-full capitalize">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

