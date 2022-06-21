import { DELETE_CLIENT } from "./Mutations/ClientMutations";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "./Queries/ClientQuery";

const Client=({client})=>{
    const [deleteClient]=useMutation(DELETE_CLIENT,{
      variables:{id:client.id},
       // refetchQueries:[{query:GET_CLIENTS}]
       
        update(cache,{data:{deleteClient}}){
         const {clients}=cache.readQuery({
            query:GET_CLIENTS
        });
        cache.writeQuery({
            query:GET_CLIENTS,
            data:{
                clients:
                    clients.filter(client=>client.id !== deleteClient.id)
                
            }
        })
        }
      
    });
    return(<>
   <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          delete
        </button>
      </td>
    </tr>
    </>)
}
export default Client;