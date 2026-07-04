import { useEffect, useState } from 'react';
import { ALL_SERVICES, ADDON_NAMES } from '../data/siteData';

const EMPTY_FORM = { image: '', kicker: '', title: '', description: '', services: [], addons: [] };

export default function AdminPanel({ open, onClose, looks, setLooks }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowForm(false);
      setEditingIndex(null);
    }
  }, [open]);

  if (!open) return null;

  const openForm = (index) => {
    setEditingIndex(index);
    setForm(index === null ? EMPTY_FORM : { ...looks[index] });
    setShowForm(true);
  };

  const toggleField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }));
  };

  const save = () => {
    if (!form.image.trim() || !form.title.trim()) {
      alert('Please add at least an image URL and a title.');
      return;
    }
    const newLook = {
      image: form.image.trim(),
      kicker: form.kicker.trim() || 'New look',
      title: form.title.trim(),
      description: form.description.trim() || 'No description added yet.',
      services: form.services,
      addons: form.addons,
    };
    setLooks((prev) => {
      if (editingIndex !== null) {
        const copy = [...prev];
        copy[editingIndex] = newLook;
        return copy;
      }
      return [...prev, newLook];
    });
    setShowForm(false);
    setEditingIndex(null);
  };

  const remove = (index) => {
    setLooks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="admin-panel">
        <div className="admin-head">
          <div>
            <span className="eyebrow">Business tools</span>
            <h3>Manage lookbook</h3>
          </div>
          <button className="admin-close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <p className="admin-note">
          Preview only — changes apply to this browser session and reset when the page reloads. A live
          version of this would save straight to your account so it's there for every visitor.
        </p>

        <div className="admin-list">
          {looks.length === 0 && (
            <p style={{ fontSize: 13, opacity: 0.55, padding: 14 }}>No looks yet — add your first one below.</p>
          )}
          {looks.map((look, i) => (
            <div className="admin-item" key={i}>
              <img src={look.image} alt="" />
              <div className="ai-info">
                <div className="ai-title">{look.title}</div>
                <div className="ai-meta">{look.services.join(', ') || 'No services tagged'}</div>
              </div>
              <div className="ai-actions">
                <button onClick={() => openForm(i)}>Edit</button>
                <button onClick={() => remove(i)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }} onClick={() => openForm(null)}>
          + Add a new look
        </button>

        {showForm && (
          <div className="admin-form">
            <div className="field" style={{ marginBottom: 14 }}>
              <label htmlFor="af-img">Image URL</label>
              <input
                id="af-img" type="text" placeholder="Paste an image URL, or a path like images/your-photo.jpg"
                value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
            </div>
            <div className="field-row" style={{ marginBottom: 14 }}>
              <div className="field">
                <label htmlFor="af-kicker">Category tag</label>
                <input
                  id="af-kicker" type="text" placeholder="e.g. Colour work"
                  value={form.kicker} onChange={(e) => setForm((f) => ({ ...f, kicker: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="af-title">Look title</label>
                <input
                  id="af-title" type="text" placeholder="e.g. Copper Balayage"
                  value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
            </div>
            <div className="field" style={{ marginBottom: 16 }}>
              <label htmlFor="af-desc">What was done</label>
              <textarea
                id="af-desc" rows={3} placeholder="A short description of the technique, in your own words"
                value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="field-block" style={{ marginBottom: 16 }}>
              <span className="flabel">Services used</span>
              <div className="check-grid">
                {ALL_SERVICES.map((s) => (
                  <div
                    key={s.name}
                    className={`check-pill${form.services.includes(s.name) ? ' checked' : ''}`}
                    onClick={() => toggleField('services', s.name)}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="field-block" style={{ marginBottom: 20 }}>
              <span className="flabel">Add-ons (optional)</span>
              <div className="check-grid">
                {ADDON_NAMES.map((name) => (
                  <div
                    key={name}
                    className={`check-pill${form.addons.includes(name) ? ' checked' : ''}`}
                    onClick={() => toggleField('addons', name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-submit">
              <button type="button" className="btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="button" className="btn caramel" onClick={save}>Save look</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
