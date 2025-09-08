import { useEffect, useMemo, useRef, useState } from "react";
import { API } from "../services/apiService";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-hot-toast'
import AlertModal from "../components/AlertModel";
export default function AdminUsers({ endpoint = "/auth/all-users/" }) {
  const formRef = useRef(null)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [active, setActive] = useState("Active"); // All | Active | Inactive
  const [sortBy, setSortBy] = useState("date_joined_desc"); // date/name/email
  const [page, setPage] = useState(1);
  const [updateUserModel, setUpdateUserModel] = useState(false)
  const pageSize = 10;
  const [formData, setFormData] = useState({});
  const [alertModel, setAlertModel] = useState(false)
  const [alertModel2, setAlertModel2] = useState(false)
  const [deletingUserId, setDeletingUserId] = useState(null)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Updating...')
    try {
      const { data } = await API.put(`/auth/user/${formData.id}`, { data: formData })
      if (data.success) {
        toast.success(data.message, { id: toastId })
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === data.user.id ? data.user : user
          )
        );
        setUpdateUserModel(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Update failed!', { id: toastId });
    }
  };


  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setErr("");

    API.get(endpoint)
      .then((res) => {
        if (ignore) return;
        if (res.data && res.data.success) {
          setUsers(res.data.users || []);
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((err) => {
        if (!ignore) setErr(err.message || "Failed to fetch");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [endpoint]);


  // helpers
  const pill = (ok) =>
    ok
      ? "bg-green-100 text-green-700 border border-green-200"
      : "bg-yellow-100 text-yellow-700 border border-yellow-200";

  const formatDT = (s) => {
    if (!s) return "—";
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;
    return d.toLocaleString();
  };

  // generating random color for the user avatar

  const COLORS = [
    "bg-red-100 text-red-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
    "bg-teal-100 text-teal-700",
    "bg-orange-100 text-orange-700",
  ];

  const assignedColors = new Map(); // store user -> color
  let usedIndexes = new Set();

  const getUniqueColor = (userId) => {
    // If already assigned, return the same
    if (assignedColors.has(userId)) return assignedColors.get(userId);

    // Find first unused color
    let colorIndex;
    for (let i = 0; i < COLORS.length; i++) {
      if (!usedIndexes.has(i)) {
        colorIndex = i;
        break;
      }
    }

    // If palette exhausted, fall back to random HSL
    if (colorIndex === undefined) {
      const h = Math.floor(Math.random() * 360);
      const color = `bg-[hsl(${h},70%,90%)] text-[hsl(${h},80%,30%)]`;
      assignedColors.set(userId, color);
      return color;
    }

    usedIndexes.add(colorIndex);
    assignedColors.set(userId, COLORS[colorIndex]);
    return COLORS[colorIndex];
  };

  const initials = (u) => {
    const f = (u.first_name || "").trim()[0] || "";
    const l = (u.last_name || "").trim()[0] || "";
    return (f + l || (u.email || "?")[0] || "?").toUpperCase();
  };

  // filter + sort
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let arr = users.filter((u) => {
      const matchQ =
        !term ||
        (u.first_name || "").toLowerCase().includes(term) ||
        (u.last_name || "").toLowerCase().includes(term) ||
        (u.email || "").toLowerCase().includes(term);
      const matchRole = role === "All" || (u.role || "") === role;
      const matchActive =
        active === "All" ||
        (active === "Active" && u.is_active && !u.is_removed) ||
        (active === "Inactive" && !u.is_active && !u.is_removed) ||
        (active === "Removed" && u.is_removed);
      return matchQ && matchRole && matchActive;
    });

    arr.sort((a, b) => {
      switch (sortBy) {
        case "name_asc":
          return (a.first_name || "").localeCompare(b.first_name || "");
        case "name_desc":
          return (b.first_name || "").localeCompare(a.first_name || "");
        case "email_asc":
          return (a.email || "").localeCompare(b.email || "");
        case "email_desc":
          return (b.email || "").localeCompare(a.email || "");
        case "date_joined_asc":
          return new Date(a.date_joined || 0) - new Date(b.date_joined || 0);
        case "date_joined_desc":
        default:
          return new Date(b.date_joined || 0) - new Date(a.date_joined || 0);
      }
    });
    return arr;
  }, [users, q, role, active, sortBy]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize);

  useEffect(() => {
    // reset to first page when filters/search change
    setPage(1);
  }, [q, role, active, sortBy]);

  const handleUpdate = (user) => {
    setFormData({
      id: user?.id,
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      role: user?.role || "",
      active: user?.is_active,
    })
    setUpdateUserModel(true)
  }

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...")
    try {
      const { data } = await API.delete(`/auth/user/${deletingUserId}/delete/`)
      if (data.success) {
        toast.success(data.message, { id: toastId })
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === data.user.id ? data.user : user
          )
        );
        setAlertModel(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Deletion failed!', { id: toastId });
    }
  }

  const handleDeleteUserRecord = async () => {
    const toastId = toast.loading("Deleting...")
    try {
      const { data } = await API.delete(`/auth/user/${deletingUserId}/delete/record/`)
      if (data.success) {
        toast.success(data.message, { id: toastId })
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== deletingUserId)
        );
        setAlertModel2(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Deletion failed!', { id: toastId });
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Users</h1>
        <p className="text-gray-600">Superuser view of all registered accounts</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or email…"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All roles</option>
          <option value="Admin">Admin</option>
          <option value="Faculty">Faculty</option>
          <option value="Trainee">Trainee</option>
        </select>

        <select
          value={active}
          onChange={(e) => setActive(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Removed">Removed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date_joined_desc">Newest first</option>
          <option value="date_joined_asc">Oldest first</option>
          <option value="name_asc">Name A→Z</option>
          <option value="name_desc">Name Z→A</option>
          <option value="email_asc">Email A→Z</option>
          <option value="email_desc">Email Z→A</option>
        </select>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[repeat(16,minmax(0,1fr))] gap-3 px-5 py-3 text-xs font-semibold text-gray-500 border-b">
          <div className="col-span-4">User</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Joined</div>
          <div className="col-span-2 text-right">Verified</div>
          <div className="col-span-4 text-right">Action</div>
        </div>

        {/* Content */}
        {loading ? (
          <SkeletonRows />
        ) : err ? (
          <div className="p-6 text-rose-600">
            Failed to load users: <span className="font-mono">{err}</span>
          </div>
        ) : pageItems.length === 0 ? (
          <div className="p-6 text-gray-600">No users found.</div>
        ) : (
          pageItems.map((u) => {
            const colorClass = getUniqueColor(u.id || u.email);
            return (
              <div
                key={u.id}
                className="grid grid-cols-1 md:grid-cols-[repeat(16,minmax(0,1fr))] gap-4 px-5 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* user */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${colorClass} flex items-center justify-center font-semibold`}>
                    {initials(u)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">
                      {(u.first_name || "") + " " + (u.last_name || "") || "—"}
                    </div>
                    <div className="text-sm text-gray-600 truncate">{u.email}</div>
                  </div>
                </div>

                {/* role */}
                <div className="md:col-span-2 flex items-center">
                  <span className="px-2.5 py-1 rounded-full text-xs border bg-gray-100">
                    {u.role || "—"}
                  </span>
                </div>

                {/* active */}
                <div className="md:col-span-2 flex items-center">
                  {console.log(u.is_removed)}
                  {u.is_removed ? <span className={`px-2.5 py-1 rounded-full text-xs bg-rose-100 text-rose-700 border border-rose-200`}>
                    Removed
                  </span> : <span className={`px-2.5 py-1 rounded-full text-xs ${pill(!!u.is_active)}`}>
                    {u.is_active ? "Active" : "Inactive"}
                  </span>}
                </div>

                {/* joined */}
                <div className="md:col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">{formatDT(u.date_joined)}</span>
                </div>

                {/* verified */}
                <div className="md:col-span-2 flex md:justify-end items-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs ${pill(!!u.verified_email_at)}`}>
                    {u.verified_email_at ? "Verified" : "Unverified"}
                  </span>
                </div>
                {/* action buttons */}
                {!u.is_removed ? (<div className="md:col-span-4 flex md:justify-end items-center gap-2">
                  <button
                    type="button"
                    className={`px-3 py-1 text-sm rounded-lg border border-blue-500 text-blue-600 
      hover:bg-blue-50`}
                    onClick={() => handleUpdate(u)}
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className={`px-3 py-1 text-sm rounded-lg border border-rose-500 text-rose-600 
      hover:bg-rose-50`}
                    onClick={() => {
                      setDeletingUserId(u.id);
                      setAlertModel(true);
                    }}
                  >
                    Delete
                  </button>
                </div>) : (<div className="md:col-span-4 flex md:justify-end items-center gap-2">
                  <button
                    type="button"
                    className={`px-3 py-1 text-sm rounded-lg border border-rose-500 text-rose-600 
      hover:bg-rose-50`}
                    onClick={() => {
                      setDeletingUserId(u.id);
                      setAlertModel2(true);
                    }}
                  >
                    Delete User Record
                  </button>
                </div>)}
              </div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5">
        <div className="text-sm text-gray-600">
          Page {pageSafe} of {totalPages} · {filtered.length} users
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe === 1}
            className="px-3 py-2 rounded-lg border bg-white disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={pageSafe === totalPages}
            className="px-3 py-2 rounded-lg border bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* user update model */}
      {updateUserModel && <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm bg-black/30 z-50 flex justify-center items-start md:py-10">
        <div className="bg-white p-6 md:rounded-2xl md:w-[50%] md:h-fit h-full w-full overflow-y-auto relative">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-6">
            <h2 className="md:text-2xl text-xl font-bold text-gray-800">Update user</h2>
            <RxCross2
              title="Close"
              onClick={() => { setUpdateUserModel(false) }}
              className="text-gray-600 hover:text-red-500 cursor-pointer md:text-3xl text-2xl"
            />
          </div>

          {/* Form */}
          <form ref={formRef} noValidate onSubmit={handleUpdateFormSubmit} className="grid grid-cols-1 gap-6 text-gray-700">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              >
                <option value="Trainee">Trainee</option>
                <option value="Faculty">Faculty</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input
                id="name"
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="name" className="text-sm">Active</label>
            </div>



            {/* Footer Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="submit"
                className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition duration-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>}
      <AlertModal
        isOpen={alertModel}
        onClose={() => setAlertModel(false)}
        title="Delete User"
        message={<>
          Are you sure you want to <span className="text-red-600 font-semibold">delete this user?</span>
          <br />
          This action cannot be undone.
        </>}
        type="danger"
        actions={[
          { label: "Delete", type: "danger", onClick: () => handleDelete() },
        ]}
      />
      <AlertModal
        isOpen={alertModel2}
        onClose={() => setAlertModel(false)}
        title="Delete User Record"
        message={<>
          Are you sure you want to <span className="text-red-600 font-semibold">delete this user record?</span>
          <br />
          This action cannot be undone.
        </>}
        type="danger"
        actions={[
          { label: "Delete", type: "danger", onClick: () => handleDeleteUserRecord() },
        ]}
      />
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="divide-y">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="px-5 py-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/5 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-2/5" />
        </div>
      ))}
    </div>
  );
}
