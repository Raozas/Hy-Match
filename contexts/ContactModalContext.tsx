import React, { createContext, useContext, useState } from "react";

interface ContactModalContextType {
  isContactModalVisible: boolean;
  setContactModalVisible: (visible: boolean) => void;
  currentJob: any;
  setCurrentJob: (job: any) => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined
);

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  return (
    <ContactModalContext.Provider
      value={{
        isContactModalVisible,
        setContactModalVisible,
        currentJob,
        setCurrentJob,
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider"
    );
  }
  return context;
}
