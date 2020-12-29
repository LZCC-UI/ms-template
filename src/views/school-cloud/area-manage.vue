<template>
  <div>
    <el-button type="primary" @click='createArea'>新建区域主页</el-button>
    <el-table :data="areaList" border>
      <el-table-column label="区域名称" prop="name" align='center'></el-table-column>
      <el-table-column label="英文缩写" prop="name" align='center'></el-table-column>
      <el-table-column label="背景图片" align='center'>
        <template slot-scope="scope">
          <div v-if="!scope.row.bgImg">

          </div>
          <div v-else>
            <img :src="scope.row.bgImg" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学校数量" prop="schoolNum"  align='center'></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" style='color:#F56C6C'>删除</el-button>
          <el-button type="text">复制链接</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total,prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'area-management',
  data(){
    return{
      currentPage:1,
      areaList:[
        {name:'区域1',enName:'area',bgImg:'',schoolNum:20}
      ]
    }
  },
  methods:{
    handleCurrentChange(pageIndex){},
    createArea(){
      this.$router.push({name:'updateArea'})
    }
  }
}
</script>

<style scoped lang="scss">
</style>
