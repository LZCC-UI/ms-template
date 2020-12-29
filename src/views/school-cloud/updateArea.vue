<template>
  <div>
    <h4>新建区域</h4>
    <section class="formBlock">
      <el-form ref="form" :model="areaForm" label-width="120px">
        <el-form-item label="区域名称:">
          <el-input placeholder="请输入区域名称"></el-input>
          <li class="markTip">（最多可输入20个汉字）</li>
        </el-form-item>
        <el-form-item label="英文缩写:">
          <el-input placeholder="请输入英文缩写"></el-input>
          <li class="markTip">（最多可输入50个字符）</li>
        </el-form-item>
        <el-form-item label="区域简介:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 10 }"
            placeholder="请输入英文缩写"
          ></el-input>
          <li class="markTip">（最多可输入400字）</li>
        </el-form-item>
        <el-form-item label="区域背景图片:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 10 }"
            placeholder="请输入英文缩写"
          ></el-input>
          <li class="markTip">（最多可输入400字）</li>
        </el-form-item>
      </el-form>
    </section>

    <p>下辖学校</p>
    <section class="schoolList">
      <el-button type="primary">添加学校</el-button>
      <el-table :data="areaForm.schoolList" border>
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="学校名称" align="center">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="英文缩写" align="center">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="背景图片" align="center">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="学校徽章" align="center">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="removeSchoolItem(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      areaForm: {
        name: '',
        enName: '',
        description: '',
        bgImg: '',
        schoolList: [
          {
            schoolName: '',
            schooleEnName: '',
            schooleImg: '',
            schooleIcon: '',
          },
        ],
      },
      rules:{
          name:[{required:true,message:'请输入区域名称',trigger:'blur'}],
           name:[{required:true,message:'请输入区域名称',trigger:'blur'}],
            name:[{required:true,message:'请输入区域名称',trigger:'blur'}]
      }
    }
  },
  methods: {
    removeSchoolItem(index) {
      this.areaForm.schoolList.splice(index, 1)
    },
  },
}
</script>
<style scoped lang="scss">
.formBlock {
  .el-input {
    //    width: 300px;
  }
}
.markTip {
  list-style-type: none;
  font-size: 12px;
  text-align: right;
}
.schoolList {
  padding: 10px 50px;
}
</style>