import React, {Component} from 'react';
import {DatePicker,Button,Table,message} from 'antd';
import axios from 'axios';
import AddForm1 from './AddForm1'
import './WRevenue.css';
const { MonthPicker } = DatePicker;

class WarehousingRevenue extends Component {
  constructor(props){
    super(props);
    let visible=false;
    let dataSource= [];
    let pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    const sorter = {order: ""}
    let loading = false;
    this.state={
      loading,
      visible,
      dataSource,
      pagination,
      sorter 
    }
    const columns= [
      {title: '日期', dataIndex: 'date',key:"date"},
      {title: '金额', dataIndex: 'putMoney',key:"putMoney"},
      {title: '单号', dataIndex: 'putNumber',key:"putNumber"},
      {title: '状态', dataIndex: 'status',render:(text,record) => this.statusRender(text,record)},
      {title: '操作', dataIndex: 'unit', key: "unit",render:(text,record, index)=>{
        return (
            <div>
              <Button onClick={()=>this.delateWR("delete",record)}>删除</Button>
              <Button onClick={()=>this.delateWR("lits",record)}>提交财务</Button>
            </div>
        )
      }}
    ];
    this.columns = columns;
  };
    
  statusRender = (text, record) =>{
    //console.log('text',text);
    if(text !== '0'){
      return '加入计算';
    }else{
      return '未加入计算';
    }
  }

  delateWR =(type,record) =>{
    if(type ==="delete"){
      axios({
        url:"/delete_put_statistics/"+record.id,
        method:"delete",
      }).then(res=>{
        //console.log(res);
        message.success("刪除成功")
        this.axios();
      })
    }else{
      console.log('record',record.status);
      axios({
        url:'/put_statistics/'+record.id,
        method :'put',
        data:{
          ...record
        }
      }).then(res=>{
         console.log('res',res);
         message.success("上报成功");
         this.axios()
         this.axios()
         console.log(record.status);
      })
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    let pageindex = 1;
    if (sorter.field !== this.state.sorter.field) {
      pageindex = 1;
    } else {
      pageindex = pagination.current
    }
    pager.current = pageindex;
    pager.pagesize = pagination.pageSize;
    const sort = {};
    sort.field = sorter.field;
    sort.order = sorter.order;
    this.setState({
      pagination: pager,
      sorter: sort
    });
  };

  axios = (params = {}) => {
    this.setState({loading: true});
    if (params.sortOrder) {
      if (params.sortOrder instanceof Array) {
        params.sortOrder = params.sortOrder.map(item => {
          return item === "ascend" ? "A" : "D";
        })
      } else {
        params.sortOrder = params.sortOrder === "ascend" ? "A" : "D";
      }
    }
    axios({
      url: "/put_statisticss",
      method: "get",
      params: {
        ...params
      }
     }).then(res => {
       console.log('res',res);
       if(res.status !== 200){
         //console.log('xxx');
          const pagination = {...this.state.pagination};
          pagination.total = 0;
          if(res.data.data.code !== 200){
            this.setState({
                loading: false,
                pagination
            })
          }
       };
      const pagination = {...this.state.pagination};
      pagination.total = parseInt(res.data.total,0) || 0;
      let dataSource = [];
      if (res.data.data instanceof Array) {
         dataSource = res.data.data;
      }
      this.setState({
        pagination,
        loading: false,
        dataSource
      })
      //console.log('dataSource',dataSource)
      axios({
        url:'all_put_money',
        method:'get'
      }).then(res=>{
        //console.log(res)
        this.setState({
           allwarre:res.data
        })
        axios({
          url:'/total_money_sellStatisticsService',
          method:'get'
        }).then(res=>{
          this.setState({
            allsele:res.data
          })
          const {allsele,allwarre}= this.state;
          console.log("allsele: "+allsele+"========="+"allwarre: "+ allwarre)
          if(allwarre > allsele){
            message.error("入库金额大于销售金额的105%！")
          }
        })
      })
    }).catch(e => {
      message.error("系统出错,请重新尝试");
      this.setState({loading: false})
    })
  };

  componentDidMount() {
    this.axios();
  }

  //新增的Modal
  showModal = () => {
    //console.log('AA')
    this.setState({
      visible: true,
    });
  }
  handleCancel = (e) => {
    //console.log('CC')
    //console.log(e);
    this.setState({
      visible: false,
    });
    
  }

  //日期
  handleSearch = (date, dateString) =>{//按条件搜索
    let selet = dateString.replace("/","-");
    console.log(selet);
    axios({
      url:"get_month_PutStatistics?month="+selet,
      method:"get"
    }).then(res =>{
      console.log(res);
      this.setState({
        dataSource:res.data.data        
      })
    })
  }

  render =() => {
    const {visible,dataSource,pagination}=this.state;
    //debugger
    return (
      <div>
        <div className='Addre'>
          <MonthPicker format='YYYY/MM' onChange={this.handleSearch} />
          <Button type="primary" onClick={this.showModal}>新增</Button>
        </div>
        <AddForm1 
          visible={visible}
          //onOk={this.handleOk}
          onCancel={this.handleCancel}
          axios={this.axios}
          />
        <Table
            //className="components-table-nested"
            rowKey={record=>record.id}
            loading={this.state.loading}
            pagination={pagination}
            dataSource={dataSource}
            columns={this.columns}
            axios={this.axios}
            onChange={this.handleTableChange}
            />
      </div>
    )
  }
}

export default WarehousingRevenue;