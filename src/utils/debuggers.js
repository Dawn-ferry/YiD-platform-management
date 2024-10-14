// if (process.env.NODE_ENV === "production") {
;(function () {
  // 这个函数会不断地设置一个定时器
  // 定时器的回调函数中包含一个 debugger 语句
  // 当开发者工具打开时，这个 debugger 语句会触发一个断点
  // 由于定时器会不断地被设置，因此断点会不断地被触发
  function block() {
    setInterval(function () {
      debugger
    }, 50)
  }

  // 尝试执行 block 函数
  // 如果成功执行，将会导致无限 debugger
  try {
    block()
  } catch (err) {
    console.log("禁止调用网页失败")
    // 如果执行失败（例如，因为代码被格式化或转换），则不做任何事情
  }
})()
// }
