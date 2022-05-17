import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import AddComment from './AddComment';
import Axios from 'axios';
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

const URL = 'http://localhost:8080/comments/getcommentsofcomment';

export default function Comment({ dataComment, idPost }) {

    const [addComment, setAddComment] = useState(false);
    const [viewComments, setViewComments] = useState(false);
    const { isLoading, error, data, isFetching } = useQuery(`comment${dataComment.commentId}`, () =>
        Axios.get(
            `${URL}/?idcomment=${dataComment.commentId}&idpost=${idPost}`
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
    console.log(data)

    return (
        <div className='w-11/12'>
            <div className="flex  items-center justify-center shadow-sm w-full mt-1">
                <div className="flex justify-between px-4 py-3 w-full">
                    <div>
                        <p className=" font-semibold text-gray-900 -mt-1" >
                            <a > {dataComment.title}</a>
                        </p>
                        <p className="mt-3 text-gray-700 text-sm">Posted on
                            <span> {dataComment.createdAt}</span>{' '}
                            by <span>{dataComment.postedBy}</span>
                        </p>


                    </div>
                    <div className="cursor-pointer mt-4 flex items-center">
                        <div
                            className="flex mr-2 text-gray-700 text-sm mr-8"
                            onClick={() => setViewComments(prev => !prev)}>
                            <FontAwesomeIcon icon={faMessage} className="mr-1" />
                            <span> {dataComment.Ccomment}</span>
                        </div>
                        <input
                            type='submit'
                            className="cursor-pointer bg-white text-gray-700  py-1 px-2 border border-gray-300 rounded-lg tracking-wide ml-5 hover:bg-gray-100"
                            value='Reply'
                            onClick={() => setAddComment(prev => !prev)}
                        />
                    </div>
                </div>
            </div >
            <AddComment
                setOpe={setAddComment}
                open={addComment}
                id={idPost}
                idComment={dataComment.commentId} />
            {viewComments &&
                data && data?.map((element, index) => <Comment key={index} dataComment={element} idPost={idPost} />)
            }

        </div >

    )
}




