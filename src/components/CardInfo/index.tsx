import {Button, Flex, Modal, Typography} from "antd";
import {DeleteFilled} from "@ant-design/icons";
import {Fragment, useState} from "react";

type CardInfoProps = {
    removeBlock: (id: number) => void;
    block: Block;
    index: number;
}

export type Block = {
    id: number;
    title: string;
    content: string[]
}

const colors = ["green", "red", "blue", "purple"]

export const CardInfo = (props: CardInfoProps) => {
    const {removeBlock, block, index} = props
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        removeBlock(block.id);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Fragment>
            <Modal
                title="Are you sure ?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
            </Modal>
            <Flex className='container' vertical gap={12} align='center'
                  style={{backgroundColor: colors[index % colors.length]}}>
                <Button icon={<DeleteFilled/>} size={"large"}
                        onClick={() => showModal()} style={{marginTop: 16}}></Button>
                <Typography.Title level={3}>{block.title}</Typography.Title>
                {block.content.map((item, i) => (
                    <Typography.Title level={5} key={i}>{item}</Typography.Title>
                ))}
            </Flex>
        </Fragment>
    )
}