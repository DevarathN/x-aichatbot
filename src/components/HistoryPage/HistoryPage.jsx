import { useEffect, useState } from "react";
import DisplayScreen from "../DisplayScreen/DisplayScreen";
import QueryInputPanel from "../QueryInputPanel/QueryInputPanel";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router";
const HistoryPage = () => {
  const [pastConversations, setPastConversations] = useState(
    JSON.parse(localStorage.getItem("pastConversations")) || []
  );
  const [activeConversation, setActiveConversation] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(
    JSON.parse(localStorage.getItem("currentConversation")) || {
      messages: [],
      rating: null,
      feedback: "",
    }
  );

  const navigate = useNavigate();
  const handleNewChat = () => {
    navigate("/");
    setActiveConversation([]);
    localStorage.setItem("currentConversation", JSON.stringify([]));
    setCurrentConversation({});
  };
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pastConversations")) || [];
    setPastConversations(saved);
  }, [activeConversation, currentConversation]);
  return (
    <div className={`AppContainer`}>
      <Sidebar onNewChat={handleNewChat} />
      <div className="screen-query">
        {pastConversations.length > 0 ? (
          <DisplayScreen conversation={pastConversations} loading={false} />
        ) : (
          <div style={{ height: "90vh" }}>
            <p>No past Conversations saved.</p>
          </div>
        )}

        <QueryInputPanel disabled={true} />
      </div>
    </div>
  );
};
export default HistoryPage;
