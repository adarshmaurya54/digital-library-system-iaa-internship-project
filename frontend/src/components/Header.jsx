import { MdOutlineLocalLibrary } from "react-icons/md";
import img_dgca from "../assets/img_dgca.png"
import img_logo from "../assets/img_logo.png"
import img_bcab from "../assets/img_bcab.png"
import img_airports from "../assets/img_airports.png"
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaTimesSolid } from "react-icons/lia";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { API } from "../services/apiService";
import { FiMinimize2 } from "react-icons/fi";





export default function Header() {
  const formRef = useRef(null);
  const [uploadModel, setUploadModel] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hamb, setHamb] = useState(false)
  const [fileData, setFileData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [category, setCategory] = useState('')
  const [formEmpty, setFormEmpty] = useState(true)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file)
      setFileData({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB'
      });
    }
  };
  const linkClasses = ({ isActive }) =>
    `relative py-2 w-fit border-b-[3px] transition 
     ${isActive ? "border-yellow-400" : "border-transparent hover:border-yellow-400"}`;

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    dispatch(logout()); // Dispatch logout action to set user to null
    toast.success("Logout successful");
    navigate('/login')
  };

  const handleUpload = () => {
    setHamb(false)
    setUploadModel(true)
  }

  const handleModelReset = () => {
    setTitle('')
    setDescription('')
    setCategory('')
    setTags('')
    setUploadedFile(null)
  }

  const isFormEmpty = () => {
    if (title?.trim() || description?.trim() || tags?.trim() || category || uploadedFile) {
      setFormEmpty(false)
    } else {
      setFormEmpty(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title?.trim() || !description?.trim() || !category || !uploadedFile) {
      toast.error("Please fill in all (*) fields before uploading.");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("file", uploadedFile);

    const toastId = toast.loading("Uploading...")

    // Send to Django backend
    try {
      const { data } = await API.post("materials/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message, { id: toastId })
        handleModelReset()
        setUploadModel(false)
      }


    } catch (error) {
      // If error response exists, show the message(s)
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        Object.entries(errorData).forEach(([key, value]) => {
          toast.error(`${key}: ${Array.isArray(value) ? value.join(', ') : value}`, { id: toastId });
        });
      } else {
        toast.error("Upload failed. Please try again.", { id: toastId });
      }

      console.error("Upload failed:", error);
    }
  };

  // defining the role based navigation
  const navLinks = {
    Admin: {
      left: [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/manage-users", label: "Manage Users" },
        { to: "/publish", label: "Approve & Publish" },
      ],
      right: [
        { to: "/profile", label: "Profile" },
        { to: "/reports", label: "Reports" },
      ]
    },
    Faculty: {
      left: [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/upload-history", label: "Upload History" },
        { onClick: handleUpload, label: "Upload", isButton: true }
      ],
      right: [
        { to: "/profile", label: "Profile" },
      ]
    },
    Trainee: {
      left: [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
      ],
      right: [
        { to: "/profile", label: "Profile" }
      ]
    },
    Guest: {
      left: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact Us" },
      ],
      right: [
        { to: "/login", label: "Login" },
        { to: "/signup", label: "Signup" }
      ]
    }
  };

  // picking the link based on the role
  const role = user?.role || "Guest";
  const { left, right } = navLinks[role];


  return (
    <header className="flex flex-col">
      <div className="bg-gradient-to-r from-[#0257a7] to-[#9bceed] flex justify-between  items-center md:px-10 px-5 md:py-3 py-5">

        <div className="flex flex-col md:items-end space-y-3">
          <Link to='/' className="flex items-end space-x-3">
            <img
              src={img_logo}
              alt="IAA Logo"
              className="md:h-11 h-9"
            />
            <div className="text-white">
              <h1 className="md:text-lg text-sm leading-4 font-semibold">Indian Aviation Academy</h1>
              <p className="md:text-sm text-xs leading-4">Nurturing Aviation for the Future</p>
            </div>
          </Link>
          {/* <div className="md:hidden flex items-center gap-3 ms-[-2px]">
            <MdOutlineLocalLibrary className="inline text-3xl text-white" />
            <p className="capitalize font-semibold text-white">digital library system</p>
          </div> */}
        </div>

        <div onClick={() => setHamb(true)} className="md:hidden flex cursor-pointer">
          <GiHamburgerMenu className="text-white text-2xl" />
        </div>

        <div className="text-white font-semibold text-lg md:flex flex-col items-center hidden">
          <MdOutlineLocalLibrary className="inline text-3xl text-yellow-300" />Digital Library System
        </div>

        {/* Right: Government, DGCA, AAI logos */}
        <div className="md:flex items-center space-x-6 hidden">
          <img
            src={img_dgca}
            alt="Government of India Logo"
            className="h-20 w-auto"
            title="DGCA"
          />
          <img
            src={img_bcab}
            alt="BCAB Logo"
            className="h-20 w-auto"
            title="BCAB"
          />
          <img
            src={img_airports}
            alt="AAI Logo"
            className="h-20 w-auto"
            title="Airport Authority of India"
          />
        </div>
      </div>
      <div className={`bg-white/90 backdrop-blur-md border-l border-gray-200 py-8 md:py-0 z-50 md:z-[unset] fixed md:relative top-0 right-0 md:h-auto h-full w-[80%] ${!hamb ? 'translate-x-full md:translate-x-0' : 'translate-x-0'} transition-transform duration-300 ease-in-out md:w-full shadow-2xl px-6 overflow-y-auto`}>
        <div className="flex mb-5 items-center justify-between md:hidden">
          <div className="md:hidden text-black flex items-center gap-3 ms-[-2px]">
            <MdOutlineLocalLibrary className="inline text-3xl" />
            <p className="capitalize font-semibold">digital library system</p>
          </div>
          <LiaTimesSolid onClick={() => setHamb(false)} className="inline cursor-pointer text-2xl" />
        </div>
        <nav className="flex md:flex-row flex-col justify-between md:items-center max-w-7xl mx-auto">
          {/* Left side */}
          <div className="flex md:flex-row flex-col md:gap-6 gap-2">
            {left.map((link, i) =>
              link.isButton ? (
                <button key={i} onClick={link.onClick} className={linkClasses + ' border-transparent hover:border-yellow-400 relative'}>
                  {link.label}
                  {link.label.toLowerCase() === 'upload' && !formEmpty && <div className="absolute top-2 -left-1 bg-blue-400 h-2 w-2 rounded-full"></div>}
                </button>
              ) : (
                <NavLink key={i} to={link.to} onClick={() => setHamb(false)} className={linkClasses}>
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex md:flex-row flex-col md:gap-6 gap-2 mt-2 md:mt-0">
            {right.map((link, i) =>
              link.isButton ? (
                <button key={i} onClick={link.onClick} className={linkClasses + ' border-transparent hover:border-yellow-400 relative'}>
                  {link.label}
                </button>
                
              ) : (
                <NavLink key={i} to={link.to} onClick={() => setHamb(false)} className={linkClasses}>
                  {link.label}
                </NavLink>
              )
            )}
            {user?.id && (
              <button onClick={handleLogout} className={linkClasses + ' border-transparent hover:border-yellow-400'}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
      {/* {uploadModel && document.body.className'overflow-hidden'} */}
      {uploadModel &&
        <div className="fixed inset-0 overflow-y-auto bg-black md:backdrop-blur-sm h-full bg-opacity-40 z-50 flex justify-center items-start md:py-5">
          <div className="bg-white p-6 md:rounded-2xl shadow-xl md:w-[50%] w-full overflow-y-auto relative">


            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="md:text-2xl text-xl font-bold text-gray-800">Upload Study Material</h2>
              <div className="flex items-center gap-5">
                <FiMinimize2 title="Minimize" onClick={() => { isFormEmpty(); setUploadModel(false) }} className="text-gray-600 hover:text-blue-300 align-middle cursor-pointer text-2xl" />

                <RxCross2
                  title="Close"
                  onClick={() => { handleModelReset(); setFormEmpty(true); setUploadModel(false) }}
                  className="text-gray-600 hover:text-red-500 cursor-pointer md:text-3xl text-2xl"
                />
              </div>
            </div>

            <form noValidate ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-6 items-center justify-center text-gray-700">
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
                  <textarea
                    name="description"
                    placeholder="Write a short description..."
                    className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="e.g. weather, systems"
                    className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                  <select
                    name="category"
                    className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Aerodynamics">Aerodynamics</option>
                    <option value="Aircraft Systems">Aircraft Systems</option>
                    <option value="Flight Maneuvers">Flight Maneuvers</option>
                    <option value="Aviation Weather">Aviation Weather</option>
                    <option value="Air Law">Air Law</option>
                    <option value="Navigation">Navigation</option>
                    <option value="Radio Communication">Radio Communication</option>
                    <option value="Human Factors">Human Factors</option>
                  </select>
                </div>
              </div>


              {/* Right Column */}
              <div className="space-y-6">
                <div className="md:w-[100%] md:py-3 md:mt-0 mt-10">
                  <div className="w-full">
                    <div className="relative transition-all duration-500 group border-[3px] border-dashed border-gray-300 rounded-3xl p-6 hover:shadow-lg hover:border-black">
                      {
                        fileData ? (
                          <div className="text-center">
                            <p className="text-black font-semibold text-lg">{fileData.name}</p>
                            <p className="text-gray-500 text-sm">{fileData.size}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-3 text-center">
                            <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />
                            <span className="block text-gray-600 font-semibold text-lg group-hover:text-black">
                              Drag & drop your files here
                            </span>
                            <span className="block text-gray-500 font-normal text-sm">
                              or click to upload a file (.pdf, .docx, .pptx, .mp4)
                            </span>
                          </div>
                        )
                      }
                      <input
                        name="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        type="file"
                        accept=".pdf,.docx,.pptx,.mp4"
                        required
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="submit"
                    className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition duration-200"
                  >
                    Upload
                  </button>
                  <button
                    type="reset"
                    onClick={() => setFileData(null)}
                    className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition duration-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </header>
  );
}