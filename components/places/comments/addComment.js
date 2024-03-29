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
import { ReactSession } from "react-client-session";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import React, { useState, createElement } from "react";
import {
  addComment,
  getAllPlaces,
  getOnePlaceAllComments,
  getPlaceById,
} from "../../helper/apiUtil";
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
      datetime: new Date(comments[key].datetime),
      actions: actions,
    });
  }
  const sortedComments = commentsList.sort((a, b) => b.datetime - a.datetime);
  sortedComments.forEach((comment) => { 
    comment.datetime=<Tooltip title={moment(comment.datetime).fromNow()}>
    <span>{comment.datetime.toUTCString()}</span>
  </Tooltip>
   })



  return sortedComments;
};

const AddComment = (props) => {
  const currentTime = moment().format();

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
  const { commentsData } = props;

  const commentsInit = convertcomments(commentsData.comments, actions);

  const [comments, setComments] = useState(commentsInit);
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
        authorId:ReactSession.get("id"),
        author: ReactSession.get("username"),
        avatar: commentsData.upperAvatar,
        content: value,
        datetime: currentTime,
      };

      addComment(commentsData.placeId, commentContent).then((res) => {
        if (res.status === 200) {
          // get new all new data here------------------------------
          getOnePlaceAllComments(commentsData.placeId).then((res) => {
            const newComments = convertcomments(res.data, actions);
            setComments(newComments);
            // setComments(res.data);
          });
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
          <Avatar src={commentsData.upperAvatar} alt="Han Solo" />
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
