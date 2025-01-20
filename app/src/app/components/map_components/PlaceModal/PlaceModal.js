import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import placeService from "@/services/placeService";
import authService from "@/services/authService";
import PlaceForm from "./PlaceForm";

const placeValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  isPublic: Yup.boolean(),
  pinColor: Yup.object().shape({
    background: Yup.string().required("Pin color is required"),
    borderColor: Yup.string().required(),
    glyphColor: Yup.string().required(),
  }),
});

export default function PlaceModal({
  isOpen,
  onClose,
  place = null,
  position = null,
  onPlaceChange,
}) {
  const currentUser = authService.getCurrentUser()?.user;
  const isOwner = place ? place.userId === currentUser?.id : true;

  const initialValues = useMemo(
    () => ({
      name: place?.name || "",
      description: place?.description || "",
      isPublic: place?.isPublic || false,
      pinColor: place?.pinColor || {
        background: "#475569",
        borderColor: "#ffffff",
        glyphColor: "#ffffff",
      },
    }),
    [place]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: placeValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (place) {
          const updatedPlace = await placeService.updatePlace(place.id, values);
          onPlaceChange("update", updatedPlace);
        } else if (position) {
          const newPlace = await placeService.addPlace({
            ...values,
            lat: position.lat,
            lng: position.lng,
          });
          onPlaceChange("add", newPlace);
        }
        resetForm();
        onClose();
      } catch (error) {
        console.error("Error saving place:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDelete = async () => {
    if (!isOwner || !place) return;

    try {
      await placeService.deletePlace(place.id);
      onPlaceChange("delete", place);
      onClose();
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {place
                ? isOwner
                  ? "Edit Place"
                  : "View Place"
                : "Add New Place"}
            </h3>
            {place && !isOwner && place.createdBy && (
              <span className="text-sm text-gray-500">
                Created by: {place.createdBy.name}
              </span>
            )}
          </div>

          <PlaceForm formik={formik} isOwner={isOwner} />

          <div className="flex justify-end space-x-2 mt-6">
            {isOwner && place && (
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error"
              >
                Delete
              </button>
            )}
            <button type="button" onClick={onClose} className="btn btn-ghost">
              {isOwner ? "Cancel" : "Close"}
            </button>
            {isOwner && (
              <button
                type="submit"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting || !formik.isValid}
                className="btn btn-primary"
              >
                {formik.isSubmitting
                  ? "Saving..."
                  : place
                  ? "Save Changes"
                  : "Add Place"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
