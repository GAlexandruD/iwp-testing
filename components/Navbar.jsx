import { useState } from "react";
import ToggleTheme from "./ToggleTheme";

import logo from "../public/static/Logo_I_Want_Please.svg";
import Image from "next/image";
import Link from "next/link";

import Tooltip from "./Tooltip";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800 z-10">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 text-xl font-semibold text-gray-700">
              <Link href={"/"}>
                <a>
                  <Image
                    className="hover:scale-105 transition-all duration-200"
                    src={logo}
                    alt="I want please logo"
                    width={35}
                    height={35}
                  />
                </a>
              </Link>
            </div>

            {
              // <!-- Mobile menu button -->
            }
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`${
                  isOpen ? "" : ""
                } text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400`}
                aria-label="toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${isOpen ? "hidden" : ""} w-6 h-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${isOpen ? "" : "hidden"} w-6 h-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {
            // <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
          }
          <div
            className={`${
              isOpen
                ? "translate-x-0 opacity-90 "
                : "hidden opacity-0 -translate-x-full"
            } absolute inset-x-0 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 items-end mr-4">
              <Link href="/">
                <a className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Home
                </a>
              </Link>
              <Link href="/iwant">
                <a className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  I Want
                </a>
              </Link>
              <Link href="/fastfood">
                <a className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Fastfood
                </a>
              </Link>
              <Link href="/recipes">
                <a className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Recipes
                </a>
              </Link>
              <Link href="/login">
                <a className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Login
                </a>
              </Link>
            </div>

            <div className="flex items-center justify-end mr-10 lg:mr-0 mt-4 lg:mt-0">
              <ToggleTheme />

              <button
                type="button"
                className="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                <div className="w-8 h-8 border-2 border-gray-400 rounded-full">
                  <Tooltip message={`Welcome, Khatab`} position="bottom">
                    <Image
                      width={30}
                      height={30}
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                      className="rounded-full object-cover w-full h-full"
                      alt="avatar"
                    />
                  </Tooltip>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
