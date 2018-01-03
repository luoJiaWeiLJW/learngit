import React, {Component} from 'react';
import {Tabs,Card,Row,Col} from 'antd';
import BreadcrumbCustom from '../../../components/BreadcrumbCustom';
import MaterialAddChange from './MaterialAddChange';
import MaterialEditChange from './MaterialEditChange'
import MaterialDeleteChange from './MaterialDeleteChange';
const TabPane = Tabs.TabPane;

class MaterialChange extends Component {
  render() {
    return (
      <div className="gutter-example">
        <BreadcrumbCustom first="bom管理" second="物料操作" />
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <div className="gutter-box">
              <Card bordered={false} style={{minHeight:620}}>
                <Tabs
                  forceRender={true}
                  defaultActiveKey="adds"
                >
                  <TabPane tab="添加" key="adds">
                    <MaterialAddChange />
                  </TabPane>
                  <TabPane tab="变更" key="edit">
                    <MaterialEditChange />
                  </TabPane>
                  <TabPane tab="删除" key="deletes">
                    <MaterialDeleteChange />
                  </TabPane>

                </Tabs>


              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

}

export default MaterialChange;