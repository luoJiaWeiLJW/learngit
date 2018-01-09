import React from 'react';
import {Form, Row, Col, Input, Button, Select,DatePicker } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
class AdvancedSearchForm extends React.Component {
  handleSearch = (e) => {
   
    if (e) {
      e.preventDefault();
    }

    this.props.form.validateFields((err, values) => {
      
      Object.keys(values).forEach(key => {
        if(key !== 'date'){
          if (values[key]) {
          values[key] = encodeURI(values[key]);
          // console.log('values',values)
          } else {
            values[key] = ""
          }
        }
        
      });
      this.props.onSearch('search',values)
     });



  }
  handlechange = (value,dateString) => {
    //console.log("value",value)
    console.log("dateString",dateString)
    this.props.changeDate(dateString);
  }
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
        let input = <Input autoComplete="off"/>;
        if(keys[i].dataIndex==="date"){
          input = (
              <DatePicker styles={{width:"200px"}} format='YYYY-MM-DD' onChange={this.handlechange}/>
          )
        }
        if(keys[i].dataIndex==="dept") {
          input = (
              <Select onSelect={this.hSelect}>
                <Option value="0">生产</Option>
                <Option value="1">销售</Option>
                <Option value="2">其他</Option>
                {/* //<Option value="-1">全部</Option> */}
              </Select>
          )
        }
        if(keys[i].dataIndex==="variety"){
          input = (
            <Select onSelect={this.hleSelect}>
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
          <Button type="primary" htmlType="submit">搜索</Button>
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