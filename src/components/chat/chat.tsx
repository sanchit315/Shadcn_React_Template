import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import axios from "axios";
import { toast } from "sonner";
import BubbleLoader from "../ui/bubble-loader";
import { Howl } from "howler";
import useSWR from "swr";
import { Spinner } from "../ui/loader";
import { ArrowRight, Circle, CircleDot, Info } from "lucide-react";

type Stage = {
  type: string;
  description: string;
};
type Transition = {
  start: Stage;
  end: Stage;
};

function transformStages(inputArray: Stage[]): Transition[] {
  const result: Transition[] = [];
  for (let i = 0; i < inputArray.length - 1; i++) {
    result.push({
      start: inputArray[i],
      end: inputArray[i + 1],
    });
  }
  return result;
}

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
  const [leadName, setLeadName] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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

  const transitions = transformStages(leadStages);

  const startChat = async () => {
    const res = await axios.get(`${apiUrl}/chat/${currentChat}/initiate`);
    setLeadName(res.data.leadName);
    setChatStarted(true);
  };

  const handleEndClose = () => {
    setIsEnd(true);
    setChatStarted(false);
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
    <>
      <div className="flex-1 flex gap-12 mt-12">
        <div className="w-1/3 min-w-[320px] max-w-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Pipeline Status
            </h2>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Info className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-3">
            {transitions.map((transition, index) => (
              <div
                key={transition.start.type}
                className={`rounded-lg p-3 ${
                  index === currentChat
                    ? "bg-blue-50 border border-blue-200"
                    : index < currentChat
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {index === currentChat ? (
                    <CircleDot className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  ) : (
                    <Circle
                      className={`w-4 h-4 flex-shrink-0 ${
                        index < currentChat ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                  )}
                  <div className="flex items-center gap-1 text-sm">
                    <span
                      className={`font-medium ${
                        index === currentChat
                          ? "text-blue-700"
                          : index < currentChat
                          ? "text-green-700"
                          : "text-gray-600"
                      }`}
                    >
                      {transition.start.type}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 ${
                        index === currentChat
                          ? "text-blue-600"
                          : index < currentChat
                          ? "text-green-500"
                          : "text-gray-300"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        index === currentChat
                          ? "text-blue-700"
                          : index < currentChat
                          ? "text-green-700"
                          : "text-gray-600"
                      }`}
                    >
                      {transition.end.type}
                    </span>
                  </div>
                </div>

                {showInfo && index === currentChat && (
                  <div className="mt-3 text-xs space-y-2 border-t border-gray-200 pt-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Current:</span>{" "}
                      {transition.start.description}
                    </p>
                    <p className="text-blue-600">
                      <span className="font-medium">Next:</span>{" "}
                      {transition.end.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 mb-4 flex flex-col">
          <div className="mb-12">
            <div className="font-bold mb-2">
              Question {6 + currentChat}: Reach out to the lead below and follow
              the SOP for:
            </div>
          </div>

          <div className="flex-1 flex-col gap-4 flex justify-between">
            {!chatStarted && !isEnd && (
              <div className="justify-self-start">
                <Button className="flex gap-2 " onClick={startChat}>
                  <Icons.phone className="h-4 w-4" />
                  Contact Lead
                </Button>
              </div>
            )}

            {isEnd && (
              <p className="text-lg">
                Response recorded. Please proceed to the next step.
              </p>
            )}

            {chatStarted && (
              <div className="w-full max-w-xl bg-white rounded-md shadow-lg flex flex-col overflow-hidden max-h-[420px] flex-1">
                <div className="p-4 border-b bg-primary text-white font-semibold text-lg">
                  Chat with {leadName} (AI client)
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
                    onClick={handleEndClose}
                  >
                    <Icons.phone />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex align-middle justify-end fixed bottom-0 right-0 left-0 bg-white border border-t-gray-100 py-2">
        <div className="container flex gap-6 justify-end">
          <Button variant="default" onClick={handleEndChat}>
            Next Question
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
