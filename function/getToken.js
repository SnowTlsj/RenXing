/*
new Env('getToken');
*/

const got = require('got')
const getSign = require('./getSign')

// 定义缓存 token 有效时间
const cacheDefaultTTL = 30 * 60 * 1000
// 定义缓存文件路径
const Cache = require('./cache/index')
const cacheFile = new Cache(cacheDefaultTTL, __dirname + '/cache/token.json')

// getToken 局部代理
const getTokenProxyUrl = process.env.JD_ISV_TOKEN_PROXY || '' // 定义代理地址
let proxyAgent = null
if (getTokenProxyUrl) {
    // 创建 HTTP 代理
    try {
        const { HttpsProxyAgent } = require('hpagent')
        if (getTokenProxyUrl) {
            proxyAgent = new HttpsProxyAgent({
                keepAlive: true,
                keepAliveMsecs: 1000,
                maxSockets: 256,
                maxFreeSockets: 256,
                scheduling: 'lifo',
                proxy: getTokenProxyUrl,
            })
        }
        console.log('🧩 已启用 getToken 代理')
    } catch (err) {
        console.log(`🚫 getToken 代理模块加载失败 ➜ ${err.message}`)
    }
}

// 全局代理
const globalProxy = process.env.JD_ISV_GLOBAL_PROXY === 'true' // 默认不启用
if (globalProxy) {
    try {
        require('global-agent/bootstrap')
        console.log('🌐 已启用全局代理')
    } catch (err) {
        console.log(`🚫 getToken 代理模块加载失败 ➜ ${err.message}`)
    }
}

/**
 * 获取token
 * @param {string} cookie 账号
 * @param {string} baseUrl 域名链接
 * @returns {string} TOKEN字符串
 */
async function getToken(cookie, baseUrl) {
    let token = ''
    // 读取本地缓存
    const ptPin = getCookieValue(cookie, 'pt_pin')
    if (ptPin) {
        token = cacheFile.get(ptPin) || '' // 若缓存token过期则返回为空
        if (token) {
            // console.log(`本地缓存token ➜ ${token}`);
            // console.log(`已读取本地缓存token\n`);
            return token
        }
    }
    // 请求新Token
    try {
        // 获取签名
        const sign = await getSign('isvObfuscator', {
            url: baseUrl,
            id: '',
        })
        if (!sign) {
            console.log(`🚫 getToken API请求错误 ➜ 签名获取失败`)
            return ''
        }
        // 定义请求参数
        const requestUrl = 'https://api.m.jd.com/client.action?functionId=isvObfuscator'
        let requestOptions = {
            headers: {
                Host: 'api.m.jd.com',
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: cookie,
                'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: sign,
            timeout: 30000,
        }
        if (getTokenProxyUrl && proxyAgent) {
            requestOptions.agent = {
                https: proxyAgent,
            }
        }
        // 请求获取接口
        const maxRetryTimes = getTokenProxyUrl ? 3 : 1 // 最大重试次数（使用代理时增加重试次数）
        let requestFailedTimes = 0 // 连续请求失败次数
        let lastErrorMsg = null // 请求失败的信息
        while (requestFailedTimes < maxRetryTimes) {
            let res = null
            try {
                res = await got.post(requestUrl, requestOptions)
            } catch (err) {
                if (err?.response) {
                    err = err.response
                    // 判断是否是超时错误
                    if (typeof err === 'string' && err.includes("Timeout awaiting 'request'")) {
                        lastErrorMsg = '请求超时，请检查网络重试'
                    } else {
                        const statusCode = res?.statusCode // 在 catch 块中也可以访问 res 变量
                        if (statusCode) {
                            lastErrorMsg = `Response code ${statusCode}`
                        } else {
                            lastErrorMsg = `${err.message || err}`
                        }
                    }
                } else if (err?.response?.body) {
                    lastErrorMsg = `请求失败 ${err.response.body} `
                } else {
                    lastErrorMsg = `请求失败 ${err || ''} `
                }
                requestFailedTimes++
            }
            if (res?.body) {
                try {
                    const data = JSON.parse(res.body)
                    if (data.code === '0') {
                        // 获取成功
                        token = data.token
                        // 记录本地缓存
                        cacheFile.put(ptPin, token, cacheDefaultTTL)
                    } else if (data.code === '3' && data.errcode === 264) {
                        console.log(`🚫 getToken API请求异常 ➜ 账号无效`)
                    } else {
                        console.log(`🚫 getToken API请求异常 ➜ ${JSON.stringify(data)}`)
                    }
                } catch (error) {
                    console.log(`🚫 getToken API响应处理异常 ➜ ${error.message || error}`)
                }
                break
            } else {
                lastErrorMsg = '无响应数据'
                requestFailedTimes++
            }
            res = null
        }
        // 达到最大重试次数仍失败后的处理
        if (requestFailedTimes >= maxRetryTimes) {
            console.log(`🚫 getToken API请求失败 ➜ ${lastErrorMsg}`)
        }
    } catch (err) {
        console.log(`🚫 getToken API在处理请求时遇到了错误`)
        console.log(err)
    }
    return token
}

function getCookieValue(cookieStr, key) {
    if (!cookieStr || !key) {
        return ''
    }
    var reg = new RegExp(key + '=' + '([^;]*)' + ';')
    var result = reg.exec(cookieStr)
    return (result && result[1]) || ''
}

// function getCacheKey(ptPin, baseUrl) {
//     let hour = new Date().getHours()
//     if (hour >= 0 && hour <= 3) {
//         return ptPin
//     }
//     return `${ptPin}_${baseUrl}`
// }

// async function timeWait(t) {
//     return new Promise((e) => setTimeout(e, t))
// }

module.exports = getToken
