import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, X, AlertCircle, Loader, Mail, Phone, MessageSquare } from 'lucide-react';
import { api, ContactItem } from '../../services/api';

const STATUS_COLORS: Record<ContactItem['status'], string> = {
  new: 'bg-blue-500/15 text-blue-400',
  read: 'bg-gray-700 text-gray-400',
  replied: 'bg-green-500/15 text-green-400',
};

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const loadContacts = () => {
    setLoading(true);
    api.contact.list()
      .then((res: any) => {
        const list = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.contacts) ? res.contacts
          : [];
        setContacts(list);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadContacts(); }, []);

  const handleStatusChange = async (id: string, status: ContactItem['status']) => {
    try {
      await api.contact.updateStatus(id, status);
      setContacts((c) => c.map((x) => x._id === id ? { ...x, status } : x));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.contact.delete(id);
      setContacts((c) => c.filter((x) => x._id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => prev === id ? null : id);
    // Auto-mark as read when opened
    const contact = contacts.find((c) => c._id === id);
    if (contact && contact.status === 'new') {
      handleStatusChange(id, 'read');
    }
  };

  const newCount = contacts.filter((c) => c.status === 'new').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
            Contact Submissions
            {newCount > 0 && (
              <span className="text-sm bg-blue-500 text-white px-2.5 py-0.5 rounded-full font-semibold">
                {newCount} new
              </span>
            )}
          </h1>
          <p className="text-gray-400 text-sm">View and manage messages from clients</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-700" />
          <p className="text-lg mb-2">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <motion.div
              key={contact._id}
              layout
              className={`bg-gray-900 border rounded-xl overflow-hidden transition-colors ${contact.status === 'new' ? 'border-blue-500/40' : 'border-gray-800'}`}
            >
              {/* Row */}
              <button
                onClick={() => toggleExpand(contact._id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white font-semibold truncate">{contact.name}</p>
                    <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[contact.status]}`}>
                      {contact.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-xs">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>
                    {contact.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>}
                    <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(contact._id); }}
                    disabled={deletingId === contact._id}
                    className="p-2 text-gray-600 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-40"
                  >
                    {deletingId === contact._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </button>

              {/* Expanded */}
              {expanded === contact._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5 border-t border-gray-800"
                >
                  <p className="text-gray-300 text-sm mt-4 mb-5 leading-relaxed whitespace-pre-wrap">
                    {contact.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-gray-500 text-xs mr-2">Mark as:</p>
                    {(['new', 'read', 'replied'] as ContactItem['status'][]).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(contact._id, s)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                          contact.status === s
                            ? 'ring-2 ring-sage-green bg-sage-green/10 text-sage-green'
                            : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}

                    <a
                      href={`mailto:${contact.email}`}
                      onClick={() => handleStatusChange(contact._id, 'replied')}
                      className="ml-auto flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      Reply via Email
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
