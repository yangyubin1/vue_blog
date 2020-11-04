<!-- 文章详情 -->
<template>
    <div class="container" id="detail">

      <wbc-detail></wbc-detail>
      <wbc-message></wbc-message>
    </div>
</template>

<script>
  import temDetail from './components/temDetail'
  import temMessage from './components/temMessage.vue'

  export default {
    name: 'DetailShare',
    data() { //选项 / 数据
      return {}
    },
    methods: { //事件处理器

    },
    components: { //定义组件
      'wbc-detail': temDetail,
      'wbc-message': temMessage
    },
    created() { //生命周期函数

    },
    mounted() {
      var anchor = document.querySelector('#detail')
      // console.log(anchor,anchor.offsetTop);
      var top = anchor.offsetTop - 60
      document.body.scrollTop = top
      // Firefox
      document.documentElement.scrollTop = top
      // Safari
      window.pageYOffset = top
    }
  }
</script>

<style>

</style>
