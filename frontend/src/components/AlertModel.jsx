import { RxCross2 } from "react-icons/rx";

export default function AlertModal({
  isOpen,
  onClose,
  title = "Confirmation",
  message, // now accepts JSX instead of string
  type = "info", // success | info | warning | danger
  actions = [], // [{ label: "Delete", type: "danger", onClick: fn }]
}) {
  if (!isOpen) return null;

  const typeColors = {
    success: "bg-green-600 hover:bg-green-700 text-white",
    info: "bg-blue-600 hover:bg-blue-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <div className="fixed inset-0 md:p-0 p-6 overflow-y-auto backdrop-blur-sm bg-black/30 z-50 flex justify-center items-center md:py-10">
      <div className="bg-white p-6 rounded-2xl md:w-[40%] h-fit overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 mb-4">
          <h2 className="md:text-2xl text-xl font-bold text-gray-800">
            {title}
          </h2>
          <RxCross2
            title="Close"
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 cursor-pointer md:text-3xl text-2xl"
          />
        </div>

        {/* Body */}
        <div className="text-base text-gray-700">{message}</div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3 flex-wrap">
          {actions.map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                btn.onClick?.();
              }}
              className={`px-4 py-2 rounded-lg transition ${typeColors[btn.type || type]}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
