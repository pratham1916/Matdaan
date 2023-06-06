import React, {useState, useEffect} from "react";
import {Row, Col, Radio, Typography, Card, Table, Tag, Modal, message} from "antd";
import axios from "axios";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button } from "antd/es/radio";
import {format} from 'date-fns'
import Heading from '../css/Heading.module.css'

const { confirm } = Modal;
const VerifyVoter = () => {
    const [statuss, setStatus] = useState("All");
    const [refreshing, setRefreshing] = useState(true)
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        onLoad()
    },[statuss])

    useEffect(() => {
        onLoad()
    },[])


    const showTotal = (total, range) => <Typography.Text>{range[0]}-{range[1]} of {total} items</Typography.Text>
    const [pagination, setPagination] =  useState({
        current: 1,
        pageSize: 5,
        total: 0,
        size: "middle",
        showTotal,
        showSizeChanger: true
    }) 
    const onLoad = async () => {
        setRefreshing(true)
        try{
            let url = `http://localhost:8080/user?page=${pagination.current}&limit=${pagination.pageSize}`
            const res = await axios.get(url, {
                headers: { filters: JSON.stringify({status: statuss})}
            })
            setVoters(res.data.user)
        } catch {

        }
        setRefreshing(false)
    }

   const onChangeStatus = async (id, status, voterId,email) => {
    try {
        confirm({
            title: `Do you Want to ${status === "Verified" ? "Verify" : "Un-Verify"} this Voter?`,
            icon: <ExclamationCircleFilled />,
            onOk: async () => {
              const res = await axios.put(`http://localhost:8080/user/${id}`, {status: status, voterId: voterId,email: email});
              if (res.data.status === "error") {
                message.error("Invalid Error")
              } else {
                onLoad();
              }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    } catch (error) {
        
    }
   }

    const onTableChange = (pagination, filters) => {
        onLoad({pagination, filters})
    }

    const tableColumns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (name) => (
                <span>{name}</span>
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (email) => (
                <span>{email}</span>
            )
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: (phone) => (
                <span>{phone}</span>
            )
        },
        {
            title: "Gender",
            dataIndex: "gender",
            render: (gender) => (
                <span>{gender}</span>
            ),
            width: 100
        },
        {
            title: "D.O.B.",
            dataIndex: "dob",
            render: (dob) => (
                <span>{format(new Date(dob), 'dd MMM yyy')}</span>
            ),
            width: 100
        },
        {
            title: "age",
            dataIndex: "dob",
            render: (dob) => (
                <span>{new Date().getFullYear() - new Date(dob).getFullYear()}</span>
            )
        },
        {
            title: "State",
            dataIndex: "state",
            render: (state) => (
                <span>{state}</span>
            )
        },
        {
            title: "City",
            dataIndex: "city",
            render: (city) => (
                <span>{city}</span>
            )
        },
        {
            title: statuss === "All" ? "Status" : "Action",
            dataIndex: "status",
            render: (_,{status, _id, voterId, isAdmin,email}) => (
                <>
                {isAdmin ? <Tag>Admin</Tag> :
                <>
                {statuss === "Not Verified" && <Button type="primary" style={{backgroundColor: "green", color: "white"}} onClick={() => onChangeStatus(_id, "Verified", voterId,email)}>Verify</Button>}
                {statuss === "Verified" && <Button type="default" style={{backgroundColor: "red", color: "white"}} onClick={() => onChangeStatus(_id, "Not Verified", voterId,email)}>Un-Verify</Button>}
                {statuss === "All" &&  <Tag color={status === "Not Verified" ? "red" : "green"}>{status}</Tag>}
                </>
        }
                </>
            )
        },
    ]

    return (
        <>
            {/* <Row gutter={[8, 8]} justify="space-between" className="mb-4">
                <Col span={20}>
                    <Row gutter={8}>
                        <Col>
                            <Typography.Title level={2}>All Voters</Typography.Title>
                        </Col>
                    </Row>
                </Col>
            </Row> */}

            <section className={Heading.sec}>
                <div className={Heading.section_title}>
                    <h2>Verify Voter</h2>
                    <p>Authenticate Voters </p>
                </div>
                <div>
                <Radio.Group style={{margin:"0 0 30px 0"}} value={statuss} onChange={e => setStatus(e.target.value)} buttonStyle="solid" size="small">
                    <Radio.Button value="All">&emsp;All&nbsp;</Radio.Button>
                    <Radio.Button value="Verified">&nbsp;Verified&nbsp;</Radio.Button>
                    <Radio.Button value="Not Verified">&emsp;Not Verified&nbsp;</Radio.Button>
                </Radio.Group>
                </div>
                <Card
                    bodyStyle={{padding: 0}}
                    className="mt-3">
                <Table
                        rowKey='_id'
                        columns={tableColumns}
                        dataSource={voters}
                        onChange={onTableChange}
                        loading={refreshing}
                        sticky
                        scroll={{ y: "50vh"}}
                    />
                </Card>
            </section>
        </>
    )
}

export default VerifyVoter;