import { useState } from "react";
import './App.css'
import { Button, Col, Modal, Row, Spin, Input, Typography } from 'antd';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography;

const colors = ["green", "red", "blue", "purple"];

const App = () => {
    const [mainTable, setMainTable] = useState(false);
    const [blocks, setBlocks] = useState([
        { id: 1, title: 'Bio', content: ['Sergey', 'Age: 26'] },
        { id: 2, title: 'About me', content: ['lalala dota player and lorem'] },
        { id: 3, title: 'Skills', content: ['professional swimmer', 'life enjoyer'] }
    ]);
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const screens = useBreakpoint();

    const showModal = () => setModal(true);

    const handleCancel = () => {
        setModal(false);
        setTitle('');
        setContent('');
    };

    const handleAddBlock = () => {
        if (!title || !content) return;

        const newBlock = {
            id: Date.now(),
            title: title,
            content: content.split(',') // превращаем строку в массив
        };
        setBlocks([...blocks, newBlock]);
        setModal(false);
        setTitle('');
        setContent('');
    };

    return (
        <div className='App'>
            {mainTable && (
                <div>
                    <Button type='dashed' icon={<PlusOutlined />} size='large' block={screens.xs} onClick={showModal}></Button>
                    <Row gutter={[16, 16]} justify='center' className='table'>
                        {blocks.map((block, index) => (
                            <Col xs={24} md={12} key={block.id} className='block'
                                style={{ backgroundColor: colors[index % colors.length]}}>
                                <Title level={3}>{block.title}</Title>
                                {block.content.map((item, i) => (
                                    <Title level={5} key={i}>{item}</Title>
                                ))}
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            <Modal title='Add new block' open={modal} onOk={handleAddBlock} onCancel={handleCancel} okText='Add' cancelText='Cancel'>
                <Input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <Input placeholder='Content' onChange={(e) => setContent(e.target.value)} value={content}/>
            </Modal>

            <Button size='large' onClick={() => setMainTable(!mainTable)} block={screens.xs}>
                {!mainTable ? <Spin size='small' /> : 'Hide'}
            </Button>
        </div>
    );
};

export default App;
