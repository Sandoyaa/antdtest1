import {Fragment, useMemo, useState} from "react";
import './App.css'
import {Button, Col, Flex, Form, Input, Modal, Row, Switch} from 'antd';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {PlusOutlined} from '@ant-design/icons'
import {type Block, CardInfo, Header} from "./components";
import {blockData} from "./constants/data.ts";


const App = () => {
    const [form] = Form.useForm();
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
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <Fragment>
            <Switch defaultChecked onChange={onChange}/>;
            <Header title='123' children={<Fragment><Button>a</Button>
                <Button>a</Button></Fragment>}/>
            <Flex className='App' justify='center' vertical gap={16}>
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
