import React from "react";
import { User, LogOut, MapPin } from "lucide-react";

export default function UserMenu({ user, onLogout, onShowPlaces }) {
  return (
    <ul className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mb-2">
      <li className="menu-title px-4 py-2">
        <span className="text-sm font-semibold">
          {user.firstName} {user.lastName}
        </span>
        <span className="text-xs text-base-content/70">{user.email}</span>
      </li>
      <div className="divider my-0"></div>
      <li>
        <button
          onClick={onShowPlaces}
          className="flex items-center gap-3 px-4 py-2"
        >
          <MapPin size={16} />
          My Places
        </button>
      </li>
      <li>
        <a
          href="/profile_settings"
          className="flex items-center gap-3 px-4 py-2"
        >
          <User size={16} />
          Profile Settings
        </a>
      </li>
      <li>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 text-error"
        >
          <LogOut size={16} />
          Logout
        </button>
      </li>
    </ul>
  );
}
