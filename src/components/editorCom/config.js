export const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"], // "video"
  ["clean"], // remove formatting button
] // 工具栏配置
export const editorOption = {
  theme: "snow",
  placeholder: "请输入内容",
  modules: {
    toolbar: {
      container: toolbarOptions, // 工具栏
      handlers: {
        // 重置点击图片按钮 方法
        image: function (value) {
          if (value) {
            document.querySelector(".quill-upload input").click()
          } else {
            this.quill.format("image", false)
          }
        },
      },
    },
  },
}
