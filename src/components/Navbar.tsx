"use client"

import { LogOut, Settings, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { use, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [msg, setMsg] = useState(null)
  const router = useRouter()
  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        modalRef.current && !modalRef.current.contains(e.target as Node) &&
        avatarRef.current && !avatarRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  async function getData(){
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      const data = await res.json()



      if(!data.success){
        router.push("/login")
        return
      }
      setName(data.data.name)
      setEmail(data.data.email)
    }

  async function handleLogout() {
    const res = await fetch("/api/auth/logout", {
      method: "POST"
    })
    const data = await res.json()
    
      setTimeout(() => {
        router.push("/login")
      }, 500)
    setMsg(data.message)
  }

  return (
    <nav className="relative h-16 bg-[#111110] w-full flex justify-between items-center px-6">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <h1 className="text-white font-mono text-sm font-medium tracking-widest">
          TASKMASTER
        </h1>
      </div>

      {/* Nav pills */}
      <div className="flex items-center gap-1">
        {["Dashboard", "Projects", "Calendar"].map((item) => (
          <button
            key={item}
            className="text-xs text-white/40 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/[0.07] hover:text-white/75 transition-all first-of-type:bg-white/10 first-of-type:text-white first-of-type:border-white/20"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Avatar */}
      <div
        ref={avatarRef}
        className="relative cursor-pointer"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/15 hover:border-white/40 transition-colors">
          <Image
            src="https://images.unsplash.com/photo-1776715139302-281f91c0c9ca?q=80&w=200&auto=format&fit=crop"
            alt="Profile"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <span className="absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#111110]" />
      </div>

      {/* Dropdown modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute top-14 right-5 w-56 bg-[#1a1a18] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* User info header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07]">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1776715139302-281f91c0c9ca?q=80&w=200&auto=format&fit=crop"
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white text-[13px] font-medium leading-tight">{name}</p>
              <p className="text-white/35 text-[11px]">{email}</p>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-white/60 hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              <User size={14} className="opacity-60" />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-white/60 hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              <Settings size={14} className="opacity-60" />
              Settings
            </Link>
            <div className="h-px bg-white/[0.07] my-1" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-400 hover:bg-red-500/[0.08] hover:text-red-300 transition-colors"
            >
              <LogOut size={14} className="opacity-60" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}