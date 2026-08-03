import { NavigatorScreenParams } from "@react-navigation/native";
import { AiDocumentAnalysis } from "../features/documents/types";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type DocumentsStackParamList = {
DocumentsList: undefined;

 DocumentPreview: {
    imageUri: string;
    ocrText: string;
    analysis: AiDocumentAnalysis;
  };

 ReceiveDocument: {
    imageUri: string;
    ocrText: string;
    analysis: AiDocumentAnalysis;
}

 OutgoingDocument: {
    analysis: AiDocumentAnalysis;
    ocrText: string;
    imageUri: string;
  };

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