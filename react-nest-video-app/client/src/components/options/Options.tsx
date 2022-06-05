import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Teams from "../../assets/teams.mp3";
import * as classes from "./options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

const Options = () => {
  const history = useHistory();
  const [idToCall, setIdToCall] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio:any = useRef();
    const vidState = useContext(VideoContext)!;

  const callHandler = () => {
      
    if (!vidState.isCamAllowed || !vidState.isMicAllowed) {
      message.error("Please allow both camera and microphone permissions before procced to call !")
      return;
    }
    if (!vidState.name.length) {
      message.error("Please enter your name to call!");
    } else if (!idToCall.length) {
      message.error("Please enter id of the other user!");
    } else if (!vidState.otherUserName.length) {
      message.error("Please enter name of the other user!");
    } else {
       vidState.callUser(idToCall);
    }
  }
  
  useEffect(() => {
    if (vidState.callAccepted) {
      console.log("Here");
      history.push('/meet',{from:'home'});
    }
  },[vidState.callAccepted,history])

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal:boolean) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    vidState.leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (vidState.call) {
      if (vidState.call?.isReceivingCall && !vidState.callAccepted) {
      setIsModalVisible(true);
      vidState.setOtherUser(vidState.call.from);
    } else setIsModalVisible(false);
    }
  }, [vidState.call,vidState.callAccepted]);

  return (
    <div className={classes.options}>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Account Info</h2>
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          maxLength={15}
          suffix={<small>{vidState.name.length}/15</small>}
          value={vidState.name}
          onChange={(e) => {
            vidState.setName(e.target.value);
          }}
          className={classes.inputgroup}
        />

        <div className={classes.share_options}>
          <CopyToClipboard text={vidState.me}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className={classes.btn}
              tabIndex={0}
              onClick={() => message.success("Code copied successfully!")}
            >
              Copy code
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Make a call</h2>

        <Input
          placeholder="Enter code to call"
          size="large"
          className={classes.inputgroup}
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter code of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
         <Input
          placeholder="Enter name to call"
          size="large"
          className={classes.inputgroup}
          value={vidState.otherUserName}
          onChange={(e) => vidState.setOtherUserName(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter name of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            onClick={callHandler}
            className={classes.btn}
            tabIndex={0}
          >
            Call
          </Button>
        
      </div>

      {vidState.call && vidState.call.isReceivingCall && !vidState.callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {vidState.call.name} is calling you:{" "}
              </h1>
            </div>
            <div className={classes.btnDiv}>
              <Button
                className={classes.answer}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  if (!vidState.isCamAllowed || !vidState.isMicAllowed) {
                    message.error("Please allow both camera and microphone permissions before procced to call !")
                    return;
                  }
                  vidState.answerCall();
                  Audio.current.pause();
                }}
                tabIndex={0}
              >
                Answer
              </Button>
              <Button
                className={classes.decline}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex={0}
              >
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;