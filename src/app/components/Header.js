'use client';

import GoogleAuth from "@/app/components/GoogleAuth";

const Header = () => {
    return (
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <strong className="text-2xl text-gray-900">🎨 Moodboard</strong>
            <nav className="space-x-6">
                <GoogleAuth />
            </nav>
        </header>
    )
}

export default Header
