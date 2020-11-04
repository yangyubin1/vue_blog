<!-- 留言板 -->
<template>
  <div>
    <wbc-msg></wbc-msg>
    <wbc-message></wbc-message>
  </div>
</template>

<script>

  import temMSG from '../../../components/Layout/temMSG.vue'
  import temMessage from '../query/components/temMessage'

  export default {
    name: 'Message',
    data() { //选项 / 数据
      return {}
    },
    methods: { //事件处理器

    },

    components: { //定义组件
      'wbc-msg': temMSG,
      'wbc-message': temMessage

    },
    created() { //生命周期函数

    }
  }
</script>

<style>

</style>
