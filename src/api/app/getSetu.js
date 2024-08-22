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
