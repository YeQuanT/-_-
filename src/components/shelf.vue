<template>
    <div>
      <el-row :class="{action:ifpc}">
        <el-col :span="16" class="left-logo" :md="{span:14,offset:3}" :xs="{span:14,offset:1}"><h1>师兄帮帮忙!</h1></el-col>
        <el-col :span="8" class="rigth-long" :md="{span:4,offset:3}" :xs="{span:9}">
            <long v-if="this.$store.state.sheif_views"></long>
            <UserMessage v-if="!this.$store.state.sheif_views"></UserMessage>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="main" :md="{span:16,offset:4}">
            <Tmain></Tmain>
        </el-col>
      </el-row>

      <el-row  class="footer">
        <ElRow class="bah">
          <ElCol :xs="{span:18,offset:4}" :md="{span:12,offset:10}"> 联系邮箱：158883557@qq.com</ElCol>
        </ElRow>
        <ElRow>
          <ElCol  :xs="{span:18,offset:4}" :md="{span:12,offset:10}">
            备案号：<a href="http://www.miit.gov.cn/">粤ICP备19037328号</a>
          </ElCol>
        </ElRow>
      </el-row>
    </div>
</template>
<script>
import long from './long'
import Tmain from './main'
import UserMessage from './UserMessage'
export default {
    data() {
        return {
          ifpc:false
        }
    },
    methods: {
    },
    components:{
        long,
        Tmain,
        UserMessage
    }
}
</script>

<style>
/* .left-logo{height: 200px;}
.rigth-long{height: 200px;} */
.main{background-color: rgb(159, 189, 189);height: 750px;}
.footer{background-color: blueviolet;height: 100px;margin-top: 100px;}
.el-button-group{margin-top: 20px;}
.action{height: 200px;}
.rigth-long{}
.bah{margin-top: 20px;}
</style>