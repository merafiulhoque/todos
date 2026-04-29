"use client"

import { useEffect, useState } from "react"
import type { ApiResponse, Todo } from "@/types"
import { Edit2, Trash2, Plus, CheckSquare, Delete } from "lucide-react"
import TodoModal from "@/components/TodoModal"
import TodoEditModal from "@/components/TodoEditModal"

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [msg, setMsg] = useState<string>("")
  const [todoModalOpen, setTodoModalOpen] = useState<boolean>(false)
  const [doneIds, setDoneIds] = useState<Set<number>>(new Set())
  const [editTodo, setEditTodo] = useState<Todo | null>(null)

  const getTodos = async () => {
    const res = await fetch("/api/todos", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
    const resData = await res.json()
    if (!resData.success) { setMsg("No todos found..."); return }
    setTodos(resData.data)
  }

  const deleteTodo = async (id: number) => {

    if(!confirm("Are you sure ?")){
      return
    }
    const res = await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id }),
    })
    const {success, message} = await res.json()
    setMsg(message)
    if(!success) return
    window.location.reload()
  }

  const toggleDone = (id: number) => {
    setDoneIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  useEffect(() => { getTodos() }, [])
  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(""), 1500)
    return () => clearTimeout(t)
  }, [msg])

  return (
    <main className="min-h-screen bg-[#0e0e10] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-0.5">My workspace</p>
            <h1 className="text-3xl font-black tracking-tight">
              Todo<span className="text-[#c8f135]">s</span>
            </h1>
          </div>
          <button
            onClick={() => setTodoModalOpen(prev => !prev)}
            className="w-11 h-11 rounded-xl bg-[#c8f135] text-[#0e0e10] grid place-items-center hover:scale-105 transition-transform shadow-lg shadow-[#c8f13530]"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Total", value: todos.length },
            { label: "Done", value: doneIds.size },
            { label: "Pending", value: todos.length - doneIds.size },
          ].map(stat => (
            <div key={stat.label} className="bg-[#18181c] border border-[#2e2e38] rounded-xl p-3">
              <div className="text-2xl font-bold text-[#c8f135]">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="border border-dashed border-[#2e2e38] rounded-xl p-10 text-center text-zinc-500">
              <p className="text-3xl mb-2 opacity-40">📭</p>
              <p className="text-sm">No todos yet. Hit <strong>+</strong> to add one.</p>
            </div>
          ) : (
            todos.map((todo: Todo) => {
              const done = doneIds.has(todo.id)
              return (
                <div
                  key={todo.id}
                  className="group flex items-start gap-3 bg-[#18181c] border border-[#2e2e38] hover:border-[#7b61ff] rounded-xl p-4 transition-all hover:translate-x-1"
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleDone(todo.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 grid place-items-center transition-colors ${
                      done ? "bg-[#c8f135] border-[#c8f135]" : "border-[#2e2e38]"
                    }`}
                  >
                    {done && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#0e0e10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className={`font-semibold text-sm truncate transition-colors ${done ? "text-zinc-500 line-through" : "text-white"}`}>
                      {todo.title}
                    </h2>
                    {todo.content && (
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">{todo.content}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setEditTodo(todo)}
                      className="w-8 h-8 rounded-lg border border-[#2e2e38] bg-[#222228] text-zinc-500 hover:bg-[#7b61ff] hover:border-[#7b61ff] hover:text-white grid place-items-center transition-colors"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="w-8 h-8 rounded-lg border border-[#2e2e38] bg-[#222228] text-zinc-500 hover:bg-[#7b61ff] hover:border-[#7b61ff] hover:text-white grid place-items-center transition-colors"
                    >
                      <Delete size={13} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Toast */}
      {msg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#222228] border border-[#2e2e38] text-sm text-white px-4 py-2 rounded-full shadow-xl animate-fade-in">
          {msg}
        </div>
      )}

        {todoModalOpen && (
            <TodoModal onClose={() => setTodoModalOpen(false)} />
        )}

        {editTodo && (
            <TodoEditModal todo={editTodo} onClose={() => setEditTodo(null)} />
        )}
    </main>
  )
}