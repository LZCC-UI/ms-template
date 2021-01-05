<template>
  <div class="shool-manage">
    <div class="search-line">
      <el-input
        class="search-input"
        v-model="searchKey"
        placeholder="请输入搜索学校的全称"
        clearable
        @keyup.enter.native="getSchoolList(-1)"
      ></el-input>
      <el-button type="primary" @click="getSchoolList(-1)">搜索</el-button>
      <el-button type="primary" @click="reset">清空</el-button>
      <el-button type="primary" @click="creatShool">新建学校主页</el-button>
    </div>
    <div class="tab-list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="schoolName"
          label="学校名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="schoolNameEn"
          label="英文缩写"
          align="center"
        ></el-table-column>
        <el-table-column label="背景图片" align="center">
          <template slot-scope="scope">
            <div v-if="!scope.row.schoolBackgroundImg" class="imgStyle"></div>

            <img
              v-else
              class="imgStyle"
              :src="scope.row.schoolBackgroundImg"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="学校校徽" align="center">
          <template slot-scope="scope">
            <div v-if="!scope.row.schoolBadge" class="imgStyle"></div>

            <img v-else class="imgStyle" :src="scope.row.schoolBadge" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          prop="pricePlanName"
          label="价格方案名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="priceDescription"
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
              @click="editSchool(scope.row.id)"
              class="operation-btn"
              :underline="false"
              type="primary"
            >
              编辑
            </el-link>
            <el-link
              class="operation-btn"
              :underline="false"
              @click="delSchoolById(scope.row.id)"
              type="danger"
            >
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
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'shool-manage',
  data() {
    return {
      currentPage: 1,
      total: 0,
      searchKey: '',
      tableData: [
        {
          id: null,
          priceDescription: null,
          pricePlanName: null,
          schoolBackgroundImg: null,
          schoolBadge: null,
          schoolName: null,
          schoolNameEn: null,
        },
      ],
    }
  },
  created() {
    this.getSchoolList(-1)
  },
  methods: {
    reset() {
      this.searchKey = ''
    },
    getSchoolList(tag) {
      if (tag == -1) {
        this.currentPage = 1
      }
      this.fetchData('getSchoolList', {
        pageIndex: this.currentPage,
        schoolName: this.searchKey,
      }).then(res => {
        this.tableData = res.data.pageData
        this.total = res.data.totalSize
        this.dealWithData()
      })
    },
    dealWithData() {
      for (let item of this.tableData) {
        if (item.schoolNameEn.length > 15) {
          item.schoolNameEnCopy = item.schoolNameEn
          item.schoolNameEn = item.schoolNameEn.slice(0, 15) + '……'
        }
      }
    },
    delSchoolById(id) {
      this.$confirm('确认要删除此学校', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.fetchData('delSchoolById', { id: id }).then(res => {
            this.getSchoolList(-1)
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    creatShool() {
      this.$router.push({ name: 'addSchool' })
    },
    editSchool(id) {
      this.$router.push({ name: 'editSchool', params: { id: id } })
    },
    handleCurrentChange(pageIndex) {
      this.currentPage = pageIndex
      this.getSchoolList()
    },
  },
}
</script>

<style scoped lang="scss">
.shool-manage {
  .search-line {
    .search-input {
      width: 300px;
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
.imgStyle {
  display: inline-block;
  width: 128px;
  height: 128px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
