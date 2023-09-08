#!/bin/bash
## 一键领取关注有礼奖励 - 辅助工具脚本
## Version: 3.2
## Modified: 2023-08-28

## 运行模式，1为输出命令，2为直接执行
RUNMOD="2"
LocalTimeStr=$(date +%s)
TargetScriptPath="SuperManito_cishanjia/jd_drawShopGift.js"

## 执行位置判定
if [ ${ARCADIA_DIR} ]; then
    source ${ARCADIA_DIR}/shell/core/main.sh
else
    echo -e "\n[\033[31mERROR\033[0m] 请进入容器内执行此脚本！\n"
    exit
fi

## 使用帮助
function Mod_Help() {
    if [ -x /usr/local/bin/gz ]; then
        echo -e "\n${GREEN}使用方法${PLAIN}：在 ${BLUE}gz${PLAIN} 后面加上参数，参数内容为${BLUE}店铺链接/单一店铺ID/组合ID变量${PLAIN}，每次运行仅支持领取单个店铺，支持短链

 ❋ 命令选项：
    ${BLUE}-c${PLAIN} | ${BLUE}--cookie${PLAIN}      指定账号，参数后需跟账号序号，多个账号用 "," 隔开，账号区间用 "-" 连接，可以用 "%" 表示账号总数
    ${BLUE}-b${PLAIN} | ${BLUE}--background${PLAIN}  后台运行，不在前台输出脚本执行进度
    "
    else
        echo -e "\n${GREEN}使用方法${PLAIN}：使用 ${BLUE}bash${PLAIN} 执行此脚本并在后面加上参数，参数内容为${BLUE}店铺链接/单一店铺ID/组合ID变量${PLAIN}，每次运行仅支持领取单个店铺，支持短链

 ❋ 命令选项：
    ${BLUE}-c${PLAIN} | ${BLUE}--cookie${PLAIN}      指定账号，参数后需跟账号序号，多个账号用 "," 隔开，账号区间用 "-" 连接，可以用 "%" 表示账号总数
    ${BLUE}-b${PLAIN} | ${BLUE}--background${PLAIN}  后台运行，不在前台输出脚本执行进度
    "
    fi
}

## 打印店铺信息
function print_shop_info() {
    local SHOP_NAME="$(query_shop_info "shopName")"
    echo -e "\n店铺名称：${SHOP_NAME}\n店铺链接：https://shop.m.jd.com/?venderId=${VENDER_ID}&shopId=${SHOP_ID}"
}

## 解析 u.jd.com 短链接
function parse_ujd() {
    local ujd="$1"
    # 从文件中提取 hrl 链接
    local jdaUrl="$(curl -sSL $ujd | grep -oE 'var hrl='\''[^'\'']*'\'';' | sed 's/var hrl='\''//;s/'\'';//;s/\\x/%/g')"
    URL="$(curl -sSL "${jdaUrl}" -o /dev/null -w %{url_effective})"
}

## 获取店铺信息
function query_shop_info() {
    if [[ -z "${ShopData}" ]]; then
        ShopData="$(curl -sL "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22shopId%22%3A%22${SHOP_ID}%22%2C%20%22venderId%22%3A%22${VENDER_ID}%22%2C%20%22source%22%3A%22m-shop%22%7D&t=${LocalTimeStr}000&appid=shop_m_jd_com&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=167100205425019231810$((${RANDOM} % 10))$((${RANDOM} % 10))" \
            -H 'origin: https://shop.m.jd.com' \
            -H 'sec-fetch-dest: empty' \
            -H 'sec-fetch-mode: cors' \
            -H 'sec-fetch-site: same-site' \
            -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' \
            -H 'x-referer-page: https://shop.m.jd.com/shop/introduce' \
            --compressed | jq -r ".data.shopBaseInfo")"
    fi
    echo "${ShopData}" | jq -r ".${1}"
}

function get_id_with_url() {
    local UrlContent="$1"

    ## 判断链接是否含有 shopId
    echo "${UrlContent}" | grep "shopId=" -Eq
    local ExitStatus_shopId=$?
    ## 判断链接是否含有 venderId
    echo "${UrlContent}" | grep "vend.rId=" -Eq
    local ExitStatus_venderId=$?

    if [[ $ExitStatus_shopId -eq 0 ]] && [[ $ExitStatus_venderId -eq 0 ]]; then
        SHOP_ID="$(echo "${UrlContent}" | perl -pe "{s|.*shopId=([^& ]+)(?=;?).*|\1|}")"
        VENDER_ID="$(echo "${UrlContent}" | perl -pe "{s|.*vend.rId=([^& ]+)(?=;?).*|\1|}")"

    elif [[ $ExitStatus_shopId -eq 0 ]]; then
        SHOP_ID="$(echo "${UrlContent}" | perl -pe "{s|.*shopId=([^& ]+)(?=;?).*|\1|}")"
        ## 判断是否为自营店铺（部分自营店铺两者的值相等）
        if [[ "${#SHOP_ID}" -eq 10 ]]; then
            VENDER_ID=$SHOP_ID
        else
            VENDER_ID="$(query_shop_info "venderId")"
            if [ -z ${VENDER_ID} ]; then
                echo -e "\n$FAIL 店铺ID获取失败，请检查店铺地址是否正确！\n"
                exit
            fi
        fi

    elif [[ $ExitStatus_venderId -eq 0 ]]; then
        VENDER_ID="$(echo "${UrlContent}" | perl -pe "{s|.*vend.rId=([^& ]+)(?=;?).*|\1|}")"
        SHOP_ID="$(query_shop_info "shopId")"
        if [ -z ${SHOP_ID} ]; then
            echo -e "\n$FAIL 店铺ID获取失败，请检查店铺地址是否正确！\n"
            exit
        fi

    else
        output_error "未知链接格式，请重新提供活动关键信息！"
    fi
}

function get_id_with_ids() {
    local IdContent="$1"

    ## 判断是否为常用变量格式（shopId_venderId）
    if [[ "${IdContent}" =~ ^[0-9]{1,10}_[0-9]{1,10}$ ]]; then
        SHOP_ID="$(echo "${IdContent}" | awk -F '_' '{print$1}')"
        VENDER_ID="$(echo "${IdContent}" | awk -F '_' '{print$2}')"

    ## 判断是否为纯id格式（shopId或venderId）
    elif [[ "${IdContent}" =~ ^[0-9]{1,10}$ ]]; then
        local bodyTmp ShopData result
        bodyTmp="%7B%22venderId%22%3A%22${IdContent}%22%2C%20%22source%22%3A%22m-shop%22%7D"
        ShopData="$(curl -sL "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=${bodyTmp}&t=${LocalTimeStr}000&appid=shop_m_jd_com&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=167100205425019231810$((${RANDOM} % 10))$((${RANDOM} % 10))" \
            -H 'origin: https://shop.m.jd.com' \
            -H 'sec-fetch-dest: empty' \
            -H 'sec-fetch-mode: cors' \
            -H 'sec-fetch-site: same-site' \
            -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' \
            -H 'x-referer-page: https://shop.m.jd.com/shop/introduce' \
            --compressed)"
        result=$(echo "${ShopData}" | jq -r ".success")
        if [[ $result == "true" ]]; then
            VENDER_ID=$(echo "${ShopData}" | jq -r ".data.shopBaseInfo.venderId")
            SHOP_ID=$(echo "${ShopData}" | jq -r ".data.shopBaseInfo.shopId")
        else
            bodyTmp="%7B%22shopId%22%3A%22${IdContent}%22%2C%20%22source%22%3A%22m-shop%22%7D"
            ShopData="$(curl -sL "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=${bodyTmp}&t=${LocalTimeStr}000&appid=shop_m_jd_com&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=167100205425019231810$((${RANDOM} % 10))$((${RANDOM} % 10))" \
                -H 'origin: https://shop.m.jd.com' \
                -H 'sec-fetch-dest: empty' \
                -H 'sec-fetch-mode: cors' \
                -H 'sec-fetch-site: same-site' \
                -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' \
                -H 'x-referer-page: https://shop.m.jd.com/shop/introduce' \
                --compressed)"
            result=$(echo "${ShopData}" | jq -r ".success")
            if [[ $result == "true" ]]; then
                VENDER_ID=$(echo "${ShopData}" | jq -r ".data.shopBaseInfo.venderId")
                SHOP_ID=$(echo "${ShopData}" | jq -r ".data.shopBaseInfo.shopId")
            else
                output_error "未能获取到店铺信息，请检查原因后重试！"
            fi
        fi

    else
        output_error "未知格式，请重新提供活动关键信息！"
    fi
}

function Main() {
    echo "$1" | grep -Eq "^https?:"
    if [ $? -eq 0 ]; then
        ## 判断链接是否为ujd短链
        echo "$1" | grep "^https://u\.jd\.com/.*" -Eq
        if [ $? -eq 0 ]; then
            parse_ujd "$1"
            if [ "${URL}" ]; then
                get_id_with_url "${URL}"
            else
                output_error "没有解析到ujd短链接"
            fi
        else
            get_id_with_url "$1"
        fi
    else
        get_id_with_ids "$1"
    fi

    [ -z $SHOP_ID ] && output_error "未能获取到 ${BLUE}shopId${PLAIN} ，请检查原因后重试！"
    [ -z $VENDER_ID ] && output_error "未能获取到 ${BLUE}venderId${PLAIN} ，请检查原因后重试！"

    print_shop_info
}

case $# in
0)
    Mod_Help
    ;;
1)
    Main "$1"

    case ${RUNMOD} in
    1)
        echo -e "\n$EnvManageCmd edit jd_drawShopGift_argv \"${SHOP_ID}_${VENDER_ID}\""
        echo -e "$TaskCmd run ${TargetScriptPath}"
        echo -e "\n$COMPLETE 命令转换完成\n"
        ;;
    2)
        bash -c "$EnvManageCmd edit jd_drawShopGift_argv \"${SHOP_ID}_${VENDER_ID}\""
        bash -c "$TaskCmd run ${TargetScriptPath}"
        echo -e "\n$COMPLETE 运行完毕\n"
        ;;
    esac
    ;;
*)
    content="$1"
    Main "$content"
    ## 处理命令选项
    parameter="-s"
    while [ $# -gt 1 ]; do
        case $2 in
        -c | --cookie)
            if [[ $3 ]]; then
                echo "$3" | grep -Eq "[a-zA-Z\.;:\<\>/\!@#$^&*|\-_=\+]|\(|\)|\[|\]|\{|\}"
                if [ $? -eq 0 ]; then
                    Mod_Help
                    output_error "检测到无效参数值 ${BLUE}$3${PLAIN} ，语法有误请确认后重新输入！"
                else
                    DESIGNATED_MOD="true"
                    DESIGNATED_MOD_VALUE="$3"
                    shift
                fi
            else
                Mod_Help
                output_error "检测到 ${BLUE}$2${PLAIN} 为无效参数，请在该参数后指定运行账号！"
            fi
            ;;
        -b | --background)
            BACKGROUND_MOD="true"
            ;;
        *)
            output_error "参数错误！"
            ;;
        esac
        shift
    done
    [[ $DESIGNATED_MOD == "true" ]] && parameter+=" -c $DESIGNATED_MOD_VALUE"
    [[ $BACKGROUND_MOD == "true" ]] && parameter+=" -b"

    case ${RUNMOD} in
    1)
        echo -e "\n$EnvManageCmd edit jd_drawShopGift_argv \"${SHOP_ID}_${VENDER_ID}\""
        echo -e "$TaskCmd run ${TargetScriptPath} ${parameter}"
        echo -e "\n$COMPLETE 命令转换完成\n"
        ;;
    2)
        bash -c "$EnvManageCmd edit jd_drawShopGift_argv \"${SHOP_ID}_${VENDER_ID}\""
        bash -c "$TaskCmd run ${TargetScriptPath} ${parameter}"
        echo -e "\n$COMPLETE 运行完毕\n"
        ;;
    esac
    ;;
esac
