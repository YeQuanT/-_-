import {net} from './index.js'
/**
 * long_pot 登录接口
 * reg_pot 注册接口
 * repid_pot 检验id是否重复
 * emit_message 提交信息
 * inquire_post 聊天信息查询
 */
export function long_pot(config){
    return net({
        url:"ago/long",
        method:'post',
        params:{
            config
        }
    })
}
export function reg_pot(config){
    return net({
        url:"ago/reg",
        method:'post',
        params:{
            config
        }
    })
}
export function repid_pot(repid){
    return net({
        url:"ago/repid",
        params:{
            repid
        }
    })
}
export function emit_message(data){
return net({
    url:"ago/subitems",
    params:{
        data
    }
})
}
export function inquire_post(){
    return net({
        url:'ago/inquire'
    })
}