<template>
  <div>

    <!-- 聊天信息 -->
    <el-row id="main" class="main-messages">
      <el-row
        class="main-box"
        :class="{RotateY:item.UserId==cccc? true:false}"
        v-for="(item,index) in back_message"
        :key="index"
      >
        <div class="main-left" :class="{RotateY:item.UserId==cccc? true:false}">{{item.UserId}}</div>
        <el-col class="main-right" :md="{span:12}" :xs="{span:12}">
            <div
            class="main-b"
            :class="{RotateY:item.UserId==cccc? true:false,fonstrigth:item.UserId==cccc? true:false}"
          >{{item.messages}}</div>
          <div class="i"></div>
        </el-col>
      </el-row>
    </el-row>
    <!-- 发送 -->
    <el-row>
      <el-col :span="24" class="main-meit">
        <el-form :model="message">
          <el-col :span="18">
            <el-form-item label>
              <el-input
              class="input-x"
                resize="none"
                type="textarea"
                ref="inpumeg"
                v-model="message.messages"
                placeholder="请输入内容"
                :autosize="{minRows:3,maxRows:4}"
                maxlength="200"
              ></el-input>
            </el-form-item>
            <p class="sub-title mr">以下为可选内容</p>
            <el-form-item label>
              <el-input v-model="message.time_add" placeholder="时间-地点"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
              <div class="Emit-Input" @click="sum(message)">
                 <div class="emit-div2 a">
                <div class="a">去吧</div>
              </div>
              </div>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { emit_message, inquire_post } from "network/main-net";
import io from "socket.io-client";
const socket = io.connect("https://yeqt.top:3006");
export default {
  data() {
    return {
      message: {
        UserId: "",
        messages: "",
        time_add: "",
        time: ""
      },
      back_message: []
    };
  },
  computed: {
    cccc() {
      return this.$store.state.long_user_message;
    }
  },
  mounted() {
    setTimeout(() => {
      let container = this.$el.querySelector(".main-messages");
      container.scrollTop = container.scrollHeight;
    }, 500);
    inquire_post().then(res => {
      this.back_message = res.data.reverse();
    }),
      socket.emit("login", {
        username: "username",
        password: "password"
      });
      socket.on('user_message',res=>{
        console.log("监听到用户信息：",res);
        this.back_message.push(res);
        setTimeout(() => {
        let container = this.$el.querySelector(".main-messages");
        container.scrollTop = container.scrollHeight;
      }, 100);
      });
  },
  methods: {
    //信息提交类
    sum(data) {
      data.UserId = this.$store.state.long_user_message;
      let copy_data = JSON.parse(JSON.stringify(data));
      if (this.$store.state.long_user_message == 'null') {
        this.$message.error("请登录");
      }
      else if (copy_data.messages=='') {
        this.$message.error("不能空！");
        } else {
        socket.emit("message", copy_data);
        this.back_message.push(copy_data);
      }
      setTimeout(() => {
        let container = this.$el.querySelector(".main-messages");
        container.scrollTop = container.scrollHeight;
      }, 100);
      this.$refs.inpumeg.clear();
    }
  }
};
</script>
<style lang="less">
@import url("../assets/css/main.less");
</style>