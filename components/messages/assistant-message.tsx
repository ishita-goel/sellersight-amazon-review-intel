import { UIMessage, ToolCallPart, ToolResultPart } from "ai";
import { Response } from "@/components/ai-elements/response";
import { ReasoningPart } from "./reasoning-part";
import { ToolCall, ToolResult } from "./tool-call";

export function AssistantMessage({
  message,
  status,
  isLastMessage,
  durations,
  onDurationChange,
}: {
  message: UIMessage;
  status?: string;
  isLastMessage?: boolean;
  durations?: Record<string, number>;
  onDurationChange?: (key: string, duration: number) => void;
}) {
  return (
    <div className="w-full flex items-start gap-3">
      {/* SellerSight avatar */}
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#232F3E] text-xs font-semibold text-white">
        SS
      </div>

      {/* Amazon-style assistant bubble */}
      <div className="max-w-[70%] rounded-2xl border border-[#FFE0A3] bg-[#FFF8E6] px-4 py-3 text-sm shadow-sm">
        <div className="flex flex-col gap-4">
          {message.parts.map((part, i) => {
            const isStreaming =
              status === "streaming" &&
              isLastMessage &&
              i === message.parts.length - 1;
            const durationKey = `${message.id}-${i}`;
            const duration = durations?.[durationKey];

            if (part.type === "text") {
              // main assistant text
              return (
                <Response key={`${message.id}-${i}`}>{part.text}</Response>
              );
            } else if (part.type === "reasoning") {
              // hidden/expandable reasoning, if you’re using it
              return (
                <ReasoningPart
                  key={`${message.id}-${i}`}
                  part={part}
                  isStreaming={isStreaming}
                  duration={duration}
                  onDurationChange={
                    onDurationChange
                      ? (d) => onDurationChange(durationKey, d)
                      : undefined
                  }
                />
              );
            } else if (
              part.type.startsWith("tool-") ||
              part.type === "dynamic-tool"
            ) {
              // tool calls & tool results (RAG, web, etc.)
              if ("state" in part && part.state === "output-available") {
                return (
                  <ToolResult
                    key={`${message.id}-${i}`}
                    part={part as unknown as ToolResultPart}
                  />
                );
              } else {
                return (
                  <ToolCall
                    key={`${message.id}-${i}`}
                    part={part as unknown as ToolCallPart}
                  />
                );
              }
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
