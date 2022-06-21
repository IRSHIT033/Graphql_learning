import React from 'react'
import {Link,useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import { GET_PROJECT } from './Queries/projectQueries';


function SingleProject() {
    const {id}=useParams();
    const {loading ,error, data}=useQuery(GET_PROJECT,{variables:{id}})
    if(loading)return <h1>loading...</h1>;
    if(error) return <h1>Error loading page</h1>
  return (
    <>
    <h1>{data.project.name}</h1>
    <h1>{data.project.desc}</h1>
    <h1>{data.project.status}</h1>
    <h1>{data.project.client.name}</h1>
    <h1>{data.project.client.email}</h1>
    <h1>{data.project.client.phone}</h1>
  
    </>
  )
}

export default SingleProject