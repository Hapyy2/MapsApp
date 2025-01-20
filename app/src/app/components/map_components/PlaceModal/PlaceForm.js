import React from "react";
import ColorPicker from "./ColorPicker";

export default function PlaceForm({ formik, isOwner }) {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps("name")}
          className="input input-bordered w-full"
          placeholder="Enter place name"
          disabled={!isOwner}
          readOnly={!isOwner}
        />
        {isOwner && formik.touched.name && formik.errors.name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {formik.errors.name}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label htmlFor="description" className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          id="description"
          {...formik.getFieldProps("description")}
          className="textarea textarea-bordered h-24"
          placeholder="Enter place description"
          disabled={!isOwner}
          readOnly={!isOwner}
        />
        {isOwner && formik.touched.description && formik.errors.description && (
          <label className="label">
            <span className="label-text-alt text-error">
              {formik.errors.description}
            </span>
          </label>
        )}
      </div>

      {isOwner && (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pin Color</span>
            </label>
            <ColorPicker
              value={formik.values.pinColor}
              onChange={(color) => formik.setFieldValue("pinColor", color)}
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Make this place public</span>
              <input
                type="checkbox"
                {...formik.getFieldProps("isPublic")}
                checked={formik.values.isPublic}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        </>
      )}
    </form>
  );
}
