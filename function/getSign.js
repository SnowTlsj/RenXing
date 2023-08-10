/*
new Env('getSign');
*/

const got = require('got')
const API = process.env.JD_SIGN_API || 'http://api.nolanstore.cc/sign'

/**
 * @describe 获取JD签名（杂货铺接口基准格式）
 * @param {string} functionId - 接口函数ID
 * @param {object} params - 接口请求参数
 * @returns {string} - 接口签名
 */
async function getSign(functionId, params) {
    let sign = ''
    let body = JSON.stringify({
        fn: functionId,
        body: JSON.stringify(params),
    })
    try {
        const res = await got
            .post(API, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: body,
                retry: 1,
                timeout: 10000,
            })
            .catch((err) => {
                console.error(`🚫 getSign API请求失败 ➜ ${err || ''}`)
            })

        if (res && typeof res === 'object') {
            if (typeof res === 'object') {
                if (res.body) {
                    data = JSON.parse(res.body)
                    sign = data.body
                } else {
                    console.error('🚫 getSign API响应数据异常')
                }
            } else {
                console.error('🚫 getSign API响应数据格式错误')
            }
        } else {
            console.error('🚫 getSign API未响应')
        }
    } catch (err) {
        console.error(`🚫 getSign API在处理请求时遇到了错误\n${err}`)
    }
    return sign
}

module.exports = getSign
