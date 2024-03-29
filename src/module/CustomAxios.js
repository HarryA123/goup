import axios from "axios";

const DEFAULT_SERVER_URL = "http://43.200.202.87";
// const DEFAULT_SERVER_URL = 'http://localhost:8080';
const DEFAULT_ACCESS_KEY = "N4gdubumGsrvzFFzewu4hQ==";

export const setDefaultAxios = () => {
    console.log("setting axios defaults...");
    axios.defaults.url = DEFAULT_SERVER_URL;
    axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Access-Control-Expose-Headers"] = "*";
    console.log("setting axios defaults done");
};

/**
 * Axios Function 공통
 * 1. Header Set
 *    - ContentType
 *    - Authorization
 *    - additional Header [OPTIONAL]
 *  2. method에 따라 axios.get, axios.post ...
 *    - response status 에 따라 처리 방식 다르게 해주고
 *    - 그에 따른 Promise 객체의 resolve, reject 선언
 *
 * # res 보는 방법
 *   기본적으로 status => HTTP 통신 STATUS => res.status => 고정
 *   데이터의 status => 서버에서 유효성 검증해주는 status => res.data.status => 서버 짜는 사람에 따라 달라질 수 있음
 * **/

const authFunction = async (token, setToken) => {
    console.log("auth token setting...");
    return new Promise((resolve, reject) => {
        axios
            .get(DEFAULT_SERVER_URL + "/api/auth", {
                params: {
                    key: DEFAULT_ACCESS_KEY,
                },
            })
            .then(res => {
                if (res.data.status === "OK") {
                    setToken(res.data.data.key);
                    console.log("auth token set Complete");
                    resolve(res);
                } else {
                    reject(res);
                }
            });
    });
};

export const axiosGetFunction = async (
    url,
    params,
    token,
    setToken,
    additional_header = null
) => {
    const config = {};
    config.headers = {
        contentType: "application/x-www-form-urlencoded",
        authorization: "bearer " + token,
    }; // 헤더 설정
    if (additional_header) {
        Object.keys(additional_header).forEach(key => {
            config.headers[key] = additional_header[key];
        });
    } // 추가 헤더 설정
    config.params = params; // 파라미터 세팅
    console.log('config', config)
    return new Promise((resolve, reject) => {
        axios.get(DEFAULT_SERVER_URL + url, config)
            .then(async res => {
                if (res.data.status === "UNAUTHORIZED") {
                    await authFunction(token, setToken).then(() => {
                        config.headers["authorization"] = "bearer " + token;
                        axios.get(DEFAULT_SERVER_URL + url, config)
                            .then(res1 => {
                                console.log("response : ", res1);
                                resolve(res1);
                            });
                    });
                } else if (res.data.status === "OK") {
                    console.log("request success params : ", params);
                    console.log("response on GET", url, " : ", res);
                    resolve(res);
                } else {
                    reject(res);
                }
            });
    });
};

export const axiosPostFunction = async (
    url,
    formData,
    hasFile,
    token,
    setToken
) => {
    const config = {};
    config.headers = {
        contentType: "application/x-www-form-urlencoded",
        authorization: "bearer " + token,
    };
    if (hasFile === true) {
        config.headers.contentType = "multipart/form-data";
    }
    console.log(config);
    return new Promise((resolve, reject) => {
        axios
            .post(DEFAULT_SERVER_URL + url, formData, config)
            .then(async res => {
                if (res.data.status === "UNAUTHORIZED") {
                    await authFunction(token, setToken).then(() => {
                        console.log(config);
                        config.headers["authorization"] = "bearer " + token;
                        axios
                            .post(DEFAULT_SERVER_URL + url, formData, config)
                            .then(res2 => {
                                console.log("response on POST", url, " : ", res);
                                resolve(res2);
                            });
                    });
                } else if (res.data.status === "OK") {
                    console.log("response on POST", url, " : ", res);
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch(reject => {
                console.log(reject);
            });
    });
};

export const axiosPutFunction = async (
    url,
    formData,
    hasFile,
    token,
    setToken
) => {
    const config = {};
    config.headers = {
        contentType: "application/x-www-form-urlencoded",
        authorization: "bearer " + token,
    };
    if (hasFile === true) {
        config.headers.contentType = "multipart/form-data";
    }
    console.log(config);
    return new Promise((resolve, reject) => {
        axios
            .put(DEFAULT_SERVER_URL + url, formData, config)
            .then(async res => {
                if (res.data.status === "UNAUTHORIZED") {
                    await authFunction(token, setToken).then(() => {
                        console.log(config);
                        config.headers["authorization"] = "bearer " + token;
                        axios
                            .put(DEFAULT_SERVER_URL + url, formData, config)
                            .then(res2 => {
                                console.log("response on PUT", url, " : ", res);
                                resolve(res2);
                            });
                    });
                } else if (res.data.status === "OK") {
                    console.log("response on PUT", url, " : ", res);
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch(reject => {
                console.log(reject);
            });
    });
};


export const axiosDeleteFunction = async (
    url,
    formData,
    hasFile,
    token,
    setToken
) => {
    const config = {};
    config.headers = {
        contentType: "application/x-www-form-urlencoded",
        authorization: "bearer " + token,
    };
    if (hasFile === true) {
        config.headers.contentType = "multipart/form-data";
    }
    console.log(config);
    return new Promise((resolve, reject) => {
        axios
            .delete(DEFAULT_SERVER_URL + url, formData, config)
            .then(async res => {
                if (res.data.status === "UNAUTHORIZED") {
                    await authFunction(token, setToken).then(() => {
                        console.log(config);
                        config.headers["authorization"] = "bearer " + token;
                        axios
                            .delete(DEFAULT_SERVER_URL + url, formData, config)
                            .then(res2 => {
                                console.log("response on DELETE", url, " : ", res);
                                resolve(res2);
                            });
                    });
                } else if (res.data.status === "OK") {
                    console.log("response on DELETE", url, " : ", res);
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch(reject => {
                console.log(reject);
            });
    });
};
  