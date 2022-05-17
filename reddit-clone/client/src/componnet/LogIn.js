import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from '../hooks/useLocalStorage';
import { useState } from 'react';

export default function LogIn() {
    const [name, setName] = useLocalStorage('name');
    const [inputName, setInputName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputName) {
            setMessage('Must fill in the field!')
        } else {
            setName(inputName);
            window.location.href='/';
        }
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
            <div className="rounded h-72 p-8 shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px ">
                        <div>
                            <input
                                name="user-name"
                                type="text"
                                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="user name"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                            />
                            {message && <p className="py-2 text-red-500 text-xs italic">{message}</p>}

                        </div>
                        <div >
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center
                                       py-2 px-4 border border-transparent text-sm font-medium
                                       rounded-md text-white bg-green-600 hover:bg-green-700
                                       focus:outline-none focus:ring-2 focus:ring-offset-2
                                       focus:ring-green-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faRightToBracket} className="h-5 w-5 text-green-500 group-hover:text-green-400"
                                        aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}