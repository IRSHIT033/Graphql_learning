
const Project=require('../models/Projects');
const Client=require('../models/Clients')

const {
    GraphQLObjectType, 
    GraphQLNonNull,
    GraphQLSchema, 
    GraphQLString ,
    GraphQLID, 
    GraphQLList,
    GraphQLEnumType
}= require('graphql');

const ClientType= new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        desc:{type:GraphQLString},
        status:{type:GraphQLString},
        
    })
})

const ProjectType= new GraphQLObjectType({
    name:'Project',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        desc:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return Client.findById(parent.clientId);
            }
        }
    })
})


const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find();
            }
        },
        client:{
            type:ClientType,
            args:{ id :{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(args.id);
            }
        },
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
             return Project.find();
            }
        },
        project:{
            type:ProjectType,
            args:{ id :{type:GraphQLID}},
            resolve(parent,args){
                return Project.findById(args.id)
        }
    }

    }
});

//Mutations
const mutation= new GraphQLObjectType({
   name:'Mutation',
   fields:{
    addClient:{
        type:ClientType,
        args:{
            name:{type: GraphQLNonNull(GraphQLString)},
            email:{type: GraphQLNonNull(GraphQLString)},
            phone:{type: GraphQLNonNull(GraphQLString)}
        },
        resolve(parent,args){
            const client= new Client({
               name:args.name,
               email:args.email,
               phone:args.phone
            })
            return client.save();
        }
    },
    delClient:{
        type:ClientType,
        args:{
            id:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve(parent,args){
            return Client.findByIdAndRemove(args.id);
        }
    },
    addproject:{
        type:ProjectType,
        args:{
            name:{type:GraphQLNonNull(GraphQLString)},
            desc:{type:GraphQLNonNull(GraphQLString)},
            status:{
                type: new GraphQLEnumType({
                    name:'ProjectStatus',
                    values:{
                        'new':{value:'Not Started'},
                        'progress':{value:'In Progress'},
                        'completed':{value:'Completed'},
                    }
                }),
                defaultValue:'Not Started',
            },
            clientId:{type:GraphQLNonNull(GraphQLID)},
                },
                resolve(prent,args){
                    const project = new Project({
                        name:args.name,
                        desc:args.desc,
                        status:args.status,
                        
                    })
                }
    }

   }
})

module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation
    
})