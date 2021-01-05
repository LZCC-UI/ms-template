<template>
  <div>
    <el-button type="primary" @click="createArea">新建区域主页</el-button>
    <el-table :data="areaList" border>
      <el-table-column
        label="区域名称"
        prop="areaName"
        align="center"
      ></el-table-column>
      <el-table-column
        label="英文缩写"
        prop="areaNameEn"
        align="center"
      ></el-table-column>
      <el-table-column label="背景图片" align="center">
        <template slot-scope="scope">
          <div v-if="!scope.row.areaBackgroundImg"></div>

          <img
            v-else
            class="imgStyle"
            :src="scope.row.areaBackgroundImg"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column
        label="学校数量"
        prop="schoolCount"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editArea(scope.row.id)">
            编辑
          </el-button>
          <el-button
            type="text"
            style="color: #f56c6c"
            @click="deleteItem(scope.row)"
          >
            删除
          </el-button>
          <el-button type="text" class="copyBtn" @click="copyUrl">
            复制链接
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
import Clipboard from 'clipboard'
export default {
  name: 'area-management',
  data() {
    return {
      total: 0,
      currentPage: 1,
      areaList: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(tag) {
      if (tag == -1) {
        this.currentPage = 1
      }
      this.fetchData('getAreaList', { pangeIndex: this.currentPage }).then(
        res => {
          console.log(res.data)
          this.areaList = res.data.pageData
          this.total = res.data.totalSize
          this.dealWithData()
        }
      )
    },

    dealWithData() {
      for (let item of this.areaList) {
        if (item.areaNameEn.length > 15) {
          item.areaNameEnCopy = item.areaNameEn
          item.areaNameEn = item.areaNameEn.slice(0, 15) + '……'
        }
      }
    },
    deleteItem(row) {
      this.$confirm('确认要删除此区域', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.fetchData('delAreaById', { id: row.id }).then(() => {
            this.getData()
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
    handleCurrentChange(pageIndex) {
      this.currentPage = pageIndex
      this.getData()
    },
    createArea() {
      this.$router.push({ name: 'addArea' })
    },
    editArea(id) {
      this.$router.push({ name: 'editArea', params: { id: id } })
    },
    copyUrl() {
      const clipboard = new Clipboard('.copyBtn', {
        text: function () {
          return '111111111111111111111111111'
        },
      })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        clipboard.destroy() // 释放内存
      })
      clipboard.on('error', e => {
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        clipboard.destroy()
      })
    },
  },
}
</script>

<style scoped lang="scss">
.imgStyle {
  width: 128px;
  height: 128px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
