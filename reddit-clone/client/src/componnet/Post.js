import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMessage,
    faArrowUp,
    faArrowDown,
    faArrowUpFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
import { useQuery } from "react-query";
import Axios from 'axios';
import { BallTriangle } from "react-loader-spinner";

const URL = 'http://localhost:8080';

export default function Post({ dataPost }) {

    const [addComment, setAddComment] = useState(false)
    const [viewComments, setViewComments] = useState(false);
    const { isLoading, error, data, isFetching } = useQuery(`post${dataPost.postId}`, () =>
        Axios.get(
            `${URL}/comments/getcommentsofpost/${dataPost.postId}`
        ).then((res) => res.data.comments)
    );

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <BallTriangle color="green" height={20} width={20} />
            </div>
        )
    }
    if (error) return "An error has occurred: " + error.message;

    const decrementVote = () => {
        Axios.post(`${URL}/decrementvote`, { id: dataPost.postId })
            .then((res) => {
                console.log(res)
            }).catch((e) => console.log(e))
    }
    const incrementVote = () => {
        Axios.post(`${URL}/incrementvote`, { id: dataPost.postId })
            .then((res) => {
                console.log(res)
            }).catch((e) => console.log(e))
    }

    return (
        <div className='mx-auto max-w-md md:max-w-2xl'>
            <div className=" flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto mt-16 max-w-md md:max-w-2xl">
                <div className="flex justify-between px-4 py-6 w-full">
                    {dataPost.image &&
                        <img
                            className="w-20 h-20 object-cover mr-4 shadow"
                            src={`http://localhost:8080/${dataPost.image}`}
                            alt="image" />}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1" >
                            <a href={dataPost.link}> {dataPost.title}</a>
                        </h2>
                        <p className="mt-3 text-gray-700 text-sm">
                            Posted on
                            <span> {dataPost.createdAt + ' '}</span>
                            by <span>{dataPost.postedBy}</span>
                        </p>

                        <div className="cursor-pointer mt-4 flex items-center">
                            <input
                                type='submit'
                                className="cursor-pointer bg-white text-gray-700  py-1 px-2 border border-gray-300 rounded-lg tracking-wide mr-5 hover:bg-gray-100"
                                value='Reply'
                                onClick={() => setAddComment(prev => !prev)}
                            />
                            <div
                                className="flex mr-2 text-gray-700 text-sm mr-8"
                                onClick={() => setViewComments(prev => !prev)}>
                                <FontAwesomeIcon icon={faMessage} className="mr-1" />
                                <span> {dataPost.Ccomment}</span>
                            </div>
                            <div className="cursor-pointer flex mr-2 text-gray-700 text-sm mr-4">
                                <FontAwesomeIcon icon={faArrowUpFromBracket} className="w-4 h-4 mr-1" />
                                <span>share</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-2 ">
                        <FontAwesomeIcon icon={faArrowUp} className="cursor-pointer w-10 h-8" onClick={incrementVote} />
                        <p className="text-center">{dataPost.Cvote}</p>
                        <FontAwesomeIcon icon={faArrowDown} className="cursor-pointer w-10 h-8" onClick={decrementVote} />
                    </div>
                </div>
            </div >
            <AddComment setOpen={setAddComment} open={addComment} id={dataPost.postId} />
            {viewComments &&
                data?.map((element, index) => <Comment key={index} dataComment={element} idPost={dataPost.postId} />)
            }

        </div>

    )
}




