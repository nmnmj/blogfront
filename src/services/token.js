const storeToken = (value)=>{
    // localStorage.setItem("token", JSON.stringify(value))
    localStorage.setItem("token", value)
}

const getToken = ()=>{
    let token = localStorage.getItem("token")
    // return JSON.parse(token)
    return token
}

const removeToken = ()=>{
    localStorage.removeItem("token")
}

export {storeToken, getToken, removeToken}