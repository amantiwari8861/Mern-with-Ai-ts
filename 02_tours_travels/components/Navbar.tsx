"use client";
import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomNavLinkProps, NavbarLink } from "@/types/NavbarLink";
import useAuth from "@/hooks/useAuth";
import { RootState } from "@/redux/store";

const navbarLinks: NavbarLink[] = [
  { title: "Home", path: "/" },
  { title: "Signature Collections", path: "/collections" },
  { title: "Indian Escapes", path: "/indian-escapes" },
  { title: "Global Journeys", path: "/global-journeys" },
  { title: "Cart", path: "/cart" },
  // { title: "Honeymoons", path: "/honeymoons" },
  // { title: "Festive Collections", path: "/festive-collections" },
  // { title: "About Us", path: "/about" },
  // { title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const { isLoggedIn,userPrinciple } = useAuth();

  return (
    <nav className="bg-(--neutral) shadow-md sticky top-0 z-50">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <img src="favicon.svg" className="h-8" alt="Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-(--primary)">
            Sukh Travels
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {(isLoggedIn && userPrinciple!=null) ? (
            <UserMenu />
          ) : (
            <>
              <Link href="/sign-in">
                <button className="btn btn-primary ">Login</button>
              </Link>
              <Link href="/sign-up">
                <button className="btn btn-success ml-2">Sign up</button>
              </Link>
            </>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 text-black rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
            {navbarLinks.map((link, index) => (
              <CustomNavLink link={link} index={index} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const UserMenu = () => {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const { logout, userPrinciple } = useAuth();
  const pathname = usePathname();


  const handleLogout = () => {
    console.log("Logout");
    logout();
    setUserMenuOpen(false);
  };

  return (
    <>
      <motion.button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={() => setUserMenuOpen((prev) => !prev)}
        whileTap={{ scale: 0.95 }}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="w-8 h-8 rounded-full"
          src={userPrinciple?.userImage || ""}
          alt="user photo"
          width={32}
          height={32}
        />
      </motion.button>
      {/* Dropdown menu */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            className="z-50 absolute top-8 right-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {userPrinciple?.name}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {userPrinciple?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  href="/dashboard"
                  className={`block px-4 py-2 text-sm ${pathname === "/dashboard"
                    ? "bg-gray-200 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className={`block px-4 py-2 text-sm ${pathname === "/cart"
                    ? "bg-gray-200 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  My Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`block px-4 py-2 text-sm ${pathname === "/settings"
                    ? "bg-gray-200 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CustomNavLink = ({ link, index }: CustomNavLinkProps) => {
  const cartItems = useSelector((state:RootState) => state.cart.cartItems);
  const pathname = usePathname();
  return (
    <li key={index}>
      <Link
        href={link.path}
        className={
          `block py-2 px-3 rounded-sm md:bg-transparent md:p-0 font-semibold
                  ${pathname === link.path ? "text-(--primary) " : "text-black hover:text-(--tertiary)"}`
        }
        aria-current="page"
      >
        {link.title} {link.path === "/cart" ? <>({cartItems.length})</> : null}
      </Link>
    </li>
  );
};
