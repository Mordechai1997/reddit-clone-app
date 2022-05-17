import LogIn from './componnet/LogIn';
import NavBar from './componnet/NavBar'
import PublicPost from './componnet/PublicPost'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './componnet/Home';
import useLocalStorage from './hooks/useLocalStorage';

export default function Dashboard() {
    const [name] = useLocalStorage('name');

    return (
        <div>
            <BrowserRouter>
                {name && <NavBar name={name}/>}
                <Routes>
                    {name ? <>
                        <Route path="/" element={<Home />} />
                        <Route path="/publicpost" element={<PublicPost />} />
                    </> :
                        <Route path="/" element={<LogIn />} />
                    }
                </Routes>
            </BrowserRouter>
        </div>

    )
}