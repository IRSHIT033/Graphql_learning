import React from 'react'

const Project = ({project}) => {
    
  return (
    <div>
        {project.name}
        <a href={`/projects/${project.id}`}>view </a>
        <h3>Status : {project.status}</h3>

    </div>
  )
}

export default Project