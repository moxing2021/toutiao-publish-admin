<template>
  <el-menu
    default-active="/"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    class="aside-width"
  >
    <el-menu-item index="/">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-hanbao"></use>
        </svg>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="/article"  width="auto">
      <template slot="title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-cha"></use>
        </svg>
        <span>内容管理</span>
      </template>
      <el-menu-item index="/articletitle">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-buding"></use>
        </svg>
        <span slot="title">标题</span>
      </el-menu-item>
      <!-- <el-menu-item index="/article-img">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-baomihua"></use>
        </svg>
        <span slot="title">图片</span>
      </el-menu-item>
      <el-menu-item index="/article-link">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-beizidangao"></use>
        </svg>
        <span slot="title">链接</span>
      </el-menu-item> -->
    </el-submenu>

    <el-menu-item index="/img">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kaixinguo"></use>
        </svg>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/pushlib">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guozhi"></use>
        </svg>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bangbangtang"></use>
        </svg>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jitui"></use>
        </svg>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dangao"></use>
        </svg>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  components: {},
  props: ['is-collapse'],
  data() {
    return {
      // 展开和收起按钮
      //isCollapse:true
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.aside-width:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.icon {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 18px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
