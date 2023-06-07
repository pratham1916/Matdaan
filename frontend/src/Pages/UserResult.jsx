import React, {useState, useEffect} from "react";
import axios from "axios";
import { Typography, message} from "antd";
import Heading from '../css/Heading.module.css'

const UserResult = () => {
    const [refreshing, setRefreshing] = useState(true)
    const [voters, setVoters] = useState({});
    const [isVoteStart, setIsVoteStart] = useState();


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
             const user = await JSON.parse(localStorage.getItem("matdaan"));
            const userRes = await axios.get(`http://localhost:8080/user/${user?._id}`)
            const newUser = userRes.data.user;
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
            const originalData = vote.data.vote[0]
            setVoters(originalData.winner)
        } catch {
            //message.error("Invalid Error");
        }
        setRefreshing(false)
    }
    useEffect(() => {
        onLoad()
    },[])

    useEffect(() => {
        if (!isVoteStart) onLoadVoters()
    },[isVoteStart])

    return (
        <>
        <section className={Heading.sec}>
            <div className={Heading.section_title}>
                <h2>User</h2>
                <p>Result</p>
            </div>
        {isVoteStart && <h1>please wait till end the election</h1>}
        {!isVoteStart &&  (
            <div style={{}}>
                <h1 style={{fontSize:"25px",fontWeight:"700"}}>Party: {voters.party}<br></br>Position: {voters.position}<br></br>winner: {voters.name}<br></br>Vote Count: {voters.vote}<br></br></h1>
            </div>
        )}
        </section>
        </>
    )
}

export default UserResult;