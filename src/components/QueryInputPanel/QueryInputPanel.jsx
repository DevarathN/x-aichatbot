import "./querypanel.css";
import { useState } from "react";

const QueryInputPanel = ({
  activeConversation,
  setActiveConversation,
  onAsk,
  onSave,
  disabled,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const handleAskBtn = () => {
    onAsk(messageInput);
    setMessageInput("");
  };
  return (
    <form
      className="querypanel-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleAskBtn();
      }}
    >
      <input
        type="text"
        placeholder="Message Bot AI…"
        value={messageInput}
        onChange={(e) => {
          setMessageInput(e.target.value);
        }}
      />
      <button type="submit" className="ask-btn">
        Ask{" "}
      </button>
      <button
        type="button"
        className="save-btn"
        onClick={() => {
          onSave();
        }}
      >
        Save
      </button>
    </form>
  );
};
export default QueryInputPanel;
