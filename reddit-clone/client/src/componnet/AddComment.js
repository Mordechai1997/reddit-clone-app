import { useState } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import Axios from 'axios';

export default function AddComment({ setOpen, open, id, idComment }) {

    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [name] = useLocalStorage('name');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment) {
            setMessage('Must fill in the field!')
        }
        if (idComment) {
            Axios.post('http://localhost:8080/comments/addcommenttocomment', {
                postedBy: name,
                comment: comment,
                id: id,
                idComment: idComment
            }).then((res) => {
                console.log(res)
            }).catch((e) => { setMessage('Something is wrong Try again') })
        } else {
            Axios.post('http://localhost:8080/comments/addcomment', {
                postedBy: name,
                comment: comment,
                id: id
            }).then((res) => {
                console.log(res)
            }).catch((e) => { setMessage('Something is wrong Try again') })
        }

        setComment('')
        setOpen(false)
    }
    return (
        <>
            {open &&
                <div className="flex  items-center justify-center shadow-lg w-full mt-1">
                    < form
                        className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                <textarea
                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                    name="body"
                                    placeholder='Type Your Comment'
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                >
                                </textarea>
                            </div>
                            {message && <p className="py-2 text-red-500 text-xs italic">{message}</p>}
                            <div className="flex  items-center justify-center">
                                <div className="w-full md:w-full flex items-end  px-3">
                                    <div className="-mr-1">
                                        <input
                                            type='submit'
                                            className="cursor-pointer bg-white text-green-700 font-medium py-1 px-4 border border-green-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                            value='Add' />
                                    </div>
                                </div>
                                <div className="w-full md:w-full flex items-end  px-3">
                                    <div className="-mr-1">
                                        <input
                                            type='button'
                                            className="cursor-pointer bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                            value='Cancel'
                                            onClick={() => setOpen(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form >
                </div >}
        </>

    )
}




