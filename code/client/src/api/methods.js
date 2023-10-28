import axios from "axios";


const api = axios.create({
    baseURL:"http://api.task-manager.maketfay.com/"
})

export const register = async () => {
    return await api.post("user/register", {
        username: "hellow",
        password: "12345678"
    })
}

export const methods = {

    async deskVisibility(){
        console.log("desk visibility")
      await api.get("desk/visibility").then(r => {
          console.log(r)
      })
    },
    register() {
        return api.post("user/register", {
            username: "hello",
            password: "12345678"
        })
    },
    async login(){
        await api.post("user/login",{
            username: "khodosevich",
            password: "123456789"
        }).then(
            r =>{
                console.log(r)
            }
        )
    },
    async refresh(){

    }

}
