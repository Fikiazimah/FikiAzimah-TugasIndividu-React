import { useId } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Navbar({ onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();

  // Fungsi untuk menangani input pencarian
  const handleSearchInput = (e) => {
    const query = e.target.value;
    onSearchChange(query); // Mengirimkan query ke parent untuk filter produk
  };

  return (
    <nav className="grid grid-cols-3 justify-between px-24 py-4 bg-[#000000] items-center"> 
      {/* Link Home */}
      <ul>
        <li className="flex items-center justify-center">
          <Link
            to="/"
            className="text-[#F2F4FF] hover:text-[#3C3D37] active:text-[#6F4E37]"
          >
            Home
          </Link>
        </li>
      </ul>

      {/* Input Search */}
      <ul className="flex justify-center items-center">
        <li className="w-full">
          <input
            type="text"
            className="text-black active:text-black focus:text-black px-4 py-2 w-full rounded"
            name="search"
            id={inputId}
            placeholder="Search product or category..."
            onChange={handleSearchInput} // Tangani perubahan input
          />
        </li>
      </ul>

      {/* Kondisi Login */}
      {!isLoggedIn ? (
        <ul className="flex gap-2 justify-end">
          <li className="text-[#F2F4FF] hover:text-[#3C3D37] active:text-[#6F4E37]">
            <button onClick={login}>Sign in</button>
          </li>
          <li>
            <Link
              className="text-[#F2F4FF] hover:text-[#3C3D37] active:text-[#6F4E37]"
              to="/signup"
            >
              Sign up
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex justify-end gap-2">
          <li>
            <Link
              className="text-[#F2F4FF] hover:text-[#3C3D37] active:text-[#6F4E37]"
              to="/cart"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="text-[#F2F4FF] hover:text-[#3C3D37] active:text-[#6F4E37]"
            >
              My Orders
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="text-[#F2F4FF] hover:text-[#3C3D37] active:text-[#6F4E37]"
            >
              Sign out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
