import { useEffect, useState } from "react";
import { Card, Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { candidatesData, castVote, isVotingStart } from "../redux/action";

const UserVote = () => {
  const dispatch = useDispatch();
  const { isVoteStart, candidates, isLoading } = useSelector((state: any) => state.castVote);
  // console.log(candidates);
  

  useEffect(() => {
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : {};
    dispatch(isVotingStart(user._id));
  }, [dispatch])


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });


  const onAddVote = async (id: string) => {
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : {};
    dispatch(castVote(user.voterId, id));
  };

  const onLoadVoters = async () => {
    dispatch(candidatesData())
  }

  useEffect(() => {
    onLoadVoters()
  }, [isVoteStart])

  const tableColumns = [
    {
      title: "FullName",
      dataIndex: "fullname",
      render: (fullname: string) => <span>{fullname}</span>,
      width: 300
    },
    {
      title: "Party",
      dataIndex: "party",
      render: (party: string) => <span>{party}</span>,
      width: 200
    },
    {
      title: "Position",
      dataIndex: "position",
      render: (position: string) => <span>{position}</span>,
      width: 200
    },
    {
      title: "Vote",
      dataIndex: "id",
      render: (id: string) => (
        <Button disabled={isLoading} onClick={() => onAddVote(id)}>{"vote"}</Button>
      ),
      width: 200
    },
  ];

  return (
    <section style={{ marginTop: "100px" }}>
      {isVoteStart ? (
        <Card bodyStyle={{ padding: 0 }} className="mt-3">
          <Table
            rowKey='_id'
            columns={tableColumns}
            dataSource={candidates}
            loading={isLoading}
            sticky
            scroll={{ y: "50vh" }}
          />
        </Card>
      ) : (
        <h1 style={{ textAlign: "center", margin: "50px", color: "#ef6603", fontWeight: "700" }}>Election is Yet to Start!</h1>
      )}
    </section>
  );
};

export default UserVote;
