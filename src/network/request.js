import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://bshm_api.jiaoshizhaopin.net',
    timeout: 50000
  })
  instance.interceptors.request.use(config => {
    return config
  }, err => {})

  instance.interceptors.response.use(res => {
    if (res.data == false) {
      return res
    }
    return eval('(' + res.data + ')');
  }, err => {
    console.log(err)
  })
  return instance(config)
}
