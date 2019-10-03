const userTools = {
    addAddress(data){
        window.localStorage.setItem("userinfo",JSON.stringify(data));
    },
    getAddress(){
        return JSON.parse(window.localStorage.getItem("userinfo"));
    }
}

export default userTools;