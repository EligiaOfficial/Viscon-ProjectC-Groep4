import React from 'react';
// import jwtDecode from 'jwt-decode'; // Voor JWT-token decoding

const Logout: React.FC = () => {
  const handleLogout = () => {
    
    localStorage.removeItem('jwtToken'); // Remove JWT token from local storage

    
    window.location.href = '/login'; // Sends user back to login page
  };

  return (
    <div>
      <button onClick={handleLogout}>Uitloggen</button>
    </div>
  );
};

export default Logout;
