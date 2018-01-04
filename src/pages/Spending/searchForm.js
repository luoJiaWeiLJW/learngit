import React from 'react';
import {Form, Row, Col, Input, Button, Select,DatePicker } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
class AdvancedSearchForm extends React.Component {


  getFields = () => {

    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
    const children = [];
    const keys = [
      {title: "部门", dataIndex: "code", key: "code"},
      {title: "ID", dataIndex: "name", key: "name"},
      {title: "日期", dataIndex: "createUserId", key: "createUserId"},
      {title: "名称", dataIndex: "status", key: "status"},
    ];
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        let input = <Input autoComplete="off"/>;
        if(keys[i].dataIndex==="createUserId"){
          input = (
              <DatePicker styles={{width:"200px"}} />
          )
        }
        if(keys[i].dataIndex==="code") {
          input = (
              <Select onSelect={this.handleSelect}>
                <Option value="0">生产</Option>
                <Option value="1">销售</Option>
                <Option value="2">其他</Option>
                <Option value="-1">全部</Option>
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