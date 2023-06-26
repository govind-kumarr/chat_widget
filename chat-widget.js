const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
linkElement.type = "text/css";

document.head.appendChild(linkElement);

document.body.innerHTML += `<div class="chat-widget-container">
    <div id="chat-widget" style="display: none;">
      <div id="chat-header">
        <span class="chat-title">Chat</span>
        <button class="close-chat"><i class="fas fa-times"></i></button>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-input">
        <input type="text" id="message-input" placeholder="Type your message..." />
        <button id="send-button"><i class="fas fa-paper-plane"></i></button>
      </div>
      <div id="admin-typing" style="display: none;"><i class="fas fa-spinner fa-pulse"></i> Admin is typing...</div>
    </div>
    <button class="open-chat"><i class="fas fa-comment"></i></button>
  </div>`;
// Create a new style element
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

// Create CSS rules
const css = `
 .chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
    }

    #chat-widget {
      width: 300px;
      height: 400px;
      background-color: #f1f1f1;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }

    #chat-header {
      padding: 10px;
      background-color: #333;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #chat-header .chat-title {
      margin-right: 10px;
    }

    #chat-messages {
      padding: 10px;
      height: 300px;
      overflow-y: auto;
    }

    #chat-input {
      padding: 10px;
      display: flex;
      align-items: center;
    }

    #message-input {
      flex-grow: 1;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    #send-button {
      padding: 5px 10px;
      margin-left: 10px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .open-chat {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 5px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .close-chat {
      background-color: transparent;
      color: #fff;
      border: none;
      cursor: pointer;
    }

    #admin-typing {
      padding: 5px;
      background-color: #f1f1f1;
      text-align: center;
      font-style: italic;
    }
`;

// Get DOM elements
const chatWidgetContainer = document.querySelector(".chat-widget-container");
const chatWidget = document.getElementById("chat-widget");
const openChatButton = document.querySelector(".open-chat");
const closeChatButton = document.querySelector(".close-chat");
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const adminTyping = document.getElementById("admin-typing");

// Event listeners
openChatButton.addEventListener("click", openChat);
closeChatButton.addEventListener("click", closeChat);
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", handleTyping);

// Function to open the chat
function openChat() {
  chatWidget.style.display = "block";
  openChatButton.style.display = "none";
}

// Function to close the chat
function closeChat() {
  chatWidget.style.display = "none";
  openChatButton.style.display = "block";
}

// Function to send a message
function sendMessage() {
  const message = messageInput.value;

  // Append the message to the chat messages with user's alignment
  appendMessage(message, "user");

  // Simulate admin typing
  showAdminTyping();

  // Simulate admin response after a delay
  setTimeout(function () {
    // Remove admin typing indicator
    hideAdminTyping();

    // Generate admin response
    const adminResponse = generateAdminResponse(message);

    // Append the admin response to the chat messages with admin's alignment
    appendMessage(adminResponse, "admin");
  }, 1500);

  // Clear the input field
  messageInput.value = "";
}

// Function to handle typing event
function handleTyping(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Function to append a message to the chat messages
function appendMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message", sender);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show admin typing indicator
function showAdminTyping() {
  adminTyping.style.display = "block";
}

// Function to hide admin typing indicator
function hideAdminTyping() {
  adminTyping.style.display = "none";
}

// Function to generate admin response
function generateAdminResponse(message) {
  // Add your logic here to generate admin response based on user's message
  // For now, let's just return a generic response
  return "Thank you for your message. We will get back to you soon!";
}

// Hide the chat widget on page load
chatWidget.style.display = "none";

// Inject the CSS rules into the style element
styleElement.appendChild(document.createTextNode(css));
