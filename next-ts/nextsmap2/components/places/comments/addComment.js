import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  List,
  message,
  Tooltip,
} from "antd";
import moment from "moment";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import React, { useState, createElement } from "react";
import { addComment } from "../../helper/apiUtil";
const { TextArea } = Input;

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${
        comments.length > 1 ? "comments" : "comment"
      }`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);
const convertcomments = (comments, actions) => {
  const commentsList = [];
  for (const key in comments) {
    commentsList.push({
      author: comments[key].author ? comments[key].author : "Anonymous",
      avatar: comments[key].avatar
        ? comments[key].avatar
        : "/images/noAvatar.png",
      content: comments[key].content,
      datetime: comments[key].datetime,
      actions: actions,
    });
  }
  return commentsList;
};

const AddComment = (props) => {
  const currentTime = new Date().toLocaleString() + "";

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
  ];
  const { placeData } = props;

  const comments = convertcomments(placeData.comments, actions);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      const commentContent = {
        author: "peter",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: value,
        datetime: currentTime,
      };

      addComment(placeData.id, commentContent).then((res) => {
        if (res.status === 200) {
        } else {
          message.warn("Add comment failed");
        }
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default AddComment;
