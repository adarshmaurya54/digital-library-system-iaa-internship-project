import React, { useState } from "react";
import { BookOpen, Search, Funnel, Calendar, Download, Bookmark, Upload, User, Settings, FileText, Video, ClipboardList, File } from "lucide-react";
import ReusableDropdown from "../components/ReusableDropdown";

const studyMaterials = [
    {
        title: "Aerodynamics",
        type: "PDF Document",
        description: "Fundamental concepts of aerodynamics and flight mechanics, covering lift, drag...",
        tags: ["Aeronautics", "Physics", "Beginner"],
    },
    {
        title: "Aircraft Systems",
        type: "PDF Document",
        description: "Detailed guide to modern aircraft systems, including hydraulics, pneumatics, and avionics.",
        tags: ["Aircraft", "Systems", "Advanced"],
    },
    {
        title: "Flight Maneuvers",
        type: "Word Document",
        description: "A step-by-step checklist for performing standard flight maneuvers for private pilot training.",
        tags: ["Training", "Checklist", "Practical"],
    },
    {
        title: "Aviation Weather",
        type: "Video Document",
        description: "An engaging video series on meteorology for pilots, covering clouds, fronts, and hazardous...",
        tags: ["Weather", "Meteorology", "Video"],
    },
    {
        title: "Air Law and Regulations",
        type: "PDF Document",
        description: "Comprehensive overview of national and international aviation laws and regulations (DGCA).",
        tags: ["Regulations", "Law", "Theory"],
    },
    {
        title: "Navigation Techniques",
        type: "Video Document",
        description: "Visual guide to VFR and IFR navigation methods, including pilotage, dead reckoning, and radio nav.",
        tags: ["Navigation", "IFR", "VFR", "Video"],
    },
    {
        title: "Radio Communication",
        type: "Quiz Document",
        description: "Interactive quiz to test your knowledge of standard aviation phraseology and ATC...",
        tags: ["Communication", "Quiz", "ATC"],
    },
    {
        title: "Human Factors",
        type: "Word Document",
        description: "A document covering crew resource management (CRM), situational awareness, and...",
        tags: ["Human Factors", "CRM", "Psychology"],
    },
];



export default function Dashboard() {

    const [dateFilter, setDateFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState(""); // "PDF Document", etc.
    const [dateFilterLabel, setDateFilterLabel] = useState("All Time"); // For label control
    return (
        <div className="flex md:flex-row flex-col">
            {/* Sidebar */}
            <aside className="md:w-64 bg-white md:h-screen shadow-md p-4">
                <div className="border-b font-semibold pb-3 mb-6 text-sm text-nowrap md:block hidden">
                    <p>Welcome, Adarsh Maurya!</p>
                </div>
                <div className="space-y-3">
                    <div className="flex bg-blue-50 cursor-pointer w-fit md:w-auto px-4 py-2 rounded-full text-sm items-center md:justify-center gap-2 font-medium md:mb-2">
                        <Funnel className="md:w-4 md:h-4 w-3 h-3 text-[#0257a7]" />
                        <span>Filters</span>
                    </div>
                    <div className="md:block hidden space-y-3">
                        <ReusableDropdown
                            label="All Types"
                            options={["PDF Document", "Video Document", "Quiz Document", "Word Document"]}
                            selected={typeFilter}
                            setSelected={setTypeFilter}
                        />

                        <ReusableDropdown
                            label="All Time"
                            options={["Past 24 hours", "Past Week", "Past 2 Weeks", "Past Month"]}
                            selected={dateFilterLabel}
                            setSelected={(value) => {
                                // Map label back to value for filtering
                                let filterValue = "all";
                                if (value === "Past 24 hours") filterValue = "1d";
                                if (value === "Past Week") filterValue = "7d";
                                if (value === "Past 2 Weeks") filterValue = "14d";
                                if (value === "Past Month") filterValue = "30d";
                                setDateFilter(filterValue);
                                setDateFilterLabel(value);
                            }}
                        />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-1">Study Materials</h1>
                <p className="text-gray-600 mb-4">Explore and find all your learning resources in one place.</p>

                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 border rounded-md shadow-sm px-3 py-2 w-[80%] bg-white">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search materials by title, description or tag..."
                            className="flex-1 outline-none bg-transparent"
                        />
                    </div>

                    {/* <select className="px-4 py-2 border rounded-md">
            <option>All Types</option>
            <option>PDF Document</option>
            <option>Video Document</option>
            <option>Quiz Document</option>
            <option>Word Document</option>
          </select>
          <input type="date" className="px-4 py-2 border rounded-md" /> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {studyMaterials.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                            <div className="flex items-start gap-2 mb-2">
                                <div className="w-[15%]">
                                    {item.type.includes("Video") ? <Video className="text-[#0257a7]" /> :
                                        item.type.includes("Word") ? <ClipboardList className="text-[#0257a7]" /> :
                                            item.type.includes("Quiz") ? <ClipboardList className="text-[#0257a7]" /> :
                                                <File className="text-[#0257a7]" />}
                                </div>
                                <h2 className="font-semibold w-[85%] text-lg truncate">{item.title}</h2>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 truncate">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, i) => (
                                    <span key={i} className="text-xs bg-blue-50 text-[#0257a7] px-2 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

