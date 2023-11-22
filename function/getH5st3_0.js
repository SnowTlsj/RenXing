/*
new Env('getH5st3_0');
*/

const jsdom = require('jsdom')
let domWindow = null

async function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(t)
        }, t)
    })
}

async function loadH5Sdk() {
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
    <script src="https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.3.js"></script>
    <script src="https://fm-price-cdn.jd.com/priceportal-static/script/utilsV1_1.js"></script>
    </body>`,
        options
    )
    await sleep(500)
    domWindow = dom.window
}

/**
 * @describe 获取 H5st 3_0 版本验参
 * @param businessId appId
 * @param req body
 */
async function getH5st(businessId, req) {
    let timer = null
    if (!domWindow) {
        await loadH5Sdk()
    }
    return new Promise(async (resolve) => {
        if (typeof domWindow.signWaap === 'function') {
            const h5st = await domWindow.signWaap(businessId, req)
            resolve(h5st)
        } else {
            timer = setInterval(async () => {
                if (typeof domWindow.signWaap === 'function') {
                    clearInterval(timer)
                    timer = null
                    const h5st = await domWindow.signWaap(businessId, req)
                    resolve(h5st)
                }
            }, 100)
        }
    })
}

module.exports = getH5st
