import React, {useState, useEffect} from "react";
import Heading from '../css/Heading.module.css'
import { Button, Form, Input, Radio, Select, DatePicker, Alert, message, Upload, Card, Table } from 'antd'
import axios from "axios";
import {format} from 'date-fns'


const AdminResult = () => {
    const [refreshing, setRefreshing] = useState(true)
    const [isVoteStart, setIsVoteStart] = useState(false);
    const [votes, setVotes] = useState([]);

    const onLoad = async () => {
        setRefreshing(true)
        try{
            const user = await JSON.parse(localStorage.getItem("matdaan"));
            const userRes = await axios.get(`http://localhost:8080/user/${user?._id}`)
            const newUser = userRes.data.user;
            setIsVoteStart(newUser.isVoteStart)
            const voteRes = await axios.get('http://localhost:8080/vote')
            if (voteRes.data.status === 'error') {
                message.error(voteRes.data.message)
                return setRefreshing(false)
            };
            setVotes(voteRes.data.vote)
        } catch {
            message.error("Invalid Error");
        }
        setRefreshing(false)
    }

    const onHandelElection = async (value) => {
        setRefreshing(true)
        try {
            const electionRes = await axios.post('http://localhost:8080/vote', {isVoteStart: value});
            if (electionRes.data.status === 'error') {
                message.error(electionRes.data.message)
                return setRefreshing(false)
            };
            message.success(electionRes.data.message)
            onLoad();
        } catch (error) {
            message.error("Invalid Error");
        }
        setRefreshing(false)
    }

    useEffect(() => {
        onLoad();
    },[])
   
    const onTableChange = (pagination, filters) => {
        onLoad({pagination, filters})
    }

    const tableColumns = [
        {
            title: "Start Time",
            dataIndex: "startTime",
            render: (startTime) => (
                <span>{startTime && format(new Date(startTime), 'dd MMM yyyy')}</span>
            )
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            render: (endTime) => (
                <span>{endTime && format(new Date(endTime), 'dd MMM yyyy')}</span>
            )
        },
        {
            title: "Winner",
            dataIndex: "winner",
            render: (winner) => (
                <span>{winner?.name}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <span>{status}</span>
            )
        },
        
    ]

    return (
        <>
        <section className={Heading.sec}>
            <div className={Heading.section_title}>
                <h2>Admin</h2>
                <p>Result</p>
            </div>
            {
                isVoteStart ? (
                    <Button loading={refreshing} onClick={() => onHandelElection(false)}>End Election</Button>
                    ) : (
                        <Button loading={refreshing} onClick={() => onHandelElection(true)}>Start Election</Button>
                )
            }
            <Card
                bodyStyle={{padding: 0}}
                className="mt-3"
            >
            <Table
                    rowKey='_id'
                    columns={tableColumns}
                    dataSource={votes}
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

export default AdminResult;