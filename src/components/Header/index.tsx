import {Flex, Typography} from "antd";
import type {PropsWithChildren} from "react";

type TProps = {
    title: string;
}

export const Header = (props: PropsWithChildren<TProps>) => {
    const {title, children} = props;

    return (
        <Flex vertical gap={16}>
            <Typography.Title>
                {title}
            </Typography.Title>
            <Flex gap={16}>
                {children}
            </Flex>
        </Flex>
    )
}