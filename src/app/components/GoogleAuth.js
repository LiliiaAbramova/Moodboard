'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function GoogleAuth() {
    const { data: session } = useSession();

    return (
        <div className="flex items-center space-x-4">
            {!session ? (
                <button
                    onClick={() => signIn('google')}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                    Sign in with Google
                </button>
            ) : (
                <div className="flex items-center space-x-4">
                    <img
                        src={session.user.image}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span>{session.user.name}</span>
                    <span className="text-sm text-gray-600">{session.user.email}</span>
                    <button
                        onClick={() => signOut()}
                        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
