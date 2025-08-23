import {Fragment, useMemo, useState} from "react";
import './App.css'
import {Button, Col, Flex, Form, Input, Modal, Row} from 'antd';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {PlusOutlined} from '@ant-design/icons'
import loadImg from './img/load.jpeg'
import {type Block, CardInfo, Header} from "./components";
import {blockData} from "./constants/data.ts";


const App = () => {
    const [form] = Form.useForm();
    const [mainTable, setMainTable] = useState<boolean>(false);
    const [blocks, setBlocks] = useState<Block[]>(blockData);
    const [modal, setModal] = useState<boolean>(false);
    const screens = useBreakpoint();

    const buttonBlockCondition = useMemo(() => {
        return screens.xs || !screens.md
    }, [screens])

    const showModal = () => setModal(true);

    const handleCancel = () => {
        setModal(false);
        form.resetFields();
    };

    const handleAddBlock = () => {
        form.submit();
    };

    const removeBlock = (id: number) => {
        setBlocks(blocks.filter(b => b.id !== id))
    }

    const onFinish = (values: { title: string, description: string }) => {
        setBlocks((prevState) => [...prevState, {
            id: Date.now(),
            content: values.description.split(','),
            title: values.title,
        }]);
        setModal(false)
    }

    return (
        <Fragment>
            <Header title='123' children={<Fragment><Button>a</Button>
                <Button>a</Button></Fragment>}/>
            <Flex className='App' justify='center' vertical gap={16}>
                {mainTable && (
                    <Flex vertical align='center' gap={16}>
                        <Button icon={<PlusOutlined/>} size='large' block={buttonBlockCondition}
                                onClick={showModal}></Button>
                        <Row gutter={[16, 16]} justify='center' className='table' style={{width: '100%'}}>
                            {blocks.map((block, index,) => (
                                <Col xs={24} md={12} key={block.id}>
                                    <CardInfo removeBlock={removeBlock} block={block} index={index}/>
                                </Col>
                            ))}
                        </Row>
                    </Flex>
                )}
                <Flex justify='center'>
                    <Button size='large' block={buttonBlockCondition} onClick={() => setMainTable(!mainTable)}
                            style={{
                                backgroundImage: `url(${loadImg})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '105px',
                                width: '100px'
                            }}>
                        {mainTable && 'Hide'}
                    </Button>
                </Flex>
            </Flex>
            <Modal title='Add new block' open={modal} onOk={handleAddBlock} onCancel={handleCancel} okText='Add'
                   cancelText='Cancel'>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{required: true, message: 'Please input your title!'}]}
                    >
                        <Input placeholder='Заголовок'/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{required: true, message: 'Please input your description!'}]}
                    >
                        <Input placeholder='Описание'/>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default App;
