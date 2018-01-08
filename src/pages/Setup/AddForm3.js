import React, {Component} from 'react';
import { InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,message,TreeSelect,Modal,DatePicker} from 'antd';
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const TreeNode = TreeSelect.TreeNode;
class AddForm extends Component {
  constructor(props){
    super(props);
  };
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    console.log("111111")
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        //'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      };
      console.log('Received values of form: ', values);
      axios({
        url:'/update_target/6048ce49ba5d4ecfb0a8a4aabe84b2a1',
        method:'put',
        data:{
           ...values
        }
      }).then(res=>{
        console.log('res',res);
        this.props.axios({pageindex: 1});
        this.props.onCancel();
        this.props.form.resetFields();
      })
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPrice = (rule, value, callback) =>{
    if (value.number > 0) {
      callback();
      return;
    }
    callback('请输入数字!');
  }
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const FormItems = [];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutReset = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 3},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: '请选择日期！' }],
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择日期！' }],
    };
    return(
      <Modal 
        visible={this.props.visible}
        title={[
          <span style={{fontSize:'23px'}} key='exid'>基础设置</span>,
        ]}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        style={{minWidth: 800}}
      >
        <Form>
        <FormItem
            {...formItemLayout}
            label="月固定成本系数"
          >
            {getFieldDecorator('monthFixedCost', {
              rules: [{
                required: true, message: '请填写金额!',
              }],
            })(
              <InputNumber min={0} step={0.1} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="每月利润目标"
          >
            {getFieldDecorator('monthTarget', {
              rules: [{
                required: true, message: '请填写目标!',
              }],
            })(
              <InputNumber min={0} step={0.1} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="每月现金流增量目标"
          >
            {getFieldDecorator('monthCashFlow', {
              rules: [{
                required: true, message: '请填写目标!',
              }],
            })(
              <InputNumber min={0} step={0.1} />
            )}
        </FormItem>
        </Form>
      </Modal>
    )
  }
  }

const AddForm3 = Form.create()(AddForm);
export default AddForm3