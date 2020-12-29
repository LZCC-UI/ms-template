<template>
  <div class="shool-manage">
    <div class="search-line">
      <el-input
        class="search-input"
        v-model="searchKey"
        placeholder="请输入搜索学校的全称"
        @keyup.enter="getData"
      ></el-input>
      <el-button type="primary" @click="getData">搜索</el-button>
      <el-button type="primary" @click="reset">清空</el-button>
      <el-button type="primary" @click="creatShool">新建学校主页</el-button>
    </div>
    <div class="tab-list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="学校名称"></el-table-column>
        <el-table-column prop="name" label="英文缩写"></el-table-column>
        <el-table-column prop="address" label="背景图片"></el-table-column>
        <el-table-column prop="address" label="学校校徽"></el-table-column>
        <el-table-column prop="address" label="价格方案名称"></el-table-column>
        <el-table-column prop="address" label="价格方案描述"></el-table-column>
        <el-table-column prop="address" label="操作">
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
              危险链接
            </el-link>
            <el-link class="operation-btn" :underline="false" type="primary">
              复制链接
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'shool-manage',
  data() {
    return {
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
    reset() {},
    creatShool() {},
    getData() {},
  },
}
</script>

<style scoped lang="scss">
.shool-manage {
  padding: 20px;
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
