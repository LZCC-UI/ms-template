<template>
  <div>
    <el-form ref="form" :model="school" :rules="rules" label-width="120px">
      <el-form-item label="学校名称:" prop="name">
        <el-input
          placeholder="请输入学校名称"
          v-model="school.name"
          :maxlength="20"
        ></el-input>
      </el-form-item>
      <li class="markTip">（最多可输入20个汉字）</li>
      <el-form-item label="英文缩写:" prop="enName">
        <el-input
          placeholder="请输入英文缩写"
          v-model="school.enName"
          :maxlength="50"
        ></el-input>
      </el-form-item>
      <li class="markTip">（最多可输入50个字符）</li>
      <el-form-item label="学校简介:" prop="description">
        <el-input
          v-model="school.description"
          type="textarea"
          :maxlength="400"
          :autosize="{ minRows: 8, maxRows: 10 }"
          placeholder="请输入学校简介"
        ></el-input>
      </el-form-item>
      <li class="markTip">（最多可输入400字）</li>
      <el-form-item label="校徽:">
        <singleImgUpload
          v-model="school.Icon"
          :k="20"
          :size="{ w: 150, h: 150 }"
        ></singleImgUpload>
        <i class="markTip">(图片需大于150*150像素，文件小于20Kb)</i>
      </el-form-item>
      <el-form-item label="背景图片:">
        <singleImgUpload v-model="school.bgImg"></singleImgUpload>
      </el-form-item>
      <el-form-item label="价格方案名称:">
        <el-select
          v-model="school.programName"
          placeholder="请选择价格方案"
          @change="handleSelectChange"
          clearable
        >
          <el-option :value="0" label="基础版"></el-option>
          <el-option :value="1" label="升级版"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格方案描述:">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6 }"
          v-model="school.programDesc"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary">创建</el-button>
      <el-button type="info">取消</el-button>
    </div>
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
      school: {
        name: '',
        enName: '',
        description: '',
        icon: '',
        beImg: '',
        programName: '',
        programDesc: '',
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
    handleSelectChange(value) {
      switch (value) {
        case 0:
          this.$set(this.school, 'programDesc', '基础方案')
          break
        case 1:
          this.$set(this.school, 'programDesc', '升级方案')
          break
        default:
          this.$set(this.school, 'programDesc', '')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.markTip {
  list-style-type: none;
  font-size: 12px;
  text-align: right;
  margin-bottom: 12px;
}
</style>
