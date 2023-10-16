import React from "react";
import ReactQuill from "react-quill";

const EditorQuill = ({ payload, setPayload }) => {
  var toolbarOptions = [
    ["bold", "italic", "underline", "link", "image"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ header: [1, 2, 3, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],


  ];
  const module = {
    toolbar: toolbarOptions,
  };

  // Sử dụng giá trị trường "description" từ payload để hiển thị
  const value = payload;

  // Hàm xử lý khi nội dung thay đổi
  const handleChange = (content) => {
    // Cập nhật trường "description" trong biến payload
    setPayload({ ...payload, description: content });
  };

  return (
    <ReactQuill
      modules={module}
      theme="snow"
      value={value}
      onChange={handleChange}
      className="h-[500px] w-full bg-white"
    />
  );
};

export default EditorQuill;
