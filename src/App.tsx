// src/App.tsx
import BottomControls from "./components/BottomPannel/BottomControls";
import { Header } from "./components/HeaderPannel/Header";
import ChatContainer from "./components/MiddlePannel/ChatContainer";
import { useChat } from "./hooks/useChat";

// 🔥 DEV MODE FLAG
const DEV_MODE = true;

export default function App() {

  // ✅ API TARGET
  const API_URL = "https://z3llwvwlwb.execute-api.eu-west-2.amazonaws.com/router";

  // ✅ HOOKS MUST ALWAYS RUN (NO CONDITIONS)
  const chat = useChat(API_URL, () => undefined);

  // 🚫 AUTH IS COMPLETELY SKIPPED IN DEV MODE
  if (!DEV_MODE) {
    return <div className="text-white">Prod mode not enabled</div>;
  }

  // ✅ UI
  return (
    <div className="fixed inset-0 flex flex-col bg-black overflow-hidden">

      {/* ---------- FIXED HEADER ---------- */}
      <header
        className="fixed top-0 left-0 right-0 h-[12vh] z-50
                   bg-gradient-to-b from-purple-900/30 to-transparent
                   border-b-8 border-purple-500
                   flex items-center justify-center"
      >
        <Header />
      </header>

      {/* ---------- SCROLLABLE CHAT ---------- */}
      <main
        className="absolute top-[12vh] bottom-[28vh] left-0 right-0
                   overflow-y-auto overflow-x-hidden"
      >
        <ChatContainer
          messages={chat.messages}
          isThinking={chat.mode === "text"}
        />
      </main>

      {/* ---------- BOTTOM CONTROLS ---------- */}
      <footer className="fixed bottom-0 left-0 right-0 h-[28vh] z-50 bg-black/50">
        <BottomControls
          mode={chat.mode}
          setMode={chat.setMode}
          inputValue={chat.input}
          setInputValue={chat.setInput}
          onSend={chat.sendMessage}
          onImageSelect={() => {}}
        />
      </footer>
    </div>
  );
}
