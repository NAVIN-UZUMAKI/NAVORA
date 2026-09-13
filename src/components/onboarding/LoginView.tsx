import React, { useState } from 'react';
import { accountService } from '../../services/accountService';

interface LoginViewProps {
  onBack: () => void;
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({
  onBack,
  onLogin,
}) => {
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const canLogin =
    accountId.trim().length > 0 && password.length > 0;

  const handleLogin = () => {
  if (!canLogin) return;

  const isValid = accountService.login(
    accountId,
    password
  );

  if (!isValid) {
    setError('INVALID ACCOUNT ID OR PASSWORD');
    return;
  }

  setError('');
  onLogin();
};

  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-2xl rounded-[28px] bg-white p-8 shadow-2xl sm:p-12">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 text-sm font-bold text-[#B1000E] transition hover:underline"
          >
            ← BACK
          </button>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
              NAVORA
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-5xl">
              WELCOME BACK
            </h1>

            <p className="mt-4 text-base font-medium text-[#4A0005]/75">
              Continue your journey and return to your missions.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="account-id"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                ACCOUNT ID
              </label>

              <input
                id="account-id"
                type="text"
                value={accountId}
                onChange={(event) => {
  setAccountId(event.target.value);
  setError('');
}}
                placeholder="Enter your account ID"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                PASSWORD
              </label>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => {
  setPassword(event.target.value);
  setError('');
}}
                placeholder="Enter your password"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>
            {error && (
  <p className="text-sm font-bold text-[#B1000E]">
    {error}
  </p>
)}
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={!canLogin}
            className="mt-10 w-full rounded-full bg-[#B1000E] px-8 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            LOGIN →
          </button>
        </section>
      </div>
    </main>
  );
};

export default LoginView;