var dev_request = require('./dev_request');


function request() {
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

    //5、取消网络请求(所有的请求方法均返回requestTask对象，可中断请求任务)
    var requestTask = dev_request.Get('/classify', function (res) {
        console.log(res);
    });
    //网络请求取消
    requestTask.abort()
}