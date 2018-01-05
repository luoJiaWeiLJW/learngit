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
        this.state = {
            pagination,
            visible,
            dataSource
        }
        const columns = [
            {title: "编号", key: "order", render: (text, record, index) => index + 1},
            {title: "时间", dataIndex: "date", key: "date"},
            {title: "种类", dataIndex: "variety", key: "variety"},
            {title: "名称", dataIndex: "name", key: "name"},
            {title: "部门", dataIndex: "dept", key: "dept"},
            {title: "金额", dataIndex: "expendMoney", key: "expendMoney"},
            {title: "是否摊销", dataIndex: "amortize", key: "amortize", render: (text, record) => this.statusRender1(text, record)},
            {title: "摊销时间（月）", dataIndex: "amortizeTime", key: "amortizeTime"},
            {title: "每月摊销金额", dataIndex: "amortizeMoney", key: "amortizeMoney"},
            {title: "系统反馈意见", dataIndex: "systemIdea", key: "systemIdea",render: (text, record) => this.statusRender2(text, record)},
            {title: "是否通过特批", dataIndex: "specialPass", key: "specialPass",render: (text, record) => this.statusRender3(text, record)},
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
    delateWR =(type,record) =>{
      if(type ==="delete"){
        axios({
          url:"/delete_put_statistics/"+record.id,
          method:"delete",
        }).then(res=>{
          //console.log(res);
          message.success("刪除成功")
          this.axios({pageindex: 1});
        })
      }else if(type ==="ccheck"){
        console.log('record',record)
        axios({
          url:'/update_expend_systemidea/'+record.id,
          method :'put',
        }).then(res=>{
           console.log('res',res);
           message.success("sf");
           this.axios({pageindex: 1})
        })
      }else{
        axios({
          url:'/update_expend_specialpass/'+record.id,
          method :'put',
        }).then(res=>{
           axios({
             url:'update_expend/'+record.id,
             method:'put',
             data:{...record}
           }).then(res=>{
            message.success("上报成功");
           })
           this.axios({pageindex: 1})
        })
      }
    }
    statusRender1 =(text, record)=>{
      if(text == '1'){
        return '是';
      }else{
        return '否';
      }
    }
    statusRender2 =(text, record)=>{
      if(text == '1'){
        return '通过';
      }else if(text == '0'){
        return (
            <Button onClick={()=>this.delateWR("ccheck",record)}>校验</Button>
              )
      }else{
        return '不通过';
      }
    }
    // change =(type,record) =>{
    //   axios({
    //     url:"/delete_put_statistics/"+record.id,
    //     method:"delete",
    //   }).then(res=>{
    //     //console.log(res);
    //     message.success("刪除成功")
    //     this.axios({pageindex: 1});
    //   })
    // }
    statusRender3 =(text, record)=>{
      if(text !== '1'){
        return (
          <Button onClick={()=>this.delateWR("upup",record)}>已上报</Button>
    )
      }else{
        return '是';
      }
    }
    handleTableChange = (pagination, filters, sorter) => {
      const pager = {...this.state.pagination};
      pager.current = pagination.current;
      pager.pagesize = pagination.pageSize;
      const sort = {};
      sort.field = sorter.field;
      sort.order = sorter.order;
      this.axios({
        pageindex:pager.current,
        pagesize:pager.pagesize
      })
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
          pagesize: 10,
          ...params
        }
       }).then(res => {
         //console.log('res',res);
         if(res.status != 200){
           //console.log('xxx');
            const pagination = {...this.state.pagination};
            pagination.total = 0;
            if(res.data.data.code != 200){
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
      this.axios({pageindex: 1});
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