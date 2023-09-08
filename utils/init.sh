source ${ARCADIA_DIR}/shell/core/main.sh
cd ${ARCADIA_DIR}
target_dir=$RepoDir/SuperManito_cishanjia/utils

if [ -x $target_dir/gz/follow.sh ]; then
    ln -sf $target_dir/gz/follow.sh /usr/local/bin/gz
fi

echo -e "执行完毕"
