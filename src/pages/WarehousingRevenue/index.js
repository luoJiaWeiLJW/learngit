import React, {Component} from 'react';
import {DatePicker,Cascader,Button,Modal,Table} from 'antd';
//import { Link } from 'react-router';
//import { Layout} from 'antd';
import axios from 'axios';
//const {  Content } = Layout;
const { RangePicker } = DatePicker;
class WarehousingRevenue extends Component {
  constructor(props){
    super(props);
    this.state={
      visible:false
    }
  };
  //新增的对话框
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  //日期
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  onOk(value) {
    console.log('onOk: ', value);
  }
  render() {
    const detailColumnTop= [
      {title: '日期', dataIndex: 'code',width:'10%'},
      {title: '金额', dataIndex: 'name',width:'10%'},
      {title: '单号', dataIndex: 'model',width:'10%'},//
      {title: '', dataIndex: 'unit',width:'10%'}
    ];
    return (
      <div>
        入库
        <div>
          <DatePicker
            showTime
            format="YYYY-MM"
            placeholder="Select Time"
            onChange={this.onChange}
            onOk={this.onOk}
          />
          <Button type="primary" onClick={this.showModal}>新增</Button>
          <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table
            columns={detailColumnTop}
            axios={this.axios}
            pagination={false}
            size="middle" />
        </Modal>
        <Table
            columns={detailColumnTop}
            axios={this.axios}
            pagination={false}
            />
        </div>
      </div>
    )
  }
}

export default WarehousingRevenue;