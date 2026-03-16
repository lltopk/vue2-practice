<!-- 
前端复杂table, 支持行字段输入, 并对每个字段进行校验

实现思路是用el-form包装el-table, 通过slot-scope将每行数据传递给el-form-item, 在el-form-item指定校验带有任意行idx的属性路径
-->
<template>

  <el-dialog :visible="visibleProp">
    <el-form :rules="attributeRules" :model="attributeForm" ref="attributeForm" size="small">
      <el-table border small stripe checkbox highlight-current-row
        :data="attributeForm.rows"
        @selection-change="multiSelection"
      >
        <el-table-column show-overflow-tooltip type="selection" align="center"  />
        <!-- input string校验 -->
        <el-table-column show-overflow-tooltip label="业务属性名">
          <template v-slot="scope">
            <div>
              <el-form-item :prop="'rows.' + scope.$index + '.paramName'" :rules="attributeRules.paramName">
                <el-input  size="small" type="text" placeholder="请输入业务属性名" v-model="scope.row.paramName"/>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <!-- input number校验 -->
        <el-table-column show-overflow-tooltip label="贡献值">
          <template v-slot="scope">
            <div>
              <el-form-item :prop="'rows.' + scope.$index + '.contribution'" :rules="attributeRules.contribution">
                <el-input  size="small" type="number" placeholder="请输入贡献值" v-model="scope.row.contribution"/>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="敏感等级" >
          <template v-slot="scope">
            <el-form-item :prop="'rows.' + scope.$index + '.sensitiveLevelId'" :rules="attributeRules.sensitiveLevelId">
              <el-select placeholder="请选择敏感等级" size="mini"
                v-model="scope.row.sensitiveLevelId"
                @change="pickSensitiveLevel(scope.row.sensitiveLevelId)"
                filterable
              >
                <el-option
                  v-for="item in sensitiveLevelList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="addRow">添加行</el-button>
      <el-button type="warning" @click="delRow">批量删除行</el-button>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button >取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  export default {
    props: {
      visibleProp: Boolean
    },
    computed:{
      sensitiveLevelList(){
        return [
          { id: 1, label: '公开', value: 'public' },
          { id: 2, label: '内部', value: 'internal' },
          { id: 3, label: '机密', value: 'confidential' },
          { id: 4, label: '绝密', value: 'top_secret' }
        ]
      }
    },
    data() {
      /**
       * rule: 精确度为(二维坐标系中的具体点), 具体来说右el-table确定的行rowIdx, 并且作用于某属性的规则, 如属性sensitiveLevelId
       * value: 当前属性输入的值
       * callback: 回调函数
       * 
       */
      var sensitiveLevelValidator = (rule, value, callback) => {
        console.log("sensitiveLevelValidator",value)
        if (!value) {
          callback(new Error('请选择敏感等级'));
        } 
        
        //解析检验参数(动态路径形式 :prop="'rows.' + scope.$index + '.sensitiveLevelId'")
        const rowIdx = rule.field.split('.')[1];
        const contribution = this.attributeForm.rows[rowIdx].contribution;
        if(contribution > 10 && value < 3){
          callback(new Error('请选择更高的敏感等级'));
        }

        callback();
      };
      return {
        attributeForm:{
          rows:[]
        },
        selectData: [],
        attributeRules:{
          paramName:[
            {
              required: true,
              message: '请输入业务属性中文名',
              trigger: 'change'
            }//规则1
          ],
          contribution:[
            {
              required: true,
              message: '请输入贡献值',
              trigger: 'change'
            }//规则1
          ],
          sensitiveLevelId:[
            {
              required: true,
              validator: sensitiveLevelValidator,
              trigger: 'change'
            }//规则1
          ]
        }
      }
    },
    methods: {
      addRow(){
        //头插法
        this.attributeForm.rows.unshift({paramName:'', contribution:''})
      },
      delRow(){
        //批量删除行
        for (const key in this.selectData) {
          const element = this.selectData[key];
          this.attributeForm.rows.splice(this.attributeForm.rows.indexOf(element), 1)
        }
      },
      multiSelection(rows){
        this.selectData = rows;
        console.log(this.selectData);
      },
      pickSensitiveLevel(levelId){
        console.log("pickSensitiveLevel", levelId)
      },
      async submit(){
        const {success} = await this.validateForm()
        if (success) {
          // 校验通过，继续提交等操作
          this.$message.success('表单校验成功，提交成功！')
        }
      },
      async validateForm() {
        try {
          const valid = await this.$refs.attributeForm.validate()
          return { success: true, valid }
        } catch (error) {
          console.error('表单校验失败:', error)
          return { success: false, error }
        }
      }

    }
  }
</script>