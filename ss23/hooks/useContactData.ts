// hooks/useContactData.ts
import { useEffect, useState } from "react";
import { ContactApi } from "../apis/contact";
import { Contact, ContactFormData } from "../types";

// Backend-connected data hook
export const useContactData = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ContactApi.getAll();
      setContacts(data);
    } catch (e: any) {
      setError(e?.message || "Không thể tải danh bạ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    loadAll();
  }, []);

  const addContact = async (form: ContactFormData) => {
    const created = await ContactApi.create(form);
    setContacts((prev) => [created, ...prev]);
  };

  const updateContact = async (id: string, form: ContactFormData) => {
    const updated = await ContactApi.update(id, form);
    setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const deleteContact = async (id: string) => {
    await ContactApi.remove(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleBlockStatus = async (id: string) => {
    const updated = await ContactApi.toggleBlock(id);
    setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const getById = async (id: string) => ContactApi.getById(id);
  const getBlocked = async () => ContactApi.getBlocked();

  return {
    contacts,
    loading,
    error,
    loadAll,
    addContact,
    updateContact,
    deleteContact,
    toggleBlockStatus,
    getById,
    getBlocked,
  };
};
