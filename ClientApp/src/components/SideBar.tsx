import { useState } from "react";

function SideBar() {

    const [menu, setMenu] = useState<bool>(false);

    return (
        <div className={`${menu ? "w-[200px]" : "w-[50px]"} h-[calc(100vh-50px)] absolute z-10 translate duration-300 flex flex-col gap-10 h-full bg-[#07ab9a] overflow-hidden`}>
            <div className="flex flex-row justify-end py-2">
                <div onClick={() => setMenu(!menu)} className={`fill-black hover:fill-white translate duration-300 flex items-center justify-center min-w-[50px] cursor-pointer`}>
                    <svg width="24" height="24">
                        <rect y="2" width="24" height="3"></rect>
                        <rect y="11" width="24" height="3"></rect>
                        <rect y="20" width="24" height="3"></rect>
                    </svg>
                </div>
                <span></span>
            </div>
            <div className="flex flex-col">
                <div className="group flex flex-row justify-start py-2 cursor-pointer">
                    <div className={`flex items-center justify-center min-w-[50px] cursor-pointer`}>
                        <svg className="group-hover:fill-white fill-black translate duration-300" width="24" height="24">
                            <circle cx="12" cy="12" r="12" stroke-width="4" />
                        </svg>
                    </div>
                    <span className="group-hover:text-white translate duration-300">Home</span>
                </div>
                <div className="group flex flex-row justify-start py-2 cursor-pointer">
                    <div className={`flex items-center justify-center min-w-[50px] cursor-pointer`}>
                        <svg className="group-hover:fill-white fill-black translate duration-300" width="24" height="24">
                            <circle cx="12" cy="12" r="12" stroke-width="4"/>
                        </svg>
                    </div>
                    <span className="group-hover:text-white translate duration-300">Archive</span>
                </div>
                <div className="group flex flex-row justify-start py-2 cursor-pointer">
                    <div className={`flex items-center justify-center min-w-[50px] cursor-pointer`}>
                        <svg className="group-hover:fill-white fill-black translate duration-300" width="24" height="24">
                            <circle cx="12" cy="12" r="12" stroke-width="4" />
                        </svg>
                    </div>
                    <span className="group-hover:text-white translate duration-300">New</span>
                </div>
                <div className="group flex flex-row justify-start py-2 cursor-pointer">
                    <div className={`flex items-center justify-center min-w-[50px] cursor-pointer`}>
                        <svg className="group-hover:fill-white fill-black translate duration-300" width="24" height="24">
                            <circle cx="12" cy="12" r="12" stroke-width="4" />
                        </svg>
                    </div>
                    <span className="group-hover:text-white translate duration-300">Critical</span>
                </div>
                <div className="group flex flex-row justify-start py-2 cursor-pointer">
                    <div className={`flex items-center justify-center min-w-[50px] cursor-pointer`}>
                        <svg className="group-hover:fill-white fill-black translate duration-300" width="24" height="24">
                            <circle cx="12" cy="12" r="12" stroke-width="4" />
                        </svg>
                    </div>
                    <span className="group-hover:text-white translate duration-300">Normal</span>
                </div>
            </div>
            <div className="mt-auto">
                <div className="group flex flex-row justify-start py-2 cursor-pointer">
                    <div className={`flex items-center justify-center min-w-[50px] cursor-pointer`}>
                        <svg className="group-hover:fill-white fill-black translate duration-300" width="24" height="24">
                            <circle cx="12" cy="12" r="12" stroke-width="4" />
                        </svg>
                    </div>
                    <span className="group-hover:text-white translate duration-300">Settings</span>
                </div>
                <div className="group flex flex-row justify-start py-2 cursor-pointer">
                    <div className={`flex items-center justify-center min-w-[50px] cursor-pointer`}>
                        <svg className="group-hover:fill-white fill-black translate duration-300" width="24" height="24">
                            <circle cx="12" cy="12" r="12" stroke-width="4" />
                        </svg>
                    </div>
                    <span className="group-hover:text-white translate duration-300">Logout</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar
