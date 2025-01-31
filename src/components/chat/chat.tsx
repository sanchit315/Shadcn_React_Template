import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";

interface ChatProps {
  endQuiz: () => void;
}

const Chat: React.FC<ChatProps> = ({ endQuiz }) => {
  const [currentChat, setCurrentChat] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);

  const startChat = () => {
    setChatStarted(true);
  };

  const handleEndChat = () => {
    if (currentChat === 2) {
      // Complete Quiz
      return;
    }

    setCurrentChat((prev) => prev + 1);
  };

  return (
    <div className="flex-1 flex flex-col mt-12">
      <div className="flex-1 mb-4 flex flex-col">
        <div className="font-bold mb-12">
          Question 6: Please Complete requirement form during discussion with AI
          agent
        </div>

        <div className="flex-1 flex justify-between">
          <Button className="flex gap-2" onClick={startChat}>
            <Icons.messageSquare className="h-4 w-4" />
            Start Chat
          </Button>

          <div className="w-full max-w-md bg-white rounded-md shadow-lg flex flex-col overflow-hidden">
            <div className="p-4 border-b bg-primary text-white font-semibold text-lg">
              Chat With Rajat Khaturia
            </div>
            <div className="p-4 flex-1 h-80 overflow-y-auto" id="chatBox">
              <div className="mb-2">
                <div className="bg-gray-200 p-2 rounded-md inline-block">
                  Hello!
                </div>
              </div>
              <div className="text-right mb-2">
                <div className="bg-primary text-white p-2 rounded-md inline-block">
                  Hi there!
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                id="messageInput"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message..."
              />
              <button className="ml-2 bg-primary text-white px-4 py-2 rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex align-middle justify-between">
        <Button variant="destructive" onClick={endQuiz}>
          End Quiz
        </Button>
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
