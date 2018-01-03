import React from 'react';
import {Form, Row, Col, Input, Button, Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {

  handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.props.form.validateFields((err, values) => {
      console.log(values)
      Object.keys(values).forEach(key => {
        if (values[key]) {
          values[key] = encodeURI(values[key].trim());
        } else {
          values[key] = ""
        }

      });

      this.props.onSearch(values)
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.handleSearch();

  };

  // To generate mock Form.Item
  getFields = () => {

    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
    const children = [];
    const keys = [
      {title: "物料编码", dataIndex: "code", key: "code"},
      {title: "物料名称", dataIndex: "name", key: "name"},
      {title: "发起人", dataIndex: "createUserId", key: "createUserId"},
      {title: "审核状态", dataIndex: "status", key: "status"},
    ];
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        let input = <Input autoComplete="off"/>;
        if(keys[i].dataIndex==="createUserId"){
          input = (
            <Select onSelect={this.handleSelect}>
              <Option value ="1">admin</Option>
            </Select>
          )
        }
        if(keys[i].dataIndex==="status") {
          input = (
            <Select onSelect={this.handleSelect}>
              <Option value="0">未提交</Option>
              <Option value="1">待审核</Option>
              <Option value="2">审核通过</Option>
              <Option value="-1">被拒</Option>
              <Option value="-2">驳回</Option>
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
      // const xl = (4 - keys.length % 4) * 6;
      // const lg = (3 - keys.length % 3) * 8;
      children.push(
        <Col xl={4} lg={24} style={{textAlign: 'right'}} key="btn">
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{marginLeft: 8}} onClick={this.handleReset}>
            清空
          </Button>
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