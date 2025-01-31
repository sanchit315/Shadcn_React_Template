import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import axios from "axios";
import { toast } from "sonner";
import { Howl, Howler } from "howler";
import BubbleLoader from "../ui/bubble-loader";

interface ChatProps {
  moveNext: () => void;
}

const Chat: React.FC<ChatProps> = ({ moveNext }) => {
  const [currentChat, setCurrentChat] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [chatLoading, setChatLoading] = useState(false);

  const startChat = async () => {
    await axios.get(`http://localhost:3000/chat/${currentChat}/initiate`);
    setChatStarted(true);
  };

  const handleEndChat = () => {
    // const sound = new Howl({
    //   src: ["http://localhost:3000/file_example_MP3_5MG.mp3"],
    //   autoplay: true,
    //   loop: false,
    //   volume: 1,
    //   onplay: () => {
    //     console.log("PlAY");
    //   },
    // });

    if (currentChat === 2) {
      moveNext();
      return;
    }
    setCurrentChat((prev) => prev + 1);
    setChatStarted(false);
  };

  const handleSendMessage = async () => {
    setChatLoading(true);
    setMessages((prev) => [...prev, { role: "You", content: message }]);
    setMessage("");
    try {
      const res = await axios.post(
        `http://localhost:3000/chat/${currentChat}/message`,
        { message: message }
      );
      setMessages(res.data.messages);
      setChatLoading(false);
    } catch {
      toast.error("Something went wrong!, please try later");
      setChatLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col mt-12">
      <div className="flex-1 mb-4 flex flex-col">
        <div className="font-bold mb-12">
          Question 6: Please Complete requirement form during discussion with AI
          agent
        </div>

        <div className="flex-1 flex justify-between">
          {!chatStarted && (
            <Button className="flex gap-2" onClick={startChat}>
              <Icons.messageSquare className="h-4 w-4" />
              Start Chat
            </Button>
          )}

          {chatStarted && (
            <div className="w-full max-w-xl bg-white rounded-md shadow-lg flex flex-col overflow-hidden max-h-[450px]">
              <div className="p-4 border-b bg-primary text-white font-semibold text-lg">
                Chat with your client
              </div>
              <div className="p-4 flex-1 overflow-y-auto" id="chatBox">
                {messages.map((message) => {
                  if (message.role === "You") {
                    return (
                      <div className="text-right mb-2">
                        <div className="bg-primary text-white p-2 rounded-md inline-block">
                          {message.content}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="mb-2">
                      <div className="bg-gray-200 p-2 rounded-md inline-block">
                        {message.content}
                      </div>
                    </div>
                  );
                })}

                {chatLoading && (
                  <div className="bg-gray-200 p-2 rounded-md inline-block">
                    <BubbleLoader />
                  </div>
                )}
              </div>
              <div className="p-4 border-t flex gap-2">
                <input
                  type="text"
                  id="messageInput"
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSendMessage} disabled={chatLoading}>
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex align-middle justify-end">
        <Button
          variant="default"
          disabled={!chatStarted}
          onClick={handleEndChat}
        >
          End Chat
        </Button>
      </div>
    </div>
  );
};

export default Chat;
