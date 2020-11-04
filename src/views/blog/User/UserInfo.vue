<!-- 用户中心 -->
<template>
  <div>
    <wbc-nav></wbc-nav>
    <div class="container">
      <div v-show="isEdit" class="tcommonBox">
        <header>
          <h1>
            编辑个人资料
          </h1>
        </header>
        <section>
          <ul class="userInfoBox">
            <li class="avatarlist">
              <span class="leftTitle">头像</span>
              <!-- this.$store.state.host -->
              <!-- action="http://www.vuebook.com/port/Userinfo/UploadImg" -->
              <el-upload
                class="avatar-uploader"
                :action="this.$store.state.app.host+'?path=avatar/'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="userInfoObj.avatar"
                     :src="userInfoObj.avatar?MEDIA_URL+'/avatar/'+userInfoObj.avatar:'static/img/tou.jpg'"
                     :onerror="$store.state.errorImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">点击上传头像，只能上传jpg/png文件，且不超过1mb</div>
              </el-upload>
            </li>
            <li class="username">
              <span class="leftTitle">昵称</span>
              <el-input v-model="userInfoObj.user_name" placeholder="昵称"></el-input>
              <i class="fa fa-wa fa-asterisk"></i>
            </li>
            <li>
              <span class="leftTitle">电子邮件</span>
              <span>{{userInfoObj.email}}</span>
            </li>
            <li>
              <span class="leftTitle">性别</span>
              <template>
                <el-radio class="radio" v-model="userInfoObj.sex" label="男">男</el-radio>
                <el-radio class="radio" v-model="userInfoObj.sex" label="女">女</el-radio>
              </template>
            </li>
            <li>
              <span class="leftTitle">个性标签</span>
              <template>
                <el-radio-group v-model="userInfoObj.label">
                  <el-radio v-for="(item,index) in usertab" :key="'usertab'+index" :label="item">{{item}}</el-radio>
                </el-radio-group>
              </template>
            </li>
          </ul>
          <div class=" saveInfobtn">
            <a class="tcolors-bg" href="javascript:void(0);" @click="isEdit=!isEdit">返 回</a>
            <a class="tcolors-bg" href="javascript:void(0);" @click="saveInfoFun">保 存</a>
          </div>
        </section>
      </div>
      <div v-show="!isEdit" class="tcommonBox">
        <header>
          <h1>
            个人中心
            <span class="gotoEdit" @click="isEdit=!isEdit"><i class="fa fa-wa fa-edit"></i>编辑</span>
          </h1>

        </header>
        <section>
          <ul class="userInfoBox">
            <li class="avatarlist">
              <span class="leftTitle">头像</span>
              <div class="avatar-uploader">
                <img
                  :src="userInfoObj.avatar?MEDIA_URL+'/avatar/'+userInfoObj.avatar:'static/img/tou.jpg'"
                  :onerror="$store.state.errorImg" class="avatar">
              </div>
            </li>
            <li class="username">
              <span class="leftTitle">昵称</span>
              <span>{{userInfoObj.user_name?userInfoObj.user_name:'无'}}</span>

            </li>
            <li>
              <span class="leftTitle">电子邮件</span>
              <span>{{userInfoObj.email?userInfoObj.email:'无'}}</span>
            </li>
            <li>
              <span class="leftTitle">性别</span>
              <span>{{userInfoObj.sex=='男'?'男':'女'}}</span>
            </li>
            <li>
              <span class="leftTitle">个性标签</span>
              <span>{{userInfoObj.label?userInfoObj.label:'未设置'}}</span>
            </li>
          </ul>

        </section>
      </div>
    </div>
    <wbc-footer></wbc-footer>
  </div>
</template>

<script>
  import header from '../../../components/Layout/header.vue'
  import footer from '../../../components/Layout/footer.vue'
  import { getUserInfo, UserInfoSave } from '../../../utils/server.js'//获取用户信息，保存用户信息
  export default {
    name: 'UserInfo',
    data() { //选项 / 数据
      return {
        MEDIA_URL: process.env.VUE_APP_MEDIA_API,
        isEdit: false,
        userInfo: '',//本地存储的用户信
        userInfoObj: '',//用户的信息
        state: false, //是否展示友链开关
        usertabChosed: '天然呆',
        usertab: [//用户标签
          '天然呆',
          '小萌新',
          '学霸',
          '萌萌哒',
          '技术宅',
          '忠实粉'
        ],
        wwwHost: 'http://' + window.location.host//图片域名
      }
    },
    methods: { //事件处理器
      handleAvatarSuccess(res, file) {//上传头像
        // console.log('用户头像',res.image_name,file);
        // console.log(URL.createObjectURL(file.raw));
        if (res.code == 20000) {//存储
          this.userInfoObj.avatar = res.data.file

        } else {
          this.$message.error('上传图片失败')
        }

      },
      beforeAvatarUpload(file) {//判断头像大小
        const isJPG = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1
        // console.log(file);
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      handleLogoSuccess(res, file) { //上传网站logo
        if (res.code == 1001) {//存储
          this.userInfoObj.image = res.image_name
        } else {
          this.$message.error('上传图片失败')
        }
      },
      beforeLogoUpload(file) { //控制网站logo图片大小
        const isJPG = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      saveInfoFun: function() {//保存编辑的用户信息
        var that = this

        if (!that.userInfoObj.user_name) { //昵称为必填
          that.$message.error('昵称为必填项，请填写昵称')
          return
        }
        // if (that.state) {
        //   var pattern = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
        //   // console.log(pattern.test(that.userInfoObj.url));
        //   if (!that.userInfoObj.url || !pattern.test(that.userInfoObj.url)) {//如果展示友链 网址为必填项
        //     that.$message.error('请正确填写网址，如http://www.xxx.com')
        //     return
        //   }
        //   if (!that.userInfoObj.name) {//如果展示友链 网址为必填项
        //     that.$message.error('请填写网站名称')
        //     return
        //   }
        //   if (!that.userInfoObj.description) {//如果展示友链 网址为必填项
        //     that.$message.error('请填写网站简介')
        //     return
        //   }
        //
        // }
        //that.userInfoObj.state = 0  //默认不展示友链开关
        UserInfoSave(that.userInfoObj, function(result) {//保存信息接口，返回展示页
          //console.log("更新结果:", result)
          that.$message.success('保存成功！')
          that.isEdit = false
          that.routeChange()
        })

      },
      routeChange: function() {//展示页面信息
        var that = this
        // console.log(this.$router,this.$route);
        if (localStorage.getItem('userInfo')) {
          that.haslogin = true
          that.userInfo = JSON.parse(localStorage.getItem('userInfo'))
          that.userId = that.userInfo.userId
          getUserInfo(that.userId, function(msg) {
            // console.log('用户中心',msg.data);
            that.userInfoObj = msg.data[0]
            //console.log('获取的用户信息：', that.userInfoObj)
            //that.userInfoObj.head_start = 0
            //hat.userInfoObj.logo_start = 0
            //that.state = msg.data.state == 1 ? true : false
          })
          // console.log(that.userInfo);
        } else {
          that.haslogin = false
        }

      }
    },
    components: { //定义组件
      'wbc-nav': header,
      'wbc-footer': footer
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange'
    },
    created() { //生命周期函数
      //console.log(this.$store.state.app.host) //也可以在getters加一段后用this.$store.getters.host
      this.routeChange()
    }
  }
</script>

<style>
  .userInfoBox .avatarlist {
    position: relative;
  }

  .avatar-uploader {
    display: inline-block;
    vertical-align: top;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }

  .gotoEdit {
    font-size: 15px;
    float: right;
    cursor: pointer;
    color: #999;
  }

  .gotoEdit:hover {
    color: #333;
  }

  /*个人设置*/
  .userInfoBox .leftTitle {
    display: inline-block;
    width: 100px;
    padding: 10px 0;
  }

  .userInfoBox .rightInner {
    display: inline-block;
    max-width: calc(100% - 140px);
    vertical-align: top;
  }

  .userInfoBox li {
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }

  .userInfoBox li:last-child {
    border-bottom: 1px solid transparent;
  }

  .userInfoBox .el-input, .userInfoBox .el-textarea {
    max-width: 300px;
    min-width: 100px;
  }

  .userInfoBox .el-input__inner {
    border-radius: 4px;
  }

  .userInfoBox .el-textarea {
    vertical-align: top;
  }

  .saveInfobtn {
    margin: 20px 0;
    text-align: center;
  }

  .saveInfobtn a {
    color: #fff;
    padding: 6px 20px;
    margin: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
  }

  .userInfoBox .fa-asterisk {
    color: #DF2050;
  }
</style>
