import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type DocumentsStackParamList = {
  DocumentsList: undefined;

 ReceiveDocument: {
    imageUri?: string;
    ocrText?: string;
    title?: string;
    subject?: string;
    documentType?: string;
};

  OutgoingDocument: undefined;

  DocumentDetails: {
    documentId: string;
  };

  EditDocument: {
    documentId: string;
  };
};

export type MainTabParamList = {
  Dashboard: undefined;

  Documents: NavigatorScreenParams<DocumentsStackParamList>;

  Scanner: undefined;
  Users: undefined;
  Settings: undefined;
};