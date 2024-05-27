import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isVotingStart, loadAdminResult } from "../redux/action";

const UserResult = () => {
  const { isVoteStart, adminResult } = useSelector((state:any) => state.castVote);
  const dispatch = useDispatch();

  useEffect(() => {
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : {};
    dispatch(isVotingStart(user._id));
    loadResult();
  }, [dispatch]);

  const loadResult = () => {
    dispatch(loadAdminResult());
  };

  return (
    <section style={{ marginTop: "100px" }}>
      {isVoteStart ? (
        <h1>Please wait till the end of the election</h1>
      ) : (
        adminResult && adminResult.map((item:any) => (
          item.winner && (
            <div key={item._id}>
              <h1>{item.winner.fullname}</h1>
              <p>Party: {item.winner.party}</p>
              <p>Position: {item.winner.position}</p>
              <p>Votes: {item.winner.vote}</p>
            </div>
          )
        ))
      )}
    </section>
  );
};

export default UserResult;
