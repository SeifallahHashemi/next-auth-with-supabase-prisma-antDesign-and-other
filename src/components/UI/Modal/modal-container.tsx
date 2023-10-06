"use client"
import React, {useState} from 'react';
import {Modal} from "antd";
import {useRouter} from "next/navigation";

const ModalContainer = ({ children }: { children: React.ReactNode}) => {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const router = useRouter();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        router.push("/")
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        router.push("/")
    };
    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okType={"dashed"}>
            {children}
        </Modal>
    );
};

export default ModalContainer;