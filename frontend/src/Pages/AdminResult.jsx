import React, {useState, useEffect} from "react";
import Heading from '../css/Heading.module.css'
import { Button, Form, Input, Radio, Select, DatePicker, Alert, message, Upload } from 'antd'
import axios from "axios";


const AdminResult = () => {
    const [refreshing, setRefreshing] = useState(true)
    const [isVoteStart, setIsVoteStart] = useState(false);

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

            
        </section>
        </>
    )
}

export default AdminResult;