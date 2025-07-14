
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

// Props:
// label: placeholder when nothing is selected (e.g., "Select Month")
// options: array of options to display (e.g., ["All", "January", "February"])
// selected: currently selected value
// setSelected: setter to update selected value in parent

export default function ReusableDropdown({ label, options, selected, setSelected }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSelect = (value) => {
        setSelected(value);
        setDropdownOpen(false);
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex justify-between w-full capitalize h-full text-nowrap text-gray-500 items-center gap-2 bg-white px-4 py-2 rounded-xl border text-sm font-semibold"
            >
                {selected === "" ? label : selected}
                <FaAngleDown />
            </button>

            {dropdownOpen && (
                <div className="absolute shadow-[0_8px_30px_rgba(0,0,0,0.15)] right-0 mt-2 md:w-48 w-full overflow-hidden bg-white border rounded-xl z-10">
                    <div className="p-1 max-h-[200px] overflow-auto flex flex-col gap-1">
                        <div
                            onClick={() => handleSelect("")}
                            className={`px-4 py-2 font-bold rounded-md text-sm bg-blue-50 cursor-pointer`}
                        >
                            {label}
                        </div>
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-2 rounded-md text-sm hover:bg-blue-50 cursor-pointer ${selected === option && "bg-blue-50"
                                    }`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
