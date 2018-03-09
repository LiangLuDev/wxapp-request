## 微信小程序网络请求封装

### 功能简介


----------
微信小程序网络请求封装很简单，因为我需要在每个网络请求里面加入自己**token、请求来源** 等 ，以便于服务器做验证。


### 功能介绍
----------
- header ：可以填写每次请求需要添加的信息到header
- Code判断：根据后台的请求code进行网络请求判断处理，这样请求拿到的数据就只是自己需要的信息
- 错误请求弹窗 ： code判断若网络请求错误，弹窗提示
``` javascript
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
```

### 如何使用
----------
- 直接使用，简单粗暴。
- 直接查看代码
``` javascript
 //POST/DELETE 请求方式调用方法一样
 //1、网络请求（没有请求参数，不需要对请求失败情况处理）
    dev_request.Get('/classify', function (res) {
        console.log(res);
    })
    //2、网络请求（没有请求参数，需要对请求失败情况处理）
    dev_request.Get('/classify', function (res) {
        console.log(res);
    }, function (err) {
        console.log(err);
    })
    //3、网络请求（有请求参数，不需要对请求失败情况处理）
    var data = {
        username: 'username',
        age: 19
    };
    dev_request.Get('/classify', data, function (res) {
        console.log(res);
    })
    //4、网络请求（有请求参数，需要对请求失败情况处理）
    dev_request.Get('/classify', data, function (res) {
        console.log(res);
    }, function (err) {
        console.log(err);
    })
```
### 意见反馈
----------
如果代码有错误，或者更好的改进，请反馈到：issue、927195249@qq.com 或者LiangLuDev@gmail.com

如果觉得对你有用的话，点一下右上的星星赞一下吧!