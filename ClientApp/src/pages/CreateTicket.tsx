import React, { useState, useEffect } from 'react';
import axios from '../../node_modules/axios/index';


const CreateTicket: React.FC = () => {
  // State for form fields
  const [selectedMachine, setSelectedMachine] = useState('');
  const [description, setDescription] = useState('');
  const [expectedAction, setExpectedAction] = useState('');
  const [selfTinkering, setSelfTinkering] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [priority, setPriority] = useState('Normal'); // Added state for priority

  // State for machines fetched from the API
  const [machines, setMachines] = useState<string[]>([]);

  // State to keep track of form validation errors
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create an array to store validation errors
    const errors: string[] = [];

    if (selectedMachine === '') {
      errors.push('Machine is required.');
    }

    if (description.trim() === '') {
      errors.push('Description is required.');
    }

    if (expectedAction.trim() === '') {
      errors.push('Expected Action is required.');
    }

    if (selfTinkering.trim() === '') {
      errors.push('Self Tinkering information is required.');
    }

    // If there are no validation errors, proceed with form submission
    if (errors.length === 0) {
      try {
        const data = {
          
          machine: selectedMachine,
          description: description,
          priority: priority, 
          expectedAction: expectedAction,
          selfTinkering: selfTinkering,


          

          
        // Add other fields here
      };


        const response = await axios.post('api/ticket/createticket', data);
        
        if (response.status === 200) {
          // Handle the success response, e.g., show a success message
          console.log('Ticket created successfully:', response.data);
        } else {
          // Handle other status codes or error responses
          console.error('Ticket creation failed:', response.data);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error creating ticket:');
      }
        }
        else {
          // Update the validation errors state
          setValidationErrors(errors);
        }
      };

  // Function to fetch machines from the API
  const fetchMachines = async () => {
    try {
      const response = await axios.get('/api/machine/fetchmachines');
      setMachines(response.data);
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

  // Call the fetchMachines function when the component mounts
  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md w-3/4">
        <h1 className="text-2xl font-bold mb-4 text-center">Create a New Ticket</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          {/* Alert for Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="w-full px-2 mb-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {validationErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setValidationErrors([])}>
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.95 5.484a1 1 0 10-1.414 1.414L18.586 10l-4.04 4.102a1 1 0 101.414 1.414l4.052-4.05a1 1 0 000-1.414L14.95 5.484z"/>
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Rest of the form elements */}
          <div className="w-1/6 px-2">
            <label htmlFor="machine" className="block text-gray-600">
              Select a machine:
            </label>
            <select
              id="machine"
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select a machine</option>
              {machines.map((machine) => (
                <option key={machine} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/6 px-2">
            <label htmlFor="description" className="block text-gray-600">
              What do you see happening?
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="w-1/6 px-2">
            <label htmlFor="expectedAction" className="block text-gray-600">
              What do you expect to be done?
            </label>
            <textarea
              id="expectedAction"
              value={expectedAction}
              onChange={(e) => setExpectedAction(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="w-1/6 px-2">
            <label htmlFor="selfTinkering" className="block text-gray-600">
              Have you made any changes to the machine?
            </label>
            <textarea
              id="selfTinkering"
              value={selfTinkering}
              onChange={(e) => setSelfTinkering(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="w-1/6 px-2">
            <label htmlFor="image" className="block text-gray-600">
              Add a photo:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files && e.target.files[0])}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="w-1/6 px-2">
            <label htmlFor="priority" className="block text-gray-600">
              Priority Level:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="w-1/6 px-2">
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-700">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
