import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar({name}) {

    return (
        <nav className="relative w-full flex w-full flex  justify-between px-6 py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar "
        >
            <div className="w-full flex  justify-between px-6">
                <div
                    className="flex "
                    id="navbarSupportedContent"
                >

                    <ul className="navbar-nav flex  pl-0 list-style-none mr-auto">

                        <li className="nav-item p-2">
                            <p
                                className="cursor-default nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"

                            ><FontAwesomeIcon icon={faUser} /> Hi {name}</p>
                        </li>

                    </ul>
                </div>


                <div className="dropdown relative">
                    <a href='http://localhost:3000/publicpost'>
                        <button type="button" className="inline-block px-4 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faSquarePlus} className="w-3 h-3 mr-1" />
                            Add new post
                        </button>
                    </a>
                </div>
            </div>
        </nav>
    )
}