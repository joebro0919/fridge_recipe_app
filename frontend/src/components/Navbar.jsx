import { Link } from "react-router-dom"
export default function NavBar(){

    return(
        <nav className = "navBar" >
            <Link to = "/allroutines" className="navItem"> all routines </Link>
            <Link to = "/createroutine" className="navItem"> create routine </Link>
            <Link to = "/calendar" className="navItem"> calendar </Link>
            <Link to = "/" className ="logo"></Link>
            
        </nav>
    )
}