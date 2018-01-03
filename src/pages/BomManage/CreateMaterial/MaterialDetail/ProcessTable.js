import React, {Component} from 'react';
import {Row, Card, Table, Button, Col} from 'antd'
import ModalForm1 from './ModalForm1';


class ProcessTable extends Component {
  constructor(props){
    super(props);
    const visible = false;
    const modalKey = new Date().getTime() + Math.random();

    this.state={
      visible,
      modalKey,
    }
  }
    showModal = () => {
      const modalKey = new Date().getTime() + Math.random();
      this.setState({
        visible: true,
        modalKey,
      })
    };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const columns = [
      {title: '序列', render: (text, record, index) => index + 1},
      {title: '工序名称', dataIndex: 'name'},
      {title: '标准工时', dataIndex: 'model'},//
      {title: '模板', dataIndex: 'unit'},
      {title: '刀具', dataIndex: 'common'},
      {title: '备注', dataIndex: 'source'},
      {title: '设备', dataIndex: 'processing'},
      {title: '图纸', dataIndex: 'type'},
      {title: '加工说明', dataIndex: 'color'},
    ];
    return (
      <div className="gutter-box">
        <Card bordered={false} style={{minHeight: 350}}>
          <Row>
            <Col span={12}>
              <h2>工序</h2>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Button style={{marginRight: 16,marginBottom:"20px"}} onClick={this.showModal}>工序详情</Button>
              <Button>导出工序</Button>
            </Col>
            <Col span={24}>
              <Table columns={columns} size="middle"/>
            </Col>
            <ModalForm1
              onCancel={this.handleCancel}
              visible={this.state.visible}
              key={this.state.modalKey}

            />
          </Row>
        </Card>
      </div>
    )
  }

}

export default ProcessTable;