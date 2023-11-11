import axios from "axios";


const api = axios.create({
    baseURL:"http://api.task-manager.maketfay.com/"
})


export const methods = {

     deskVisibility(){
        console.log("desk visibility")
      return api.get("desk/visibility")
    },
    register(user) {
         return api.post("user/register", {
             "userName": user.username,
             "password": user.password
        })
    },
   login(user){
       return api.post("user/login",{
             "userName": user.username,
             "password": user.password
       })
    },
     refresh(){

    },
    createWorkspace(token,workspace,type) {
         return api.post("workSpace",{
             "workSpaceName": workspace,
             "visibilityTypeCode": type
         },{
             headers: {
            'Authorization': `Bearer ${token}`
        }})
    },
    getWorkSpaces(token) {
        return api.get("user/workSpace",{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    },
    createDesk(token,data) {
        return api.post("desk",data,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    },
    getDesk(token,workspaceId) {

        return api.get(`desk?workSpaceId=${workspaceId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
        }})
    },
    getColumn(token,deskId) {
        return api.get(`column?deskId=${deskId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    },
    getColumnCard(token,columnId) {
        return api.get(`/column/card?columnId=${columnId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})

    }
    ,
    getCards(token,columnId,cardId) {
        return api.get(`/card?cardId=${cardId}&columnId=${columnId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    }

}
