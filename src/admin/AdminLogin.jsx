import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
      setBusy(false);
      return;
    }
    const { data: adminRow, error: adminError } = await supabase
      .from("admin_users").select("user_id").eq("user_id", data.user.id).maybeSingle();
    if (adminError || !adminRow) {
      await supabase.auth.signOut();
      setError("This account is not authorized to access the admin portal.");
      setBusy(false);
      return;
    }
    navigate("/admin/properties");
  }

  return (
    <main className="admin-shell">
      <form className="admin-panel admin-login" onSubmit={handleSubmit}>
        <p className="admin-eyebrow">PROPERTY MANAGEMENT</p>
        <h1>Admin sign in</h1>
        <p className="admin-muted">Sign in with an account authorized by the site owner.</p>
        <label>Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
