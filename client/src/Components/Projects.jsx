import { useQuery } from "@apollo/client"
import Project from "./Project";
import { GET_PROJECTS } from "./Queries/projectQueries"

export default function Projects(){
    const {loading ,data }=useQuery(GET_PROJECTS);

    if(loading )return <div>loading.....</div>
    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        
        {data ?
            data.projects.map(project=>(
              <Project key={project.id} project={project}/>
            ))
            :null
        }
        </>
    )
} 