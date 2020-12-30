<template>
  <div>
    <el-button type="primary" @click="createArea">新建区域主页</el-button>
    <el-table :data="areaList" border>
      <el-table-column
        label="区域名称"
        prop="name"
        align="center"
      ></el-table-column>
      <el-table-column
        label="英文缩写"
        prop="enName"
        align="center"
      ></el-table-column>
      <el-table-column label="背景图片" align="center">
        <template slot-scope="scope">
          <div v-if="!scope.row.bgImg"></div>

          <img v-else class="imgStyle" :src="scope.row.bgImg" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        label="学校数量"
        prop="schoolNum"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button
            type="text"
            style="color: #f56c6c"
            @click="deleteItem(scope.row)"
          >
            删除
          </el-button>
          <el-button
            type="text"
            :data-clipboard-text="scope.row.url"
            class="copyBtn"
            @click="copyUrl"
          >
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
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'area-management',
  data() {
    return {
      currentPage: 1,
      areaList: [
        {
          name: '区域1',
          enName: '123456789012345678',
          bgImg: 'https://kids.nosdn.127.net/kids/1608777046294/big_X.png',
          schoolNum: 20,
          url: 'https://kids.nosdn.127.net/kids/1608777046294/big_X.png',
        },
      ],
    }
  },
  created() {
    this.dealWithData()
  },
  methods: {
    dealWithData() {
      for (let item of this.areaList) {
        if (item.enName.length > 15) {
          item.enNameCopy = item.enName
          item.enName = item.enName.slice(0, 15) + '……'
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
          alert('已删除')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleCurrentChange(pageIndex) {},
    createArea() {
      this.$router.push({ name: 'addArea' })
    },
    copyUrl() {
      const clipboard = new Clipboard('.copyBtn')
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
