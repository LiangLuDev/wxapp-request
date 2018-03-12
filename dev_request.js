const BASE_URL = 'http://101.132.124.212/api';

/**
 * 网络请求封装
 * @param url url路径名 例：/books
 * @param method 请求方式 POST/GET/DELETE等
 * @param data 请求参数 string类型
 * @param success  成功回调
 * @param fail 失败回调
 */
function request(url, method, data, success, fail) {
    if (!fail && !success && typeof data === 'function') {
        // fail = null;
        success = data;
        data = "";
    } else if (!fail) {
        if (typeof data === 'function') {
            fail = success
            success = data
            data = ""
        } else if (typeof data === 'object') {
            // fail = null
        } else {
            console.log("传递参数类型不正确");
        }

    }

    var wxtask = wx.request({
        url: BASE_URL + url,
        header: {
            // 'content-type':'application/json',  //默认 application/json :数据序列化
            // 'access-token': 'access-token',
            // 'app-type': 'wx-app'
        },
        method: method,
        data: data,
        success: function (res) {
            console.log(res.data.code);
            switch (res.data.code) {
                case 10000://请求成功code
                    console.log(success);
                    success(res.data)
                    break
                case 10001://请求失败code
                    //错误请求  wx弹框提示错误信息
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                    if (fail) {
                        fail(res.data.msg)
                    }
                    break
            }
        },
        fail: function (res) {
            //错误请求  wx弹框提示错误信息
            wx.showToast({
                title: res,
                icon: 'none',
                duration: 1000
            })
            if (fail) {
                fail(res)
            }
        }
    })


    return wxtask;
}


/**
 * 请求封装-Get
 * @param url 请求地址
 * @param data 请求参数
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 *
 * 返回值为微信请求实例   用于取消请求
 */
function Get(url, data, success, fail) {
    return request(url, "GET", data, success, fail)
}


/**
 * 请求封装-Post
 * @param url 请求地址
 * @param data 请求参数
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 *
 * 返回值为微信请求实例   用于取消请求
 */
function Post(url, data, success, fail) {
    return request(url, 'POST', data, success, fail)
}


/**
 * 请求封装-Delete
 * @param url 请求地址
 * @param data 请求参数
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 *
 * 返回值为微信请求实例   用于取消请求
 */
function Delete(url, data, success, fail) {
    return request(url, 'DELETE', data, success, fail)
}

exports.Get = Get;
exports.Post = Post;
exports.Delete = Delete;