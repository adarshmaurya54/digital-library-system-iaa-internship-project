import React, { useEffect, useState } from 'react'
import { API } from '../services/apiService'
import { ClipboardList, File, FileText, Video } from 'lucide-react'

function Approved() {
    const [materials, setMaterials] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6 // number of cards per page

    const getAllMaterials = async () => {
        try {
            const { data } = await API.get('/materials/approved_or_rejected/')
            setMaterials(data)
        } catch (error) {
            console.error("Error in fetching all the materials :(", error)
        }
    }

    useEffect(() => {
        getAllMaterials()
    }, [])

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = materials.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(materials.length / itemsPerPage)

    return (
        <div className='p-4 md:p-8'>
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Approved or Rejected Materials</h1>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
                {currentItems.map((item, index) => {
                    const statusStyles = {
                        Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
                        Approved: "bg-green-100 text-green-700 border border-green-300",
                        Rejected: "bg-red-100 text-red-700 border border-red-300"
                    }

                    const fileIcons = {
                        mp4: <Video className="text-[#0257a7]" />,
                        docx: <ClipboardList className="text-[#0257a7]" />,
                        pdf: <FileText className="text-[#0257a7]" />,
                        default: <File className="text-[#0257a7]" />
                    }

                    return (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition w-full"
                        >
                            <div
                                onClick={() => {
                                    window.open(`${import.meta.env.VITE_BASEURL}${item.file}`, "_blank")
                                }}
                                className="flex cursor-pointer items-center gap-3 mb-3"
                            >
                                <div className="text-2xl flex-shrink-0">
                                    {fileIcons[item.file_type] || fileIcons.default}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.description}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {item.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-blue-50 text-[#0257a7] px-2 py-1 rounded-full capitalize"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Approval status badge */}
                            <div
                                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${statusStyles[item.approval_status] || ""
                                    }`}
                            >
                                {item.approval_status}
                            </div>

                            <div className="mt-4 text-sm text-gray-500">
                                <div className='mb-2'>Uploaded by:</div>
                                <div className="font-medium text-xs">
                                    {item.faculty.first_name} {item.faculty.last_name}
                                </div>
                                <a
                                    href={`mailto:${item.faculty.email}`}
                                    className="text-[#0257a7] hover:underline"
                                >
                                    {item.faculty.email}
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pagination controls */}
            {materials.length > itemsPerPage && (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-[#0257a7] text-white" : ""}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default Approved
