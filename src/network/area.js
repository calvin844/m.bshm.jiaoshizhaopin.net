import {
  request
} from './request'

export function getAllArea() {
  return request({
    url: '/area/get_area_all'
  })
}