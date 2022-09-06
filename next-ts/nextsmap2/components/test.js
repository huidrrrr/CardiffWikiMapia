import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";

const App = () => {
  const [imgBase64, setImgBase64] = useState();
  const [fileList, setFileList] = useState([]);

  const onChange = (fileList) => {
    fileToBase64(fileList.file.originFileObj, (value) => {
      setImgBase64(value);
    });
    // console.log(fileList);
    console.log("---------------------------------------------");
    // console.log("data"+fileList[0].thumbUrl);
    // setImgBase64(fileList[0].thumbUrl);
    // setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  /**
   * 获取文件的Base64
   * @param file      {File}      文件
   * @param callback  {Function}  回调函数，参数为获取到的base64
   */
  function fileToBase64(file, callback) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      callback(this.result);
    };
  }

  return (
    <>
      <ImgCrop rotate>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <img style={{maxWidth:'400px'}} src={imgBase64}></img>
    </>
  );
};

export default App;