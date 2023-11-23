import axios from '../../node_modules/axios/index';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCompany, getDepartment, getRole} from "../Endpoints/Jwt";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import {UserRoles} from "../UserRoles";

const CreateTicket: React.FC = () => {

  // Navigation Module
  const nav = useNavigate();

  // if not loggedIn redirect to Login
  const token = localStorage.getItem("token");
  const usr_role = getRole(token);
  if (usr_role == UserRoles.NONE) {
    nav('/login')
  }
  
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
    if (usr_role == UserRoles.USER) {
      return;
    }
    e.preventDefault();
    
    // Create an array to store validation errors
    const errors: string[] = [];

    // if not loggedIn redirect to Login
    const token = localStorage.getItem("token");
    const usr_role = getRole(token);
    if (usr_role == 0) {
        nav('/login')
    }

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
        if (usr_role == 4) {
            return;
        }
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

                    Jtw: token,
                    machine: selectedMachine,
                    description: description,
                    priority: priority,
                    expectedAction: expectedAction,
                    selfTinkering: selfTinkering,
                    departmentId: 1, // TODO: Make field for DepartmentId

                    // Add other fields here
                };


                const response = await axios.post('api/ticket/createticket', data);

                if (response.status === 200) {
                    // Handle the success response, e.g., show a success message
                    console.log('Ticket created successfully:', response.data);
                    nav('/success');

                } else {
                    // Handle other status codes or error responses
                    console.error('Ticket creation failed:', response.data);
                }
            } catch (error) {
                // Handle network or other errors
                console.error('Error creating ticket:');
            }
        } else {
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
        <div>
            <div className="h-screen flex flex-col">
                <Nav />
                <div className="flex flex-row relative h-full w-full">
                    <SideBar />
                    <div className="bg-stone-200 h-full w-full">
                        <section className="p-2">
                            <div className="h-100 flex items-center justify-center">
                                <div className="p-5 w-4/5">
                                    <h1 className="text-3xl font-bold mb-2 text-center text-blue-900">Create a New Ticket</h1>
                                    <form onSubmit={handleSubmit} className="space-y-4">

                                        {/* Alert for Validation Errors */}
                                        {validationErrors.length > 0 && (
                                            <div className="bg-red-200 border border-red-500 text-red-800 px-5 py-3 rounded relative"
                                                 role="alert">
                                                {validationErrors.map((error, index) => (
                                                    <p key={index} className="mb-1">{error}</p>
                                                ))}
                                                <button className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                                        onClick={() => setValidationErrors([])}>
                                                    <span className="sr-only">Close alert</span>
                                                    ✕
                                                </button>
                                            </div>
                                        )}

                                        {/* Form elements */}
                                        <div className="grid grid-cols-2 gap-6">

                                            <div>
                                                <label htmlFor="machine" className="block text-gray-700 mb-1 font-medium">Select a
                                                    machine:</label>
                                                <select id="machine" value={selectedMachine}
                                                        onChange={(e) => setSelectedMachine(e.target.value)}
                                                        className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                                    <option value="">Select a machine</option>
                                                    {machines.map((machine) => (
                                                        <option key={machine} value={machine}>
                                                            {machine}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="priority" className="block text-gray-700 mb-1 font-medium">Priority
                                                    Level:</label>
                                                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}
                                                        className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                                    <option value="1">Normal</option>
                                                    <option value="2">High</option>
                                                </select>
                                            </div>


                                            <div className="col-span-2">
                                                <label htmlFor="description" className="block text-gray-700 mb-1 font-medium">What do
                                                    you
                                                    see happening?</label>
                                                <textarea id="description" value={description}
                                                          onChange={(e) => setDescription(e.target.value)}
                                                          className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                          rows={2}></textarea>
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="expectedAction" className="block text-gray-700 mb-1 font-medium">What do
                                                    you
                                                    expect to be done?</label>
                                                <textarea id="expectedAction" value={expectedAction}
                                                          onChange={(e) => setExpectedAction(e.target.value)}
                                                          className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                          rows={2}></textarea>
                                            </div>

                                            <div className="col-span-2">
                                                <label htmlFor="selfTinkering" className="block text-gray-700 mb-1 font-medium">Have you
                                                    made any changes to the machine?</label>
                                                <textarea id="selfTinkering" value={selfTinkering}
                                                          onChange={(e) => setSelfTinkering(e.target.value)}
                                                          className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                          rows={2}></textarea>
                                            </div>

                                            <div>
                                                <label htmlFor="image" className="block text-gray-700 mb-1 font-medium">Add a
                                                    photo:</label>
                                                <input type="file" id="image" accept="image/*"
                                                       onChange={(e) => setImage(e.target.files && e.target.files[0])}
                                                       className="w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                                            </div>

                                            <div className="col-span-2">
                                                <button type="submit"
                                                        className="bg-blue-600 text-white rounded-md p-3 w-full hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ease-in-out duration-300">
                                                    Create Ticket
                                                </button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default CreateTicket;
