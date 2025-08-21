import QueryInputPanel from "../QueryInputPanel/QueryInputPanel";
import Sidebar from "../Sidebar/Sidebar";
import DisplayScreen from "../DisplayScreen/DisplayScreen";
import FeedBackPopUp from "../FeedBackPopUp/FeedBackPopUp";
import sampledata from "../../sampleData.json";
import avatar from "../../assets/images/avatar.png";
import aibotavatar from "../../assets/images/AIbotlogo.png";
import "./landingpage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const LandingPage = () => {
  const [activeConversation, setActiveConversation] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(
    JSON.parse(localStorage.getItem("currentConversation")) || {
      messages: [],
      rating: null,
      feedback: "",
    }
  );
  const [pastconversations, setPastConversations] = useState(
    JSON.parse(localStorage.getItem("pastConversations")) || []
  );
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopUp] = useState(false);
  const navigate = useNavigate();
  const handleAsk = (text) => {
    const sampleData = sampledata;
    const requiredData = sampleData.find(
      (data, index) => data.question === text
    );

    const userMessageDetails = {
      avatar: avatar,
      username: "You",
      message: text,
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    const AImessageDetails = {
      avatar: aibotavatar,
      username: "Soul AI",

      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",

        minute: "2-digit",
        hour12: true,
      }),
    };

    if (requiredData) {
      AImessageDetails.message = requiredData.response;
    } else {
      AImessageDetails.message = "Sorry, Did not understand your query!";
    }
    setActiveConversation((prev) => [...prev, userMessageDetails]);
    setLoading(true);

    setActiveConversation((prev) => [...prev, AImessageDetails]);
    setLoading(false);
  };
  const handleSave = () => {
    const savedConvo = {
      messages: [...activeConversation],
    };
    localStorage.setItem("currentConversation", JSON.stringify(savedConvo));
    setCurrentConversation(savedConvo);
    const savedConversations =
      JSON.parse(localStorage.getItem("pastConversations")) || [];
    savedConversations.push(savedConvo);
    localStorage.setItem(
      "pastConversations",
      JSON.stringify(savedConversations)
    );
    setPastConversations(savedConversations);
  };
  const handleNewChat = () => {
    navigate("/");
    setActiveConversation([]);
    localStorage.setItem("currentConversation", JSON.stringify([]));
    setCurrentConversation([]);
  };
  const handlePopUp = () => {
    if (activeConversation.length === 0) {
      return;
    }
    setOpenPopUp(true);
  };
  return (
    <>
      <div className={`AppContainer ${openPopup ? "blurred" : ""}`}>
        <Sidebar onNewChat={handleNewChat} />
        <div className="screen-query">
          <DisplayScreen
            conversation={
              activeConversation.length > 0
                ? { messages: activeConversation }
                : currentConversation
            }
            loading={loading}
          />
          <QueryInputPanel
            onAsk={handleAsk}
            onSave={handleSave}
            disabled={false}
          />
        </div>
      </div>
      {/* {openPopup && (
        <FeedBackPopUp
          onClose={() => {
            setOpenPopUp(false);
          }}
          onSubmit={handleSave}
        />
      )} */}
    </>
  );
};
export default LandingPage;
