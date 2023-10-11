import { useRef, useState } from "react";
import visconLogo from "../assets/Viscon-Group_logo-gradient.svg";
function Nav() {
    const [search, setSearch] = useState<boolean>(false);
    const [changeLanguage, setChangeLanguage] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const searchClicked = (toggle: boolean) => {
        setSearch(toggle);
        if (toggle) {
            setTimeout(() => { searchInputRef.current?.focus() }, 500);
        }
    }

    const languageToggled = (toggle:boolean) => {
        setChangeLanguage(toggle);
        console.log(changeLanguage);
    }

    return (
        <div className="h-[50px] p-1 shadow-md shadow-b flex flex-row justify-between">
            <img className="object-contain h-full cursor-pointer" src={visconLogo} />
            <div className="flex items-center justify-between gap-16 pr-10">
                <div className="w-fit overflow-hidden">
                    <div onClick={() => searchClicked(true)} onBlur={() => searchClicked(false)} className={`translate-x-[${search ? 0 : 200}px] transition ease-in-out duration-300 select-none relative group flex flex-row justify-between items-center gap-2 cursor-pointer`}>
                        <div className="w-[48px] overflow-hidden">
                            <div className={`translate-x-[${search ? 200 : 0}px] transition ease-in-out duration-300 `}>
                                <span className={`absolute -z-10 left-0`}>Search</span>
                                <span className={`transition ease-in-out duration-300 group-hover:bg-gradient-to-r from-[#2a3180] via-[#199bd8] to-[#07ab9a] group-hover:bg-clip-text group-hover:text-transparent`}>Search</span>
                            </div>
                        </div>
                        <svg className={`rotate-${search ? 90 : 0} transition ease-in-out duration-300 delay-100 object-contain min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] fill-black group-hover:fill-[#07ab9a]`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path d="M22.4,24a.663.663,0,0,1-.474-.2l-5.333-5.339a3.577,3.577,0,0,1-.4-.481l-1-1.334A9.368,9.368,0,0,1,9.365,18.69H9.334A9.346,9.346,0,0,1,5.3.92,9.322,9.322,0,0,1,16.653,3.548a9.354,9.354,0,0,1-.061,11.67l1.333.922a3.3,3.3,0,0,1,.574.467l5.333,5.34a.667.667,0,0,1-.026.922l-.934.934A.666.666,0,0,1,22.4,24ZM9.365,2.67a6.677,6.677,0,1,0,6.666,6.676A6.679,6.679,0,0,0,9.365,2.67Z" />
                        </svg>
                        <input placeholder="How can we help?" ref={ searchInputRef } className={`w-[200px] transition ease-in-out duration-300 outline-none border-black group-hover:border-[#07ab9a] border-b`} />
                    </div>
                </div>
                <div onClick={() => languageToggled(true)} onBlur={() => languageToggled(false)} className="select-none relative group flex flex-row items-center gap-2 cursor-pointer">
                    <span className="absolute -z-10">Language</span>
                    <span className="transition ease-in-out duration-300 group-hover:bg-gradient-to-r from-[#2a3180] via-[#199bd8] to-[#07ab9a] group-hover:bg-clip-text group-hover:text-transparent">Language</span>
                    <svg className="transition ease-in-out duration-300 delay-100 object-contain max-h-[20px] max-w-[20px] fill-black group-hover:fill-[#07ab9a]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="Group_1" data-name="Group 1" transform="translate(-948 -530)">
                            <path id="Path_1" data-name="Path 1" d="M12,0A12,12,0,1,1,0,12,12.006,12.006,0,0,1,12,0m2.557,16H9.442A15.439,15.439,0,0,0,12,21.744,15.459,15.459,0,0,0,14.557,16M7.4,16H2.833a9.971,9.971,0,0,0,6.755,5.716A17.556,17.556,0,0,1,7.4,16m13.767,0H16.6a17.617,17.617,0,0,1-2.175,5.694A10.092,10.092,0,0,0,21.167,16M7.162,10H2.2a10.088,10.088,0,0,0,0,4H7.115a20.028,20.028,0,0,1,.047-4m7.661,0H9.176a18.016,18.016,0,0,0-.053,4h5.753a18.017,18.017,0,0,0-.053-4M21.8,10H16.837a20.1,20.1,0,0,1,.048,4H21.8a10.1,10.1,0,0,0,0-4M9.644,2.271A9.969,9.969,0,0,0,2.833,8H7.486A20.425,20.425,0,0,1,9.644,2.271M12,2.223A18.618,18.618,0,0,0,9.536,8h4.927A18.67,18.67,0,0,0,12,2.223m2.368.069A20.45,20.45,0,0,1,16.513,8h4.654a10.091,10.091,0,0,0-6.8-5.708"
                                transform="translate(948 530)"/>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Nav
