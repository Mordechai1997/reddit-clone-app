import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Post from "./Post";
import Axios from 'axios';
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [name] = useLocalStorage('name')
  const { isLoading, error, data, isFetching } = useQuery(`repoData${name}`, () =>
    Axios.get(
      "http://localhost:8080/getposts"
    ).then((res) => res.data.posts)
  );
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <BallTriangle color="green" height={120} width={120} />
      </div>
    )
  }
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="">
      {(data && data[0]) ? data.map((element, index) => <Post key={index} dataPost={element} />) :
        <div className="flex justify-center mt-5">
          <a href='http://localhost:3000/publicpost'>
            <p>There are no posts yet, you can be the first</p>
            <button type="button" className="inline-block px-4 py-2   text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              <FontAwesomeIcon icon={faSquarePlus} className="w-3 h-3 mr-1" />
              Add new post
            </button>
          </a>
        </div>

      }
      <div>{isFetching ? "Updating..." : ""}</div>

    </div>
  );
}