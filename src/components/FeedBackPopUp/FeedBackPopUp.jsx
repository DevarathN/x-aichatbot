import { Rating } from "@mui/material";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import "./feedbackpopup.css";
const FeedBackPopUp = ({ onSubmit, onClose, open }) => {
  const [rating, setRating] = useState("N.A");
  const [feedback, setFeedBack] = useState("");
  const handleSubmit = () => {
    onSubmit({ rating, feedback });
    onClose();
  };
  return (
    <form
      className="popup-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>Rate this conversation</h5>
        <RiCloseFill className="closeIcon" onClick={onClose} />
      </div>

      <div className="rating">
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
      <div className="feedback-container">
        <p>Provide Additional Feedback</p>
        <textarea
          name=""
          id=""
          rows={5}
          cols={40}
          value={feedback}
          onChange={(e) => {
            setFeedBack(e.target.value);
          }}
          placeholder="Provide your feedback here..."
        ></textarea>
      </div>
      <button className="btn submitFeedback" type="submit">
        Submit
      </button>
    </form>
  );
};
export default FeedBackPopUp;
