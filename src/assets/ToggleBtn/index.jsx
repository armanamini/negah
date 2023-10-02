import React, { useState } from 'react';



function ToggleButton() {
  const [isChecked, setIsChecked] = useState({isChecked:false});

  const handleToggle = () => {
    setIsChecked({ isChecked: !isChecked.isChecked });
  };

  return (
      <label className="flex items-center cursor-pointer">
        <div className="relative py-3">
          <input
            type="checkbox"
            className="hidden"
            checked={isChecked.isChecked}
            onChange={handleToggle}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div
            className={`dot absolute w-6 h-6 top-2 bg-white rounded-full shadow ${
              isChecked.isChecked ? 'translate-x-full' : 'translate-x-0'
            } transition`}
          ></div>
        </div>
     
      </label>
  );
}

export default ToggleButton;
