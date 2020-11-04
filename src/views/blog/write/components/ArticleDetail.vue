<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container" style="background: #d0d0d0">
        <sticky :z-index="10">
          <CommentDropdown v-model="postForm.comment_disabled"/>
          <PlatformDropdown v-model="postForm.platforms"/>
          <!--        <SourceUrlDropdown v-model="postForm.source_uri"/>-->
          <el-button v-loading="loading" style="margin-left: 600px;" type="success" @click="draftForm">
            发布
          </el-button>
          <!--          <el-button v-loading="loading" type="warning" @click="draftForm">-->
          <!--            保存-->
          <!--          </el-button>-->
        </sticky>
      </div>

      <div class="createPost-main-container">
        <el-row>
          <!--          <Warning/>-->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title" label="标题:" class="whiteItem">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>

              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="作者:" class="postInfo-container-item whiteItem">
                    <!--                    <el-select v-model="postForm.author" filterable default-first-option remote-->
                    <!--                               placeholder="Search user">-->
                    <!--                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item"/>-->
                    <!--                    </el-select>-->
                    <el-input v-model="postForm.author" :rows="1" type="text" autosize
                              placeholder="Please enter the author"/>


                  </el-form-item>

                  <el-form-item label-width="60px" label="小标签:" class="postInfo-container-item whiteItem">
                    <!--                    <el-select v-model="postForm.author" filterable default-first-option remote-->
                    <!--                               placeholder="Search user">-->
                    <!--                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item"/>-->
                    <!--                    </el-select>-->
                    <el-input v-model="postForm.cate_name" :rows="1" type="text" autosize
                              placeholder="Please enter the author"/>


                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item whiteItem">
                    <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="Select date and time"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="90px" label="重要程度:" class="postInfo-container-item whiteItem">
                    <el-rate
                      v-model="postForm.importance"
                      :max="5"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900','#FF414C','#FF0000']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="80px" label="文章简述:" class="whiteItem">
          <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize
                    placeholder="Please enter the content"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400"/>
        </el-form-item>

        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" @input="getImageFile"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/SingleImage3'
  import MDinput from '@/components/MDinput'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { validURL } from '@/utils/validate'
  // import { fetchArticle } from '@/api/article'
  // import { searchUser } from '@/api/remote-search'
  import Warning from './Warning'
  import { CommentDropdown, PlatformDropdown } from './Dropdown'
  import { writeBlog } from '../../../../utils/server'
  import qs from 'qs'

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    author: '杨宇斌',
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['01'],
    comment_disabled: false,
    importance: 0,
    cate_name: ''
  }

  export default {
    name: 'ArticleDetail',
    components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(new Error(rule.field + '为必传项'))
        } else {
          callback()
        }
      }
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validURL(value)) {
            callback()
          } else {
            this.$message({
              message: '外链url填写不正确',
              type: 'error'
            })
            callback(new Error('外链url填写不正确'))
          }
        } else {
          callback()
        }
      }
      return {
        postForm: Object.assign({}, defaultForm),
        loading: false,
        userListOptions: [],
        rules: {
          // image_uri: [{ validator: validateRequire }],
          title: [{ validator: validateRequire }],
          content: [{ validator: validateRequire }],
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        },
        tempRoute: {}
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.content_short.length
      },
      displayTime: {
        // set and get is useful when the data
        // returned by the back end api is different from the front end
        // back end return => "2013-06-25 06:59:25"
        // front end need timestamp => 1372114765000
        get() {
          return (+new Date(this.postForm.display_time))
        },
        set(val) {
          this.postForm.display_time = new Date(val)
        }
      }
    },
    created() {
      // if (this.isEdit) {
      //   const id = this.$route.params && this.$route.params.id
      //   this.fetchData(id)
      // }

      // Why need to make a copy of this.$route here?
      // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
      // https://github.com/PanJiaChen/vue-element-admin/issues/1221
      this.tempRoute = Object.assign({}, this.$route)
    },
    methods: {
      // fetchData(id) {
      //   fetchArticle(id).then(response => {
      //     this.postForm = response.data
      //
      //     // just for test
      //     this.postForm.title += `   Article Id:${this.postForm.id}`
      //     this.postForm.content_short += `   Article Id:${this.postForm.id}`
      //
      //     // set tagsview title
      //     this.setTagsViewTitle()
      //
      //     // set page title
      //     this.setPageTitle()
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // },
      getImageFile(e) {
        console.log('上传获得的内容:', e)
      },
      setTagsViewTitle() {
        const title = 'Edit Article'
        const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
        this.$store.dispatch('tagsView/updateVisitedView', route)
      },
      setPageTitle() {
        const title = 'Edit Article'
        document.title = `${title} - ${this.postForm.id}`
      },
      submitForm() {
        console.log(this.postForm)
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            this.postForm.status = '1'
            this.loading = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      draftForm() {
        if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }

        //调用后台接口保存文章内容入库
        let content = {
          'is_comment': this.postForm.comment_disabled == true ? 'Y' : 'N',
          'status': '0',
          'is_platform': this.postForm.platforms[0],
          'title': this.postForm.title,
          'author': this.postForm.author,
          'importance': this.postForm.importance,
          'content_short': this.postForm.content_short,
          'content': this.postForm.content,
          'cate_name': this.postForm.cate_name,
          'image_url': this.postForm.image_uri,
          'display_time': this.postForm.display_time
        }
        console.log('需要提交的参数', content)

        // let content = {
        //   'username': 'yubin.yang', 'password': '123'
        // }
        console.log('开始请求后台')
        // createArticle(content).then((res) => {
        //   console.log("获取的博客内容:",res)
        // })
        //todo 这里临时这么写，用request.js一直提示跨域问题，无解了
        //解决方案，用原生的axios在server.js写一下

        writeBlog(content, msg => {
          console.log('提交返回的消息:', msg)
          if (msg.code == 20000) {
            this.$message({
              message: '保存成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.postForm.status = 'draft'
            this.$router.push('/')
          } else {
            this.$message({
              message: '写库失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
            this.postForm.status = 'draft'
          }
        })

        // this.$axios({
        //   // url: 'http://localhost:8005/hfc/api/test_login/',
        //   url:'http://localhost:8000/blog/blog_article/',
        //   method: 'post',
        //   data: content,
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }).then((res)=> {
        //   this.$message({
        //     message: '保存成功',
        //     type: 'success',
        //     showClose: true,
        //     duration: 1000
        //   })
        //   this.postForm.status = 'draft'
        //   this.$router.push('/')
        // }).catch((err)=>{
        //   console.log(err)
        //   this.$message({
        //     message: '写库失败',
        //     type: 'error',
        //     showClose: true,
        //     duration: 1000
        //   })
        //   this.postForm.status = 'draft'
        // })

      }
      // getRemoteUserList(query) {
      //   searchUser(query).then(response => {
      //     if (!response.data.items) return
      //     this.userListOptions = response.data.items.map(v => v.name)
      //   })
      // }
    }
  }
</script>

<style lang="scss">
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }

  .whiteItem .el-form-item__label {
    color: #ffffff;
  }

</style>
