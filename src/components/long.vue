<template>
  <div>
      <el-button-group>
                <el-button size="mini" @click="longbutton=true">登录</el-button>
                <el-button size="mini" @click="registered=true">注册</el-button>
            </el-button-group>
    <!-- 登录表单 -->
    <el-dialog width="70%" title="登录" :visible.sync="longbutton">
      <el-form
        :model="UserDataLong"
        status-icon
        :rules="rules"
        ref="UserDataLong"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :md="{span:14,offset:8}">
            <el-form-item prop="UserId">
              <el-col :xs="{span:24}" :md="{span:12,offset:0}">
                <el-input type="text" rows="1" v-model="UserDataLong.UserId" placeholder="Id"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item prop="Userpad">
              <el-col :xs="{span:24}" :md="{span:12,offset:0}">
                <el-input type="text" rows="1" v-model="UserDataLong.Userpad" placeholder="密码"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <ElCol :xs="{span:24}" :md="{span:10,offset:0}">
                <ElButton type="primary" @click="EndLong(UserDataLong)">登录</ElButton>
                <ElButton type="primary" @click="longbutton = false">取消</ElButton>
              </ElCol>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 注册表单 -->
    <el-dialog width="70%" title="注册" :visible.sync="registered">
      <el-form
        :model="User_Data_Registered"
        status-icon
        :rules="RegisteredRules"
        ref="User_Data_Registered"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :md="{span:14,offset:8}">
            <el-form-item prop="UserId">
              <el-col :xs="{span:24}" :md="{span:12,offset:0}">
                <el-input maxlength="11" type="text" rows="1" v-model="User_Data_Registered.UserId" placeholder="Id"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item prop="Userpadd">
              <el-col :xs="{span:24}" :md="{span:12,offset:0}">
                <el-input type="text" rows="1" v-model="User_Data_Registered.Userpadd" placeholder="密码"></el-input>
              </el-col>
            </el-form-item>

             <el-form-item prop="repeatpad">
              <el-col :xs="{span:24}" :md="{span:12,offset:0}">
                <el-input type="text" rows="1" v-model="User_Data_Registered.repeatpad" placeholder="确认密码"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item>
              <ElCol :xs="{span:24}" :md="{span:10,offset:0}">
                <ElButton type="primary" @click="EndReg('User_Data_Registered')">注册</ElButton>
                <ElButton type="primary" @click="registered = false">取消</ElButton>
              </ElCol>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {long_pot,reg_pot,repid_pot} from 'network/main-net.js'
export default {
  data() {
    var validator_UserId = (rules, value, callback) => {
      if (!value) {
        return callback(new Error("id不能为空"));
      }
       else {
          callback();
      }
    };
    var validator_pad = (rules, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空,亲"));
      } else {
        callback();
      }
    };
    var validator_RegId=(rules, value, callback)=>{
        if (!value) {
        callback(new Error("id不能为空"));
      } else {
        repid_pot(value).then(res=>{
          console.log(res.data);
          if (res.data==1) {
            callback();
          }else{
            callback(new Error("id重复啦"));
          }
        })
      }
    };
    var validator_Regpad=(rules, value, callback)=>{
        if (value=="") {
        callback(new Error("密码不能为空"));
      } else {
          if (this.User_Data_Registered.repeatpad !=="") {
              this.$refs.User_Data_Registered.validateField("repeatpad")
          }
        callback();
      }
    };
    var validator_RepeatPad=(rules, value, callback)=>{
       if (value==="") {
           callback(new Error('请重新输入密码'))
       }else if(value !== this.User_Data_Registered.Userpadd){
          callback(new Error('两次输入不一致'))
       }else{
           callback()
       }
    }
    return {
      longbutton: false,
      registered:false,
      //登录数据
      UserDataLong: {
        UserId: "",
        Userpad: ""
      },
      //注册数据
      User_Data_Registered:{
          UserId:"",
          Userpadd:"",
          repeatpad:""
      },
      /**
       * 注册校验规则
       */
      RegisteredRules: {
        UserId: [{ validator: validator_RegId, trigger: "blur" }],
        Userpadd: [{ validator: validator_Regpad, trigger: "blur" }],
        repeatpad:[{validator:validator_RepeatPad, trigger: "blur" }]
      },
      /**
       * 登录校验规则
       */
      rules: {
        UserId: [{ validator: validator_UserId, trigger: "blur" }],
        Userpad: [{ validator: validator_pad, trigger: "blur" }]
      }
    };
  },
  computed: {
  },
  methods: {
      /**
       * 登录提交类
       */
    EndLong(longdata) {
      console.log("登录信息：",longdata);
        console.log(this.$refs)
        this.$refs.UserDataLong.validate((valid)=>{
          if (valid) {
            long_pot(longdata).then(res=>{
              console.log(res);
              if (res.data==1) {
                this.$store.commit('long_user_message',longdata.UserId)
                if (this.$store.state.long_user_message == longdata.UserId) {
                  this.$message({message:'登录成功',type:'success'})
                }
                this.longbutton =false
            this.$store.commit('sheif_views')
              }else{
                this.$message.error('密码错误')
              }
            })
          }else{
            return false;
          }
        })
    },
    /**
     * 注册提交类
     */
    EndReg(Regdata){
        this.$refs[Regdata].validate(valid => {
        if (valid) {
          reg_pot(this.User_Data_Registered).then(res=>{
            console.log(res.data);
            this.$store.commit('long_user_message',res.data.reqparse.UserId)
            this.$store.commit('sheif_views')
          })
          console.log("注册信息：",this.User_Data_Registered);
          this.registered=false
        } else {
          return false;
        }
      });
    }
  }
};
</script>