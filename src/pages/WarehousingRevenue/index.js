import React, {Component} from 'react';
import {DatePicker,Cascader,Button,Modal,Table} from 'antd';
import axios from 'axios';
import AddForm1 from './AddForm1'
import './WRevenue.css';
const { RangePicker } = DatePicker;
class WarehousingRevenue extends Component {
  constructor(props){
    super(props);
    let visible=false;
    let dataSource= [];
    const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    this.state={
      visible,
      dataSource,
      pagination
    }
  };
  //新增的Modal
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
    const {visible,dataSource,pagination}=this.state;//
    //debugger
    const detailColumnTop= [
      {title: '日期', dataIndex: 'code'},
      {title: '金额', dataIndex: 'name'},
      {title: '单号', dataIndex: 'model'},
      {title: '', dataIndex: 'unit', key: "unit",render:(text,record, index)=>{
        return (
            <div>
              <Button>删除</Button>
              <Button>修改</Button>
            </div>
        )
    }}
    ];
    return (
      <div>
        <div className='Addre'>
          <DatePicker
            showTime
            format="YYYY-MM"
            placeholder="Select Time"
            onChange={this.onChange}
            onOk={this.onOk}
            className='Datecss'
          />
          <Button type="primary" onClick={this.showModal}>新增</Button>
        </div>
        <AddForm1 
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          />
        <Table
            pagination={pagination}
            dataSource={dataSource}
            columns={detailColumnTop}
            axios={this.axios}
            />
      </div>
    )
  }
}

export default WarehousingRevenue;