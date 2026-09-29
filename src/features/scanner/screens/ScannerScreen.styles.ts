import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  instruction: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginBottom: 14,
  },

  cameraContainer: {
    flex: 1,
    minHeight: 420,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#111827",
  },

  camera: {
    flex: 1,
  },


  frameHint: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "500",
  },

  captureContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 8,
  },

  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    borderWidth: 5,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563EB",
  },

 previewContainer: {
  flex: 1,
  minHeight: 420,
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: "#f3f4f602",
},

previewFrame: {
  width: "82%",
  height: "68%",
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#000000",
},

previewImage: {
  width: "100%",
  height: "100%",
},

  previewActions: {
    gap: 12,
    paddingTop: 16,
  },

  actionButton: {
    minHeight: 52,
    borderRadius: 12,
  },
});