import { storageService } from './storage';

interface NavoraAccount {
  name: string;
  preferredName: string;
  password: string;
}

const ACCOUNT_STORAGE_KEY = 'account';

export const accountService = {
  createAccount(
    name: string,
    preferredName: string,
    password: string
  ): void {
    const account: NavoraAccount = {
      name: name.trim(),
      preferredName: preferredName.trim(),
      password,
    };

    storageService.setItem<NavoraAccount>(
      ACCOUNT_STORAGE_KEY,
      account
    );
  },

  login(accountId: string, password: string): boolean {
    const account = storageService.getItem<NavoraAccount | null>(
      ACCOUNT_STORAGE_KEY,
      null
    );

    if (!account) {
      return false;
    }

    return (
      account.name.toLowerCase() === accountId.trim().toLowerCase() &&
      account.password === password
    );
  },

  getAccount(): NavoraAccount | null {
    return storageService.getItem<NavoraAccount | null>(
      ACCOUNT_STORAGE_KEY,
      null
    );
  },
};