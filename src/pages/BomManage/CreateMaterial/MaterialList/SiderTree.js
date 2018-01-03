import React, {Component} from 'react';
import {message, Spin, Tree} from 'antd';
import axios from 'axios';
const TreeNode = Tree.TreeNode;

class SiderTree extends Component {
  constructor(props){
    super(props);
    const treeData=[];
    const treeLoading=true;
    this.state={
      treeData,
      treeLoading,
    }
    
  }

  
  componentDidMount=()=>{
    axios({
      url: '/tree/material_category/pid/0/children',
      method: 'get'
    }).then(res => {
      // console.log(res.data.data);
      if (res.data.code !== "200") {
        message.success('网络异常,请稍后重试');
        return
      }
      const treeData = (res.data.data ? res.data.data : []);
      console.log(treeData,'8888888')
      this.setState({
        treeData,
        treeLoading: false,
      })
    }).catch(e => {
      message.warning('网络异常,请稍后重试');
      this.setState({
        treeLoading: false
      })
    })
    
  };
  onSelect = (selectedKeys) => {
 this.props.handleSearch('parentId', selectedKeys)

  };
  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      console.log(treeNode)
      if (treeNode.props.children) {
        resolve();
        return;
      }
      axios({
        url: '/tree/material_category/pid/'+ treeNode.props.dataRef.id +'/children',
        method: 'get'
      }).then(res => {
      
        if (res.data.code !== "200") {
          message.success('网络异常,请稍后重试');
          return
        }
        
        treeNode.props.dataRef.children = (res.data.data ? res.data.data : []);
        this.setState({
          treeData: [...this.state.treeData],
        })
        resolve();
      }).catch(e => {
        message.warning('网络异常,请稍后重试');
        this.setState({
        })
      })
    });
  }
  render() {
    const {treeLoading} = this.state;
    
    const repeat = data => data.map((item,index) => {
         
          let child = [];

          if (!item.children) {
            return <TreeNode  title={item.name} key={item.id} dataRef={item} />;
          }
          return <TreeNode title={item.name} key={item.id} dataRef={item}>
              {repeat(item.children, child)}
            </TreeNode>;
        })
    return (
      <Spin spinning={treeLoading}>
        <Tree
           onSelect={this.onSelect}
          loadData={this.onLoadData}
        >
          {repeat(this.state.treeData)}
          {/*{this.renderTreeNodes(this.state.treeData)}*/}
        </Tree>
      </Spin>
    )
  }
}

export default SiderTree;