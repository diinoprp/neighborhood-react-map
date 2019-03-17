class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2"
  }

  static auth() {
    const keys = {
      client_id: "FMK3VT1FRCT5WFFJASJ0VQ5VTSNK1VAGNYLJ5QV0T1E4BP2B",
      client_secret: "PTNE4KELLB04CMFJEKKQ0D3DFFWHZB3XLQX2Q1UA0L5ED0OC",
      v: "20180929"
    }

     return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&")
  };

  static urlBuilder(urlParams){
    if(!urlParams){
      return ""
    }

    return Object.keys(urlParams)
        .map(key => `${key}=${urlParams[key]}`)
        .join("&");
  }

  static headers() {
    return {
      Accept: "application/json",
      "Accept-Language": "pt"
    };
  }

  static simpleFetch(endPoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    }

    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`
      , requestData
    ).then(res => res.json());
  }
}

export default class SquareAPI {
  static search(urlParams) {
    return Helper.simpleFetch("/venues/search", "GET", urlParams);
  }

  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }

  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}