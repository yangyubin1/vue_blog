<template>
  <wbc-about></wbc-about>
</template>

<script>

  import temAbouts from '../../../components/Layout/temAbout.vue'

  export default {
    name: 'About',
    components: { //定义组件
      'wbc-about': temAbouts
    }
  }
</script>

<style scoped>

</style>
