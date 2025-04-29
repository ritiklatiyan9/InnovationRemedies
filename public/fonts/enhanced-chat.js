import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import botThinking from '../../assets/bot.gif';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Send,
  ArrowLeft,
  Save,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Clock,
  Check,
  FileText,
  Plus,
  User,
  Paperclip,
  FileAxis3d,
  ClipboardCopy,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Switch,
  SwitchThumb
} from "@/components/ui/switch";

// Import FileUploadDrawer component
import FileUploadDrawer from "./FileUploadDrawer";

// Import Groq SDK
import Groq from "groq-sdk";

// Constants for optimization
const MAX_MESSAGES_PER_CHAT = 20; // Increased limit for regular chat
const MAX_CONTEXT_MESSAGES = 15; // Maximum number of previous messages to include in context
const TOKEN_ESTIMATE_PER_CHAR = 0.25; // Rough estimate of tokens per character
const MAX_CONTEXT_TOKENS = 4000; // Maximum tokens to include in context

const SimpleLLMChat = () => {
  const { id: chatId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [savingChat, setSavingChat] = useState(false);
  const [chatSaved, setChatSaved] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [loadingRecentChats, setLoadingRecentChats] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState("");
  const [showClipboardDialog, setShowClipboardDialog] = useState(false);
  const [clipboardText, setClipboardText] = useState("");
  const [isRagMode, setIsRagMode] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [relevantSources, setRelevantSources] = useState([]);
  const [clipboardConversionInProgress, setClipboardConversionInProgress] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Groq LLAMA API setup
  const GROQ_API_KEY = "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";
  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // Enable browser usage (be careful with your API key)
  });

  // Compute user messages count to determine if the conversation should be blocked
  const userMessageCount = messages.filter((msg) => msg.role === "user").length;
  const hasReachedMessageLimit = userMessageCount >= MAX_MESSAGES_PER_CHAT;

  // Initialize chat when component mounts
  useEffect(() => {
    if (!chatId) {
      setMessages([
        {
          role: "system",
          content: "I'm your helpful assistant powered by Llama 3.3. How can I help you today?",
        },
      ]);
    } else {
      loadChat(chatId);
    }
    fetchRecentChats();
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchRecentChats = async () => {
    try {
      setLoadingRecentChats(true);
      const response = await axios.get(
        `https://backendragai.shivik.in/api/v1/chat/simple`,
        { params: { limit: 10 } }
      );
      if (response.data.success) {
        setRecentChats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching recent chats:", error);
    } finally {
      setLoadingRecentChats(false);
    }
  };

  const handleDocumentProcessed = (doc) => {
    setCurrentDocument(doc);
    setIsRagMode(true);
    setChatSaved(false);
    
    // Update the system message to reflect that we're now in RAG mode
    const updatedMessages = [
      {
        role: "system",
        content: `I'm your RAG assistant for: "${doc.rawdata || "your document"}". Ask me anything about this document!`,
      },
      ...messages.slice(1) // Keep all non-system messages
    ];
    
    setMessages(updatedMessages);
    
    toast.success("Document added to chat", {
      description: "You can now ask questions about this document.",
    });
    
    // Close clipboard dialog if it was open
    setShowClipboardDialog(false);
  };

  const handleSaveTitle = async () => {
    if (!editTitleValue.trim()) {
      toast.error("Chat title cannot be empty");
      setIsEditingTitle(false);
      setEditTitleValue(chatData?.title || "");
      return;
    }

    if (editTitleValue === chatData?.title) {
      setIsEditingTitle(false);
      return;
    }

    try {
      const response = await axios.patch(
        `https://backendragai.shivik.in/api/v1/chat/rename/${chatId}`,
        { title: editTitleValue }
      );

      if (response.data.success) {
        setChatData({
          ...chatData,
          title: editTitleValue,
        });
        toast.success("Title updated");
      } else {
        throw new Error(response.data.message || "Failed to update title");
      }
    } catch (error) {
      console.error("Error updating title:", error);
      toast.error(
        error.response?.data?.message || error.message || "Error updating title"
      );
      setEditTitleValue(chatData?.title || "");
    } finally {
      setIsEditingTitle(false);
    }
  };

  const loadChat = async (selectedChatId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backendragai.shivik.in/api/v1/chat/${selectedChatId}`
      );
      if (response.data.success) {
        const chatData = response.data.data;
        setChatData(chatData);
        setChatSaved(true);
        
        // Check if this is a RAG-enabled chat
        if (chatData.documentId) {
          setIsRagMode(true);
          try {
            // Fetch the document details
            const docResponse = await axios.get(
              `https://backendragai.shivik.in/api/v1/data/text/${chatData.documentId}`
            );
            if (docResponse.data.success) {
              setCurrentDocument(docResponse.data.data.doc);
            }
          } catch (docError) {
            console.error("Error fetching document:", docError);
          }
        } else {
          setIsRagMode(false);
        }
        
        // Start with system message
        const systemMessage = chatData.documentId 
          ? `I'm your RAG assistant for: "${currentDocument?.rawdata || "your document"}". Ask me anything about this document!`
          : "I'm your helpful assistant powered by Llama 3.3. How can I help you today?";
          
        const reconstructedMessages = [
          {
            role: "system",
            content: systemMessage,
          },
        ];
        
        // Reconstruct messages
        const maxLength = Math.max(
          chatData.usermessages.length,
          chatData.botmessages.length
        );
        
        for (let i = 0; i < maxLength; i++) {
          if (i < chatData.usermessages.length) {
            reconstructedMessages.push({
              role: "user",
              content: chatData.usermessages[i],
            });
          }
          if (i < chatData.botmessages.length) {
            reconstructedMessages.push({
              role: "assistant",
              content: chatData.botmessages[i],
              // If there are sources, add them
              ...(chatData.sources && chatData.sources[i] 
                ? { sources: chatData.sources[i].sources } 
                : {})
            });
          }
        }
        
        setMessages(reconstructedMessages);
        navigate(`/simple-chat/${selectedChatId}`, {
          replace: true,
        });
        toast.success("Chat loaded successfully");
      }
    } catch (error) {
      console.error("Error loading chat:", error);
      toast.error("Failed to load chat");
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setChatSaved(false);
    setChatData(null);
    setIsRagMode(false);
    setCurrentDocument(null);
    navigate(`/simple-chat`);
    setMessages([
      {
        role: "system",
        content: "I'm your helpful assistant powered by Llama 3.3. How can I help you today?",
      },
    ]);
    setIsMobileDrawerOpen(false);
  };

  const saveChat = async () => {
    if (messages.length <= 1) return;
    try {
      setSavingChat(true);
      
      // Extract user messages and bot messages
      const userMessages = [];
      const botMessages = [];
      
      // Store sources if available
      const sources = [];
      
      for (let i = 1; i < messages.length; i++) {
        const msg = messages[i];
        if (msg.role === "user") {
          userMessages.push(msg.content);
        } else if (msg.role === "assistant") {
          const botMsgIndex = botMessages.length;
          botMessages.push(msg.content);
          
          // If this message has sources, store them with their index
          if (msg.sources && Array.isArray(msg.sources) && msg.sources.length > 0) {
            sources.push({
              messageIndex: botMsgIndex,
              sources: msg.sources
            });
          }
        }
      }
      
      const title =
        userMessages[0]?.length > 30
          ? userMessages[0].substring(0, 30) + "..."
          : userMessages[0] || `Chat - ${new Date().toLocaleString()}`;
          
      const payload = {
        chatId: chatId || `simple_${Date.now()}`,
        documentId: isRagMode && currentDocument ? currentDocument._id : null,
        usermessages: userMessages,
        botmessages: botMessages,
        title: title,
        lastMessage: botMessages[botMessages.length - 1]?.substring(0, 100) || "",
        sources: sources.length > 0 ? sources : undefined,
        chatType: isRagMode ? "rag" : "simple" // Mark chat type accordingly
      };
      
      let response;
      if (chatId) {
        response = await axios.put(
          `https://backendragai.shivik.in/api/v1/chat/${chatId}`,
          payload
        );
      } else {
        response = await axios.post(
          `https://backendragai.shivik.in/api/v1/chat`,
          payload
        );
      }

      if (response.data.success) {
        setChatData(response.data.data);
        setChatSaved(true);
        fetchRecentChats();
        if (!chatId) {
          navigate(`/simple-chat/${response.data.data._id}`, {
            replace: true,
          });
        }
        toast.success("Chat saved");
      }
    } catch (error) {
      console.error("Error saving chat:", error);
      toast.error("Failed to save chat");
    } finally {
      setSavingChat(false);
    }
  };

  // Optimize context for token limits
  const optimizeContextForTokens = (conversationHistory) => {
    // Create a copy to avoid modifying the original
    let optimizedHistory = [...conversationHistory];

    // If the history is already short, return it as is
    if (optimizedHistory.length <= MAX_CONTEXT_MESSAGES) {
      return optimizedHistory;
    }

    // Estimate token count
    let totalTokens = optimizedHistory.reduce((sum, msg) => {
      return sum + msg.content.length * TOKEN_ESTIMATE_PER_CHAR;
    }, 0);

    // If under the token limit, just keep the most recent messages
    if (totalTokens <= MAX_CONTEXT_TOKENS) {
      return optimizedHistory.slice(-MAX_CONTEXT_MESSAGES);
    }

    // If we're still over the token limit, we need to trim more aggressively
    // Keep the most recent messages but trim their content if needed
    let result = [];

    // Always include the most recent user message (which is the current query)
    const lastUserMsg = optimizedHistory
      .filter((msg) => msg.role === "user")
      .pop();

    // Get the last few messages, prioritizing the most recent exchanges
    const recentMessages = optimizedHistory.slice(-MAX_CONTEXT_MESSAGES);

    // Add messages until we approach the token limit
    let tokenCount = 0;
    for (let i = recentMessages.length - 1; i >= 0; i--) {
      const msg = recentMessages[i];
      const msgTokens = msg.content.length * TOKEN_ESTIMATE_PER_CHAR;

      if (tokenCount + msgTokens <= MAX_CONTEXT_TOKENS) {
        result.unshift(msg);
        tokenCount += msgTokens;
      } else {
        // If a message is too long, trim it
        const availableTokens = MAX_CONTEXT_TOKENS - tokenCount;
        const charsToKeep = Math.floor(
          availableTokens / TOKEN_ESTIMATE_PER_CHAR
        );

        if (charsToKeep > 100) {
          // Only keep if we can keep a meaningful chunk
          result.unshift({
            ...msg,
            content: msg.content.slice(-charsToKeep) + "...[truncated]",
          });
        }
        break;
      }
    }

    // Make sure the current user query is included if it somehow got filtered out
    if (
      !result.some(
        (msg) => msg.role === "user" && msg.content === lastUserMsg.content
      )
    ) {
      result.push(lastUserMsg);
    }

    return result;
  };

  // Handle pasting from clipboard
  const handleClipboardPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setClipboardText(text);
        setShowClipboardDialog(true);
      } else {
        toast.error("Clipboard is empty");
      }
    } catch (error) {
      console.error("Failed to read clipboard:", error);
      toast.error("Unable to access clipboard");
    }
  };

  // Convert clipboard text to document
  const convertClipboardToDocument = async () => {
    if (!clipboardText.trim()) {
      toast.error("Clipboard text is empty");
      return;
    }
    
    setClipboardConversionInProgress(true);
    
    try {
      // Create a text file from clipboard content
      const blob = new Blob([clipboardText], { type: 'text/plain' });
      const file = new File([blob], 'clipboard-text.txt', { type: 'text/plain' });
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Send to backend
      const response = await axios.post(
        'https://backendragai.shivik.in/api/v1/xl/txt/',
        formData
      );
      
      if (response.data.success) {
        const docData = response.data.data;
        
        // Process for RAG if needed
        try {
          const embeddingResponse = await axios.post(
            `https://backendragai.shivik.in/api/v1/rag/chunked-embeddings/${docData._id}`,
            {
              chunkSize: 1000,
              chunkOverlap: 200,
              minChunkSize: 100,
              forceRecreate: false
            }
          );
          
          if (embeddingResponse.data.success) {
            toast.success("Text processed for RAG capabilities");
          }
        } catch (embeddingError) {
          console.warn("Warning: Embeddings creation issue:", embeddingError);
          toast.warning("Document added but embeddings may not be complete");
        }
        
        // Pass document to handler
        handleDocumentProcessed(docData);
        
      } else {
        throw new Error(response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error converting clipboard to document:", error);
      toast.error("Failed to process clipboard text");
    } finally {
      setClipboardConversionInProgress(false);
    }
  };

  // Generate the assistant's response
  const generateAssistantResponse = async (updatedMessages, query) => {
    setIsProcessing(true);
    setChatSaved(false);
  
    try {
      // Check if this response will be the last allowed one
      const userMsgCount = updatedMessages.filter(
        (msg) => msg.role === "user"
      ).length;
      const isLastAllowedMessage = userMsgCount === MAX_MESSAGES_PER_CHAT;
  
      const conversationHistory = updatedMessages.filter(
        (msg) => msg.role !== "system"
      );
  
      // Generate the response - use RAG mode if applicable
      const response = isRagMode && currentDocument 
        ? await generateRagResponse(query, conversationHistory)
        : await generateResponse(query, conversationHistory);
      
      // Add a notice if this is the last allowed message
      let finalResponse = response.content;
      if (isLastAllowedMessage) {
        finalResponse = `${response.content}\n\n---\n\n**Note:** You have reached the maximum of ${MAX_MESSAGES_PER_CHAT} messages for this conversation. Please save your chat and start a new conversation to continue.`;
      }
  
      // Add the response to messages with sources if available
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: finalResponse,
          messageId: response.messageId,
          ...(response.sources ? { sources: response.sources } : {})
        },
      ]);
      
      // Update relevant sources if in RAG mode
      if (isRagMode && response.sources) {
        setRelevantSources(response.sources);
      }
      
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered an error while processing your request. Please try again.",
          messageId: `error_${Date.now()}`
        },
      ]);
    } finally {
      setIsProcessing(false);
      inputRef.current?.focus();
    }
  };

  // Send message function
  const sendMessage = async () => {
    if (!inputMessage.trim() || isProcessing || hasReachedMessageLimit) return;

    const newUserMessage = { role: "user", content: inputMessage };
    setMessages((prev) => {
      const updatedMessages = [...prev, newUserMessage];
      // Immediately generate the assistant response using the updated messages
      generateAssistantResponse(updatedMessages, inputMessage);
      return updatedMessages;
    });
    setInputMessage("");
  };

  // Generate response using Llama 3.3 for standard chat
  const generateResponse = async (query, conversationHistory) => {
    try {
      // Optimize the conversation history for token efficiency
      const optimizedHistory = optimizeContextForTokens(conversationHistory);
  
      const formattedMessages = optimizedHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
  
      const systemMessage = {
        role: "system",
        content: `You are a helpful AI assistant powered by Llama 3.3.
          Be helpful, concise, and accurate.
          If you don't know the answer to something, just say so.`,
      };
  
      const userMessage = {
        role: "user",
        content: query,
      };
  
      const groqMessages = [systemMessage, ...formattedMessages, userMessage];
  
      const chatCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.95,
        stream: false,
      });
  
      // Generate a unique message ID for this response
      const messageId = `msg_${Date.now()}`;
  
      // Return the response content and the message ID
      return {
        content: chatCompletion.choices[0].message.content,
        messageId,
      };
    } catch (error) {
      console.error("Error generating response:", error);
      return {
        content:
          "I encountered an error while processing your request. Please try again.",
        messageId: `error_${Date.now()}`,
      };
    }
  };
  
  // Generate RAG-enhanced response
  const generateRagResponse = async (query, conversationHistory) => {
    try {
      let relevantContext = "";
      let sources = [];
      
      try {
        // Query for relevant document chunks
        const ragResponse = await axios.post(
          `https://backendragai.shivik.in/api/v1/rag/query`,
          {
            query,
            documentId: currentDocument._id,
            maxResults: 10,
            includeMetadata: true,
          }
        );
  
        if (ragResponse.data.success) {
          const results = ragResponse.data.data.results || [];
          
          // Enhance source information
          sources = results.map((result, index) => {
            const pageNumber = result.metadata?.pageNumber || result.metadata?.page || "Unknown";
            const chunkPosition = result.metadata?.position || index + 1;
            const sectionInfo = result.metadata?.sectionInfo || result.metadata?.section || `Section ${index + 1}`;
            const chunkIndex = result.metadata?.chunkIndex || result.id?.split(":")?.pop() || chunkPosition;
  
            return {
              id: result.id || `src_${Date.now()}_${index}`,
              text: result.metadata?.snippet || result.metadata?.text || "No text available",
              score: result.score || 0.5,
              documentId: result.metadata?.documentId || currentDocument._id,
              pageNumber: pageNumber,
              position: chunkPosition,
              section: sectionInfo,
              chunkIndex: chunkIndex,
            };
          });
  
          // Build context from top results
          relevantContext = results
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map((result, index) => {
              const sectionInfo = result.metadata?.sectionInfo || result.metadata?.section || `Chunk ${index + 1}`;
              return `[${sectionInfo}${
                result.metadata?.pageNumber ? ` (Page ${result.metadata.pageNumber})` : ""
              }]\n${result.metadata?.snippet || ""}`;
            })
            .join("\n\n");
        }
      } catch (error) {
        console.error("RAG query failed:", error);
      }
  
      // Optimize the conversation history for token efficiency
      const optimizedHistory = optimizeContextForTokens(conversationHistory);
  
      const formattedMessages = optimizedHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
  
      const systemMessage = {
        role: "system",
        content: `You are a helpful AI assistant that answers questions about documents.
          ${
            relevantContext
              ? `Use the following RELEVANT INFORMATION to answer the question:\n\n${relevantContext}\n`
              : ""
          }
          ${
            relevantContext
              ? "Base your answer primarily on the RELEVANT INFORMATION provided above. If that information doesn't completely answer the question, you can use your general knowledge to supplement."
              : "Answer the question to the best of your ability based on your knowledge."
          }
          Be helpful, concise, and accurate. When referring to sections of the document, reference them by name.`,
      };
  
      const userMessage = {
        role: "user",
        content: query,
      };
  
      const groqMessages = [systemMessage, ...formattedMessages, userMessage];
  
      const chatCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.95,
        stream: false,
      });
  
      // Generate a unique message ID for this response
      const messageId = `msg_${Date.now()}`;
  
      // Return the response with sources
      return {
        content: chatCompletion.choices[0].message.content,
        messageId,
        sources: sources
      };
    } catch (error) {
      console.error("Error generating RAG response:", error);
      return {
        content: "I encountered an error while processing your request. Please try again.",
        messageId: `error_${Date.now()}`,
        sources: []
      };
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const navigateToRagChat = () => {
    navigate('/upload-document');
  };

  const renderRecentChats = () => {
    if (loadingRecentChats) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-gray-500">
          <RefreshCw className="h-5 w-5 text-blue-500 animate-spin mb-2" />
          <p className="text-sm">Loading chats...</p>
        </div>
      );
    }
    
    if (recentChats.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-gray-500">
          <MessageSquare className="h-5 w-5 text-gray-400 mb-2" />
          <p className="text-sm">No recent chats found</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={startNewChat}
          >
            Start a new chat
          </Button>
        </div>
      );
    }
    
    return recentChats.map((chat) => (
      <div
        key={chat._id}
        onClick={() => loadChat(chat._id)}
        className={`
          p-2 cursor-pointer rounded-md transition-colors w-full
          hover:bg-gray-100 flex flex-col gap-1
          ${chat._id === chatId ? "bg-blue-50 border-l-4 border-blue-400" : ""}
        `}
      >
        <div className="font-medium text-sm truncate w-full flex items-center gap-1">
          {chat.chatType === "rag" && (
            <FileText className="h-3 w-3 text-blue-500 flex-shrink-0" />
          )}
          <span>{chat.title || "Untitled Chat"}</span>
        </div>
        <div className="text-xs text-gray-500 truncate w-full">
          {chat.lastMessage || "No messages"}
        </div>
        <div className="text-xs text-gray-400">
          {new Date(chat.updatedAt).toLocaleString()}
        </div>
      </div>
    ));
  };

  const renderSourceBadge = () => {
    if (!isRagMode || !relevantSources.length) return null;
    
    return (
      <Badge className="bg-blue-100 text-blue-800">
        {relevantSources.length} sources
      </Badge>
    );
  };

  return (
    <div className="flex flex-col h-full w-full">
      <Card className="flex flex-col h-full w-full border-0 shadow-none rounded-none">
        <CardHeader className="px-4 py-2 sm:px-6 sm:py-4 border-b bg-white sticky top-0 z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGoBack}
                className="h-8 w-8 hover:bg-blue-50 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4 text-blue-600" />
              </Button>
              <div className={`rounded-full p-2 ${isRagMode ? "bg-blue-100" : "bg-purple-100"}`}>
                {isRagMode ? (
                  <FileAxis3d className="h-5 w-5 text-blue-600" />
                ) : (
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <div className="flex-grow overflow-hidden">
                {loading ? (
                  <Skeleton className="h-6 w-48 sm:w-64 md:w-72 lg:w-80" />
                ) : isEditingTitle ? (
                  <div className="flex items-center w-full">
                    <Input
                      value={editTitleValue}
                      onChange={(e) => setEditTitleValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveTitle();
                        } else if (e.key === "Escape") {
                          setIsEditingTitle(false);
                          setEditTitleValue(chatData?.title || "");
                        }
                      }}
                      className="h-7 text-base w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                      autoFocus
                      onBlur={() => {
                        setIsEditingTitle(false);
                        setEditTitleValue(chatData?.title || "");
                      }}
                    />
                  </div>
                ) : (
                  <CardTitle
                    className="text-lg text-gray-800 truncate cursor-pointer w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                    onClick={() => {
                      if (chatData) {
                        setIsEditingTitle(true);
                        setEditTitleValue(chatData?.title || "");
                      }
                    }}
                  >
                    {chatData?.title || (isRagMode ? "Document Chat" : "Llama 3.3 Chat")}
                  </CardTitle>
                )}
                <div className="text-xs text-gray-500 truncate flex items-center gap-2">
                  {loading ? (
                    <Skeleton className="h-4 w-64 mt-1" />
                  ) : (
                    <>
                      <span>Powered by Llama 3.3</span>
                      {isRagMode && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-600 border-blue-200"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Document Mode
                        </Badge>
                      )}
                      {hasReachedMessageLimit && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-600 border-amber-200"
                        >
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Message limit reached
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>