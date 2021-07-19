import {
  request
} from './request'
import qs from 'qs'

export function getNewsList(govId = 0, startDate = "", endDate = "", searchKey = "", page = 1) {
  return request({
    url: '/news/news_list?gov_id=' + govId + '&start_time=' + startDate + '&end_time=' + endDate + '&key=' +
      searchKey + '&page=' + page
  })
}


export function setNewsTop(idArr) {
  return request({
    url: '/news/top_news',
    method: 'post',
    data: qs.stringify({
      id: idArr
    }),
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


export function delNews(idArr) {
  return request({
    url: '/news/del_news',
    method: 'post',
    data: qs.stringify({
      id: idArr
    }),
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
