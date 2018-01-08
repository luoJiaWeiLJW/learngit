import React, {Component} from 'react';
import {message, Table, Button} from 'antd';
import SearchForm from './searchForm';
import AddForm3 from './AddForm3';
import axios from 'axios';

class Spending extends Component {
    constructor(props) {
        super(props);
        let visible=false;
        let dataSource= [];
        const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
        const sorter = {order: ""};
        let loading = false;
        this.state = {
            pagination,
            visible,
            dataSource,
            sorter,
            loading
        }
        const columns = [
            // {title: "编号", key: "order", render: (text, record, index) => index + 1},
            {title: "日期", dataIndex: "date", key: "date"},
            {title: "种类", dataIndex: "variety", key: "variety", render: (text, record) => this.varietyRender(text, record)},
            {title: "名称", dataIndex: "name", key: "name"},
            {title: "部门", dataIndex: "dept", key: "dept",render: (text, record) => this.department(text, record)},
            {title: "金额", dataIndex: "expendMoney", key: "expendMoney"},
            {title: "是否均摊", dataIndex: "amortize", key: "amortize", render: (text, record) => this.statusRender1(text, record)},
            {title: "均摊时间（月）", dataIndex: "amortizeTime", key: "amortizeTime"},
            {title: "每月均摊成本", dataIndex: "amortizeMoney", key: "amortizeMoney"},
            {title: "系统反馈意见", dataIndex: "systemIdea", key: "systemIdea",render: (text, record) => this.statusRender2(text, record)},
            {title: "是否执行", dataIndex: "specialPass", key: "specialPass",render: (text, record) => this.statusRender3(text, record)},
            {title: "操作", dataIndex: "status", key: "status",render:(text,record, index)=>{
                return (
                    <div>
                      <Button onClick={()=>this.delateWR("delete",record)}>删除</Button>
                    </div>
                )
            }},
        ];
        this.columns = columns;
    }
    department =(text, record) => {
        if(text === '0'){
          return "生产"
        }else if(text === "1"){
          return "销售"
        }else{
          return "其他"
        }
    }
    delateWR =(type,record) =>{
      if(type ==="delete"){
        axios({
          url:"/expend/"+record.id,
          method:"delete",
        }).then(res=>{
          //console.log(res);
          message.success("刪除成功")
          this.axios();
        })
      }else if(type ==="ccheck"){
        console.log('record',record)
        axios({
          url:'/update_expend_systemidea/'+record.id,
          method :'put',
        }).then(res=>{
           console.log('res',res);
           if(res.data.systemIdea === '1'){
             record.systemIdea = '1';
             axios({
               url:'update_expend/'+record.id,
               method:'put',
               data:{...record}
             }).then(res=>{
               message.success("意见获取成功，校验通过");
             })
           }else{
             message.success("意见获取成功");
           }
           this.axios()
        })
      }else{
        axios({
          url:'/update_expend_specialpass/'+record.id,
          method :'put',
        }).then(res=>{
           record.specialPass = "1";  //后台返回的意见是不通过，但是此操作是强制通过，需要改状态
           axios({
             url:'update_expend/'+record.id,
             method:'put',
             data:{...record}
           }).then(res=>{
            message.success("上报成功");
           })
           this.axios()
        })
      }
    }
  varietyRender = (text, record)=>{
      if(text === "0"){
        return '一次性支出';
      }else if(text === "1"){
        return '原料支出';
      }else{
        return '固定资产支出';
      }
  }

    statusRender1 =(text, record)=>{
      if(text === '1'){
        return '是';
      }else{
        return '否';
      }
    }
    statusRender2 =(text, record)=>{
      if(text === '5'){
        return '通过';
      }else if(text === '0'){
        return (
            <Button onClick={()=>this.delateWR("ccheck",record)}>校验</Button>
              )
      }else if(text === '2'){
        return '未通过，负面影响净利润';
      }else if(text === '3'){
        return '未通过，负面影响现金流';
      }else if(text === '4'){
        return '未通过，负面影响两个指标';
      }
    }

    statusRender3 =(text, record)=>{
      if(text !== '1'){
        return (
          <Button onClick={()=>this.delateWR("upup",record)}>执行支出</Button>
    )
      }else{
        return '是';
      }
    }
    // handleTableChange = (pagination, filters, sorter) => {
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
        url: "/all_expends",
        method: "get",
        params: {
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
      this.axios({});
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
  render() {
    const {visible,dataSource}=this.state;
    return (
      <div>
        <div>
            <SearchForm onSearch = {this.handleSearch} />
            <Button onClick={this.showModal}>新增</Button>
        </div>
        <Table className="components-table-nested" columns={this.columns} pagination={this.state.pagination} dataSource={dataSource} rowKey={record=>record.id}
               />
        <AddForm3
          visible={visible}
          //onOk={this.handleOk}
          onCancel={this.handleCancel}
          axios={this.axios}
          />
      </div>
    )
  } 
}

export default Spending;