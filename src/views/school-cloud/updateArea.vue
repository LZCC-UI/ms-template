<template>
  <div>
    <h4>新建区域</h4>
    <section class="formBlock">
      <el-form ref="form" :model="areaForm" :rules="rules" label-width="120px">
        <el-form-item label="区域名称:" prop="name">
          <el-input
            placeholder="请输入区域名称"
            v-model="areaForm.name"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <li class="markTip">（最多可输入20个汉字）</li>
        <el-form-item label="英文缩写:" prop="enName">
          <el-input
            placeholder="请输入英文缩写"
            v-model="areaForm.enName"
            :maxlength="50"
          ></el-input>
        </el-form-item>
        <li class="markTip">（最多可输入50个字符）</li>
        <el-form-item label="区域简介:" prop="description">
          <el-input
            v-model="areaForm.description"
            type="textarea"
            :maxlength="400"
            :autosize="{ minRows: 8, maxRows: 10 }"
            placeholder="请输入英文缩写"
          ></el-input>
        </el-form-item>
        <li class="markTip">（最多可输入400字）</li>
        <el-form-item label="区域背景图片:">
          <singleImgUpload v-model="areaForm.bgImg"></singleImgUpload>
        </el-form-item>
      </el-form>
    </section>

    <p>下辖学校</p>
    <section class="schoolList">
      <el-button type="primary" @click="schoolDia = true">添加学校</el-button>
      <el-table :data="areaForm.schoolList" border>
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="学校名称" align="center">
          <template slot-scope="scope">{{ scope.row.schoolName }}</template>
        </el-table-column>
        <el-table-column label="英文缩写" align="center">
          <template slot-scope="scope">{{ scope.row.schoolEnName }}</template>
        </el-table-column>
        <el-table-column label="背景图片" align="center">
          <template slot-scope="scope">{{ scope.row.schoolImg }}</template>
        </el-table-column>
        <el-table-column label="学校徽章" align="center">
          <template slot-scope="scope">{{ scope.row.schoolIcon }}</template>
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
    <div class="footer">
      <el-button type="primary">创建</el-button>
      <el-button type="primary">取消</el-button>
    </div>
    <el-dialog :visible.sync="schoolDia" width="900px">
      <section class="_inline">
        <el-input
          v-model="schoolDiaData.searchParam"
          placeholder="请输入想要搜索的学校"
        ></el-input>
        <el-button type="primary">搜索</el-button>
      </section>
      <el-table :data="schoolDiaData.schoolList" border ref="multipleTable">
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column label="学校名称" prop="schoolName"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import singleImgUpload from '@/components/customer-component/singleImgUpload'
export default {
  components: { singleImgUpload },
  data() {
    let checkName = (rule, value, callback) => {
      if (value) {
        let check = /\p{Unified_Ideograph}/gu.test(value)
        if (!check || value.length > 20) {
          callback('仅支持汉字且长度不超过20')
        }
      }
    }
    let checkEnName = (rule, value, callback) => {
      if (value) {
        let check = /[a-zA-Z]+/.test(value)
        if (!check || value.length > 50) {
          callback('仅支持英文且长度不超过50')
        }
      }
    }
    return {
      schoolDia: false,
      schoolDiaData: {
        searchParam: '',
        schoolIndex: 1,
        schoolTotal: 100,
        schoolList: [
          {
            schoolName: '',
            schoolEnName: '',
            schoolImg: '',
            schoolIcon: '',
          },
        ],
      },
      schoolTotalChecked: [], //当前区域，所属学校的全部内容
      schoolCurrentPageChecked: [], //弹框，当前页的默认勾选项
      areaForm: {
        name: '',
        enName: '',
        description: '',
        bgImg: '',
        schoolList: [
          {
            schoolName: '',
            schoolEnName: '',
            schoolImg: '',
            schoolIcon: '',
          },
        ],
      },
      rules: {
        name: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' },
        ],
        enName: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
          { validator: checkEnName, trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入区域简介', trigger: 'blur' },
        ],
      },
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
  margin-bottom: 12px;
}
.schoolList {
  padding: 10px 50px;
}
</style>
