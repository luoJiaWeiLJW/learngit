import React from 'react';
import {Form, Row, Col, Input, Button, Select,DatePicker } from 'antd';
import axios from 'axios';
const Option = Select.Option;
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  constructor(props){
    super(props);
    let searchName = '';
    let searchVariety = '';
    let searchDept = '';
    let searchDate = '';
    this.state = {
      searchName,
      searchVariety,
      searchDate,
      searchDept
    }
  }
  handleSearch = (e) => {
    console.log(this.props.form.getFieldsValue().name)
    // console.log(this.props.form.getFieldsValue().dept)
    // console.log(this.props.form.getFieldsValue().date)
    // console.log(this.props.form.getFieldsValue().variety)
    const {searchDate} = this.state;
    let aa=null;
    let bb=null;
    let cc=null;
    let dd=null; 
    if (e) {
      e.preventDefault();
    }
    
    if(this.state.searchDept === ''){
      aa = '';
    }else{
      aa = "dept="+this.state.searchDept;
    }
    if(this.state.searchVariety === ''){
      bb = ''
    }else{
      bb = "variety="+this.state.searchVariety;
    }
    if(this.state.searchDate === ''){
      cc = '';
    }else{
      cc = "date="+this.state.searchDate;
    }
    if(this.props.form.getFieldsValue().name === ''){
      dd = ''
    }else{
      dd =this.props.form.getFieldsValue().name
    }
    let searchUrl ='?'+(aa === ''?'':'&dept='+this.state.searchDept)+(bb === ''?'':'&variety='+this.state.searchVariety)+(cc === ''?'':'&date='+this.state.searchDate)+(dd === ''?'':'&name='+this.props.form.getFieldsValue().name);
    console.log("searchUrl",searchUrl)
    // let searchUrl = '?'+(this.props.form.getFieldsValue().name === ''?'':'&name='+this.props.form.getFieldsValue().name)+(this.props.form.getFieldsValue().dept === ''?'':'&dept='+this.props.form.getFieldsValue().dept)+(this.props.form.getFieldsValue().variety === ''?'':'&variety='+this.props.form.getFieldsValue().variety)+(this.state.searchDate === ''?'':'&date='+this.state.searchDate);
    //console.log('searchUrl',searchUrl)
    axios({
      url:'/findByDeptAndDateAndNameAndVarietyCount'+searchUrl,
      method:'get',
    }).then(res =>{
      console.log(res)
      this.props.changeTable(res.data.data);
    })
  }
  handlechange = (value,dateString) => {
    console.log("this.searchDate",dateString)
    this.setState({
      searchDate : dateString
    })
  }

  // hSelect = (value) => {
  //   this.setState({
  //     searchDept : `${value}`
  //   })
  // }
  // hleSelect = (value) => {
  //   this.setState({
  //     searchVariety : `${value}`
  //   })
  // }
  getFields = () => {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
    const children = [];
    const keys = [
      {title: "部门", dataIndex: "dept", key: "dept"},
      {title: "种类", dataIndex: "variety", key: "variety"},
      {title: "日期", dataIndex: "date", key: "date"},
       {title: "名称", dataIndex: "name", key: "name"},
    ];
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        let input = <Input autoComplete="off" />;
        if(keys[i].dataIndex==="date"){
          input = (
              <DatePicker format='YYYY-MM-DD' onChange={this.handlechange}/>
          )
        }
        if(keys[i].dataIndex==="dept") {
          input = (
              <Select>
                <Option value="0">生产</Option>
                <Option value="1">销售</Option>
                <Option value="2">其他</Option>
              </Select>
          )
        }
        if(keys[i].dataIndex==="variety"){
          input = (
            <Select>
                <Option value="0">一次性支出</Option>
                <Option value="1">原料支出</Option>
                <Option value="2">固定资产支出</Option>
              </Select>
          )
        }
        children.push(
          <Col lg={12} xl={5} key={i}>
            <FormItem {...formItemLayout} label={keys[i].title}>
              {getFieldDecorator(keys[i].dataIndex)(input)}
            </FormItem>
          </Col>
        );
      }
     
      children.push(
        <Col xl={4} lg={24} style={{textAlign: 'right'}} key="btn">
          <Button type="primary" htmlType="submit" style={{marginLeft:-80}}>搜索</Button>
        </Col>
      )
    }
    return children;
  };
  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={16} style={{marginTop:'15px'}}>
          {this.getFields()}
        </Row>
      </Form>
    );

  }
}
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default WrappedAdvancedSearchForm