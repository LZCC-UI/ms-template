<template>
  <div>
    <el-form ref="form" :model="school" :rules="rules" label-width="130px">
      <el-form-item label="学校名称:" prop="schoolName">
        <el-input
          placeholder="请输入学校名称"
          v-model="school.schoolName"
          :maxlength="20"
        ></el-input>
      </el-form-item>
      <li class="markTip">（最多可输入20个汉字）</li>
      <el-form-item label="英文缩写:" prop="schoolNameEn">
        <el-input
          placeholder="请输入英文缩写"
          v-model="school.schoolNameEn"
          :maxlength="50"
        ></el-input>
      </el-form-item>
      <li class="markTip">（最多可输入50个字符）</li>
      <el-form-item label="学校简介:" prop="schoolIntroduction">
        <el-input
          v-model="school.schoolIntroduction"
          type="textarea"
          :maxlength="400"
          :autosize="{ minRows: 8, maxRows: 10 }"
          placeholder="请输入学校简介"
        ></el-input>
      </el-form-item>
      <li class="markTip">（最多可输入400字）</li>
      <el-form-item label="校徽:" prop="schoolBadge">
        <singleImgUpload
          v-model="school.schoolBadge"
          :k="20"
          :size="{ w: 150, h: 150 }"
        ></singleImgUpload>
        <i class="markTip">(图片需大于150*150像素，文件小于1M)</i>
      </el-form-item>
      <el-form-item label="背景图片:">
        <singleImgUpload v-model="school.schoolBackgroundImg"></singleImgUpload>
      </el-form-item>
      <el-form-item label="价格方案名称:" prop="pricePlanId">
        <el-select
          v-model="school.pricePlanId"
          placeholder="请选择价格方案"
          clearable
        >
          <el-option
            v-for="item of pricePlanList"
            :value="item.id"
            :label="item.pricePlanName"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格方案描述:" prop="pricePlanDesc">
        <el-input
          type="textarea"
          :disabled="true"
          :autosize="{ minRows: 4, maxRows: 6 }"
          v-model="school.pricePlanDesc"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="commit">创建</el-button>
      <el-button type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
import singleImgUpload from '@/components/customer-component/singleImgUpload'
export default {
  components: { singleImgUpload },
  data() {
    let checkName = async (rule, value, callback) => {
      if (value) {
        let check = /^[\u4e00-\u9fa5]{1,20}$/.test(value)
        if (!check) {
          callback('仅支持汉字且长度不超过20')
        } else {
          let checkRepeat = await this.validatName('ch', value)
          if (checkRepeat) {
            callback('该区域英文名已被占用，请更改')
          }
        }
      }
    }
    let checkEnName = async (rule, value, callback) => {
      if (value) {
        let check = /[a-zA-Z]+/.test(value)
        if (!check || value.length > 50) {
          callback('仅支持英文且长度不超过50')
        } else {
          let checkRepeat = await this.validatName('en', value)
          if (checkRepeat) {
            callback('该区域英文名已被占用，请更改')
          }
        }
      }
    }
    return {
      school: {
        id: null,
        schoolName: '',
        schoolNameEn: '',
        schoolIntroduction: '',
        schoolBadge: '',
        schoolBackgroundImg: '',
        pricePlanId: '',
        pricePlanName: '',
        pricePlanDesc: '',
      },
      pricePlanList: [],
      rules: {
        schoolName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' },
        ],
        schoolNameEn: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
          { validator: checkEnName, trigger: 'blur' },
        ],
        schoolIntroduction: [
          { required: true, message: '请输入学校简介', trigger: 'blur' },
        ],
        schoolBadge: [
          { required: true, message: '请上传校徽', trigger: 'blur' },
        ],
        pricePlanId: [
          { required: true, message: '请选择价格方案', trigger: 'change' },
        ],
        pricePlanDesc: [{ required: true, message: ' ', trigger: 'change' }],
      },
    }
  },
  created() {
    this.getPricePlanList()
    if (this.$route.params.id) {
      this.getSchoolById(this.$route.params.id)
    }
  },
  watch: {
    'school.pricePlanId': {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.handleSelectChange(newVal)
        }
        if (!newVal) {
          this.school.pricePlanDesc = ''
        }
      },
    },
  },
  methods: {
    //   编辑，获取学校数据
    getSchoolById(id) {
      this.fetchData('getSchoolById', { id: id }).then(res => {
        Object.keys(this.school).forEach(key => {
          this.school[key] = res.data[key]
        })

        this.$forceUpdate()
      })
    },
    //获取价格详细信息
    getPricePlanList() {
      this.fetchData('getPricePlanList').then(res => {
        this.pricePlanList = res.data
      })
    },
    // 检查学校英文名是否重复
    checkSchoolNameEn(name) {
      this.fetchData('checkSchoolNameEn', { schoolNameEn: name })
    },
    async validatName(type, value) {
      let res = await this.fetchData(
        'checkSchoolName',
        {
          id: this.$route.params.id || undefined,
          name: value,
          checkType: type === 'en' ? 1 : 0,
        },
        false
      )
      return !res.data
    },
    commit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.fetchData('addOrUpdateSchool', this.school).then(res => {
            this.$message.success(
              this.$route.params.id ? '更新成功' : '新建成功'
            )
            this.$router.push({ name: 'school-manage' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSelectChange(value) {
      this.pricePlanList.forEach(item => {
        if (item.id === value) {
          this.$set(this.school, 'pricePlanDesc', item.priceDescription)
        }
      })
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
