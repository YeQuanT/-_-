const axios = require('axios')

export function net(config){
    const axiosfun = axios.create({
        baseURL:"https://yeqt.top:3006"
    })
    return axiosfun(config)
}





















