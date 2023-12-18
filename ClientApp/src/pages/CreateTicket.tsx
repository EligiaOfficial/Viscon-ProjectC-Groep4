import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getRole} from "../Endpoints/Jwt";
import {UserRoles} from "../UserRoles";
import Layout from "../components/Layout";
import uploadIcon from "../assets/icons/upload.svg";
import whiteCrossIcon from "../assets/icons/white-cross.svg";
import {createTicketAxios, getDepartments, getMachines} from "../Endpoints/Dto";
import ErrorField from "../components/ErrorField";
import {useTranslation} from "react-i18next";

const CreateTicket: React.FC = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const usr_role = getRole(token);

  useEffect(() => {
    // Check user role and redirect if necessary
    if (usr_role === UserRoles.NONE) {
      nav("/login");
    }
  }, [usr_role, nav]);

  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [expectedAction, setExpectedAction] = useState("");
  const [selfTinkering, setSelfTinkering] = useState("");
  const [priority, setPriority] = useState("false");
  const [machines, setMachines] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<any>();
  const [supportedFile, setSupportedFile] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [duplicateFile, setDuplicateFile] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState('');

  const [titleError, setTitleError] = useState("");
  const [machineError, setMachineError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [actionTakenError, setActionTakenError] = useState("");
  const [changesMadeError, setChangesMadeError] = useState("");

  const { t } = useTranslation();

  const allImages: string[] = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "tiff",
    "bpg",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/tiff",
    "image/bpg",
  ];

  const stringToBoolean = (stringValue) => {
    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
        return true;

      case "false":
        return false;

      default:
        throw Error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Language
    title == ""
      ? setTitleError("Please provide a fitting title.")
      : setTitleError("");
    selectedMachine == ""
      ? setMachineError("Select a machine.")
      : setMachineError("");
    description == ""
      ? setDescriptionError("Please fill what's happening")
      : setDescriptionError("");
    expectedAction == ""
      ? setActionTakenError(
          "Please fill in a everything you have done so far to try and fix the problem."
        )
      : setActionTakenError("");
    selfTinkering == ""
      ? setChangesMadeError(
          "Please fill what changes you have made\nIf you have made no changes fill in that you haven't made changes.."
        )
      : setChangesMadeError("");
    selectedDepartment == ""
      ? setDepartmentError("Please select a department that might help you.")
      : setDepartmentError("");

    try {
      const formData: any = new FormData();
      formData.append("title", title);
      formData.append("machine", selectedMachine);
      formData.append("description", description);
      formData.append("priority", stringToBoolean(priority));
      formData.append("expectedAction", expectedAction); // TODO: Rename these
      formData.append("selfTinkering", selfTinkering);
      formData.append("departmentId", selectedDepartment);
      if (usr_role <= UserRoles.VISCON) formData.append("userEmail", userEmail);
      
      if (images.length > 0) {
        images.forEach((image, i) => {
          formData.append(`images`, image, image!.name);
        });
      }
      
      console.log(formData);

      const response = await createTicketAxios(formData)
          .then((res) => {
            if (res.status === 200) {
              console.log("Ticket created successfully:", res.data);
              nav(`/ticket?id=${res.data}`);
            }
          })
          .catch((err) => {
            if (err.response.status === 500) {
              setEmailError("Email Not Found");
            }
          });
      
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const fetchMachines = async () => {
    try {
      const response = await getMachines();
      setMachines(response.data);
    } catch (error) {
      console.error("Error fetching machines:", error);
    }

    getDepartments().then((res) => {
      // console.log(res.data);
      setDepartments(res.data);
    });
  };

  const handleImage = (imageArray: any) => {
    for (let i = 0; i < imageArray.length; i++) {
      setSupportedFile(true);
      setDuplicateFile(false);
      if (allImages.indexOf(imageArray[i].type) === -1) {
        console.log(imageArray[i].type);
        setSupportedFile(false);
        return;
      }
      if (images.length === 0) {
        if (imageArray.length === 1) {
          setImages([...images, imageArray[0]]);
          return;
        }
        setImages([...images, ...imageArray]);
        return;
      }
      for (let j = 0; j < images.length; j++) {
        if (images[j]!.name == imageArray[i].name) {
          setDuplicateFile(true);
          return;
        }
      }
    }
    if (imageArray.length === 1) {
      setImages([...images, imageArray[0]]);
      return;
    }
    setImages([...images, ...imageArray]);
  };

  const handleRemoveImage = (imageName: string) => {
    if (images.length > 0) {
      let newArray: any = images.filter((image) => image!.name !== imageName);
      setImages(newArray);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        {/*<span className="text-2xl py-4">Add Ticket</span>*/}
        <div className="mx-auto bg-white p-8 rounded-lg w-[1000px] shadow-lg space-y-6 dark:bg-stone-400 h-full my-20">
          <h1 className="text-3xl mb-2 text-center text-blue-600 dark:text-stone-600">
            {t("createTicket.title")}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {validationErrors.length > 0 && (
              <div
                className="bg-red-200 border border-red-500 text-red-800 px-5 py-3 rounded relative"
                role="alert"
              >
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
            <div className={"flex w-full"}>
              <div className={"w-full"}>
                <label
                    htmlFor="title"
                    className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.titlelabel")}:
                </label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                />
                {titleError != "" ? <ErrorField error={titleError} /> : null}
              </div>

              { usr_role <= UserRoles.VISCON ? (
                  <div className={"w-full ml-5"}>
                    <label htmlFor="userEmail" className="block text-gray-700 mb-1 font-medium">User Email:</label>
                    <input
                        type="text"
                        id="userEmail"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full border rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    {emailError != "" ? <ErrorField error={emailError} /> : null}
                  </div>
              ) : (
                  <div/>
              )}


            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-start-1">
                <label
                  htmlFor="machine"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.departmentlabel")}
                </label>
                <select
                  id="machine"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                >
                  <option value="">
                    {t("createTicket.form.defaultdepartment")}
                  </option>
                  {departments.map((department) => (
                    <option key={department["id"]} value={department["id"]}>
                      {department["speciality"]}
                    </option>
                  ))}
                </select>
                {descriptionError != "" ? (
                  <ErrorField error={departmentError} />
                ) : null}
              </div>
              <div className="relative row-span-3 flex flex-col">
                <label
                  htmlFor="image"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.medialabel")}:
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleImage(e.dataTransfer.files);
                  }}
                  className={`${
                    supportedFile && !duplicateFile
                      ? "border-stone-600"
                      : "border-red-600"
                  } relative select-none h-full w-full cursor-pointer border rounded-md p-2 shadow-sm active:border-blue-500 border-dashed bg-stone-100 dark:bg-stone-300`}
                >
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    multiple
                    key={images.length}
                    onChange={(e) => {
                      handleImage(e.target.files);
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
                  />
                  <div className="flex flex-row h-full w-full p-4 justify-between gap-4">
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <img className="max-w-[60px]" src={uploadIcon} />
                      <span className="text-stone-600 font-bold">
                        {t("createTicket.form.dragndrop")}
                      </span>
                    </div>
                    <div className="relative h-full border border-stone-400">
                      <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-stone-100 dark:bg-stone-300 py-2 font-bold text-stone-600">
                        {t("createTicket.form.or")}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-center items-center ">
                      <span className="border border-stone-200 px-2 py-1 font-bold bg-stone-200 text-stone-600 rounded-md">
                        {t("createTicket.form.browse")}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`${
                    supportedFile ? "hidden" : ""
                  } absolute top-full left-0 translate-y-1/2 text-red-600`}
                >
                  <ErrorField error={"File type not supported."} />
                </span>
                <span
                  className={`${
                    !duplicateFile ? "hidden" : ""
                  } absolute top-full left-0 translate-y-1/2 text-red-600`}
                >
                  <ErrorField error={"Duplicate files are not allowed."} />
                </span>
              </div>
              <div className="col-start-1">
                <label
                  htmlFor="machine"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.machinelabel")}
                </label>
                <select
                  id="machine"
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                  className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                >
                  <option value="">
                    {t("createTicket.form.defaultmachine")}
                  </option>
                  {machines.map((machine) => (
                      <option key={machine["id"]} value={machine["id"]}>
                        {machine["name"]}
                      </option>
                  ))}
                </select>
                {machineError != "" ? (
                  <ErrorField error={machineError} />
                ) : null}
              </div>
              <div className="col-start-1">
                <label
                  htmlFor="priority"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.urgency")}
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border rounded-md p-3 outline-none shadow-sm  focus:border-blue-500"
                >
                  <option value="false">{t("createTicket.form.no")}</option>
                  <option value="true">{t("createTicket.form.yes")}</option>
                </select>
              </div>
              <div
                className={`${
                  images.length > 0 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                } grid col-span-2 duration-300`}
              >
                <div className="overflow-hidden flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Your uploaded files:
                  </label>
                  <div className="flex flex-row overflow-auto gap-1">
                    {images.map((image) => (
                      <div key={image?.name} className="flex flex-col">
                        <div className="group relative h-[200px] w-[200px]">
                          <img
                            onClick={() => handleRemoveImage(image!.name)}
                            className="hover:scale-110 scale-90 translate-y-1/4 -translate-x-1/4 active:scale-90 w-[30px] h-[30px] z-50 cursor-pointer absolute opacity-0 group-hover:opacity-100 duration-100 top-0 right-0"
                            src={whiteCrossIcon}
                          />
                          <div className="opacity-0 group-hover:opacity-100 duration-200 w-full h-full absolute top-0 left-0 z-20 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
                          <img
                            className={`${
                              previewImage ? "border" : ""
                            } border-blue-500 object-cover h-[200px] w-[200px] cursor-pointer`}
                            src={URL.createObjectURL(image!)}
                            onClick={() => window.open(previewImage, "_blank")}
                          />
                        </div>
                        <span className="italic text-sm max-w-[200px]">
                          {image?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.description1")}
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-md p-3 outline-none shadow-sm  focus:border-blue-500"
                  rows={2}
                />
                {descriptionError != "" ? (
                  <ErrorField error={descriptionError} />
                ) : null}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="expectedAction"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.description2")}
                </label>
                <textarea
                  id="expectedAction"
                  value={expectedAction}
                  onChange={(e) => setExpectedAction(e.target.value)}
                  className="w-full border rounded-md p-3 outline-none shadow-sm  focus:border-blue-500"
                  rows={2}
                />
                {actionTakenError != "" ? (
                  <ErrorField error={actionTakenError} />
                ) : null}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="selfTinkering"
                  className="block text-gray-700 mb-1 font-medium"
                >
                  {t("createTicket.form.description3")}
                </label>
                <textarea
                  id="selfTinkering"
                  value={selfTinkering}
                  onChange={(e) => setSelfTinkering(e.target.value)}
                  className="w-full border rounded-md p-3 outline-none shadow-sm  focus:border-blue-500"
                  rows={2}
                />
                {changesMadeError != "" ? (
                  <ErrorField error={changesMadeError} />
                ) : null}
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-blue-600 dark:bg-stone-600 text-white rounded-md p-3 w-full hover:bg-blue-800 focus:ring-2 focus:ring-offset-2  transition-all ease-in-out duration-300"
                >
                  {t("createTicket.form.submit")}
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
