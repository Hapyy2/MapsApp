import React, { useState, useCallback } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import UserMenu from "./UserMenu";
import MyPlacesModal from "./MyPlacesModal";

export default function UserControl() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showMyPlaces, setShowMyPlaces] = useState(false);
  const currentUser = authService.getCurrentUser()?.user;

  const handleLogout = useCallback(() => {
    authService.logout();
    router.push("/login");
  }, [router]);

  const handleShowPlaces = useCallback(() => {
    setIsOpen(false);
    setShowMyPlaces(true);
  }, []);

  if (!currentUser) return null;

  return (
    <>
      <div className="absolute left-3 bottom-3 z-10">
        <div className="bg-base-100 rounded-lg shadow-lg">
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-square bg-base-100 rounded-lg w-12 h-12"
            >
              <User size={24} />
            </div>
            {isOpen && (
              <UserMenu
                user={currentUser}
                onLogout={handleLogout}
                onShowPlaces={handleShowPlaces}
              />
            )}
          </div>
        </div>
      </div>

      <MyPlacesModal
        isOpen={showMyPlaces}
        onClose={() => setShowMyPlaces(false)}
      />
    </>
  );
}
