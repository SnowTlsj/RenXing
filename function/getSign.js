/*
new Env('getSign')
· 默认通过请求 [杂货铺公益API](http://api.nolanstore.cc) 在线获取签名（不会泄露任何隐私），可通过环境变量 `JD_SIGN_API` 自定义接口地址（杂货铺接口格式）
· 如果存在本地签名生成脚本则会优先加载本地签名，具体规范如下：
  1. 需要将脚本命名为 genSign.js 并存储在与 getSign 脚本同一目录下
  2. 调用函数名为 genSign 并且需要 export 导出
  3. 函数固定两个传参，分别是 functionId（函数id） 和 bodyParams（body参数对象）
  4. 函数需要返回含有 body、st、sign、sv 等关键字段的url参数形式的签名字符串
*/

const got = require('got')

// 定义接口地址
const API = process.env.JD_SIGN_API || 'http://api.nolanstore.cc/sign'

// 导入本地签名文件
let genSign = null
try {
    genSign = require(__dirname + '/genSign.js')
} catch {}

/**
 * @describe 获取签名
 * @param {string} functionId - 接口函数id
 * @param {object} params - body参数
 * @returns {string} - 签名字符串（url参数形式）
 */
async function getSign(functionId, params) {
    let sign = ''
    // 本地签名
    if (genSign) {
        try {
            sign = genSign(functionId, params)
        } catch (err) {
            console.log(`🚫 getSign 本地签名错误 ➜ ${err.message || err}`)
        }
        if (sign) {
            return sign
        }
    }
    // 请求接口获取签名
    try {
        await got
            .post(API, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    fn: functionId,
                    body: params,
                }),
                retry: 1,
                timeout: 10000,
            })
            .catch((err) => {
                console.log(`🚫 getSign API请求失败 ➜ ${err.message || err}`)
            })
            .then((res) => {
                if (res) {
                    if (typeof res === 'object') {
                        if (res.body) {
                            data = JSON.parse(res.body)
                            sign = data.body
                        } else {
                            console.log('🚫 getSign API响应数据异常')
                        }
                    } else {
                        console.log('🚫 getSign API响应数据格式错误')
                    }
                } else {
                    console.log('🚫 getSign API无响应')
                }
            })
    } catch (err) {
        console.log(`🚫 getSign API在处理请求时遇到了错误\n${err}`)
    }
    return sign
}

module.exports = getSign
