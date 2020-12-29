<template>
  <div>
    <el-upload
      :class="['avatar-uploader', uploadDisable ? 'disableClass' : '']"
      style="cursor: not-allowed"
	  
      :action="pic"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :disabled="uploadDisable"
      :before-upload="
        file => {
          return _global_checkFile(file, {
            i: 'jpg,png,gif',
            w: size.w,
            h: size.h,
          })
        }
      "
    >
      <div slot="file" slot-scope="file">
        <img :src="file.url" class="avatar" />
        <span class="el-upload-item-delete" @click="handleRemove(file)">
          <i class="el-icon-delete"></i>
        </span>
      </div>
      <i
        slot="default"
        :class="[{ 'el-icon-plus': showPlus }, 'avatar-uploader-icon']"
      ></i>
    </el-upload>
  </div>
</template>

<script>
import * as picture from '@/utils/picUrl'
import { _global_checkFile } from '@/utils/imgUploadVal'
export default {
  props: {
    size: {
      type: Object,
      default: function () {
        return { w: '', h: '' }
      },
    },
    showPlus: {
      type: Boolean,
      default: () => true,
    },
    uploadDisable: {
      type: Boolean,
      default: () => false,
    },
    // 图片上传项
    imgUrl: {
      required: true,
    },
  },
  model: {
    prop: 'imgUrl',
    event: 'change',
  },
  data() {
    return {
      imageUrl: null,
    }
  },
  created() {
    this.pic = picture.BASE_PICTURE_URL
    console.log(this.showPlus)
  },
  watch: {
    imgUrl: {
      handler(newValue, oldValue) {
        this.imageUrl = newValue
      },
      immediate: true,
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data[0]
      this.$emit('change', this.imageUrl)
    },
  },
}
</script>
<style>
.disableClass .el-upload {
  cursor: not-allowed !important;
}
</style>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  width: 128px;
  height: 128px;
  display: block;
  border: 1px dashed #d9d9d9 !important;
  font-size: 28px;
  color: #8c939d;
  line-height: 128px;
  text-align: center;
}
.avatar {
  border: 1px dashed #d9d9d9 !important;
  width: 126px;
  height: 126px;
  display: block;
}
</style>
