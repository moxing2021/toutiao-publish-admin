<template>
  <div class="articletitle-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑开始 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <!-- 数据表单开始 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option 
            label="全部" 
            :value="null"
            ></el-option>
            <el-option 
            :label="channel.name" 
            :value="channel.id"
            v-for="(channel, index) in channels"
            :key="index"
            ></el-option>
            
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format = "yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticle(1)">立即查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据表单结束 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span >根据筛选条件共查询到 {{totalCount}} 条结果：</span>
      </div>
      <!-- 数据表格开始 -->
      <!-- 
          第一步：Table 表格组件
          把需要的展示的 数组列表数据绑定给table组件的 data 属性
          注意！不用v-for遍历 组件会自己去遍历
          第二步： 设计表格列 el-table-column
          prop 用来设定要渲染的列表数据的字段 只能展示文本
       -->
      <el-table
        class="list-tabe"
        :data="articles"
        style="width: 100%"
        size="mini"
        stripe
        v-loading="loading"
      >
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <!-- 如果有图片 -->
             <el-image
             class="article-cover"
             :src="scope.row.cover.images[0]" 
             fit="contain"
             ></el-image>
            <!-- <img
            v-if="scope.row.cover.images[0]"
            class="article-cover"
             :src="scope.row.cover.images[0]" 
             alt="" 
             srcset="">
             如果没图片就加载本地 -->
             <!-- <img
             v-else
            class="article-cover"
             src="./no-cover.png" 
             alt="" 
             srcset=""> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态"> 
            <template slot-scope="scope">
                <!-- 如果需要自定义模版则需要把内容放到 <template></template>标签里面
                 如果需要获取当前遍历项数据那么就一定要声明 slot-scope="scope" -->
                <el-tag :type="articlesstatus[scope.row.status].type"> {{articlesstatus[scope.row.status].text}} </el-tag>
                <!-- <el-tag v-else-if="scope.row.status === 1">{{articlesstatus[scope.row.status].text}}</el-tag>
                <el-tag v-else-if="scope.row.status === 2" type="success">{{articlesstatus[scope.row.status].text}}</el-tag>
                <el-tag v-else-if="scope.row.status === 3" type="danger">{{articlesstatus[scope.row.status].text}}</el-tag>
                <el-tag v-else-if="scope.row.status === 4" type="info">{{articlesstatus[scope.row.status].text}}</el-tag> -->
            </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
            <!-- 如果需要自定义模版则需要把内容放到 <template></template>标签里面 -->
          <template slot-scope="scope">
            <el-button
             size="mini" 
             icon="el-icon-edit"
             type="primary"
            circle
              ></el-button
            >
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              circle
              @click="onDeleArticle(scope.row.id)"
              ></el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据表格结束 -->
      <!-- tabe分页 -->
      <nav style="text-align: center">
        <el-pagination
         background 
         layout="prev, pager, next" 
         :total="totalCount"
         @current-change="onCurrentChange"
         :page-size = "pageSize"
         
         >
        </el-pagination>
      </nav>
      <!-- /tabe分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticle,getArticleChannels,deleteArticle} from "@/api/article";
export default {
  name: "ArticletitleIndex",
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      articles: [], //文章数据列表
      //状态码
      articlesstatus: [
          {text:'草稿', status: 0, type:'warning'},
          {text:'待审核', status: 1,type:''},
          {text:'审核通过', status: 2, type:'success'},
          {text:'审核失败', status: 3, type:'danger'},
          {text:'已删除', status: 4, type:'info'}
        
      ],
      totalCount:0,//总数据条数默认为0
      pageSize: 10,//每页数据条数
      status: null,//查询数据状态默认为null 就是全部状态
      channels:[],  //文章频道列表
      channelId: null,//查询文章的频道
      rangeDate: null,//日期范围
      loading: true//表格数据加载
    };
  },
  computed: {},
  watch: {},
  created() {
    //加载请求方法
    this.loadArticle();
    //请求频道方法
    this.loadArticleChannels(1)
  },
  mounted() {},
  methods: {
    loadArticle(page=1) {
      //展示加载中
      this.loading = true
      getArticle({
        page,
        per_page: this.pageSize,
        status: this.status,
       channel_id: this.channelId,
       begin_pubdate: this.rangeDate? this.rangeDate[0] : null,//开始日期
       end_pubdate: this.rangeDate? this.rangeDate[1] : null   //截止日期

      })
        .then(result => {
          //内容管理文章信息获取
          //console.log(result)
          const {results,total_count:totalCount} = result.data.data
          this.articles = results
          this.totalCount = totalCount
          //关闭表格加载
          this.loading = false
        })
        .catch((err) => {});
    },
    loadArticleChannels(){
      getArticleChannels().then((result) => {
        //console.log(result)
        this.channels = result.data.data.channels
      }).catch((err) => {
        
      });
    },
    onCurrentChange(page){
      this.loadArticle(page)
    },
    //删除事件
    onDeleArticle(articleId){
      this.$confirm('此操作将删除本条内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticle(articleId.toString()).then((result) => {
            
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除！'
          });          
        });
      //找到数据接口
      // deleteArticle().then((result) => {
        
      // }).catch((err) => {
        
      // });
      //封装请求方法
      //删除请求调用
      //处理请求结果
      console.log('onDeleArticle')
    }
  },
};
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 22px;
}
.list-tabe {
  margin-bottom: 22px;
}
.article-cover {
  width: 68px;
}
</style>
