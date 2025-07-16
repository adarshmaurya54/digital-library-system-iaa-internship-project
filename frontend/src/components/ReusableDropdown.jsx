import { FaAngleDown } from "react-icons/fa";

export default function ReusableDropdown({
    label,
    options,
    selected,
    setSelected,
    openDropdown,
    setOpenDropdown
}) {
    const isOpen = openDropdown === label;

    const handleSelect = (value) => {
        setSelected(value);
        setOpenDropdown(null); // close after select
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => setOpenDropdown(isOpen ? null : label)}
                className="inline-flex justify-between w-full capitalize h-full text-nowrap text-gray-500 items-center gap-2 bg-white px-4 py-2 rounded-xl border text-sm font-semibold"
            >
                {selected === "" ? label : selected}
                <FaAngleDown />
            </button>

            {isOpen && (
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
