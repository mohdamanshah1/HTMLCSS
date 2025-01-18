let chatData = {
    chatRoom: {
        roomId: "12345",
        participants: [
            { "userId": "1", "username": "PersonA" },
            { "userId": "2", "username": "PersonB" }
        ],
        messages: [
            {
                "messageId": "1",
                "userId": "1",
                "username": "PersonA",
                "text": "Hello!",
                "timestamp": "2025-01-17T14:30:00",
                "isRead": false
            },
            {
                "messageId": "2",
                "userId": "2",
                "username": "PersonB",
                "text": "Hi, How are you?",
                "timestamp": "2025-01-17T14:31:00",
                "isRead": false
            },

        ]
    }
};

function renderMessages() {
    const messageList = document.getElementById("message-list");
    messageList.innerHTML = '';

    chatData.chatRoom.messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(message.userId === "1" ? "from-me" : "from-them");
        messageElement.innerHTML = `<strong>${message.username}</strong>: ${message.text}`;
        messageList.appendChild(messageElement);
    });
}

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const text = messageInput.value.trim();

    if (text !== "") {
        const newMessage = {
            messageId: String(chatData.chatRoom.messages.length + 1),
            userId: "1",
            username: "PersonA",
            text: text,
            timestamp: new Date().toISOString(),
            isRead: false
        };

        chatData.chatRoom.messages.push(newMessage);
        renderMessages();
        messageInput.value = "";
    }
}

renderMessages();