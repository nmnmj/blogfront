export const Blogreducer = (state, action) => {
    switch(action.type){
        case "myblogs" : return {...state, blogs:action.payload};
        case "addtoupdate" : return {...state, updateblog:[{...action.payload}, ...state.updateblog]};
        case "removeupdated" : return {...state, updateblog:state.updateblog.filter((c)=>c._id!==action.payload._id)}
        default : break;
    }
}
