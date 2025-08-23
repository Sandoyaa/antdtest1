import {Button, Flex, Typography} from "antd";
import {DeleteFilled} from "@ant-design/icons";

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
    return (

        <Flex className='container' vertical gap={12} align='center'
              style={{backgroundColor: colors[index % colors.length]}}>
            <Button icon={<DeleteFilled/>} size={"large"}
                    onClick={() => removeBlock(block.id)}></Button>
            <Typography.Title level={3}>{block.title}</Typography.Title>
            {block.content.map((item, i) => (
                <Typography.Title level={5} key={i}>{item}</Typography.Title>
            ))}
        </Flex>
    )
}