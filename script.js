const API_KEY = "AIzaSyDk8DgfADEzF6tNzBYReTUpHrvF2EYaQCk";

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const userText = input.value.trim();

    if (!userText) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.innerText = userText;
    chatBox.appendChild(userMsg);
    input.value = "";

    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.innerText = "✨ Thinking...";
    chatBox.appendChild(botMsg);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: userText }]
                    }]
                })
            }
        );

        const data = await response.json();

        const responseText =
            data.candidates[0].content.parts[0].text;

        // ✅ HERE
        botMsg.innerHTML = responseText;

    } catch (error) {
        botMsg.innerText = "❌ Error connecting to Gemini API";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
