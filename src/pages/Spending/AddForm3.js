import React, {Component} from 'react';
import { Form, Input,Modal,DatePicker,Select} from 'antd';
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;

class AddForm extends Component {
  constructor(props){
    super(props);
  };
  let 
  state = {
    confirmDirty: false,
    
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
        this.props.axios();
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
    //是否摊销(除一次性支出外的其他类型都自动摊销)
    let changeAmortize = "0";
    if(value !== "0"){
      changeAmortize = "1";
    }else{
      //将摊销月份默认设置为1
      // this.form.setFieldsValue("Month", "1");
    }
    this.setState({
      changeType:`${value}`,
      changeAmortize: changeAmortize
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
    // const formItemLayoutReset = {
    //   labelCol: {
    //     xs: {span: 24},
    //     sm: {span: 3},
    //   },
    //   wrapperCol: {
    //     xs: {span: 24},
    //     sm: {span: 16},
    //   },
    // };
    const config = {
      rules: [{ type: 'object', required: true, message: '请选择日期！' }],
    };
    // const rangeConfig = {
    //   rules: [{ type: 'array', required: true, message: '请选择日期！' }],
    // };
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
              <Option value="1">原料支出</Option>
              <Option value="2">固定资产支出</Option>
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
        <FormItem
            {...formItemLayout}
            label="均摊成本时间（月）"
          >
            {getFieldDecorator('Month', {
              rules: [{
                required: true, message: '请填写均摊月!',
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