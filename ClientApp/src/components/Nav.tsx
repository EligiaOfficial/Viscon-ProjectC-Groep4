/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import {useRef, useState} from "react";
import visconLogo from "../assets/icons/Viscon-Group_logo-gradient.svg";
import flagNL from "../assets/icons/nl.svg";
import flagGB from "../assets/icons/gb.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Nav() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState<boolean>(false);
  const [changeLanguage, setChangeLanguage] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchClicked = (toggle: boolean) => {
    setSearch(toggle);
    if (toggle) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  };

  const logo = () => {
    navigate("/");
  };

  return (
    <div className="z-40 h-[50px] p-1 shadow-b shadow-sm shadow-stone-400 dark:shadow-black flex flex-row justify-between dark:bg-stone-900">
      <img
        className="object-contain h-full cursor-pointer dark:invert"
        src={visconLogo}
        onClick={logo}
      />
      <div className="flex items-center justify-between gap-16 pr-10">
        <div className="z-0 overflow-hidden">
          <div
            onClick={() => searchClicked(true)}
            className={`${
              search ? "" : "translate-x-[200px]"
            } transition ease-in-out duration-300 select-none relative group flex flex-row justify-between items-center gap-2 cursor-pointer`}
          >
            <div className="w-fit min-h-[33px] overflow-hidden border-y border-transparent flex items-center">
              <div
                className={`${
                  search ? "translate-x-[200px]" : ""
                } transition ease-in-out duration-300 border-b border-transparent`}
              >
                <span
                  className={`dark:relative absolute -z-10 left-0 dark:text-white dark:group-hover:text-orange-600`}
                >
                  {t("header.search")}
                </span>
                <span
                  className={`dark:hidden transition ease-in-out duration-300 group-hover:bg-gradient-to-r from-[#2a3180] via-[#199bd8] to-[#07ab9a] group-hover:bg-clip-text group-hover:text-transparent`}
                >
                  {t("header.search")}
                </span>
              </div>
            </div>
            <div
              className={`${
                search ? "rotate-90" : ""
              } transition ease-in-out duration-300 delay-100 h-[26px] w-[26px] flex justify-center items-center `}
            >
              <svg
                className={`object-contain min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] fill-black group-hover:fill-[#07ab9a] dark:invert duration-200 delay-[50ms]`}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path d="M22.4,24a.663.663,0,0,1-.474-.2l-5.333-5.339a3.577,3.577,0,0,1-.4-.481l-1-1.334A9.368,9.368,0,0,1,9.365,18.69H9.334A9.346,9.346,0,0,1,5.3.92,9.322,9.322,0,0,1,16.653,3.548a9.354,9.354,0,0,1-.061,11.67l1.333.922a3.3,3.3,0,0,1,.574.467l5.333,5.34a.667.667,0,0,1-.026.922l-.934.934A.666.666,0,0,1,22.4,24ZM9.365,2.67a6.677,6.677,0,1,0,6.666,6.676A6.679,6.679,0,0,0,9.365,2.67Z" />
              </svg>
            </div>
            <input
              onBlur={() => searchClicked(false)}
              placeholder="How can we help you?"
              ref={searchInputRef}
              className={`w-[200px] transition ease-in-out duration-300 outline-none border-black group-hover:border-[#07ab9a] border-b p-1`}
            />
          </div>
        </div>
        <div
          onClick={() => setChangeLanguage(!changeLanguage)}
          className="z-10 select-none relative group flex flex-row items-center gap-2 cursor-pointer"
        >
          <span className="absolute z-10 dark:relative dark:text-white dark:group-hover:text-orange-600">
            {t("header.language")}
          </span>
          <span className="dark:hidden z-10 transition ease-in-out duration-300 group-hover:bg-gradient-to-r from-[#2a3180] via-[#199bd8] to-[#07ab9a] group-hover:bg-clip-text group-hover:text-transparent">
            {t("header.language")}
          </span>
          <svg
            className="z-10 transition ease-in-out duration-300 delay-[50ms] object-contain max-h-[20px] max-w-[20px] fill-black group-hover:fill-[#07ab9a] dark:invert"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              id="Group_1"
              data-name="Group 1"
              transform="translate(-948 -530)"
            >
              <path
                id="Path_1"
                data-name="Path 1"
                d="M12,0A12,12,0,1,1,0,12,12.006,12.006,0,0,1,12,0m2.557,16H9.442A15.439,15.439,0,0,0,12,21.744,15.459,15.459,0,0,0,14.557,16M7.4,16H2.833a9.971,9.971,0,0,0,6.755,5.716A17.556,17.556,0,0,1,7.4,16m13.767,0H16.6a17.617,17.617,0,0,1-2.175,5.694A10.092,10.092,0,0,0,21.167,16M7.162,10H2.2a10.088,10.088,0,0,0,0,4H7.115a20.028,20.028,0,0,1,.047-4m7.661,0H9.176a18.016,18.016,0,0,0-.053,4h5.753a18.017,18.017,0,0,0-.053-4M21.8,10H16.837a20.1,20.1,0,0,1,.048,4H21.8a10.1,10.1,0,0,0,0-4M9.644,2.271A9.969,9.969,0,0,0,2.833,8H7.486A20.425,20.425,0,0,1,9.644,2.271M12,2.223A18.618,18.618,0,0,0,9.536,8h4.927A18.67,18.67,0,0,0,12,2.223m2.368.069A20.45,20.45,0,0,1,16.513,8h4.654a10.091,10.091,0,0,0-6.8-5.708"
                transform="translate(948 530)"
              />
            </g>
          </svg>
        </div>
        <div
          onMouseLeave={() => setChangeLanguage(false)}
          className={`${
            changeLanguage ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          } rounded-md z-50 select-none w-[140px] absolute right-0 top-0 translate-y-[40px] translate-x-[-10px] grid dark:bg-stone-400 bg-white shadow-md transition-[grid] duration-300 ease-in-out`}
        >
          <div className="overflow-hidden">
            <div className="p-2 grid grid-cols-1 gap-1">
              <div
                onClick={() => {
                  i18n.changeLanguage("en");
                  setChangeLanguage(false);
                }}
                className="flex flex-row items-center gap-2 cursor-pointer hover:bg-stone-400 dark:text-white dark:hover:bg-white rounded-md p-1 dark:hover:text-black"
              >
                <img className="object-contain h-[12px]" src={flagGB} />
                <span>English</span>
              </div>
              <div
                onClick={() => {
                  i18n.changeLanguage("nl");
                  setChangeLanguage(false);
                }}
                className="flex flex-row items-center gap-2 cursor-pointer hover:bg-stone-400 dark:text-white dark:hover:bg-white rounded-md p-1 dark:hover:text-black"
              >
                <img className="object-contain h-[12px]" src={flagNL} />
                <span>Nederlands</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
