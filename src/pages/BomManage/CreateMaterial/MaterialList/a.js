import React, {Component} from 'react';
import {message, Spin, Tree} from 'antd';
import axios from 'axios';
import  './style.css';
const TreeNode = Tree.TreeNode;

export class Demo extends Component {

 constructor(props){
    super(props);

    const treeData=[];
     const treeLoading=true;
    this.state={
      treeData,
      treeLoading,
    }
    
  }

  onSelect = (selectedKeys,info) => {
  this.props.handleSearch('parentId', selectedKeys)
console.log(selectedKeys,info)
  };
    componentDidMount=()=>{
    axios({
      url: '/tree/material_category/pid/0/children',
      method: 'get'
    }).then(res => {
     
      if (res.data.code !== "200") {
        message.success('网络异常,请稍后重试');
        return
      }
      const treeData = (res.data.data ? res.data.data : []);
      
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
  onLoadData = (treeNode) => {
  	
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
     
      setTimeout(() => {
          this.setState({loading: true});
      	axios({
        url: '/tree/material_category/pid/'+ treeNode.props.dataRef.id +'/children',
        method: 'get'
      }).then(res=>{
            this.setState({loading: false});
      	if (res.data.code !== "200") {
          message.success('网络异常,请稍后重试');
          return
        }
      	treeNode.props.dataRef.children=(res.data.data ? res.data.data : []);
      	this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      })       
        
      }, 1000);
    });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
         let isLeaf = false;
          if(item.lastLevel === "1"){
            isLeaf = true;
          }

          if (!item.children) {
              {this.change}
            return <TreeNode  title={item.name} key={item.id} dataRef={item} />;
          }
          return <TreeNode title={item.name} key={item.id} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>;
    });
  }
  render() {
	const { treeData,treeLoading }=this.state;
	console.log(treeData)
    return (

      <Tree   loadData={this.onLoadData} onSelect={this.onSelect}>       
        {this.renderTreeNodes(treeData)}
      </Tree>
      
    );
  }
}
