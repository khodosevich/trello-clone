import axios from "axios";


const api = axios.create({
    baseURL:"http://api.task-manager.maketfay.com/"
})


export const methods = {

     deskVisibility(){
        console.log("desk visibility")
      return api.get("desk/visibility")
    },
    async register(user) {
         const response = await api.post("user/register", {
            username: user.username,
            password: user.password
        })

        console.log(response)

    },
   login(user){
         return  api.post("user/login",{
             username: user.username,
            password: user.password
        })
    },
     refresh(){

    }

}
