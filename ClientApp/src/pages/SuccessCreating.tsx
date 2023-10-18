import React from 'react';

const SuccessCreating = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md w-3/4">
        <h1 className="text-2xl font-bold mb-4 text-center">Ticket Created Successfully</h1>
        <p>Your ticket has been created successfully. Thank you for your submission!</p>
        <a href="/">Return to Home</a>
      </div>
    </div>
  );
};

export default SuccessCreating;
