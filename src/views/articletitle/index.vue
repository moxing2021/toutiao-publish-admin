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
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据表单结束 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 4617 条结果：</span>
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
      >
        <el-table-column prop="date" label="封面"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态"> 
            <template slot-scope="scope">
                <!-- 如果需要自定义模版则需要把内容放到 <template></template>标签里面
                 如果需要获取当前遍历项数据那么就一定要声明 slot-scope="scope" -->
                <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
                <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
                <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
                <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
                <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
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
              ></el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据表格结束 -->
      <!-- tabe分页 -->
      <nav style="text-align: center">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </nav>
      <!-- /tabe分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
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
    };
  },
  computed: {},
  watch: {},
  created() {
    //加载请求方法
    this.loadArticle();
  },
  mounted() {},
  methods: {
    loadArticle() {
      getArticle()
        .then((result) => {
          //内容管理文章信息获取
          //console.log(result)
          this.articles = result.data.data.results;
        })
        .catch((err) => {});
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 12px;
}
.list-tabe {
  margin-bottom: 22px;
}
</style>
