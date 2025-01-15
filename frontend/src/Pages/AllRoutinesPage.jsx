import NavBar from "../components/Navbar";
export default function AllRoutinesPage ({routines, loading, error}){
    if(loading){
        return <p>Loading...</p>;
    }
    
    if(error){
        return <p>Error:{error}</p>
    }

    return(
        <div>
            <NavBar/>
            <ul>
                {
                    
                    routines.map(element => <li>{element.title}</li>)
                }</ul>
        </div>
    )


}