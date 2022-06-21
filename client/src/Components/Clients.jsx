import {useQuery} from "@apollo/client";
import Client from "./Client";

import {GET_CLIENTS} from "./Queries/ClientQuery"



export default function Clients(){
    
    const {loading ,error ,data}= useQuery(GET_CLIENTS);
   
    if(loading) return <p>loading....</p>
    if(error)
    { 
        console.log(error);
        return (<><p>something went wrong</p></>)
    }
    return (<>
    {!loading && ! error && 
    <table>
        <thead>
            <tr>
                <th>Name </th>
                <th>Email </th>
                <th>Phone </th>
            </tr>
        </thead>
        <tbody>
            {data.clients.map(client=>(
                 <Client key={client.id} client={client} />
            ))}
        </tbody>
        </table>}
    </>);
}