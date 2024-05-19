import { useState, useEffect } from "react";
import { Radio, Card, Table, Tag, Modal, Button } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { deleteVoters, getVoters, updateVoterStatus } from "../redux/action";

const { confirm } = Modal;

const VerifyVoter = () => {
  const [status, setStatus] = useState("All");
  const dispatch = useDispatch();
  const { voters, isLoading } = useSelector((state: any) => state.voters);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true
  });

  const onLoad = async (page = 1) => {
    const filter: any = {};
    if (status !== "All") {
      filter.status = status;
    }
    dispatch(getVoters(filter, page));
  };

  useEffect(() => {
    onLoad();
  }, [status, pagination.current, pagination.pageSize]);

  const onChangeStatus = async (id: string, newStatus: string, voterId: string, email: string) => {
    confirm({
      title: `Do you Want to ${newStatus === "Verified" ? "Verify" : "Un-Verify"} this Voter?`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(updateVoterStatus(id, newStatus, voterId, email));
        onLoad();
      }
    });
  };

  const onDeleteVoter = (id: string) => {
    confirm({
      title: `Do you want to delete this Voter ?`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteVoters(id));
        onLoad();
      }
    });
  };

  const onTableChange = (pagination: any) => {
    setPagination(pagination);
    onLoad(pagination.current);
  };

  const tableColumns = [
    {
      title: "FullName",
      dataIndex: "fullname",
      render: (fullname: string) => (
        <span>{fullname}</span>
      ),
      width: 200
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => (
        <span>{email}</span>
      ),
      width: 200
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (phone: string) => (
        <span>{phone}</span>
      ),
      width: 150
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender: string) => (
        <span>{gender}</span>
      ),
      width: 100
    },
    {
      title: "D.O.B.",
      dataIndex: "dob",
      render: (dob: string) => (
        <span>{format(new Date(dob), 'dd MMM yyyy')}</span>
      ),
      width: 150
    },
    {
      title: "Age",
      dataIndex: "dob",
      render: (dob: string) => (
        <span>{new Date().getFullYear() - new Date(dob).getFullYear()}</span>
      ),
      width: 100
    },
    {
      title: "State",
      dataIndex: "state",
      render: (state: string) => (
        <span>{state}</span>
      ),
      width: 150
    },
    {
      title: "City",
      dataIndex: "city",
      render: (city: string) => (
        <span>{city}</span>
      ),
      width: 150
    },
    {
      title: status === "All" ? "Status" : "Action",
      dataIndex: "status",
      render: (_: any, record: any) => (
        < div className="action-buttons">
          {status === "Not Verified" &&
            <>
              <Button type="default" className="status-button" onClick={() => onChangeStatus(record._id, "Verified", record.voterId, record.email)}>Verify</Button>
              <Button type="default" className="delete-button" onClick={() => onDeleteVoter(record._id)}>Delete</Button>
            </>
          }
          {status === "Verified" && <Button type="default" className="status-button" onClick={() => onDeleteVoter(record._id)}>Delete</Button>}
          {status === "All" && <Tag color={record.status === "Not Verified" ? "red" : "green"}>{record.status}</Tag>}
        </div>
      ),
      width: 200
    }
  ];

  const filteredVoters = voters.filter((voter: any) => voter.role !== "admin");

  return (
    <>
      <div className="voters-banner"></div>
      <section className="list-section">
        <div className="status-radio-container">
          <Radio.Group className="status-radio-group" value={status} onChange={e => setStatus(e.target.value)} buttonStyle="solid" size="small">
            <Radio.Button value="All">All</Radio.Button>
            <Radio.Button value="Verified">Verified</Radio.Button>
            <Radio.Button value="Not Verified">Not Verified</Radio.Button>
          </Radio.Group>
        </div>
        <Card className="card">
          <Table
            rowKey='_id'
            columns={tableColumns}
            dataSource={filteredVoters}
            onChange={onTableChange}
            loading={isLoading}
            scroll={{ y: "50vh" }}
          />
        </Card>
      </section>
    </>
  );
};

export default VerifyVoter;
