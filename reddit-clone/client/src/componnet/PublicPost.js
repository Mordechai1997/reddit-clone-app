import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Axios from 'axios';

export default function PublicPost() {
    const [name] = useLocalStorage('name');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        console.log(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!link || !title) {
            setMessage('*The form must be complited! (*title, *url)')
            return;
        } else {
            if (file) {
                const data = new FormData();
                data.append('file', file);
                const response = await fetch('http://localhost:8080/uploadimage', {
                    method: 'POST',
                    body: data
                }).then((res) => console.log(res))
                    .catch((err) => {
                        console.log(err)
                        setMessage('Something is wrong Try again')
                        return;
                    })
            }
            Axios.post('http://localhost:8080/addPost', {
                name,
                title,
                link,
                fileName
            }).then((res) => {
                console.log(res)
            }).catch((e) => {
                setMessage('Something is wrong Try again')
                return;
            })
            window.location.href = '/';

        }
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
            <div className="rounded p-8 shadow">
                <div>
                    <h2
                        className=" text-green-500 mt-6 text-center text-3xl font-extrabold text-gray-900">
                        NEW POST
                    </h2>
                </div>
                <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px ">
                        <div className="flex justify-center">
                            <div className="mb-3 w-full">
                                <label htmlFor="post-title" className="form-label inline-block mb-2 text-gray-700"
                                >Title
                                </label>
                                <textarea
                                    className="
                                            form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                                    id="post-title"
                                    rows="3"
                                    placeholder="Your message"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="mb-3 w-full">
                                <label htmlFor="url" className="form-label inline-block mb-2 text-gray-700"
                                >Link</label>
                                <input
                                    type="url"
                                    className="
                                            form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                                    id="url"
                                    placeholder="URL input"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="mb-3 w-96">
                                <label htmlFor="formFile"
                                    className="form-label inline-block mb-2 text-gray-700">
                                    Upload image
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    className="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="formFile"
                                    onChange={saveFile} />
                            </div>
                        </div>
                        {message && <p className="py-2 text-red-500 text-s italic">{message}</p>}
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center
                                       py-2 px-4 border border-transparent text-sm font-medium
                                       rounded-md text-white bg-green-600 hover:bg-green-700
                                       focus:outline-none focus:ring-2 focus:ring-offset-2
                                       focus:ring-green-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faSquarePlus} className="h-5 w-5 text-green-500 group-hover:text-green-400"
                                    aria-hidden="true" />
                            </span>
                            Public
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}