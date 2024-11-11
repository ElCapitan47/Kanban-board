import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as DownArrow } from '../assets/icons_FEtask/down.svg';
import { ReactComponent as DisplayIcon } from '../assets/icons_FEtask/Display.svg';


function DisplayDropdown({grouping,setGrouping,ordering,setOrdering}) {
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility
  const dropdownRef = useRef(null); 

  // Toggle the dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={containerStyle} ref={dropdownRef}>
      <div style={headerStyle} onClick={toggleDropdown}>
        <DisplayIcon/>
        <span style={dropdownLabelStyle}>Display</span>
        <DownArrow/>
      </div>

      {isOpen && (
        <div style={dropdownStyle}>
          <div style={fieldStyle}>
            <span style={{color: '#636363', fontWeight: '500'}}>Grouping</span>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
              style={selectStyle}
            >
              <option value="Status">Status</option>
              <option value="User">User</option>
              <option value="Priority">Priority</option>
            </select>
          </div>
          <div style={fieldStyle}>
            <span style={{color: '#636363', fontWeight: '500'}}>Ordering</span>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              style={selectStyle}
            >
              <option value="Priority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline styles
const containerStyle = {
  width: 'fit-content',
  position: 'relative', // Ensure the dropdown is positioned correctly
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: 'white',
  padding: '5px',
  borderRadius: '5px',
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  gap: '8px',
  border: '1px solid #d3d3d3'
};

const iconStyle = {
  marginRight: '10px',
};

const dropdownLabelStyle = {
  fontSize: '16px',
};

const dropdownStyle = {
  marginTop: '10px',
  backgroundColor: '#f4f4f4', // Lighter grey background
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // A little stronger shadow for better visibility
  padding: '10px',
  borderRadius: '5px',
  position: 'absolute', // Position it absolutely relative to the container
  top: '100%', // Position it directly below the header
  left: '0',
  width: '300px',
  zIndex: '10', // Ensure the dropdown appears on top of other content
};

const fieldStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const selectStyle = {
  width: '125px',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontWeight: '500',  //make it semi bold
};

export default DisplayDropdown;