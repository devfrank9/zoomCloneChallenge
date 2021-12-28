// Put all your frontend code here.
const form = document.querySelector("form");
const messageList = document.querySelector("ul");
const socket = new WebSocket(`wss://${window.location.host}`);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

function handleOpen() {
  console.log("Connected to Sever ✅");
}

socket.addEventListener("open", handleOpen);
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.appendChild(li);
});
socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `You: ${input.value}`;
  messageList.appendChild(li);
  input.value = "";
}

form.addEventListener("submit", handleSubmit);
