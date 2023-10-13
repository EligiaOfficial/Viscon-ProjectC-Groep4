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

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('machine', selectedMachine);
    formData.append('description', description);
    formData.append('expectedAction', expectedAction);
    formData.append('selfTinkering', selfTinkering);
    formData.append('priority', priority);
    
    if (image) {
      formData.append('image', image); // Append the image only if it exists
    }

    const response = await axios.post('/api/ticket/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for file upload
      },
    });

    if (response.status === 201) {
      // Successfully created a ticket, navigate to a success page or wherever you want
      
    }
  } catch (error) {
    console.error('Error creating a ticket:', error);
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
      <div className="bg-white p-4 rounded-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Create a New Ticket</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full hover-bg-blue-700">
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
