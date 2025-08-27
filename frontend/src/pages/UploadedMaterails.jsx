import React, { useEffect, useState } from 'react'
import { API } from '../services/apiService'
import { ClipboardList, File, FileText, Video } from 'lucide-react'
import { useSelector } from 'react-redux'

function UploadedMaterials() {
  const { user } = useSelector(state => state.auth)
  const [materials, setMaterials] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // how many cards per page

  const getAllMaterials = async () => {
    try {
      const { data } = await API('/faculty/materials/')
      setMaterials(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getAllMaterials()
  }, [])

  if (user?.role !== "Faculty") {
    return (
      <p className="text-center w-full text-xl text-gray-400 mt-20 font-semibold">
        You've not uploaded anything yet!
      </p>
    )
  }

  // Pagination logic
  const totalPages = Math.ceil(materials.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentMaterials = materials.slice(indexOfFirst, indexOfLast)

  return (
    <div className="p-4">
      {/* Grid for current page materials */}
      <div className="grid md:grid-cols-3 gap-3">
        {currentMaterials.map((item, index) => {
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
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  statusStyles[item.approval_status] || ""
                }`}
              >
                {item.approval_status}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {materials.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <p>
            Page {currentPage} of {totalPages} · {materials.length} materials
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200"
                  : "hover:bg-gray-100 border-gray-300"
              }`}
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200"
                  : "hover:bg-gray-100 border-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadedMaterials
