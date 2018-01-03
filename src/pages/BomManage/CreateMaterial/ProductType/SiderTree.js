import React, {Component} from 'react';
import { Spin, Tree,Icon } from 'antd';
import './style.css'
// import axios from 'axios';
const TreeNode = Tree.TreeNode;

class SiderTree extends Component {
 
  onSelect = (selectedKeys) => {
    this.props.handleSearch('parentId', selectedKeys)
      
  };
  onSelect1=()=>{
      this.props.handleSearch('parentId','0')
        
  }
  render() {
    const {treeData,treeLoading} = this.props;
    const repeat = data => data.map((item) => {
          let child = [];
          if (!item.children) {
            return <TreeNode title={item.name} key={item.id}/>;
          }
          return <TreeNode title={item.name} key={item.id}>{repeat(item.children, child)}</TreeNode>;
        });
    return (

      <Spin spinning={treeLoading}>
          <div><Icon type="caret-right" className='ifont'/><p className='seat'></p><span className='All'  onClick={this.onSelect1}>全部</span></div>
        <Tree
          onSelect={this.onSelect}
          defaultExpandAll
        >
          {repeat(treeData)}
        </Tree>
      </Spin>
    )
  }
}

export default SiderTree;