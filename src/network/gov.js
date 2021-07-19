import {
  request
} from './request'
import qs from 'qs'

export function getAreaGov() {
  return request({
    url: '/gov/get_gov_area_list'
  })
}

export function getAllGov() {
  return request({
    url: '/gov/get_gov_list'
  })
}

export function setGovData(govId = 0, areaId = 0, govName = "") {
  return request({
    url: '/gov/set_gov?gov_id=' + govId + '&area_id=' + areaId + '&gov_name=' + govName
  })
}


export function addGov(areaId = 0, govName = "") {
  return request({
    url: '/gov/add_gov',
    method: 'post',
    data: qs.stringify({
      area_id: areaId,
      gov_name: govName
    }),
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
