import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,message,TreeSelect,Modal,DatePicker} from 'antd';
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
    //debugger
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'date': fieldsValue['date'].format('YYYY-MM-DD'),
      };
      console.log('Received values of form: ', values); 
      //console.log(this.props.form.getFieldsValue().putMoney,"3333333333")
      axios({
        url: '/add_sell_statistics',
        method:'post',
        data:{
          dept:'事业部',
          ...values 
        }
      }
    ).then(res=>{
        this.props.axios({pageindex: 1});
        console.log("s");
        this.props.onCancel();
        console.log("e");
        this.props.form.resetFields();
      }) 
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  checkMoney = (rule,value,callback) => {
    const expet=/^\d/;
    if(expet.test(value)){
      callback();
    }else{
      callback("请输入数字");
    }
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
          <span style={{fontSize:'23px'}} key='exid'>销售统计</span>,
        ]}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        style={{minWidth: 800}}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="日期"
          >
          {getFieldDecorator('date',config)(
            <DatePicker onChange={this.onChange}/>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="金额"
          >
            {getFieldDecorator('sellMoney', {
              rules: [{
                required: true, message: '请填写金额!',
              }, {
                validator: this.checkMoney,
              }],
            })(
              <Input type="text" onBlur={this.handleConfirmBlur} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="单号"
          >
            {getFieldDecorator('sellNumber', {
              rules: [{
                required: true, message: '请填写单号!',
              }],
            })(
              <Input type="text" onBlur={this.handleConfirmBlur} />
            )}
        </FormItem>
        </Form>
      </Modal>
    )
  }
  }

const AddForm2 = Form.create()(AddForm);
export default AddForm2