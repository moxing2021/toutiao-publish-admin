<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <!-- 使用组件AppAside -->
      <app-aside class="aside-menu"></app-aside>
    </el-aside>
    <el-container>
      <!-- top导航开始 -->
      <el-header class="header">
        <div>
        <i class="el-icon-s-fold"></i>
        <span>红小六川式炸匠铺-杭州黄龙万科中心店</span>
        </div>
        <el-dropdown trigger="click">
            <div class="avatar-warp">
                <img class="avatar" :src="user.photo" alt="">
                <span> {{ user.name }} </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools">个人设置</el-dropdown-item> 
            <el-dropdown-item icon="el-icon-user-solid">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- top导航结束 -->
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//引入组件AppAside
import AppAside from "./components/aside"
import { getUserProfile } from '@/api/user'
export default {
  name: "LayoutIndex",
  components: {
    //注册组件AppAside
    AppAside,
  },
  props: {},
  data() {
    return {
        user:''//当前用户登录信息
    };
  },
  computed: {},
  watch: {},
  created () {
      
      this.loadUserProfile()
  },
  mounted() {},
  methods: {
      loadUserProfile () {
          getUserProfile().then(res =>{
            console.log(res)
            this.user = res.data.data
          })
      }
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.aside {
  background-color: antiquewhite;
}
.aside-menu {
  height: 100%;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #ccc;
    .avatar-warp{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
}
</style>
