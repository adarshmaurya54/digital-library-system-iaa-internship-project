import { CheckCircle, ClipboardList, File, FileText, Video, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API } from '../services/apiService'
import dayjs from "dayjs";
import { toast } from 'react-hot-toast'

function AdminApproval() {
  const { user } = useSelector(state => state.auth)
  const [materials, setMaterials] = useState()
  const getAllMaterails = async () => {
    try {
      const { data } = await API('materials/')
      setMaterials(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getAllMaterails()
  }, [])

  const onApprove = async (id) => {
    const toastId = toast.loading("Please wait...")
    try {
      const { data } = await API.patch(`materials/${id}/approve/`)
      if (data.success) {
        toast.success(data.message, { id: toastId })
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onReject = async (id) => {
    const toastId = toast.loading("Please wait...")
    try {
      const { data } = await API.patch(`materials/${id}/reject/`)
      if (data.success) {
        toast.success(data.message, { id: toastId })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8'>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Approval</h1>
        <p className="text-gray-600">Approve the materials uploaded by the faculty</p>
      </div>
      <div className='grid md:grid-cols-4 gap-3'>
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
            <div key={item.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between">

              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-2xl w-[15%]">{fileIcons[item.file_type] || fileIcons.default}</div>
                <div className="flex-1 w-[85%] text-lg">
                  <h2 className="font-semibold text-lg truncate">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-3">{item.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-[#0257a7] px-2 py-1 rounded-full capitalize">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Faculty Info */}
              <div className="mt-4 text-xs text-gray-500">
                Uploaded by:{" "}
                <span className="font-medium">
                  {item.faculty.first_name} {item.faculty.last_name}
                </span>{" "}
                (<a href={`mailto:${item.faculty.email}`} className="text-[#0257a7] hover:underline">
                  {item.faculty.email}
                </a>)
              </div>

              {/* Dates */}
              <div className="text-xs text-gray-400 mt-1">
                Uploaded: {dayjs(item.uploaded_at).format("DD MMM YYYY, HH:mm")}
              </div>

              {/* Status Badge */}
              <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-4 ${statusStyles[item.approval_status]}`}>
                {item.approval_status}
              </div>

              {/* Approve / Reject Actions */}
              {item.approval_status === "Pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => onApprove(item.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-lg hover:bg-green-200 transition"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button
                    onClick={() => onReject(item.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AdminApproval
