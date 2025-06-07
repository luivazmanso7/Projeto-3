"use client";
import { FaBell, FaUserCircle, FaPlus, FaCog } from 'react-icons/fa';

export default function DashboardTopbar() {
    return (
        <header className="flex items-center justify-between h-16 px-8 bg-[#333] text-white ml-56 shadow z-10 sticky top-0">
            <div className="flex-1 flex items-center">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-96 px-4 py-2 rounded bg-[#eee] text-[#281719] focus:outline-none focus:ring-2 focus:ring-[#9BB61B]"
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="hover:text-[#9BB61B]">
                    <FaBell size={22} />
                </button>
                <button className="hover:text-[#9BB61B]">
                    <FaPlus size={22} />
                </button>
                <button className="hover:text-[#9BB61B]">
                    <FaCog size={22} />
                </button>
                <button className="ml-2">
                    <FaUserCircle size={32} />
                </button>
            </div>
        </header>
    );
} 