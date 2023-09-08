/*
new Env('getToken');
*/

const got = require('got')
const getSign = require('./getSign')
const Cache = require('./cache/index')

// 定义缓存 token 有效时间
const cacheDefaultTTL = 15 * 60 * 1000
// 定义缓存文件路径
const cacheFile = new Cache(cacheDefaultTTL, __dirname + '/cache/token.json')

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
        token = cacheFile.get(getCacheKey(ptPin, baseUrl)) || '' // 若缓存token过期则返回为空
        if (token) {
            // console.log(`本地缓存token ➜ ${token}`);
            // console.log(`已读取本地缓存token\n`);
            return token
        }
    }
    // 请求新TOKEN
    try {
        // 获取签名
        let sign = await getSign('isvObfuscator', {
            url: baseUrl,
            id: '',
        })
        if (!sign) {
            console.log(`🚫 getToken API请求错误 ➜ 签名获取失败`)
            return ''
        }
        // 请求获取接口
        const res = await got
            .post('https://api.m.jd.com/client.action?functionId=isvObfuscator', {
                headers: {
                    Host: 'api.m.jd.com',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Cookie: cookie,
                    'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
                    'Accept-Language': 'zh-Hans-CN;q=1',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
                body: sign,
                retry: 1,
                timeout: 30000,
            })
            .catch(async (err) => {
                if (err?.response) {
                    console.log(`🚫 getToken API请求失败 ➜ Response code ${err.response.statusCode || ''} (${err.response.statusMessage || ''})`)
                    if (err.response.statusCode === 403) {
                        let waitTimes = Math.floor(Math.random() * (1000 - 2000)) + 2000
                        await timeWait(waitTimes) // 随机延迟 2~10 秒
                    }
                } else if (err?.response?.body) {
                    console.log(`🚫 getToken API请求失败\n${err.response.body || ''}\n`)
                } else {
                    console.log(`🚫 getToken API请求失败\n${err || ''}\n`)
                }
            })
        if (res && typeof res === 'object') {
            if (res.body) {
                const data = JSON.parse(res.body)
                if (data.code === '0') {
                    token = data.token
                    // 记录本地缓存
                    cacheFile.put(getCacheKey(ptPin, baseUrl), token, cacheDefaultTTL)
                } else if (data.code === '3' && data.errcode === 264) {
                    console.log(`🚫 getToken API请求异常 ➜ 账号无效`)
                } else {
                    console.log(`🚫 getToken API请求异常 ➜ ${JSON.stringify(data)}`)
                }
            } else {
                console.log(`🚫 getToken API请求失败 ➜ 无响应数据`)
            }
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

function getCacheKey(ptPin, baseUrl) {
    let hour = new Date().getHours()
    // 0-3 点不判断域名
    if (hour >= 0 && hour <= 3) {
        return ptPin
    }
    return `${ptPin}_${baseUrl}`
}

async function timeWait(t) {
    return new Promise((e) => setTimeout(e, t))
}

module.exports = getToken
