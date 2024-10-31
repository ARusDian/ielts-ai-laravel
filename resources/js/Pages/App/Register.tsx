import { asset } from "@/utils/Helper";
import { useState } from "react";
import { router } from "@inertiajs/react";
import React from "react";

export default function Register() {
    const [startError, setStartError] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    console.log('start register');

    return (
        <div className="flex w-[100vw] h-[100vh] flex-col px-20 py-12 gap-10 bg-white">
            <div className="flex flex-col items-center justify-center h-screen">
                <button
                    className="bg-white focus:ring-4 font-medium rounded-lg text-lg px-20 py-10 border border-gray-200 shadow-md hover:shadow-xl"
                    onClick={() => {
                        console.log('button clicked 1');
                        if (userName.length === 0) {
                            setStartError("Please enter your name");
                            return;
                        }

                        console.log('button clicked 2' + userName);
                        router.visit(route("test-speaking"), {
                            data: {
                                username: `${userName}-${new Date().getTime()}`,
                            },
                            replace: true,
                        });
                        console.log('button clicked 3');
                    }}
                >
                    <img
                        src={`${asset("root", "assets/speaking-english.jpg")}`}
                        className="w-[400px]"
                        alt=""
                    />
                    <p className="text-blue-500 text-2xl mt-10">
                        Start Speaking Test
                    </p>
                </button>
                <div className="mt-10 text-gray-800">
                    <label htmlFor="username" className="text-lg mr-5">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="border border-gray-300 rounded-md px-3 py-2 mt-2"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <p className="text-red-500 mt-5">{startError}</p>
            </div>
        </div>
    );
}
