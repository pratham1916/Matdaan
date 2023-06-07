import React, {useState, useEffect} from "react";
import {Row, Col, Typography, Card, Table, message} from "antd";
import axios from "axios";
import { Button } from "antd/es/radio";
import Heading from '../css/Heading.module.css'

const Vote = () => {
    const [refreshing, setRefreshing] = useState(true)
    const [voters, setVoters] = useState({});
    const [isVoteStart, setIsVoteStart] = useState();
    const [voteId, setVoteId] = useState('');
    const [isVote, setIsVote] = useState();

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
            const isVote =  JSON.parse(localStorage.getItem("isVote"));
            setIsVote(isVote)
             const user = await JSON.parse(localStorage.getItem("matdaan"));
            const userRes = await axios.get(`http://localhost:8080/user/${user?._id}`)
            const newUser = userRes.data.user;
            if (!newUser.isVoteStart) {
                localStorage.removeItem("isVote")
            }
            setIsVoteStart(newUser.isVoteStart)
        } catch {
            message.error("Invalid Error");
        }
        setRefreshing(false)
    }

    const onLoadVoters = async () => {
        setRefreshing(true)
        try{
            const vote = await axios.get(`http://localhost:8080/vote/start`)
            if (vote.data.status === 'error') {
                message.error(vote.data.message)
                return setRefreshing(false)
            }
            const dataArray = [];
            const originalData = vote.data.vote[0]
            const { _id, candidates } = originalData;
                for (const key in candidates) {
                    dataArray.push({ ...candidates[key], id: key });
                }
            
            const newData = { _id, candidates: dataArray };
            setVoteId(newData._id)
            setVoters(newData.candidates)
        } catch {
            //message.error("Invalid Error");
        }
        setRefreshing(false)
    }

    useEffect(() => {
        onLoad()
    },[])

    useEffect(() => {
        onLoadVoters()
    },[isVoteStart])

    const onAddVote = async (id) => {
        localStorage.setItem("isVote", JSON.stringify(true))
        const res= await axios.put(`http://localhost:8080/vote/${voteId}`, {candidateId: id});
        if (res.data.status === 'success') {
            message.success(res.data.message)
        }
        onLoad()
        onLoadVoters()
    }


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
            title: "Position",
            dataIndex: "position",
            render: (position) => (
                <span>{position}</span>
            ),
            width: 200
        },
        {
            title: "Vote",
            dataIndex: "id",
            render: (id) => (
                <Button disabled={isVote} onClick={() => onAddVote(id)}>{"vote"}</Button>
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
                <p>Cast Your Vote</p>
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
        <h1 style={{textAlign:"center", margin:"50px",color:"#ef6603",fontWeight:"700"}}>Election is Yet to Start !</h1>
        }
        </div>
    )
}

export default Vote