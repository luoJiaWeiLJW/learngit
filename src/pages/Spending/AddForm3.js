import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Table, Checkbox, Button, AutoComplete ,message,TreeSelect,Modal,DatePicker} from 'antd';
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const TreeNode = TreeSelect.TreeNode;

class AddForm extends Component {
  constructor(props){
    super(props);
  };
  let 
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    changeType:'0',
    changeDatp:'0',
    changeAmortize:'0'
  };
  handleSubmit = (e) => {
    //debugger
    const {changeType,changeDatp,changeAmortize}=this.state;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        changeType,
        changeDatp,
        changeAmortize,
        'date': fieldsValue['date'].format('YYYY-MM-DD'),
      };
      console.log('Received values of form: ', values);
      axios({
        url: '/expend',
        method:'post',
        data:{
          date:values.date,
          variety:values.changeType,
          name:values.Name,
          dept:values.changeDatp,
          expendMoney:values.Money,
          amortize:values.changeAmortize,
          amortizeTime:values.Month
        }
      }).then(res=>{
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
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  handleChangeType =(value) =>{
    console.log(`selected ${value}`);
    this.setState({
      changeType:`${value}`
    })
  }
  handleChangeDapt =(value) =>{
    console.log(`selected ${value}`);
    this.setState({
      changeDatp:`${value}`
    })
  }
  handleChangeAmortize =(value) =>{
    console.log(`selected ${value}`);
    this.setState({
      changeAmortize:`${value}`
    })
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
          <span style={{fontSize:'23px'}} key='exid'>入库统计</span>,
        ]}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        style={{minWidth: 800}}
      >
      <FormItem></FormItem>
        <Form>
          <FormItem
            {...formItemLayout}
            label="日期"
          >
          {getFieldDecorator('date',config)(
            <DatePicker onChange={this.onChange}/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="种类">
          <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChangeType}>
              <Option value="0">一次性支出</Option>
              <Option value="1">原料</Option>
              <Option value="2">逐步摊销支出</Option>
          </Select>
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('Name', {
              rules: [{
                required: true, message: '请填写名称!',
              }, {
                validator: this.checkPassword1,
              }],
            })(
              <Input type="text" onBlur={this.handleConfirmBlur} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="部门">
          <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChangeDapt}>
                <Option value="0">生产</Option>
                <Option value="1">销售</Option>
                <Option value="2">其他</Option>
            </Select>
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="金额"
          >
            {getFieldDecorator('Money', {
              rules: [{
                required: true, message: '请填写金额!',
              }, {
                validator: this.checkPassword2,
              }],
            })(
              <Input type="text" onBlur={this.handleConfirmBlur}  />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否摊销">
          <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeAmortize}>
              <Option value="0">否</Option>
              <Option value="1">是</Option>
          </Select>
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="摊销时间（月）"
          >
            {getFieldDecorator('Month', {
              rules: [{
                required: true, message: '请填写摊销月!',
              }, {
                validator: this.checkPassword2,
              }],
            })(
              <Input type="text" onBlur={this.handleConfirmBlur}  />
            )}
        </FormItem>
        </Form>
      </Modal>
    )
  }
  }
const AddForm3 = Form.create()(AddForm);
export default AddForm3