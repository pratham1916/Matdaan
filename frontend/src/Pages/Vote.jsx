import React, {useState, useEffect} from "react";
import {Row, Col, Typography, Card, Table, message} from "antd";
import axios from "axios";
import { Button } from "antd/es/radio";
import Heading from '../css/Heading.module.css'

const Vote = () => {
    const [refreshing, setRefreshing] = useState(true)
    const [voters, setVoters] = useState([]);
    const [isVoteStart, setIsVoteStart] = useState(false);

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
                headers: { filters: JSON.stringify({status: "Current"})}
            })
             const user = await JSON.parse(localStorage.getItem("matdaan"));
            const userRes = await axios.get(`http://localhost:8080/user/${user?._id}`)
            const newUser = userRes.data.user;
            setIsVoteStart(newUser.isVoteStart)
            setVoters(res.data.candidate)
        } catch {
            message.error("Invalid Error");
        }
        setRefreshing(false)
    }

    useEffect(() => {
        onLoad()
    },[])


    const tableColumns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (name) => (
                <span>{name}</span>
            ),
            width: 500
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
            title: "Party",
            dataIndex: "party",
            render: (party) => (
                <span>{party}</span>
            ),
            width: 200
        },
        {
            title: "Vote",
            dataIndex: "party",
            render: (party) => (
                <Button>{"vote"}</Button>
            ),
            width: 200
        },
    ]

    return (
        <div>
            { isVoteStart ? 
        <section className={Heading.sec}>
            <div className={Heading.section_title}>
                <h2>Vote</h2>
                <p>Cast Your VoteVote</p>
            </div>
        
        <Card
            bodyStyle={{padding: 0}}
            className="mt-3"
        >
           <Table
                rowKey='_id'
                columns={tableColumns}
                dataSource={voters}
                loading={refreshing}
                sticky
                scroll={{ y: "50vh"}}
            />
        </Card>
        </section> :
        <h1>Vote not start yet...</h1>
        }
        </div>
    )
}

export default Vote;