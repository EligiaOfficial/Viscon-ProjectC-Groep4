import { axiosInstance } from "../axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../Endpoints/Jwt";
import { UserRoles } from "../UserRoles";
import Layout from "../components/Layout";

const CreateTicket: React.FC = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const usr_role = getRole(token);
  if (usr_role >= UserRoles.USER) return <div>Error 404</div>

  useEffect(() => {
    // Check user role and redirect if necessary
    if (usr_role === UserRoles.NONE) {
      nav("/login");
    }
  }, [usr_role, nav]);

  const [selectedMachine, setSelectedMachine] = useState("");
  const [description, setDescription] = useState("");
  const [expectedAction, setExpectedAction] = useState("");
  const [selfTinkering, setSelfTinkering] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [priority, setPriority] = useState("Normal");
  const [machines, setMachines] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];

    if (selectedMachine === "") {
      errors.push("Machine is required.");
    }

    if (description.trim() === "") {
      errors.push("Description is required.");
    }

    if (expectedAction.trim() === "") {
      errors.push("Expected Action is required.");
    }

    if (selfTinkering.trim() === "") {
      errors.push("Self Tinkering information is required.");
    }

    if (errors.length === 0) {
      try {
        const formData = new FormData();
        formData.append("machine", selectedMachine);
        formData.append("description", description);
        formData.append("priority", priority);
        formData.append("expectedAction", expectedAction);
        formData.append("selfTinkering", selfTinkering);
        formData.append("departmentId", "1");

        if (image) {
          formData.append("image", image);
        }

        const response = await axiosInstance.post(
          "api/ticket/createticket",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Ticket created successfully:", response.data);
          nav(`/ticket?id=${response.data}`);
        } else {
          console.error("Ticket creation failed:", response.data);
        }
      } catch (error) {
        console.error("Error creating ticket:", error);
      }
    } else {
      setValidationErrors(errors);
    }
  };

  const fetchMachines = async () => {
    try {
      const response = await axiosInstance.get("/api/machine/fetchmachines");
      setMachines(response.data);
    } catch (error) {
      console.error("Error fetching machines:", error);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <Layout>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-blue-600 w-full">
        <div className="bg-white p-10 rounded-lg w-4/5 shadow-2xl space-y-6">
          <h1 className="text-3xl font-bold mb-2 text-center text-blue-900">
            Create a New Ticket
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {validationErrors.length > 0 && (
              <div className="bg-red-200 border border-red-500 text-red-800 px-5 py-3 rounded relative" role="alert">
                {validationErrors.map((error, index) => (
                  <p key={index} className="mb-1">
                    {error}
                  </p>
                ))}
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => setValidationErrors([])}
                >
                  <span className="sr-only">Close alert</span>✕
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="machine" className="block text-gray-700 mb-1 font-medium">
                  Select a machine:
                </label>
                <select
                  id="machine"
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                  className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a machine</option>
                  {machines.map((machine) => (
                    <option key={machine} value={machine}>
                      {machine}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-gray-700 mb-1 font-medium">
                  Priority Level:
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block text-gray-700 mb-1 font-medium">
                  What do you see happening?
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label htmlFor="expectedAction" className="block text-gray-700 mb-1 font-medium">
                  What do you expect to be done?
                </label>
                <textarea
                  id="expectedAction"
                  value={expectedAction}
                  onChange={(e) => setExpectedAction(e.target.value)}
                  className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label htmlFor="selfTinkering" className="block text-gray-700 mb-1 font-medium">
                  Have you made any changes to the machine?
                </label>
                <textarea
                  id="selfTinkering"
                  value={selfTinkering}
                  onChange={(e) => setSelfTinkering(e.target.value)}
                  className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                ></textarea>
              </div>
              <div>
                <label htmlFor="image" className="block text-gray-700 mb-1 font-medium">
                  Add a photo:
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files && e.target.files[0])}
                  className="w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-md p-3 w-full hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ease-in-out duration-300"
                >
                  Create Ticket
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTicket;
