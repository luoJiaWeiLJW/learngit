import React, {Component} from 'react';
import {DatePicker, message, Table,Input,Button,Cascader} from 'antd';
import checkCode from '../../config/codeTips';
import moment from 'moment';
import axios from 'axios';
import './financial.css';
const { MonthPicker } = DatePicker;

class Financial extends Component {
  constructor(props){
    super(props);
    let dataSource= [];
    const pagination = {pagesize:2, pageindex:1, showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};//10
    this.state={
      dataSource,
      pagination
    };
    const detailColumnTop= [
      {title: '月份', dataIndex: 'month',key:'month',width:'10%'},
      {title: '当月总收入', dataIndex: 'currentIncome',key:'currentIncome',width:'10%'},
      {title: '当月成本（含摊销）', dataIndex: 'currentCost',key:'currentCost',width:'10%'},
      {title: '当月利润', dataIndex: 'currentProfit',key:'currentProfit',width:'10%'},
      {title: '累计利润', dataIndex: 'accumulativeProfit',key:'accumulativeProfit',width:'10%'},
      {title: '累计总收入', dataIndex: 'accumulativeGeneralIncome',key:'accumulativeGeneralIncome',width:'10%'},
      {title: '累计总支出', dataIndex: 'accumulativeTotalExpenditure',key:'accumulativeTotalExpenditure',width:'10%'},
      {title: '累计现金流', dataIndex: 'accumulativeCashFlow',key:'accumulativeCashFlow',width:'10%'},
    ];
    console.log(pagination);
    this.columns = detailColumnTop;
  };

  componentDidMount() {
    this.axios();
  }

  handleTableChange() {
    this.axios({
      pagesize: this.state.pagination.pagesize||10,
      pageindex:this.state.pagination.pageindex||1

    });
  }

  handleSearch = (date, dateString) =>{//按条件搜索
    this.axios({
      date: dateString,
      pagesize:this.state.pagination.pagesize||10,
      pageindex:1,
    });
  }

  axios = (params = {}) => {
    axios({
      url: "/financings",
      method: "get",
      params: {
        ...params
      }
    }).then(res => {
      if (checkCode(res.data.code)) {
        const pagination = {...this.state.pagination};
        pagination.total = parseInt(res.data.total,0) || 0;
        let dataSource = [];
        if (res.data.data instanceof Array) {
          dataSource = res.data.data;
        }
        this.setState({
          pagination,
          dataSource
        })
      };
    }).catch(e => {
      message.error("系统出错,请重新尝试");
      this.setState({loading: false})
    })
  };

  render() {
    return (
      <div>
        <div className="checkClass">
        <span>月份</span><MonthPicker defaultValue={moment('2018/01', 'YYYY/MM')} format='YYYY/MM' onChange={this.handleSearch} /><Button type="primary">查询</Button>
        </div>
        <Table pagination={this.state.pagination} rowKey={record=>record.id} dataSource={this.state.dataSource} columns={this.columns} onChange={this.handleTableChange} />
      </div>
    )
  }
}

export default Financial;