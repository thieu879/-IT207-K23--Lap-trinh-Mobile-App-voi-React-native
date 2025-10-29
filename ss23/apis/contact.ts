import { Contact, ContactFormData, ContactTag } from "../types";
import { axiosInstance } from "../utils/axiosInstance";

// Backend enum values
type ApiTag = "FAMILY" | "FRIEND" | "COLLEAGUE" | "OTHER";

// Map API <-> UI enum labels
const apiToUiTag = (tag: ApiTag): ContactTag => {
  switch (tag) {
    case "FAMILY":
      return ContactTag.Family;
    case "FRIEND":
      return ContactTag.Friend;
    case "COLLEAGUE":
      return ContactTag.Colleague;
    default:
      return ContactTag.Other;
  }
};

const uiToApiTag = (tag: ContactTag): ApiTag => {
  switch (tag) {
    case ContactTag.Family:
      return "FAMILY";
    case ContactTag.Friend:
      return "FRIEND";
    case ContactTag.Colleague:
      return "COLLEAGUE";
    default:
      return "OTHER";
  }
};

// Shapes expected from backend
type ApiContact = {
  id: number;
  name: string;
  phone: string;
  tag: ApiTag;
  isBlocked: boolean;
};

const fromApi = (c: ApiContact): Contact => ({
  id: String(c.id),
  name: c.name,
  phone: c.phone,
  tag: apiToUiTag(c.tag),
  isBlocked: c.isBlocked,
});

const toApiBody = (data: ContactFormData) => ({
  name: data.name,
  phone: data.phone,
  tag: uiToApiTag(data.tag),
});

export const ContactApi = {
  async getAll(): Promise<Contact[]> {
    const res = await axiosInstance.get<ApiContact[]>("/contacts");
    return res.data.map(fromApi);
  },

  async getBlocked(): Promise<Contact[]> {
    const res = await axiosInstance.get<ApiContact[]>("/contacts/blocked");
    return res.data.map(fromApi);
  },

  async getById(id: string): Promise<Contact> {
    const res = await axiosInstance.get<ApiContact>(`/contacts/${id}`);
    return fromApi(res.data);
  },

  async create(data: ContactFormData): Promise<Contact> {
    const res = await axiosInstance.post<ApiContact>(
      "/contacts",
      toApiBody(data)
    );
    return fromApi(res.data);
  },

  async update(id: string, data: ContactFormData): Promise<Contact> {
    const res = await axiosInstance.put<ApiContact>(
      `/contacts/${id}`,
      toApiBody(data)
    );
    return fromApi(res.data);
  },

  async toggleBlock(id: string): Promise<Contact> {
    const res = await axiosInstance.patch<ApiContact>(
      `/contacts/${id}/toggle-block`
    );
    return fromApi(res.data);
  },

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/contacts/${id}`);
  },
};

export type { ApiTag };
