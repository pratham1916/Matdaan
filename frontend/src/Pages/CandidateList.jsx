import React, {useState, useEffect} from "react";
import {Row, Col, Radio, Typography, Card, Table, Tag, Modal, message} from "antd";
import axios from "axios";
import { ExclamationCircleFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from "antd/es/radio";
import {format} from 'date-fns'
import Heading from '../css/Heading.module.css'
const { confirm } = Modal;

const CandidateList = () => {
    const [statuss, setStatus] = useState("All");
    const [refreshing, setRefreshing] = useState(true)
    const [voters, setVoters] = useState([]);

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
            let url = `http://localhost:8080/candidate?page=${pagination.current}&limit=${pagination.pageSize}`
            const res = await axios.get(url, {
                headers: { filters: JSON.stringify({status: statuss})}
            })
            setVoters(res.data.candidate)
        } catch {

        }
        setRefreshing(false)
    }

    useEffect(() => {
        onLoad()
    },[statuss])

    useEffect(() => {
        onLoad()
    },[])

    const onChangeStatus = (id, status) => {
        try {
            confirm({
                title: `Do you Want to ${status === "Current" ? "Current" : "Previous"} this Candidate?`,
                icon: <ExclamationCircleFilled />,
                onOk: async () => {
                  const res = await axios.put(`http://localhost:8080/candidate/${id}`, {status: status});
                  if (res.data.status === "error") {
                    message.error(res.data.message)
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

    const tableColumns = [
        {
            title: "Image",
            dataIndex: "profilePic",
            render: (profilePic) => (
                < div style={{width:"50px",height:"50px"}}><img style={{width:"100%",borderRadius:"30px"}} src={`http://localhost:8080/uploads/${profilePic}`}/></div>
            )
        },
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
            title: "D.O.B.",
            dataIndex: "dob",
            render: (dob) => (
                <span>{format(new Date(dob), 'dd MMM yyy')}</span>
            ),
            width: 100
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
            title: "Voter Id",
            dataIndex: "voterId",
            render: (voterId) => (
                <span>{voterId}</span>
            ),
            width: 100
        },
        {
            title: "Aadhar",
            dataIndex: "aadhar",
            render: (aadhar) => (
                <span>{aadhar}</span>
            ),
            width: 100
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: (phone) => (
                <span>{phone}</span>
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
            title: "Party",
            dataIndex: "party",
            render: (party) => (
                <span>{party}</span>
            )
        },
        {
            title: "Position",
            dataIndex: "position",
            render: (position) => (
                <span>{position}</span>
            )
        },
        {
            title: statuss === "All" ? "Status" : "Action",
            dataIndex: "status",
            render: (_,{status, _id}) => (
                <>
                {statuss === "Current" && <Button type="primary" style={{backgroundColor: "green", color: "white"}} onClick={() => onChangeStatus(_id, "Previous")}>Previous</Button>}
                {statuss === "Previous" && <Button type="default" style={{backgroundColor: "red", color: "white"}} onClick={() => onChangeStatus(_id, "Current")}>Current</Button>}
                {statuss === "All" &&  <Tag color={status === "Previous" ? "red" : "green"}>{status}</Tag>}
                </>
            )
        },
    ]

    const onTableChange = (pagination, filters) => {
        onLoad({pagination, filters})
    }

    return (
        <>
        <section className={Heading.sec}>
            <div className={Heading.section_title}>
                <h2>Candidate List</h2>
                <p>Nominee's Data</p>
            </div>
            <div>
                    <Radio.Group style={{margin:"0 0 30px 0"}} value={statuss} onChange={e => setStatus(e.target.value)} buttonStyle="solid" size="small">
                        <Radio.Button value="All">&emsp;All&nbsp;</Radio.Button>
                        <Radio.Button value="Current">&nbsp;Current&nbsp;</Radio.Button>
                        <Radio.Button value="Previous">&nbsp;Previous&nbsp;</Radio.Button>
                    </Radio.Group>
                </div>
            <Card
                bodyStyle={{padding: 0}}
                className="mt-3"
            >
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

export default CandidateList;