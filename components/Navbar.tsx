"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2 shadow-lg"
    >
      <Link href="/">
        <Image src="/logoTh.png" alt="logo" width={100} height={70} />
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 text-base-bold max-lg:hidden">
        {["Home", "Men", "Women", "Kids", "Electronic"].map((item, index) => (
          <motion.div key={index} whileHover={{ scale: 1.1 }} className="relative group">
            <Link
              href={user ? `/${item.toLowerCase()}` : "/sign-in"}
              className={`relative hover:text-red-500 transition ${
                pathname === `/${item.toLowerCase()}` ? "text-red-500" : ""
              }`}
            >
              {item}
              {/* Improved Animated Underline */}
              <motion.div
                className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-red-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-out"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <motion.button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-red-500 transition" />
        </motion.button>
      </div>

      {/* Cart & User Icons */}
      <div className="relative flex gap-3 items-center">
        <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ duration: 0.3 }}>
          <Link
            href="/cart"
            className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white transition max-md:hidden"
          >
            <ShoppingCart />
            <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {dropdownMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden shadow-lg"
            >
              {["Home", "Men", "Women", "Kids", "Electronics"].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                >
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-red-500">
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href={user ? "/cart" : "/sign-in"}
                  className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white transition"
                >
                  <ShoppingCart />
                  <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
