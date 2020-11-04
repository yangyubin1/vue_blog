<template>
  <wbc-friends></wbc-friends>
</template>

<script>

  import temFriends from '../../../components/Layout/temFriends.vue'

  export default {
    name: 'Friends',
    components: { //定义组件
      'wbc-friends': temFriends
    }
  }
</script>

<style scoped>

</style>
