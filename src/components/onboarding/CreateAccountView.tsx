import React, { useState } from 'react';
import { accountService } from '../../services/accountService';

interface CreateAccountViewProps {
  onBack: () => void;
  onContinue: () => void;
}

const CreateAccountView: React.FC<CreateAccountViewProps> = ({
  onBack,
  onContinue,
}) => {
  const [name, setName] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canContinue =
    name.trim().length > 0 &&
    preferredName.trim().length > 0 &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleContinue = () => {
  if (!canContinue) return;

  accountService.createAccount(
    name,
    preferredName,
    password
  );

  onContinue();
};

  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <section className="w-full max-w-2xl rounded-[28px] bg-white p-8 shadow-2xl sm:p-12">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 text-sm font-bold text-[#B1000E] transition hover:underline"
          >
            ← BACK
          </button>

          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
              NAVORA
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-5xl">
              CREATE ACCOUNT
            </h1>

            <p className="mt-3 text-base font-medium text-[#4A0005]/75">
              Create your shinobi identity and begin your journey.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                YOUR NAME
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>

            <div>
              <label
                htmlFor="preferred-name"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                PREFERRED NAME
              </label>

              <input
                id="preferred-name"
                type="text"
                value={preferredName}
                onChange={(event) => setPreferredName(event.target.value)}
                placeholder="What should NAVORA call you?"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                PASSWORD
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                CONFIRM PASSWORD
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter your password again"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="mt-10 w-full rounded-full bg-[#B1000E] px-8 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            CONTINUE →
          </button>
        </section>
      </div>
    </main>
  );
};

export default CreateAccountView;