import React, { useState } from "react";
import './App.css'
import { Button, Col, Flex, Row, Spin, Tag, Typography } from 'antd';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const { Title } = Typography;

const App = () => {
    const [mainTable, setMainTable] = useState(false);
    const screens = useBreakpoint();

    return (
        <div className="App">
            {mainTable && (
                <div>
                    <Row gutter={[16, 16]} justify={'center'} className={'table'}>
                        <Col xs={24} md={8} className={'bio'}>
                            <Title level={4}>Name: Sergey</Title>
                            <Title level={5}>Age: 26</Title>
                        </Col>
                        <Col xs={24} md={{span: 16,order:3}} className={'about'} >
                            <Title level={4}>About me: </Title>
                            <Title level={5}>lalalala dota player</Title>
                        </Col>
                        <Col xs={24} md={{span: 12, order:2}} className={'skills'} >
                            <Title level={4}>Skills:</Title>
                            <Flex align={'center'} gap="16px" vertical={true} className={'tags'}>
                                <Tag bordered={false} color="processing">professional swimmer</Tag>
                                <Tag bordered={false} color="cyan">life enjoyer</Tag>
                                <Tag bordered={false} color="lime">bruskett' eater</Tag>
                            </Flex>
                        </Col>
                    </Row>
                </div>
            )}
                    <Button className="button" onClick={() => setMainTable(!mainTable)}
                    block={screens.xs}>
                        {!mainTable ? <Spin size="small" /> : "Hide"}
                    </Button>
        </div>
    );
};

export default App;
