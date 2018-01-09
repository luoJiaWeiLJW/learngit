import React, {Component} from 'react';
import {DatePicker,Button,Table,message} from 'antd';
import axios from 'axios';
import AddForm2 from './AddForm2'
import '../WarehousingRevenue/WRevenue.css';
const { MonthPicker } = DatePicker;

class WarehousingRevenue extends Component {
  constructor(props){
    super(props);
    let visible=false;
    let dataSource= [];
    let pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    const sorter = {order: ""}
    this.state={
      visible,
      dataSource,
      pagination,
      sorter
    }
    const columns= [
      {title: '日期', dataIndex: 'date',key:"date"},
      {title: '金额', dataIndex: 'sellMoney',key:"sellMoney"},
      {title: '单号', dataIndex: 'sellNumber',key:"sellNumber"},
      {title: '状态', dataIndex: 'status',key:'status',render:(text,record) => this.statusRender(text,record)},
      // {title: '操作', dataIndex: 'unit', key: "unit",render:(text,record, index)=>{
      //   return (
      //       <div>
      //         <Button onClick={()=>this.delateWR("delete",record)}>删除</Button>
      //         <Button onClick={()=>this.delateWR("lits",record)}>提交财务</Button>
      //       </div>
      //   )
      // }}
      {title:'操作',dataIndex:'unit',key:'unit',render:(text,record) => {
        return(
          record.status==="1"?<div>
                 <Button onClick={()=>this.delateWR("delete",record)}>删除</Button>
               </div>
               :
               <div>
          <Button onClick={()=>this.delateWR("delete",record)}>删除</Button>
           <Button onClick={()=>this.delateWR("lits",record)}>提交财务</Button>
         </div>
        )
        
      }}
    ];
    this.columns = columns;
  };
  changecaozuo = (text,record) => {
    console.log(record.status,"================")
    if(record.status==="1"){
      return "3"
    }
    // console.log('text',text)
    // console.log(record.status)
    // if(record.status === '1'){
    //   return (
    //     <div>
    //       <Button onClick={()=>this.delateWR("delete",record)}>删除</Button>
    //     </div>
    //   )
    // }else{
    //   return(
    //     <div>
    //       <Button onClick={()=>this.delateWR("delete",record)}>删除</Button>
    //       <Button onClick={()=>this.delateWR("lits",record)}>提交财务</Button>
    //     </div>
    //   )
    // }
    // return 
  }
  statusRender = (text, record) =>{
    console.log('text',text);
    if(text !== '0'){
      return '加入计算';
    }else{
      return '未加入计算';
    }
  }
  delateWR =(type,record) =>{
    console.log(record);
    if(type==="delete"){
      axios({
        url:"/sell_statistics/"+record.id,
        method:"delete",
      }).then(res=>{
        message.success("刪除成功")
        this.axios({pageindex: 1});
      })
    }else{
      //console.log(record.status)
      axios({
        url:"/update_sell_statistics//"+record.id,
        method:"put",
        data:{
          ...record
        }
      }).then(res=>{
        message.success("提交成功")
        this.axios({pageindex: 1});
      })
    }
  }
  // handleTableChange = (pagination, filters, sorter) => { 侯总 改的 分页效果 
  //   const pager = {...this.state.pagination};
  //   pager.current = pagination.current;
  //   pager.pagesize = pagination.pageSize;
  //   const sort = {};
  //   sort.field = sorter.field;
  //   sort.order = sorter.order;
  //   this.axios({
  //     pageindex:pager.current,
  //     pagesize:pager.pagesize
  //   })
  // };
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
      url: "/sell_statisticss",
      method: "get",
      params: {
        pagesize: 10,
        ...params
      }
     }).then(res => {
       //console.log('res',res);
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
      console.log('dataSource',dataSource)
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
  handleSearch = (date, dateString) =>{//按条件搜索
    console.log("dateString",dateString)
    let selet = dateString.replace("/","-");
    console.log(selet);
    axios({
      url:"get_month_sell_statisticss?month="+selet,
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
    return (
      <div>
        <div className='Addre'>
          <MonthPicker format='YYYY/MM' onChange={this.handleSearch} />
          <Button type="primary" onClick={this.showModal}>新增</Button>
        </div>
        <AddForm2
          visible={visible}
          //onOk={this.handleOk}
          onCancel={this.handleCancel}
          axios={this.axios}
          />
        <Table
            //className="components-table-nested"
            loading={this.state.loading}
            pagination={pagination}
            dataSource={dataSource}
            columns={this.columns}
            axios={this.axios}
            onChange={this.handleTableChange}
            rowKey={record=>record.id}
            />
      </div>
    )
  }
}

export default WarehousingRevenue;