import qs from "qs";
import axios from "axios";
import {Message} from "view-design";
import router from "./router";

var SERVER_URL = '/fomstsprobe/';
//全局错误处理Map
var GLOBAL_ERROR_MAP = {
    "-1": {
        msg: "程序异常。",
        process: function () {
            window.location.href = window.location.origin + window.location.pathname + "#/login";
        }
    },
    "-2": {
        //  msg:"没有该地址。",
        process: function () {
            window.location.href = window.location.origin + window.location.pathname + "#/notFound";
        }
    },
    401: {
        // msg:"你还没有登录，请登录后再操作。",
        process: function () {
            router.push({
                name: 'error401'
            })
        }
    },
    // 404:{
    // //  msg:"页面丢失。",
    //   process:function(){
    //     window.location.href="/#/notFound";
    //   }
    // },
    // 500:{
    //  // msg:"服务器错误。",
    //   process:function(){
    //     window.location.href="/#/abnormal";
    //   }
    // },
    // 504:{
    //  // msg:"服务器停止。",
    //   process:function(){
    //     //sessionStorage.setItem("accessToken", "");
    //    // window.location.href= "/#/login";
    //   }
    // }

};
export const $http = {
    post: function (url, params) {
        return new Promise(function (resolve, reject) {
            let data = qs.stringify(params);
            if (params && params.arrayFormat === 'brackets') {
                delete params.arrayFormat;
                data = qs.stringify(params, {arrayFormat: 'brackets'});
            }
            axios.post(SERVER_URL + url, data)
            // axios.post(url,qs.stringify(params))
                .then(function (resp) {
                    oSuccess(resp, resolve, reject);
                }).catch(function (error) {
                if (error.response) {
                    let code = error.response.status;
                    let errorProcess = GLOBAL_ERROR_MAP[code];
                    errorProcess && errorProcess.process();
                }

                reject(error);
                //if(error.response.status == '401')window.location.href="/#/notLogin";
            });
        });
    },
    oldpost: function (url, params) {
        return new Promise(function (resolve, reject) {
            axios.post(SERVER_URL + url, qs.stringify(params))
            // axios.post(url,qs.stringify(params))
                .then(function (resp) {
                    if (resp.data.status == 401) {
                        let code = resp.data.status;
                        let errorProcess = GLOBAL_ERROR_MAP[code];
                        errorProcess && errorProcess.process();
                        return;
                    }

                    resolve(resp.data);
                    // oSuccess(resp,resolve,reject);
                }).catch(function (error) {
                if (error.response) {
                    let code = error.response.status;
                    let errorProcess = GLOBAL_ERROR_MAP[code];
                    errorProcess && errorProcess.process();
                }

                reject(error);
                //if(error.response.status == '401')window.location.href="/#/notLogin";
            });
        });
    },
    postForm: function (url, params, config) {
        return new Promise(function (resolve, reject) {
            axios.post(SERVER_URL + url, params, config)
                .then(function (resp) {
                    oSuccess(resp, resolve, reject);
                }).catch(function (error) {
                if (error.response) {
                    let code = error.response.status;
                    let errorProcess = GLOBAL_ERROR_MAP[code];
                    errorProcess && errorProcess.process();
                }

                reject(error);
            });
        });
    },
    pop: function (url, params) {
        return new Promise(function (resolve, reject) {
            axios.post(url, qs.stringify(params))
                .then(function (resp) {
                    oSuccess(resp, resolve, reject);
                }).catch(function (error) {
                if (error.response) {
                    let code = error.response.status;
                    let errorProcess = GLOBAL_ERROR_MAP[code];
                    errorProcess && errorProcess.process();
                }
                reject(error);
                //if(error.response.status == '401')window.location.href="/#/notLogin";
            });
        });
    },
    get: function (url, params) {
        return new Promise(function (resolve, reject) {
            // axios.get(SERVER_URL+url,qs.stringify(params))
            axios.get(url, qs.stringify(params))
                .then(function (resp) {
                    oSuccess(resp, resolve, reject);
                }).catch(function (error) {
                if (error.response) {
                    let code = error.response.status;
                    let errorProcess = GLOBAL_ERROR_MAP[code];
                    errorProcess && errorProcess.process();
                }
                reject(error);
                //if(error.response.status == '401')window.location.href="/#/notLogin";
            });
        });
    },
    postJson: function (url, params) {
        if (params === undefined) {
            params = {};
        }
        let header = {
            'Content-Type': 'multipart/form-data'
        };
        return new Promise(function (resolve, reject) {
            axios.post(SERVER_URL + url, params, {headers: header}).then(function (resp) {
                oSuccess(resp, resolve, reject);
            }).catch(function (error) {
                if (error.response) {
                    let code = error.response.status;
                    let errorProcess = GLOBAL_ERROR_MAP[code];
                    errorProcess && errorProcess.process();
                }
                reject(error);
            });
        });
    },
};
//请求成功
function oSuccess(resp, resolve, reject) {
    //非正常响应
    // if(resp.status != 200) {
    //   let errorProcess = GLOBAL_ERROR_MAP[resp.status];
    //   Message.error(errorProcess.msg);
    //   reject(false,errorProcess.msg);
    // }
    //   console.log(resp.data.status==401,"resp.data.statusresp.data.statusresp.data.status");
    //未登录
    if (resp.data.status == 401) {
        let code = resp.data.status;
        let errorProcess = GLOBAL_ERROR_MAP[code];
        errorProcess && errorProcess.process();
        return false
    }

    //后台定义接口 || 地图数据
    if (resp.data.status === 1 || resp.data !== '' || resp.data.type === "FeatureCollection") {
        resolve(resp.data);
    }
    else {
        if (resp.data.msg) {
            Message.error(resp.data.msg);
        }
        else {
            let errorProcess = GLOBAL_ERROR_MAP[resp.data.status];
            if (errorProcess) {
                Message.error(errorProcess.msg);
                errorProcess.process();
            }
        }

        reject(resp);
    }
}
//请求失败
function oFail(error) {

}
function install(Vue, options) {
    Vue.prototype.$http = $http;
}
export default install;
