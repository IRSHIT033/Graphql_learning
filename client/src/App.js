import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Addclient from "./Components/Addclient";
import Clients from "./Components/Clients";
import Projects from "./Components/Projects";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleProject from "./Components/SingleProject";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing , incoming) 
          {
            return incoming;
          },
        },
        projects: {
          merge(existing , incoming) 
          {
            return incoming;
          },
        },
      },
    },
  },
});


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
 cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div>
        <Router>
        <Addclient/>
          <Clients />
          <Projects/>
        <Routes>
       
        
             
              <Route path='/projects/:id' element={<SingleProject />} />
              
            </Routes>

          </Router>
        
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
