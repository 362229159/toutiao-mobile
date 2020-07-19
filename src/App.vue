<template>
  <div id="app">
    <i class="iconfont iconshouji"></i>
    <p>你好俗人</p>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <!-- 路由占位符 -->
    <router-view />
  </div>
</template>

<style lang="less">
p {
  font-size: 30px;
}
</style>
