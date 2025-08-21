import "./sidebar.css";
import { FaEdit } from "react-icons/fa";
import applogo from "../../assets/images/AIbotlogo.png";
import { useNavigate } from "react-router";
const Sidebar = ({ onNewChat }) => {
  let navigate = useNavigate();
  return (
    <div className="sidebarContainer">
      <div className="newchat-container">
        <div className="img-container">
          <img src={applogo} alt="applogo" srcset="" />
        </div>
        <button className="newchat-btn btn" onClick={onNewChat}>
          <span>New Chat</span>
          <FaEdit className="newchatIcon" />
        </button>
      </div>
      <div style={{ padding: "20px" }}>
        <button
          type="button"
          className="pastconv-btn btn"
          onClick={() => {
            navigate("/history");
          }}
        >
          Past Conversations
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
