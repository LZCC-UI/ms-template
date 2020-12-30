<template>
  <div class="shool-manage">
    <div class="search-line">
      <el-input
        class="search-input"
        v-model="searchKey"
        placeholder="请输入搜索学校的全称"
        clearable
        @keyup.enter="getData"
      ></el-input>
      <el-button type="primary" @click="getData">搜索</el-button>
      <el-button type="primary" @click="reset">清空</el-button>
      <el-button type="primary" @click="creatShool">新建学校主页</el-button>
    </div>
    <div class="tab-list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="学校名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="英文缩写"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="背景图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="学校校徽"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="价格方案名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="价格方案描述"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              @click="edit(scope)"
              class="operation-btn"
              :underline="false"
              type="primary"
            >
              编辑
            </el-link>
            <el-link class="operation-btn" :underline="false" type="danger">
              删除
            </el-link>
            <el-link class="operation-btn" :underline="false" type="primary">
              复制链接
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total,prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'shool-manage',
  data() {
    return {
      currentPage: 1,
      searchKey: '',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    }
  },
  methods: {
    reset() {
      this.searchKey = ''
    },
    creatShool() {
      this.$router.push({ name: 'addSchool' })
    },
    getData() {},
    handleCurrentChange() {},
  },
}
</script>

<style scoped lang="scss">
.shool-manage {
  .search-line {
    .search-input {
      width: 300px;
      height: 50px;
      margin-right: 20px;
    }
  }
  .tab-list {
    margin-top: 20px;
    .operation-btn {
      margin-left: 20px;
      &:nth-of-type(1) {
        margin-left: 0px;
      }
    }
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
