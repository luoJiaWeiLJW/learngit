import React, {Component} from 'react';
import {Card} from 'antd'

class SideTree extends Component {
  render() {
    return (
      <Card bordered={false} style={{minHeight:620}}>
          <img src="/bom.png"></img>
      </Card>
    )
  }

}

export default SideTree;