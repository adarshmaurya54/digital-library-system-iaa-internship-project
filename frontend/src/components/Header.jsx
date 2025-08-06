import { MdOutlineLocalLibrary } from "react-icons/md";
import img_dgca from "../assets/img_dgca.png"
import img_logo from "../assets/img_logo.png"
import img_bcab from "../assets/img_bcab.png"
import img_airports from "../assets/img_airports.png"
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaTimesSolid } from "react-icons/lia";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";



export default function Header() {
  const [uploadModel, setUploadModel] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hamb, setHamb] = useState(false)
  const [fileData, setFileData] = useState(null);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [category, setCategory] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      title,
      description,
      tags,
      category,
      file: fileData,
    };
    // Show in alert
    alert(`
    Title: ${formData.title}
    Description: ${formData.description}
    Tags: ${formData.tags}
    File Name: ${formData.file?.name || 'No file'}
    File Size: ${formData.file?.size || 'N/A'}
  `);

    // Show in console
    console.log("Uploaded Material Data:", formData);
  };

  return (
    <header className="flex flex-col">
      <div className="bg-gradient-to-r from-[#0257a7] to-[#9bceed] flex justify-between  items-center md:px-10 px-5 py-3">

        <div className="flex flex-col md:items-end space-y-3">
          <div className="flex items-end space-x-3">
            <img
              src={img_logo}
              alt="IAA Logo"
              className="md:h-11 h-9"
            />
            <div className="text-white">
              <h1 className="md:text-lg text-sm leading-4 font-semibold">Indian Aviation Academy</h1>
              <p className="md:text-sm text-xs leading-4">Nurturing Aviation for the Future</p>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-3 ms-[-2px]">
            <MdOutlineLocalLibrary className="inline text-3xl text-white" />
            <p className="capitalize font-semibold text-white">digital library system</p>
          </div>
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
        <div className="text-end md:hidden">
          <LiaTimesSolid onClick={() => setHamb(false)} className="inline cursor-pointer text-2xl" />
        </div>
        <nav className="flex md:flex-row flex-col justify-between md:items-center max-w-7xl mx-auto">
          {/* Left links */}
          <div className="flex md:flex-row flex-col md:gap-6 gap-2">
            {user?.id ? <>
              <NavLink
                onClick={() => setHamb(false)}
                to="/"
                className={linkClasses}
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setHamb(false)}
                to="/dashboard"
                className={linkClasses}
              >
                Dashboard
              </NavLink>
            </> : <>

              <NavLink
                onClick={() => setHamb(false)}
                to="/"
                className={linkClasses}
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setHamb(false)}
                to="/about"
                className={linkClasses}
              >
                About
              </NavLink>
              <NavLink
                onClick={() => setHamb(false)}
                to="/contact"
                className={linkClasses}
              >
                Contact Us
              </NavLink>
            </>}

          </div>

          {/* Right links */}
          <div className="flex md:flex-row flex-col md:gap-6 gap-2 mt-2 md:mt-0">
            {user?.id ? <>
              <NavLink
                onClick={() => setHamb(false)}
                to="/profile"
                className={linkClasses}
              >
                Profile
              </NavLink>
              {user.role == 'Faculty' && <button
                onClick={handleUpload}
                className={linkClasses}
              >
                Upload
              </button>}
              <button
                type="button"
                onClick={handleLogout}
                className={linkClasses}
              >
                Logout
              </button>
            </> : <>
              <NavLink
                onClick={() => setHamb(false)}
                to="/login"
                className={linkClasses}
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => setHamb(false)}
                to="/signup"
                className={linkClasses}
              >
                Signup
              </NavLink>
            </>}

          </div>
        </nav>
      </div>
      {/* {uploadModel && document.body.className'overflow-hidden'} */}
      {uploadModel &&
        <div className="fixed inset-0 overflow-y-auto bg-black backdrop-blur-sm h-full bg-opacity-40 z-50 flex justify-center items-start py-10">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[50%] overflow-y-auto relative">


            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upload Study Material</h2>
              <RxCross2
                onClick={() => setUploadModel(false)}
                className="text-gray-600 hover:text-red-500 cursor-pointer text-3xl absolute top-4 right-5"
              />
            </div>

            {/* Form in 2 columns */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-6 items-center justify-center text-gray-700">

              {/* Left Column */}
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
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
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
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
                  <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
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
                    Upload Material
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