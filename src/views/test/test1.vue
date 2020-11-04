<template>
  <div class="app-container">

    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="规则名称" prop="rule_name">
        <el-input v-model="ruleForm.rule_name" />
      </el-form-item>
      <el-form-item label="规则描述" prop="rule_desc">
        <el-input v-model="ruleForm.rule_desc" type="textarea" />
      </el-form-item>
      <el-form-item label="是否启用" prop="is_use">
        <el-select v-model="ruleForm.is_use" placeholder="请选择规则是否启用">
          <el-option label="是" value="Y" />
          <el-option label="否" value="N" />
        </el-select>
      </el-form-item>
      <el-form-item label="生效时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="ruleForm.date2" placeholder="选择时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="需求来源" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="运维同学" name="type" />
          <el-checkbox label="开发同学" name="type" />
          <el-checkbox label="业务同学" name="type" />
          <el-checkbox label="领导" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="业务类型" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="基础业务" />
          <el-radio label="POS业务" />
          <el-radio label="小团队" />
          <el-radio label="联调业务" />
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-for="(sql,index) in ruleForm.sqls"
        :key="sql.key"
        :label="'SQL'+ index"
        :prop="'sqls.'+index+ '.value'"
        :rules="{required:true,message:'sql不能为空',trigger:'blur'}"
        :inline="true"
      >
        <el-input v-model="sql.value" />
        <el-button @click.prevent="removeSql(sql)">删除sql</el-button>
        <el-button @click="addSql">新增sql</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import request from '../../utils/request'

export default {
  data() {
    return {
      ruleForm: {
        rule_name: '',
        rule_desc: '',
        is_use: '',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        sqls: [{
          key: '0',
          value: 'select 1 from dual'
        }]
      },
      rules: {
        rule_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        is_use: [
          { required: true, message: '请选择是否启用', trigger: 'is_use' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个需求来源', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择业务名称', trigger: 'change' }
        ],
        rule_desc: [
          { required: true, message: '请提写规则描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log('获取提交的信息:', this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          // TODO更新后台数据
          return request({
            url: 'http://localhost:8000/reskeeper/elem/rule_insert',
            method: 'post',
            data: this.ruleForm
          }).then(
            res => {
              console.log('获取的promise返回', res)
              this.$message(res.code_desc)
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeSql(item) {
      if (item.key === '0') {
        alert('不允许删除第0个sql')
      } else {
        var index = this.ruleForm.sqls.indexOf(item)
        if (index !== -1) {
          this.ruleForm.sqls.splice(index, 1)
        }
      }
    },
    addSql() {
      this.ruleForm.sqls.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>
