import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import axios from "axios";
import { toast } from "sonner";
import BubbleLoader from "../ui/bubble-loader";
import { Howl } from "howler";
import useSWR from "swr";
import { Spinner } from "../ui/loader";

const apiUrl = import.meta.env.VITE_API_URL;

interface ChatProps {
  moveNext: () => void;
}

const Chat: React.FC<ChatProps> = ({ moveNext }) => {
  const {
    data: leadStages,
    error,
    isLoading,
  } = useSWR(`${apiUrl}/chat/lead_stages`);
  const [currentChat, setCurrentChat] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isEnd, setIsEnd] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const sound = useRef<Howl | null>(null);

  if (error) return <div>Error, Something went wrong</div>;
  if (isLoading)
    return (
      <div className="mt-12">
        <Spinner />
      </div>
    );

  const startChat = async () => {
    await axios.get(`${apiUrl}/chat/${currentChat}/initiate`);
    setChatStarted(true);
  };

  const handleEndChat = async () => {
    if (currentChat === 2) {
      moveNext();
      return;
    }
    setCurrentChat((prev) => prev + 1);
    setChatStarted(false);
    setMessage("");
    setMessages([]);
    setIsEnd(false);
    setChatLoading(false);
    sound.current?.stop();
  };

  const handleSendMessage = async () => {
    setChatLoading(true);
    setMessages((prev) => [...prev, { role: "You", content: message }]);
    setMessage("");
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${apiUrl}/chat/${currentChat}/message`, {
        message: message,
      });
      setIsEnd(res.data.isEnd);
      sound.current = new Howl({
        src: [`${apiUrl}/${res.data.audioFileName}`],
        autoplay: true,
        loop: false,
        volume: 1,
      });
      sound.current.play();
      setMessages(res.data.messages);
      setChatLoading(false);
    } catch (error) {
      toast.error("Something went wrong!, please try later");
      setChatLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col mt-12">
      <div className="flex-1 mb-4 flex flex-col">
        <div className="mb-12">
          <div className="font-bold mb-2">
            Question {6 + currentChat}: Contact the lead below and follow the
            SOP for:
          </div>
          <p className="text-sm text-gray-800">
            Info: Current lead status {"=>"} {leadStages[currentChat].type}
          </p>
          <p className="text-sm text-gray-800">
            Goal: Move the lead to {"=>"} {leadStages[currentChat + 1].type}
          </p>
        </div>

        <div className="flex-1 flex justify-between">
          {!chatStarted && (
            <Button className="flex gap-2" onClick={startChat}>
              <Icons.phone className="h-4 w-4" />
              Contact Lead
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
                <Button
                  onClick={handleSendMessage}
                  disabled={chatLoading || isEnd}
                >
                  Send
                </Button>

                <Button
                  variant="destructive"
                  disabled={!chatStarted}
                  onClick={handleEndChat}
                >
                  <Icons.phone />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
