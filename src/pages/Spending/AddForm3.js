import React, {Component} from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Table, Checkbox, Button, AutoComplete ,message,TreeSelect,Modal,DatePicker} from 'antd';
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const TreeNode = TreeSelect.TreeNode;

class AddForm extends Component {
  constructor(props) {
    super(props);
    let visible=false;
    let dataSource= [];
    const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    this.state = {
        pagination,
        visible,
        dataSource
    }
    const columns = [
        {title: "时间", dataIndex: "code", key: "code"},
        {title: "种类", dataIndex: "name", key: "name"},
        {title: "名称", dataIndex: "addType", key: "addType"},
        {title: "部门", dataIndex: "createUserId", key: "createUserId"},
        {title: "金额", dataIndex: "updateTime", key: "updateTime"},
        {title: "是否摊销", dataIndex: "status", key: "status", render: (text, record) => this.statusRender(text, record)},
        {title: "每月摊销金额", dataIndex: "approvalUserId", key: "approvalUserId"},
    ];
    this.columns = columns;
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
       <Table className="components-table-nested" columns={this.columns} pagination={this.state.pagination} 
               /> 
      </Modal>
    )
  }
  }

const AddForm3 = Form.create()(AddForm);
export default AddForm3