import React, { useEffect, useState } from 'react'
import { API } from '../services/apiService'
import { ClipboardList, File, FileText, Video } from 'lucide-react'
import { useSelector } from 'react-redux'

function UploadedMaterails() {
  const { user } = useSelector(state => state.auth)
  const [materials, setMaterials] = useState()
  const getAllMaterails = async () => {
    try {
      const { data } = await API('faculty/materials/')
      setMaterials(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getAllMaterails()
  }, [])

  if (user?.role !== "Faculty") {
    return <p className="text-center w-full text-xl text-gray-400 mt-20 font-semibold">You've not uploaded anything yet!</p>
  }


  return (
    <div className="grid md:grid-cols-3 p-4 gap-3">
      {materials?.map((item, index) => {
        // Dynamic styles based on status
        const statusStyles = {
          Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
          Approved: "bg-green-100 text-green-700 border border-green-300",
          Rejected: "bg-red-100 text-red-700 border border-red-300"
        };

        const fileIcons = {
          mp4: <Video className="text-[#0257a7]" />,
          docx: <ClipboardList className="text-[#0257a7]" />,
          pdf: <FileText className="text-[#0257a7]" />,
          default: <File className="text-[#0257a7]" />
        };

        return (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition w-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl flex-shrink-0">{fileIcons[item.file_type] || fileIcons.default}</div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            </div>

            {/* Multi-line ellipsis for description */}
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
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${statusStyles[item.approval_status] || ""}`}
            >
              {item.approval_status}
            </div>
          </div>
        );
      })}
    </div>


  )
}

export default UploadedMaterails
