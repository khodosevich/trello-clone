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
     refresh(accessToken,refreshToken){

         return api.post("user/refresh",{
             accessToken: accessToken,
             refreshToken: refreshToken
         })
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
    deleteWorkspace(token,workspaceId) {
        return api.delete(`workspace`,{
            data: {
                workSpaceId: workspaceId,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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
    deleteDesk(token,deskId) {

        console.log(deskId)

        return api.delete(`desk`,{
            data: {
                deskId: deskId,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getColumn(token,deskId) {
        return api.get(`column?deskId=${deskId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    },
    deleteColumn(token,columnId) {
        return api.delete(`column`,{
            data: {
                columnId: columnId,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    createColumn(token,data) {
        return api.post("column",{
            columnName: data.columnName,
            deskId: data.deskId
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    },
    getColumnCard(token,columnId) {
        return api.get(`/column/card?columnId=${columnId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})

    },
    updateColumnName(token,columnId,newName) {
        return api.put("column/name",{
            columnId: columnId,
            columnName: newName
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getCards(token,columnId,cardId) {
        return api.get(`/card?cardId=${cardId}&columnId=${columnId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    },
    createCard(token,data) {
        return api.post("card",data,{
            headers: {
                'Authorization': `Bearer ${token}`
            }})
    },
    deleteCard(token,cardId) {
        return api.delete(`card`,{
            data: {
                cardId: cardId,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    updateCardTitle(token,cardId,newTitle) {
         return api.patch("card/title",{
             cardId: cardId,
             title:newTitle
         },{
             headers: {
                 'Authorization': `Bearer ${token}`
             }
         })
    }

}
