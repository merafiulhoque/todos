"use client"

import { ApiResponse } from "@/types"
import { useState } from "react"
import { X } from "lucide-react"

export default function TodoModal({ onClose }: { onClose?: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [msg, setMsg] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!title || !content) {
      setMsg("Title and content are required.")
      setIsSuccess(false)
      return
    }

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, content }),
    })

    const { success, message }: ApiResponse = await res.json()
    setMsg(message)
    setIsSuccess(success)
    if (!success) return
    window.location.reload()
  }

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 grid place-items-center p-4"
      onClick={onClose}
    >
      {/* Modal — stop click propagating to overlay */}
      <div
        className="w-full max-w-md bg-[#18181c] border border-[#2e2e38] rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">New item</p>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Create Todo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#222228] border border-[#2e2e38] text-zinc-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 grid place-items-center transition-colors"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Build auth middleware"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#222228] border border-[#2e2e38] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#7b61ff] focus:ring-2 focus:ring-[#7b61ff]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium flex items-center gap-2">
              Content
              <span className="text-[9px] text-zinc-700 normal-case tracking-normal">optional</span>
            </label>
            <textarea
              placeholder="Add details or notes..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={3}
              className="w-full bg-[#222228] border border-[#2e2e38] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#7b61ff] focus:ring-2 focus:ring-[#7b61ff]/20 transition-all resize-none"
            />
          </div>
        </div>

        {/* Message */}
        {msg && (
          <p className={`mt-4 text-xs px-3 py-2.5 rounded-lg border ${
            isSuccess
              ? "bg-[#c8f135]/8 border-[#c8f135]/20 text-[#c8f135]"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            {msg}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[#222228] border border-[#2e2e38] text-zinc-400 hover:text-white hover:bg-[#2e2e38] rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title}
            className="flex-[2] py-3 bg-[#c8f135] text-[#0e0e10] rounded-xl text-sm font-bold tracking-wide hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#c8f135]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
          >
            Create Todo ✦
          </button>
        </div>
      </div>
    </div>
  )
}