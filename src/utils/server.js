import Vue from 'vue'
import axios from 'axios'
//公共路径
// let portUrl = "http://www.mangoya.cn/port/";
// let portUrl = 'http://' + window.location.host + '/port/'
let portUrl = process.env.VUE_APP_BASE_API

//用户注册
const getRegister = (username, password, email, callback) => {
  const url = portUrl + 'Register/'
  const data = { 'username': username, 'email': email, 'password': password }
  axios.post(url, data).then(num => {
    callback && callback(num.data)
  })
}

//用户登录
const UserLogin = (email, password, callback) => {
  let url = portUrl + 'login/?email=' + email + '&password=' + password
  axios.get(url).then(num => {
    callback && callback(num.data)
  })
}
//用户退出
const LoginOut = (token, callback) => {
  let url = portUrl + 'login/LoginOut?token=' + token
  axios.get(url).then(num => {
    callback && callback(num.data)
  })
}

//文章分类查询
const ArtClassData = (callback) => {
  if (sessionStorage.getItem('classList')) {
    var data = JSON.parse(sessionStorage.getItem('classList'))
    callback && callback(data)
  } else {
    let url = portUrl + 'blog_article_platform'
    axios.get(url).then(num => {
      //console.log('分类查询返回:', num.data)
      if (num.data.code === 20000) {
        sessionStorage.setItem('classList', JSON.stringify(num.data.data))
        callback && callback(num.data.data)
      } else {
        alert('查询失败')
      }
    })
  }
}

//实验室 列表项目
const navMenList = (callback) => {
  if (sessionStorage.getItem('navMenList')) {
    var data = JSON.parse(sessionStorage.getItem('navMenList'))
    callback && callback(data)
  } else {
    let url = portUrl + 'navMenList'
    axios.get(url).then(num => {
      // console.log('实验室项目列表:', num.data)
      if (num.data.code === 20000) {
        sessionStorage.setItem('navMenList', JSON.stringify(num.data.data))
        callback && callback(num.data.data)
      } else {
        alert('查询失败')
      }
    })
  }
}

//查询文章列表
const ShowArticleAll = (page, size, callback) => {
  // var url = portUrl + 'article/ShowArticleAll?art_id=' + artId + '&cate_id=' + cateId + '&article_name=' + articleName
  var url = portUrl + 'blog_article/'
  const data = { 'page': page, 'size': size }
  axios.get(url, { params: data }).then(num => {
    //console.log('查询分类项目内容:', num.data)
    callback && callback(num.data)
  })
}

//查询文章列表BY分类id
const ShowArticleByClassId = (classId, keywords, callback) => {
  // var url = portUrl + 'article/ShowArticleAll?art_id=' + artId + '&cate_id=' + cateId + '&article_name=' + articleName
  const data = { 'class_id': classId, 'key_words': keywords }
  var url = portUrl + 'article_platfrom/'
  axios.get(url, { params: data }).then(num => {
    // console.log('查询分类项目内容:', num.data)
    callback && callback(num.data)
  })
}

// 记录访客日志
const getGuestLog = (artId, username, callback) => {
  let url = portUrl + 'guest_log/'
  const data = { 'article_id': artId, 'user_name': username }
  axios.post(url, data).then(num => {
    if (num.data.code === 20000) {
      //console.log(num.data)
      callback && callback(num.data.data)
    } else {
      alert('查询失败')
    }
  })
}

//查询文章详情
const getArticleInfo = (artId, callback) => {
  let url = portUrl + 'article_detail/' + artId
  axios.get(url).then(num => {
    if (num.data.code === 20000) {
      //console.log(num.data)
      callback && callback(num.data.data)
    } else {
      alert('查询失败')
    }
  })
}

//查询浏览量最多的10篇文章数据
const ShowBrowseCount = (callback) => {
  let url = portUrl + 'article_showBrowseCount/'
  axios.get(url).then(num => {
    if (num.data.code == 20000) {
      callback && callback(num.data.data)
    } else {
      alert('查询失败')
    }
  })
}

//查询文章评论量最大的10篇文章
const ShowArtCommentCount = (callback) => {
  let url = portUrl + 'article_ShowArtCommentCount'
  axios.get(url).then(num => {
    if (num.data.code == 20000) {
      callback && callback(num.data.data)
    } else {
      alert('查询失败')
    }
  })
}
//查询文章评论数据
const ArticleComment = (artId, commentId, callback) => {
  let url = portUrl + 'ArticleComment/?article_id=' + artId + '&comment_id=' + commentId
  axios.get(url).then(num => {
    callback && callback(num.data)
  })
}

//查询其他评论数据
const OtherComment = (leaveId, commentId, callback) => {//分类类型ID（1：赞赏 2：友情链接 3：留言板 4：关于我）
  let url = portUrl + 'comment/OtherComment?leave_id=' + leaveId + '&comment_id=' + commentId
  axios.get(url).then(num => {
    callback && callback(num.data)
  })
}

// 文章评论
const setArticleComment = (content, user_id, article_id, pid, avatar, user_name, label, callback) => {
  const url = portUrl + 'ArticleComment/'
  const data = {
    'avatar': avatar, 'user_id': user_id, 'user_name': user_name, 'label': label,
    'content': content,
    'pid': pid, 'article_id': article_id
  }
  //console.log("请求参数:",data)
  axios.post(url, data).then(num => {
    callback && callback(num.data)
  })
}

// 其他评论
const setOuthComment = (content, user_id, article_id, leave_id, leave_pid, pid, callback) => {
  let url = portUrl + 'comment/setOuthComment?content=' + content + '&user_id=' + user_id + '&article_id=' + article_id + '&leave_id=' + leave_id + '&leave_pid=' + leave_pid + '&pid=' + pid
  axios.get(url).then(num => {
    callback && callback(num.data)
  })
}

//查询网址点赞总数
const showLikeData = (callback) => {
  let url = portUrl + 'showLikeData/'
  axios.get(url).then(num => {
    if (num.data.code == 20000) {
      // console.log(num.data,parseInt(num.data));
      callback && callback(num.data.data)
    } else {
      alert('查询失败')
    }
  })
}

//点赞功能修改
const GetLike = (like_num, callback) => {
  let url = portUrl + 'showLikeData/'
  axios.post(url, { 'like_num': like_num }).then(num => {
    if (num.data.code == 20000) {
      callback && callback(num.data.msg)
    } else {
      alert('点赞失败')
    }
  })
}

//查询友情链接数据
const FriendUrlData = (callback) => {
  let url = portUrl + 'Friends'
  axios.get(url).then(num => {
    if (num.data.code == 20000) {
      callback && callback(num.data.data)
    } else if (num.data.code == 1005) {
      return
    } else {
      alert('查询失败')
    }
  })
}

//查询关于我
const AboutMeData = (callback) => {
  //console.log('开始查询个人信息')
  if (sessionStorage.getItem('AboutMeData')) {
    var data = JSON.parse(sessionStorage.getItem('AboutMeData'))
    callback && callback(data)
  } else {
    let url = portUrl + 'AboutMeData'
    axios.get(url).then(num => {
      console.log(num.data)
      if (num.data.code == 20000) {
        sessionStorage.setItem('AboutMeData', JSON.stringify(num.data.data))
        callback && callback(num.data.data)
      } else if (num.data.code == 1005) {
        return
      } else {
        alert('查询失败')
      }
    })
  }
}

//文章明细 点击喜欢 1 点击收藏2
const getArtLikeCollect = (userId, artId, islike, likeArt, collectArt, callback) => {
  const data = {
    'user_id': userId,
    'article_id': artId,
    'islike': islike,
    'likeArt': likeArt,
    'collectArt': collectArt
  }
  const url = portUrl + 'blog_collectLike/'
  // if (islike == 1) {
  //   url = portUrl + 'blog/getArtLikeCollect'
  // } else {
  //   url = portUrl + 'blog/getArtLikeCollect'
  // }
  axios.post(url, data).then(num => {
    // console.log('点赞收藏收到的返回', num.data)
    if (num.data.code === 20000) {
      callback && callback(num.data.data)
    } else {
      alert('查询失败')
    }
  })
}

//修改用户信息
const analyzeArtLikeCollect = (article_id, user_id, callback) => {
  let url = portUrl + 'analyze_collectLike/'
  const data = { 'article_id': article_id, 'user_id': user_id }
  // console.log(data);
  axios.get(url, { params: data }).then(num => {
    // console.log('是否点赞获取返回:', typeof(num.data.data))
    if (num.data.code == 20000) {
      callback && callback(num.data.data)
    } else {
      alert('保存失败')
    }
  })
}

//查询赞赏数据
const AdmireData = (callback) => {
  let url = portUrl + 'outh/AdmireData'
  axios.get(url).then(num => {
    if (num.data.code == 1001) {
      callback && callback(num.data)
    } else {
      alert('查询失败')
    }
  })
}

//查询用户喜欢列表,查询用户收藏列表
const getLikeCollectList = (userId, artId, islike, callback) => {
  var url = ''
  url = portUrl + 'blog_collectLike?user_id=' + userId + '&art_id=' + artId + '&islike=' + islike
  axios.get(url).then(num => {
    callback && callback(num.data)
  })
}

//查询用户信息
const getUserInfo = (userId, callback) => {
  let url = portUrl + 'getUserInfo?userID=' + userId
  axios.get(url).then(num => {
    if (num.data.code == 20000) {
      callback && callback(num.data)
    } else {
      alert('查询失败')
    }
  })
}
//修改用户信息
const UserInfoSave = (obj, callback) => {
  let url = portUrl + 'UserUpdate/'
  var data = {
    'user_name': obj.user_name,
    'avatar': obj.avatar,
    'email': obj.email,
    'sex': obj.sex,
    'user_id': obj.user_id,
    'label': obj.label
  }
  // console.log("提交的请求参数:", data);
  axios.put(url, data).then(num => {
    if (num.data.code == 20000) {
      callback && callback(num.data.msg)
    } else {
      alert('保存失败')
    }
  })
}

//初始化时间
const initDate = (oldDate, full) => {
  var odate = new Date(oldDate)
  var year = odate.getFullYear()
  var month = odate.getMonth() < 9 ? '0' + (odate.getMonth() + 1) : odate.getMonth() + 1
  var date = odate.getDate() < 10 ? '0' + odate.getDate() : odate.getDate()
  if (full == 'all') {
    var t = oldDate.split(' ')[0]
    // console.log(oldDate,t.split('-')[0],t.split('-')[1],t.split('-')[2]);
    return t.split('-')[0] + '年' + t.split('-')[1] + '月' + t.split('-')[2] + '日'
  } else if (full == 'year') {
    return year
  } else if (full == 'month') {
    return odate.getMonth() + 1
  } else if (full == 'date') {
    return date
  } else if (full == 'newDate') {
    return year + '年' + month + '月' + date + '日'
  }
}

//获取主题信息
const changeTheme = (callback) => {
  if (sessionStorage.getItem('changeThemeObj')) {
    var data = JSON.parse(sessionStorage.getItem('changeThemeObj'))
    callback && callback(data)
  } else {
    let url = portUrl + 'outh/ThemeMy'
    axios.get(url).then(num => {
      if (num.data.code == 1001) {
        sessionStorage.setItem('changeThemeObj', JSON.stringify(num.data.data))
        callback && callback(num.data.data)
      } else {
        alert('查询失败')
      }
    })
  }
}

// 写博客的方法
const writeBlog = (data, callback) => {
  let url = portUrl + 'blog_article/'
  axios.post(url, data).then(num => {
    if (num.data.code === 20000) {
      //console.log(num.data)
      callback && callback(num.data)
    } else {
      alert('查询失败')
    }
  })
}

export {
  getRegister,//注册
  UserLogin,//登录
  LoginOut,//退出登录
  ArtClassData,//分类
  navMenList,//导航信息
  ShowArticleAll,//查询文章列表
  getArticleInfo,//文章详情
  ShowBrowseCount,//流量量做多的文章
  ShowArtCommentCount,//评论最多的文章
  ArticleComment,//文章评论列表
  OtherComment,//其他评论列表
  setArticleComment,//设置文章评论
  setOuthComment,//设置其他评论
  showLikeData,//do you like me
  GetLike,//设置 do you like me
  FriendUrlData,//友情链接数据
  AboutMeData,//关于我文章编写
  getArtLikeCollect,//文章收藏 文章点赞
  AdmireData,//赞赏数据
  getLikeCollectList,//用户收藏喜欢列表
  getUserInfo,//用户信息查询
  UserInfoSave,//修改用户信息
  initDate,//设置时间
  changeTheme,//获取主题信息
  analyzeArtLikeCollect,//获取是否点赞，是否收藏
  ShowArticleByClassId, //根据分类查询文章
  getGuestLog, //记录访客日志
  writeBlog //写博客
}
