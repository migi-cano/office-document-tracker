export interface Recipient {
  id: string;
  name: string;
  department: string;
  qrToken: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecipientRequest {
  name: string;
  department: string;
}

export interface UpdateRecipientRequest {
  name: string;
  department: string;
  isActive: boolean;
}