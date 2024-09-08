import request from "~/api/requests.js";

export function getSetu(pageInfo) {
  return request({
    url: `/lolicon/setu/v2`,
    method: "POST",
    data: {pageInfo},
  });
}


export function getWaifu() {
    return request({
        url: '/waifu/search',
        method: 'GET',
        params: {
            included_tags: 'maid'
        }
    })
}

export function getTop10View() {

  return request({
    url: '/phoenix/getTop10View',
    method: 'GET'
  })
}

const artistList = ['宮瀬まひろ', '夕冰', '碳酸', '失楽园', '轻舞wu', '加瀬大輝', '荻pote', '残夜ZANYA', '半尺月白', '星', 'proverbs', 'MeioN', 'MAZE', 'ATDAN', 'age fx']

//从中随机任选一位
const randomArtist = () => {
  return artistList[Math.floor(Math.random() * artistList.length)]
}

export function getByArtist() {

  return request({
    url: '/phoenix/selectByArtist',
    method: 'GET',
    params: {
      artist: randomArtist(),
      page: 1,
      size: 1000
    }
  })
}
