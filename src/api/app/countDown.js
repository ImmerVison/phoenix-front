import request from "~/api/requests.js";

export function countDown(crewCode) {
  return request({
    url: `/job/crew`,
    method: "GET",
    data: {
      crewCode: crewCode
    }
  });
}

