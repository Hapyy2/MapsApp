import React from "react";
import { X } from "lucide-react";

export const SearchInput = React.forwardRef(
  ({ placeholder, onClear, rightElement = null }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <button onClick={onClear} className="btn btn-ghost btn-sm btn-square">
            <X size={16} />
          </button>
          {rightElement}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
