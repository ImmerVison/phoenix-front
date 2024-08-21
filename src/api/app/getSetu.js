import request from "~/api/requests.js";

export function getSetu(pageInfo) {
    return request({
        url: `/setu/v2`,
        method: "POST",
        data: {
            pageInfo,
        },
    });
}
