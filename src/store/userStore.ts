import { create } from 'zustand';
import { UserProfile, Address, PaymentMethod } from '../types';
import { DEFAULT_USER } from '../mock/data';

interface UserState {
  user: UserProfile;
  updateProfile: (firstName: string, lastName: string, email: string, phone: string, avatar?: string) => void;
  addAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
}

const loadUserState = (): UserProfile => {
  if (typeof window === 'undefined') return DEFAULT_USER;
  try {
    const data = localStorage.getItem('client_user_profile');
    return data ? JSON.parse(data) : DEFAULT_USER;
  } catch (e) {
    return DEFAULT_USER;
  }
};

const saveUserState = (profile: UserProfile) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('client_user_profile', JSON.stringify(profile));
  }
};

export const useUserStore = create<UserState>((set) => ({
  user: loadUserState(),

  updateProfile: (firstName, lastName, email, phone, avatar) => {
    set((state) => {
      const updated = {
        ...state.user,
        firstName,
        lastName,
        email,
        phone,
        avatar: avatar || state.user.avatar
      };
      saveUserState(updated);
      return { user: updated };
    });
  },

  addAddress: (newAddr) => {
    set((state) => {
      const id = `addr-${Date.now()}`;
      const isFirst = state.user.addresses.length === 0;
      
      const updatedAddresses = [
        ...state.user.addresses,
        { ...newAddr, id, isDefault: isFirst }
      ];

      const updated = { ...state.user, addresses: updatedAddresses };
      saveUserState(updated);
      return { user: updated };
    });
  },

  removeAddress: (id) => {
    set((state) => {
      const deletedAddr = state.user.addresses.find(a => a.id === id);
      let updatedAddresses = state.user.addresses.filter(a => a.id !== id);
      
      if (deletedAddr?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
      
      const updated = { ...state.user, addresses: updatedAddresses };
      saveUserState(updated);
      return { user: updated };
    });
  },

  setDefaultAddress: (id) => {
    set((state) => {
      const updatedAddresses = state.user.addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      }));
      const updated = { ...state.user, addresses: updatedAddresses };
      saveUserState(updated);
      return { user: updated };
    });
  },

  addPaymentMethod: (newMethod) => {
    set((state) => {
      const id = `pay-${Date.now()}`;
      const updatedMethods = [
        ...state.user.paymentMethods,
        { ...newMethod, id }
      ];
      const updated = { ...state.user, paymentMethods: updatedMethods };
      saveUserState(updated);
      return { user: updated };
    });
  },

  removePaymentMethod: (id) => {
    set((state) => {
      const updatedMethods = state.user.paymentMethods.filter(m => m.id !== id);
      const updated = { ...state.user, paymentMethods: updatedMethods };
      saveUserState(updated);
      return { user: updated };
    });
  }
}));
