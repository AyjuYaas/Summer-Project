export interface Message {
  sender: string;
  senderType: string;
  receiver: string;
  receiverType: string;
  text?: string;
  image?: string;
  createdAt: string;
}

export interface Document {
  _id: string;
  sender: string;
  senderType: string;
  receiver: string;
  receiverType: string;
  document: string;
  publicId: string;
  size: number;
  description: string;
  fileName: string;
  createdAt: string;
}
