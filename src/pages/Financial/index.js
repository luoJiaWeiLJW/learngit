import React, {Component} from 'react';
import {Table,Input,Button,Cascader} from 'antd';
import './financial.css';
class Financial extends Component {
  constructor(props){
    super(props);
    let dataSource= [];
    let yearm=[];
    const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    this.state={
      dataSource,
      yearm,
      pagination
    }
  };
  onChange(value) {
    if(value.length < 2){
      return
    }else{
      console.log(value);
      this.setState({
      yearm : value
     });
    }
  }
  render() {
    const {dataSource,pagination}=this.state;
    const detailColumnTop= [
      {title: '月份', dataIndex: 'month',width:'10%'},
      {title: '当月总收入', dataIndex: 'monthIncome',width:'10%'},
      {title: '当月成本（含摊销）', dataIndex: 'monthCost',width:'10%'},
      {title: '当月利润', dataIndex: 'monthProfit',width:'10%'},
      {title: '累计利润', dataIndex: 'cumProfit',width:'10%'},
      {title: '累计总收入', dataIndex: 'cumIncome',width:'10%'},
      {title: '累计总支出', dataIndex: 'cumSpend',width:'10%'},
      {title: '累计现金流', dataIndex: 'cumCashflow',width:'10%'},
    ];
    const options = [{
      value: '2018',
      label: '2018',
      children: [{
        value: '1',
        label: '1',
      },{
        value: '2',
        label: '2',
      },{
        value: '3',
        label: '3',
      },{
        value: '4',
        label: '4',
      },{
        value: '5',
        label: '5',
      },{
        value: '6',
        label: '6',
      },{
        value: '7',
        label: '7',
      },{
        value: '8',
        label: '8',
      },{
        value: '9',
        label: '9',
      },{
        value: '10',
        label: '10',
      },{
        value: '11',
        label: '11',
      },{
        value: '12',
        label: '12',
      }
    ],
    }, {
      value: '2017',
      label: '2017',
      children: [{
        value: '1',
        label: '1',
      },{
        value: '2',
        label: '2',
      },{
        value: '3',
        label: '3',
      },{
        value: '4',
        label: '4',
      },{
        value: '5',
        label: '5',
      },{
        value: '6',
        label: '6',
      },{
        value: '7',
        label: '7',
      },{
        value: '8',
        label: '8',
      },{
        value: '9',
        label: '9',
      },{
        value: '10',
        label: '10',
      },{
        value: '11',
        label: '11',
      },{
        value: '12',
        label: '12',
      }
    ],
    }]
    return (
      <div>
        <div className="checkClass">
        <span>月份</span><Cascader options={options} onChange={this.onChange} changeOnSelect /><Button type="primary">查询</Button>
        </div>
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

export default Financial;