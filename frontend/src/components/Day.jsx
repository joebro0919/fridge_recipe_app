export default function Day({routines,day}){

    if(!routines){
        return <p>Loading...</p>
    }

    return(
        <div className = "day">
            <ul>
            {
                routines.flatMap(element =>
                    element.tasks
                        .filter(task => task.days.toLowerCase() === day.toLowerCase())
                            .map(task => (
                                <li key={task._id}>
                                    <h2>{element.title}</h2>
                                    <h2>{task.title}</h2>
                                    <div>{task.description}</div>
                                </li>
                            ))
                )
            }
            </ul>
        </div>
    )
}