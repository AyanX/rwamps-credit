import { useState } from 'react';
import { useData, type Message } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { Trash2, Mail, Phone, ArrowLeft } from 'lucide-react';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './MessagesPage.module.scss';

const MessagesPage = () => {
  const { messages, setMessages, dataLoading } = useData();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const openMessage = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      try {
        await api.put.messages(message.id);
        setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, isRead: true } : m)));
      } catch {
        // Silently handle if marking as read fails
      }
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await api.delete.message(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setSelectedMessage(null);
      toast.success('Message deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (dataLoading) return <SkeletonLoader count={3} height="200px" />;

  const visibleMessages = messages

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Messages</h1>
      <p className={styles.pageDescription}>View and manage incoming messages and inquiries.</p>

      <div className={styles.messagesContainer}>
        {/* message list */}
        <div className={`${styles.messageList} ${selectedMessage ? styles.hideOnMobile : ''}`}>
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageItem} ${!message.isRead ? styles.unread : ''} ${selectedMessage?.id === message.id ? styles.active : ''}`}
              onClick={() => openMessage(message)}
            >
              <div className={styles.messageItemContent}>
                {/* green dot for unread */}
                {!message.isRead && <span className={styles.unreadDot} />}
                <div className={styles.messagePreview}>
                  <div className={styles.messageSender}>{message.name}</div>
                  <div className={styles.messageSubject}>{message.subject}</div>
                </div>
              </div>
            </div>
          ))}
          {visibleMessages.length === 0 && (
            <p className={styles.emptyMessage}>No messages yet</p>
          )}
        </div>

        {/* message detail */}
        <div className={`${styles.messageDetail} ${selectedMessage ? styles.showOnMobile : ''}`}>
          {selectedMessage ? (
            <>
              <button className={styles.backBtn} onClick={() => setSelectedMessage(null)}>
                <ArrowLeft size={18} /> Back
              </button>
              <div className={styles.messageDetailHeader}>
                <h3>{selectedMessage.subject}</h3>
              </div>
              <div className={styles.messageMeta}>
                <span className={styles.metaEmail}><Mail size={14} /> {selectedMessage.email}</span>
                <span className={styles.metaPhone}><Phone size={14} /> {selectedMessage.phone_number}</span>
              </div>
              <p className={styles.messageBody}>{selectedMessage.message}</p>
              {/* delete button below content on mobile */}
              <button className={styles.deleteMessageBtn} onClick={() => deleteMessage(selectedMessage.id)}>
                <Trash2 size={16} /> Delete
              </button>
            </>
          ) : (
            <p className={styles.selectMessage}>Select a message to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
