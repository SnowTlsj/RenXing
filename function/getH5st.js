/*
new Env('getH5st');
*/

const jsdom = require('jsdom')
let domWindow1 = null, // 3.1
    domWindow2 = null // 4.1

async function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(t)
        }, t)
    })
}

async function loadH5Sdk(version) {
    const { JSDOM } = jsdom
    let resourceLoader = new jsdom.ResourceLoader({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0',
        referrer: 'https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu',
    })
    let virtualConsole = new jsdom.VirtualConsole()
    let options = {
        url: 'https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu',
        referrer: 'https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0',
        runScripts: 'dangerously',
        resources: resourceLoader,
        includeNodeLocations: true,
        storageQuota: 10000000,
        pretendToBeVisual: true,
        virtualConsole,
    }
    const dom = new JSDOM(
        `<body>
    <script>
        function Map(){this.elements=new Array();this.size=function(){return this.elements.length},this.isEmpty=function(){return(this.elements.length<1)},this.clear=function(){this.elements=new Array()},this.put=function(_key,_value){if(this.containsKey(_key)==true){if(this.containsValue(_value)){if(this.remove(_key)==true){this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}},this.remove=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){this.elements.splice(i,1);return true}}}catch(e){bln=false}return bln},this.get=function(_key){try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){return this.elements[i].value}}}catch(e){return null}},this.element=function(_index){if(_index<0||_index>=this.elements.length){return null}return this.elements[_index]},this.containsKey=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){bln=true}}}catch(e){bln=false}return bln},this.containsValue=function(_value){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].value==_value){bln=true}}}catch(e){bln=false}return bln},this.keys=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].key)}return arr},this.values=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].value)}return arr}}
    </script>
    <script src="https://storage.360buyimg.com/webcontainer/js_security_${version.charAt(0) === '3' ? 'v3_0.1.3' : 'v3_0.1.8'}.js"></script>
    <script src="https://fm-price-cdn.jd.com/priceportal-static/script/utilsV1_1.js"></script>
    </body>`,
        options
    )
    await sleep(500)
    switch (version.charAt(0)) {
        case '3':
            domWindow1 = dom.window
            break
        case '4':
            domWindow2 = dom.window
            break
    }
}

/**
 * @describe 获取 H5st 验参
 * @param {string} businessId appId
 * @param {object} req body
 * @param {string} version 版本，固定分为 3.1、4.1，默认4.1
 */
async function getH5st(businessId, req, version = '4.1') {
    if (version !== '3.1') {
        version = '4.1'
    }
    // 加载Sdk（仅一次）
    switch (version.charAt(0)) {
        case '3':
            if (!domWindow1) {
                await loadH5Sdk(version)
            }
            break
        case '4':
            if (!domWindow2) {
                await loadH5Sdk(version)
            }
            break
    }
    return new Promise(async (resolve) => {
        switch (version.charAt(0)) {
            case '3':
                if (typeof domWindow1.signWaap === 'function') {
                    const h5st = await domWindow1.signWaap(businessId, req)
                    resolve(h5st)
                } else {
                    let timer = null
                    timer = setInterval(async () => {
                        if (typeof domWindow1.signWaap === 'function') {
                            clearInterval(timer)
                            timer = null
                            const h5st = await domWindow1.signWaap(businessId, req)
                            resolve(h5st)
                        }
                    }, 100)
                }
                break
            case '4':
                if (typeof domWindow2.signWaap === 'function') {
                    const h5st = await domWindow2.signWaap(businessId, req)
                    resolve(h5st)
                } else {
                    let timer = null
                    timer = setInterval(async () => {
                        if (typeof domWindow2.signWaap === 'function') {
                            clearInterval(timer)
                            timer = null
                            const h5st = await domWindow2.signWaap(businessId, req)
                            resolve(h5st)
                        }
                    }, 100)
                }
                break
        }
    })
}

module.exports = getH5st
