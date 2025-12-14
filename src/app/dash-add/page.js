"use client";
import { useState } from "react";

export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [allowed, setAllowed] = useState(false);

  const enter = async () => {
    const res = await fetch("/api/admin/check", {
      method: "POST",
      body: JSON.stringify({ password: pass }),
    });

    if (res.ok) setAllowed(true);
  };

  if (!allowed) {
    return (
      <div>
        <input
          className="border border-gray-300 rounded px-2 py-1"
          type="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={enter}>Enter</button>
      </div>
    );
  }

  return <div>ADMIN DASHBOARD</div>;
}
