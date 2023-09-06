import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MarkdownEditor = ({
  label,
  value,
  changeValue,
  name,
  invalidFilds,
  setInvalidFilds,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="">{label}</span>
      <Editor
        apiKey="u39mk9rnhyinzg5r258r0wchijj5hferho20ovxfea6qgkyt"
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) =>
          changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))
        }
        onFocus={() => {
          setInvalidFilds && setInvalidFilds([]);
        }}
      />
      {invalidFilds?.some((el) => el.name === name) && (
        <small className="text-main text-sm">
          {invalidFilds?.find((el) => el.name === name)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(MarkdownEditor);
