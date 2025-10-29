import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type AlertDialogProps = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function AlertDialog({
  title,
  description,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    onCancel?.();
  };

  const handleConfirm = () => {
    setVisible(false);
    onConfirm?.();
  };

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.triggerText}>Open Alert</Text>
      </TouchableOpacity>

      {/* Dialog */}
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={handleClose}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Description */}
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}

            {/* Footer */}
            <View style={styles.footer}>
              <Pressable
                style={[styles.button, styles.cancel]}
                onPress={handleClose}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.confirm]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmText}>{confirmText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerButton: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    marginVertical: 10,
  },
  triggerText: {
    color: "#fff",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: "#333",
  },
  confirm: {
    backgroundColor: "#d9534f",
  },
  cancelText: {
    color: "#fff",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
