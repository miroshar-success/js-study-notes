export function addAddress(address){
    console.log("存储了地址",address);
    return {
        type:"ADD_ADDRESS",
        address
    }
}
export function getAddress(){
    return{
        type:"GET_ADDRESS"
    }
}

