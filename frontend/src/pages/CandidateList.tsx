import { useState, useEffect } from "react";
import { Radio, Card, Table, Tag, Modal, Button } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';
import { UPLOAD_URL, deleteCandidate, getCandidates, updateCandidateStatus } from "../redux/action";
import "../styles/Table.css";

const { confirm } = Modal;

const CandidateList = () => {
  const [status, setStatus] = useState("All");
  const dispatch = useDispatch();
  const { candidates, isLoading } = useSelector((state: any) => state.candidate);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true
  });

  const onLoad = (page = 1) => {
    const filter: any = {};
    if (status !== "All") {
      filter.status = status;
    }
    dispatch(getCandidates(filter, page));
  };

  useEffect(() => {
    onLoad();
  }, [status, pagination.current, pagination.pageSize]);

  const onChangeStatus = (id: string, status: string) => {
    confirm({
      title: `Do you want to set this candidate as ${status === "Current" ? "Current" : "Previous"}?`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(updateCandidateStatus(id, status));
        onLoad();
      }
    });
  };

  const onDeleteCandidate = (id: string) => {
    confirm({
      title: `Do you want to delete this candidate?`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteCandidate(id));
        onLoad();
      }
    });
  };

  const tableColumns = [
    {
      title: "Image",
      dataIndex: "profilePic",
      render: (profilePic: string) => (
        <div className="candidate-image-container">
          <img className="candidate-image" src={`${UPLOAD_URL}/${profilePic}`} alt="profile" />
        </div>
      ),
      width: 100
    },
    {
      title: "Name",
      dataIndex: "fullname",
      render: (fullname: string) => <span>{fullname}</span>,
      width: 200
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => <span>{email}</span>,
      width: 200
    },
    {
      title: "D.O.B.",
      dataIndex: "dob",
      render: (dob: string) => <span>{format(new Date(dob), 'dd MMM yyyy')}</span>,
      width: 130
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender: string) => <span>{gender}</span>,
      width: 100
    },
    {
      title: "Voter Id",
      dataIndex: "voterId",
      render: (voterId: string) => <span>{voterId}</span>,
      width: 200
    },
    {
      title: "Aadhar",
      dataIndex: "adharId",
      render: (adharId: string) => <span>{adharId}</span>,
      width: 150
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (phone: string) => <span>{phone}</span>,
      width: 150
    },
    {
      title: "State",
      dataIndex: "state",
      render: (state: string) => <span>{state}</span>,
      width: 150
    },
    {
      title: "City",
      dataIndex: "city",
      render: (city: string) => <span>{city}</span>,
      width: 150
    },
    {
      title: "Party",
      dataIndex: "party",
      render: (party: string) => <span>{party}</span>,
      width: 100
    },
    {
      title: "Position",
      dataIndex: "position",
      render: (position: string) => <span>{position}</span>,
      width: 100
    },
    {
      title: status === "All" ? "Status" : "Action",
      dataIndex: "status",
      render: (_: any, record: any) => (
        <div className="action-buttons">
          {status === "Current" && <Button type="default" className="status-button" onClick={() => onChangeStatus(record._id, "Previous")}>Previous</Button>}
          {status === "Previous" && <Button type="default" className="status-button" onClick={() => onChangeStatus(record._id, "Current")}>Current</Button>}
          {status === "All" && <Tag color={record.status === "Previous" ? "red" : "green"}>{record.status}</Tag>}
          <Button className="delete-button" onClick={() => onDeleteCandidate(record._id)}>Delete</Button>
          
        </div>
      ),
      width: 200
      
    },
  ];

  const onTableChange = (pagination: any) => {
    setPagination(pagination);
    onLoad(pagination.current);
  };

  return (
    <section className="list-section">
      <div className="status-radio-container">
        <Radio.Group className="status-radio-group" value={status} onChange={e => setStatus(e.target.value)} buttonStyle="solid" size="small">
          <Radio.Button value="All">All</Radio.Button>
          <Radio.Button value="Current">Current</Radio.Button>
          <Radio.Button value="Previous">Previous</Radio.Button>
        </Radio.Group>
      </div>
      <Card className="card">
        <Table
          rowKey='_id'
          columns={tableColumns}
          dataSource={candidates}
          onChange={onTableChange}
          loading={isLoading}
          scroll={{ y: "50vh" }}
        />
      </Card>
    </section>
  );
};

export default CandidateList;
