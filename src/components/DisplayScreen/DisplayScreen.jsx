import "./displayscreen.css";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Rating,
} from "@mui/material";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import AIbotlogo from "../../assets/images/AIbotlogo.png";
const DisplayScreen = ({ conversation, loading }) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation, loading]);
  const messageclass = conversation.rating ? "saved-convo" : "active-convo";
  const filteredConversations = Array.isArray(conversation)
    ? conversation.filter((convo) =>
        Number(selectedRating)
          ? String(convo.rating) === String(selectedRating)
          : true
      )
    : conversation;
  return (
    <div
      ref={containerRef}
      className="displayscreenContainer flex flex-col  h-full overflow-y-auto  hide-scrollbar"
    >
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Bot AI</h1>
        <div>
          {Array.isArray(conversation) && conversation.length > 0 ? (
            selectedRating !== "" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <strong>Show</strong>
                <Rating
                  value={Number(selectedRating)}
                  style={{ display: "flex", padding: "0 10px" }}
                />
                {"  "}
                <strong>rated conversations</strong>
              </div>
            ) : (
              <strong>Past Conversations</strong>
            )
          ) : (
            ""
          )}
        </div>
        {Array.isArray(conversation) && conversation.length > 0 ? (
          <div
            className="filterRating"
            style={{ overflow: "visible", display: "flex", marginTop: "10px" }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">
                Filter By Ratings
              </InputLabel>
              <Select
                id="demo-simple-select-helper"
                labelId="demo-simple-select-helper-label"
                value={selectedRating}
                onChange={(e) => {
                  setSelectedRating(e.target.value);
                }}
                label="Filter By Ratings"
                style={{ minWidth: 180 }}
              >
                <MenuItem value="">Show All Ratings</MenuItem>

                {Array.from({ length: 5 }, (_, index) => (
                  <MenuItem value={String(index + 1)}>
                    <Rating value={index + 1} readOnly />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ) : (
          ""
        )}
      </div>
      {Array.isArray(conversation) ? (
        <div className="pastConversations-container">
          {filteredConversations.map((convo, index) => {
            const messageclass = convo.rating ? "saved-convo" : "active-convo";
            return (
              <div className={`${messageclass}-container`} key={index}>
                {convo.messages.map((item, index) => (
                  <div className={`message-container`}>
                    <div className="avatar-container">
                      <img src={item.avatar} alt="" srcset="" />
                    </div>
                    <div className="text-container">
                      <span>
                        <strong>{item.username}</strong>{" "}
                      </span>
                      <p>{item.message}</p>
                      <p style={{ color: "#0000009E", fontSize: "small" }}>
                        {item.time}
                      </p>
                      {item.username === "Soul AI" ? (
                        <div
                          style={{
                            fontSize: "20px",

                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <BiSolidLike
                            className={`likeIcon ${
                              likeClicked && activeIndex === index
                                ? "active"
                                : ""
                            }`}
                          />
                          <BiSolidDislike
                            className={`dislikeIcon ${
                              dislikeClicked && activeIndex === index
                                ? "active"
                                : ""
                            }`}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
                {convo.rating && (
                  <div className="rating-feedback">
                    <div
                      className="rating-container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {console.log(convo.rating)}
                      <div>
                        <strong>Rating</strong>:{" "}
                      </div>
                      <div style={{ display: "flex" }}>
                        {convo.rating > 0 ? (
                          <Rating readOnly value={convo.rating} />
                        ) : (
                          "N.A."
                        )}
                      </div>
                    </div>
                    <p>
                      <strong>Feedback</strong>: <span>{convo.feedback}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`${messageclass}-container`}>
          {conversation.messages?.map((item, index) => (
            <div className={`message-container`}>
              <div className="avatar-container">
                <img src={item.avatar} alt="" srcset="" />
              </div>
              <div className="text-container">
                <span>
                  <strong>{item.username}</strong>{" "}
                </span>
                <p>{item.message}</p>
                <p style={{ color: "#0000009E", fontSize: "small" }}>
                  {item.time}
                </p>
                {item.username === "Soul AI" ? (
                  <div
                    style={{
                      fontSize: "20px",

                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <BiSolidLike
                      className={`likeIcon ${
                        likeClicked && activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveIndex(index);
                        setLikeClicked(!likeClicked);
                        setDislikeClicked(false);
                      }}
                    />
                    <BiSolidDislike
                      className={`dislikeIcon ${
                        dislikeClicked && activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveIndex(index);
                        setDislikeClicked(!dislikeClicked);
                        setLikeClicked(false);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-container">
              <div className="avatar-container">
                <img src={AIbotlogo} alt="" srcset="" />
              </div>
              <div className="text-container">
                <p>
                  <strong>Soul AI</strong>{" "}
                </p>
                <p>Ai response loading</p>
              </div>
            </div>
          )}
          {conversation.rating && (
            <div className="rating-feedback">
              <div
                className="rating-container"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>
                  <strong>Rating</strong>:{" "}
                  {conversation.rating > -1 ? (
                    <Rating readOnly value={conversation.rating} />
                  ) : (
                    "N.A."
                  )}
                </span>
              </div>
              <p>
                <strong>Feedback</strong>: <span>{conversation.feedback}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default DisplayScreen;
