"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAdmin } from "@/lib/authService";
import styles from "@/app/login/login.module.css";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const success = loginAdmin(email, password);

    if (!success) {
      setError("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    const nextUrl = searchParams.get("next") || "/admin/dashboard";
    router.replace(nextUrl);
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Ads of Stupid</p>
          <h1>Admin sign in</h1>
          <p className={styles.description}>
            Blog management only. Use the dummy credentials below to access the
            dashboard.
          </p>
          <div className={styles.credentials}>
            <span>Email: admin@example.com</span>
            <span>Password: admin123</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              className={styles.input}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              className={styles.input}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button className={styles.button} disabled={isSubmitting} type="submit">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
