fetch("/api/todo")
  .then((res) => res.json())
  .then((data) => {
    console.log("student data", data);
  });
