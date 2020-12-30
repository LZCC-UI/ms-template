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
            placeholder="请输入区域简介"
          ></el-input>
        </el-form-item>
        <li class="markTip">（最多可输入400字）</li>
        <el-form-item label="区域背景图片:">
          <singleImgUpload
            v-model="areaForm.bgImg"
            :imgAttrs="{ w: 150, h: 150, compTag: 1, k: 1024 }"
          ></singleImgUpload>
        </el-form-item>
      </el-form>
    </section>

    <p>下辖学校</p>
    <section class="schoolList">
      <el-button type="primary" @click="getSchoolList(-1)">添加学校</el-button>
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
          <template slot-scope="scope">
            <img class="imgStyle" :src="scope.row.schoolImg" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="学校校徽" align="center">
          <template slot-scope="scope">
            <img class="imgStyle" :src="scope.row.schoolIcon" alt="" />
          </template>
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
    <el-dialog :visible.sync="schoolDia" align="center" width="900px">
      <section class="_inline">
        <el-input
          v-model="schoolDiaData.searchParam"
          placeholder="请输入想要搜索的学校"
        ></el-input>
        <el-button type="primary">搜索</el-button>
      </section>
      <el-table
        :data="schoolDiaData.schoolList"
        border
        ref="multipleTable"
        style="height: 500px; overflow-y: scroll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="选择"
          type="selection"
          width="55"
          prop="id"
        ></el-table-column>
        <el-table-column label="学校名称" prop="schoolName"></el-table-column>
        <el-table-column label="英文缩写" prop="schoolEnName"></el-table-column>
        <el-table-column label="背景图片">
          <template slot-scope="scope">
            <img class="imgStyle" :src="scope.row.schoolImg" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="学校校徽">
          <template slot-scope="scope">
            <img class="imgStyle" :src="scope.row.schoolIcon" alt="" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="schoolDiaData.currentPage"
        :page-size="20"
        layout="total,prev, pager, next, jumper"
        :total="400"
      ></el-pagination>

      <el-button type="primary" @click="confirmAddSchoolToArea(1)">
        添加
      </el-button>
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
        currentPage: 1,
        schoolTotal: 100,
        schoolList: [
          {
            id: 1,
            schoolName: '清华附中',
            schoolEnName: 'qinghuafu',
            schoolImg:
              'https://kids.nosdn.127.net/kids/1608777046294/big_X.png',
            schoolIcon:
              'https://kids.nosdn.127.net/kids/1608777046294/big_X.png',
          },
          {
            id: 2,
            schoolName: '清华附中',
            schoolEnName: 'qinghuafu',
            schoolImg: '',
            schoolIcon: '',
          },
          {
            id: 3,
            schoolName: '清华附中',
            schoolEnName: 'qinghuafu',
            schoolImg: '',
            schoolIcon: '',
          },
          {
            id: 4,
            schoolName: '清华附中',
            schoolEnName: 'qinghuafu',
            schoolImg: '',
            schoolIcon: '',
          },
          {
            id: 5,
            schoolName: '清华附中',
            schoolEnName: 'qinghuafu',
            schoolImg: '',
            schoolIcon: '',
          },
          {
            id: 6,
            schoolName: '清华附中',
            schoolEnName: 'qinghuafu',
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
            id: 1,
            schoolName: '清华附中',
            schoolEnName: 'qinghuafu',
            schoolImg:
              'https://kids.nosdn.127.net/kids/1608777046294/big_X.png',
            schoolIcon:
              'https://kids.nosdn.127.net/kids/1608777046294/big_X.png',
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
          { required: true, message: '请输入区域简介', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    removeSchoolItem(index) {
      this.areaForm.schoolList.splice(index, 1)
    },
    handleSelectionChange(list) {
      console.log('list', list)
      this.schoolCurrentPageChecked = list
    },
    // tag -1 标识点击添加学校按钮，0为搜索，1是切页
    async getSchoolList(tag) {
      this.schoolCurrentPageChecked = []
      if (tag === -1 || tag === 0) {
        this.schoolDiaData.currentPage = 1
        tag === -1 &&
          (this.schoolTotalChecked = this.areaForm.schoolList.concat([]))
      }
      //   切页或者搜索
      if (tag === 0 || tag === 1) {
        this.confirmAddSchoolToArea(-1)
      }
      console.log('总勾选', this.schoolTotalChecked)
      console.log('列表', this.schoolDiaData.schoolList)
      // 1.发送请求
      // 2.出现弹框
      if (!this.schoolDia) {
        this.schoolDia = true
      }
      // 3.清理上次选中状态
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
      // 4.根据获取当前页数据,设置默认勾选项
      for (let item of this.schoolDiaData.schoolList) {
        let temp = this.schoolTotalChecked.filter(
          checkedItem => checkedItem.id == item.id
        )
        // 设置默认勾选
        if (temp.length != 0) {
          this.$nextTick(() => {
            console.log('toggle', temp)
            this.$refs.multipleTable.toggleRowSelection(temp[0])
          })
        }
      }
    },
    // taregt -1 当前页勾选和totle合并,切页或搜索  1 合并并且赋值给学校列表(点击添加按钮)
    confirmAddSchoolToArea(target) {
      this.schoolTotalChecked = [
        ...new Set([
          ...this.schoolTotalChecked,
          ...this.schoolCurrentPageChecked,
        ]),
      ]
      this.schoolCurrentPageChecked = []
      if (target === 1) {
        this.schoolDiaData.schoolList = this.schoolTotalChecked
        this.$forceUpdate()
      }
    },
    handleCurrentChange(currentPage) {
      this.schoolDiaData.currentPage = currentPage
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
