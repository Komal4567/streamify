import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import useAuthUser from "../hooks/useAuthUser";
import { BotIcon, SendIcon, UserIcon } from "lucide-react";

const AIChat = () => {
  const { authUser } = useAuthUser();
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: `Hi! I'm your AI language practice partner! 😊 I can help you practice ${authUser?.learningLanguage || "any language"} through conversation. Just start chatting with me and I'll respond in the language you're learning. I'll also help correct any mistakes gently. What would you like to talk about?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/ai/chat", {
        message: userMessage,
        targetLanguage: authUser?.learningLanguage || "English",
        nativeLanguage: authUser?.nativeLanguage || "English",
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: response.data.message },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I'm having trouble responding right now. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="bg-base-200 rounded-xl p-4 mb-4 flex items-center gap-3 border border-base-300">
        <div className="size-12 rounded-full bg-primary flex items-center justify-center">
          <BotIcon className="size-6 text-primary-content" />
        </div>
        <div>
          <h2 className="font-bold text-lg">AI Language Partner</h2>
          <p className="text-sm text-base-content/60">
            Practicing:{" "}
            <span className="text-primary font-semibold">
              {authUser?.learningLanguage || "Select a language"}
            </span>
          </p>
        </div>
        <div className="ml-auto">
          <span className="badge badge-success gap-1">
            <span className="size-2 rounded-full bg-success-content inline-block" />
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="size-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                <BotIcon className="size-4 text-primary-content" />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-content rounded-tr-none"
                  : "bg-base-200 text-base-content rounded-tl-none"
              }`}
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="size-8 rounded-full bg-base-300 flex items-center justify-center shrink-0 mt-1">
                <UserIcon className="size-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <BotIcon className="size-4 text-primary-content" />
            </div>
            <div className="bg-base-200 rounded-2xl rounded-tl-none px-4 py-3">
              <span className="loading loading-dots loading-sm" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 items-end">
        <textarea
          className="textarea textarea-bordered flex-1 resize-none text-sm"
          placeholder={`Practice your ${authUser?.learningLanguage || "language"} here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="btn btn-primary btn-square"
        >
          <SendIcon className="size-5" />
        </button>
      </div>

      <p className="text-xs text-base-content/40 text-center mt-2">
        Press Enter to send. The AI will respond in {authUser?.learningLanguage || "your target language"}.
      </p>
    </div>
  );
};

export default AIChat;
