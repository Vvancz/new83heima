// 放文章的所有接口的模块
import axios from '../../utils/axios.config'
import API from '../../constant/api'

export function getArticles (params) {
  return axios({
    url: API.API_ARTICLES,
    params
  })
}
