<template>
  <div>
    <el-dropdown class="user-top">
      <span class="el-dropdown-link">
        {{this.$store.state.long_user_message}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu>
        <el-dropdown-item><span class="log_out-span" @click="log_out">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
    methods: {
        log_out(){
            console.log('111');
            this.$store.commit('long_user_message','null')
            this.$store.commit('sheif_views')
        }
    },
};
</script>
<style lang="less">
.user-top{
    margin-top: 20px;
    margin-left: 50px;
}
</style>