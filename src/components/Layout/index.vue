<template>
  <div>
    <my_header></my_header>
    <div class="container">
      <el-row  :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <my_AppMain></my_AppMain>
        </el-col>
        <el-col :sm="24"  :md="8" >
          <my_RightSide></my_RightSide>
        </el-col>
      </el-row>
    </div>
    <my_footer></my_footer>
  </div>
</template>

<script>
  import header from './header'
  import footer from './footer'
  import sidebar from './temRightlist'
  import appMain from './AppMain'

  export default {
    components: {
      'my_header': header,
      'my_footer': footer,
      'my_RightSide':sidebar,
      'my_AppMain':appMain,
    }
  }

</script>

<style lang="scss" scoped>

</style>
