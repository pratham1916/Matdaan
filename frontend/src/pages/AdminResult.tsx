import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Table } from 'antd';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { isVotingStart, loadAdminResult, startEndVoting } from '../redux/action';

const AdminResult = () => {
  const dispatch = useDispatch();
  const { isLoading, isVoteStart , adminResult} = useSelector((state: any) => state.castVote);
  
  const onHandelElection = (value: boolean) => {
    dispatch(startEndVoting(value));
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : {};
    dispatch(isVotingStart(user._id));
  };

  useEffect(() => {
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : {};
    dispatch(isVotingStart(user._id));
    loadResult(); 
  }, [dispatch, isVoteStart]);

  const loadResult = () => {
    dispatch(loadAdminResult())
  };

  const tableColumns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      render: (startTime: string) => <span>{startTime && format(new Date(startTime), 'dd MMM yyyy')}</span>,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      render: (endTime: string) => <span>{endTime && format(new Date(endTime), 'dd MMM yyyy')}</span>,
    },
    {
      title: 'Winner',
      dataIndex: 'winner',
      render: (winner: any) => <span>{winner?.fullname}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => <span>{status}</span>,
    },
  ];

  return (
    <section style={{ marginTop: '100px' }}>
      <Button loading={isLoading} onClick={() => onHandelElection(!isVoteStart)}>
        {isVoteStart ? 'End Election' : 'Start Election'}
      </Button>
      <Card bodyStyle={{ padding: 0 }} className='mt-3'>
        <Table rowKey='_id' columns={tableColumns} dataSource={adminResult} loading={isLoading} sticky scroll={{ y: '50vh' }} />
      </Card>
    </section>
  );
};

export default AdminResult;