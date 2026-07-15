export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Documents: undefined;
  Scanner: undefined;
  Users: undefined;
  Settings: undefined;
};

export type DocumentsStackParamList = {
  DocumentsList: undefined;
  ReceiveDocument: undefined;
  DocumentDetails: {
    documentId: string;
  };
};