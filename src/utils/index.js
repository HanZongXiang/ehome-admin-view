import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'

const baseURL = process.env.BASE_API
const instance = axios.create({
  baseURL,
  timeout: 15000
})

class service {
  static get(url,data,config) {
    return new Promise((resolve,reject) => {
      instance.get(url,{ params: data},config).then(res => {
        if(res.data.code == 403) {
          Message.success(res.data.msg)
          router.push('/login')
        }
        resolve(res.data)
      }).catch(err => {
        Message.error(err.msg)
      })
    })
  }
  static fetch(url,data,config,method){
    return new Promise((resolve,reject) => {
      instance[method](url,data,config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static post(url,data,config) {
    return this.fetch(url,data,config,'post')
  }
}

export default service