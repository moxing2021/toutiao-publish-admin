<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <!-- 使用组件AppAside -->
      <app-aside
       class="aside-menu"
       :is-collapse = "isCollapse"
       ></app-aside>
    </el-aside>
    <el-container>
      <!-- top导航开始 -->
      <el-header class="header">
        <div>
        <i 
        :class="{
          'el-icon-s-fold':isCollapse,
          'el-icon-s-unfold':!isCollapse
        }"
        @click="isCollapse=!isCollapse"
        ></i>
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
            <el-dropdown-item
             icon="el-icon-user-solid"
             @click.native="onLayout"
             >退出登录</el-dropdown-item>
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
        user:{},//当前用户登录信息
        isCollapse: false //侧边导航栏展开按钮默认为打开
        
    };
  },
  computed: {},
  watch: {},
  created () {
      
      this.loadUserProfile()
  },
  mounted() {},
  methods: {
    //获取用户信息
      loadUserProfile () {
          getUserProfile().then(res =>{
            //console.log(res)
            this.user = res.data.data
          })
      },
      onLayout(){
        //弹出框确认和取消登录
        this.$confirm('此操作将退出当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '退出成功!'
          // });
          //退出登录--就是把用户的状态清除
        window.localStorage.removeItem('user')
        //然后跳转动登录页面
        this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出！'
          });          
        });
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
  width: auto;
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
