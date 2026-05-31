import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Users, FolderKanban, CheckSquare, BookOpen,
  Plus, Pencil, Trash2, X, Save, Search, ChevronDown,
} from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useSEO } from '../lib/seo'

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUSES   = ['Not Started', 'In Progress', 'In Review', 'Blocked', 'Needs Shane', 'Complete', 'Parked']
const PRIORITIES = ['Critical', 'High', 'Medium', 'Low']

const STATUS_STYLES = {
  'Not Started':  { bg: 'var(--surface-subtle)',         color: 'var(--text-tertiary)',      border: 'var(--border-default)' },
  'In Progress':  { bg: 'rgba(99,102,241,0.12)',          color: 'var(--color-brand-400)',    border: 'rgba(99,102,241,0.25)' },
  'In Review':    { bg: 'rgba(245,158,11,0.1)',           color: 'var(--color-accent-500)',   border: 'rgba(245,158,11,0.2)' },
  'Blocked':      { bg: 'rgba(220,38,38,0.1)',            color: 'var(--color-danger)',       border: 'rgba(220,38,38,0.2)' },
  'Needs Shane':  { bg: 'rgba(124,58,237,0.12)',          color: '#a78bfa',                   border: 'rgba(124,58,237,0.25)' },
  'Complete':     { bg: 'rgba(22,163,74,0.1)',            color: 'var(--color-success)',      border: 'rgba(22,163,74,0.2)' },
  'Parked':       { bg: 'var(--surface-overlay)',         color: 'var(--text-disabled)',      border: 'var(--border-default)' },
}

const PRIORITY_STYLES = {
  Critical: { color: 'var(--color-danger)',      dot: 'var(--color-danger)' },
  High:     { color: 'var(--color-accent-500)',  dot: 'var(--color-accent-500)' },
  Medium:   { color: 'var(--color-brand-400)',   dot: 'var(--color-brand-400)' },
  Low:      { color: 'var(--text-tertiary)',     dot: 'var(--text-disabled)' },
}

const PACKAGES = ['Website Only', 'Website + Hosting Care', 'Website + Social Growth', 'Website + Marketing Engine', 'Website + AI Automation', 'Full AI Growth Package', 'Custom']

// ── Small shared UI ───────────────────────────────────────────────────────────

function Chip({ label, styles }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 'var(--text-xs)', fontWeight: 500,
      padding: '2px var(--space-2)',
      borderRadius: 'var(--radius-sm)',
      background: styles.bg, color: styles.color, border: `1px solid ${styles.border}`,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

function PriorityDot({ priority }) {
  const s = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: s.color }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {priority}
    </span>
  )
}

const inputCls = {
  width: '100%', padding: '8px var(--space-3)',
  fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
  background: 'var(--surface-subtle)', border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-md)', outline: 'none', fontFamily: 'inherit',
  transition: 'border-color 120ms ease',
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function Modal({ title, onClose, onSave, children, reduceMotion }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--space-4)',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={reduceMotion ? {} : { scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--surface-raised)', border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)',
            width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-default)' }}>
            <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 'var(--space-1)', display: 'flex' }}>
              <X size={18} />
            </button>
          </div>
          <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {children}
          </div>
          <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
            <button onClick={onClose} style={{ height: 36, padding: '0 var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit' }}>
              Cancel
            </button>
            <button onClick={onSave} style={{ height: 36, padding: '0 var(--space-4)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: '#fff', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Save size={13} /> Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ModalField({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 'var(--space-2)' }}>{label}</label>
      {children}
    </div>
  )
}

function ModalInput({ id, value, onChange, placeholder, type = 'text' }) {
  return <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputCls} onFocus={(e) => { e.target.style.borderColor = 'var(--border-focus)' }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }} />
}

function ModalSelect({ id, value, onChange, options, placeholder }) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputCls, appearance: 'none', cursor: 'pointer' }} onFocus={(e) => { e.target.style.borderColor = 'var(--border-focus)' }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function ModalTextarea({ id, value, onChange, placeholder, rows = 3 }) {
  return <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...inputCls, resize: 'vertical' }} onFocus={(e) => { e.target.style.borderColor = 'var(--border-focus)' }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }} />
}

// ── Table ─────────────────────────────────────────────────────────────────────

function Table({ headers, rows, onEdit, onDelete }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', minWidth: 600 }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-strong)', background: 'var(--surface-raised)', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
            <th style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-strong)', background: 'var(--surface-raised)', width: 80 }} />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length + 1} style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                No records yet. Click "+ Add" to create one.
              </td>
            </tr>
          ) : rows.map((row, i) => (
            <tr key={row.id} style={{ background: i % 2 === 0 ? 'var(--surface-raised)' : 'transparent', transition: 'background 80ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-overlay)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? 'var(--surface-raised)' : 'transparent' }}
            >
              {row.cells.map((cell, ci) => (
                <td key={ci} style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-default)', color: 'var(--text-primary)', verticalAlign: 'middle' }}>{cell}</td>
              ))}
              <td style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <button onClick={() => onEdit(row.id)} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 80ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}>
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => onDelete(row.id)} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 80ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Clients tab ───────────────────────────────────────────────────────────────

const blankClient = () => ({ id: crypto.randomUUID(), name: '', businessName: '', email: '', phone: '', package: '', status: 'Not Started', priority: 'Medium', notes: '' })

function ClientsTab({ reduceMotion }) {
  const [clients, setClients] = useLocalStorage('goai-clients', [])
  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState(blankClient())
  const [search, setSearch] = useState('')

  const openAdd = () => { setDraft(blankClient()); setModal('add') }
  const openEdit = (id) => { const c = clients.find(c => c.id === id); setDraft({ ...c }); setModal('edit') }
  const handleSave = () => {
    if (!draft.name && !draft.businessName) return
    if (modal === 'add') setClients(prev => [...prev, draft])
    else setClients(prev => prev.map(c => c.id === draft.id ? draft : c))
    setModal(null)
  }
  const handleDelete = (id) => { if (confirm('Delete this client?')) setClients(prev => prev.filter(c => c.id !== id)) }
  const filtered = clients.filter(c => [c.name, c.businessName, c.email].some(f => f?.toLowerCase().includes(search.toLowerCase())))

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
          <input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputCls, paddingLeft: 32 }} />
        </div>
        <button onClick={openAdd} style={{ height: 36, padding: '0 var(--space-4)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: '#fff', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
          <Plus size={14} /> Add client
        </button>
      </div>

      <Table
        headers={['Name', 'Business', 'Email', 'Package', 'Status', 'Priority']}
        rows={filtered.map(c => ({ id: c.id, cells: [c.name, c.businessName, c.email || '—', c.package || '—', <Chip key="s" label={c.status} styles={STATUS_STYLES[c.status]} />, <PriorityDot key="p" priority={c.priority} />] }))}
        onEdit={openEdit} onDelete={handleDelete}
      />

      {modal && (
        <Modal title={modal === 'add' ? 'Add client' : 'Edit client'} onClose={() => setModal(null)} onSave={handleSave} reduceMotion={reduceMotion}>
          <ModalField label="Name" id="c-name"><ModalInput id="c-name" value={draft.name} onChange={v => setDraft(p => ({ ...p, name: v }))} placeholder="Contact name" /></ModalField>
          <ModalField label="Business name" id="c-biz"><ModalInput id="c-biz" value={draft.businessName} onChange={v => setDraft(p => ({ ...p, businessName: v }))} placeholder="Business name" /></ModalField>
          <div className="grid grid-cols-2 gap-4">
            <ModalField label="Email" id="c-email"><ModalInput id="c-email" type="email" value={draft.email} onChange={v => setDraft(p => ({ ...p, email: v }))} placeholder="email@example.com" /></ModalField>
            <ModalField label="Phone" id="c-phone"><ModalInput id="c-phone" value={draft.phone} onChange={v => setDraft(p => ({ ...p, phone: v }))} placeholder="+30 000 0000" /></ModalField>
          </div>
          <ModalField label="Package" id="c-pkg"><ModalSelect id="c-pkg" value={draft.package} onChange={v => setDraft(p => ({ ...p, package: v }))} options={PACKAGES} placeholder="Select package" /></ModalField>
          <div className="grid grid-cols-2 gap-4">
            <ModalField label="Status" id="c-status"><ModalSelect id="c-status" value={draft.status} onChange={v => setDraft(p => ({ ...p, status: v }))} options={STATUSES} /></ModalField>
            <ModalField label="Priority" id="c-priority"><ModalSelect id="c-priority" value={draft.priority} onChange={v => setDraft(p => ({ ...p, priority: v }))} options={PRIORITIES} /></ModalField>
          </div>
          <ModalField label="Notes" id="c-notes"><ModalTextarea id="c-notes" value={draft.notes} onChange={v => setDraft(p => ({ ...p, notes: v }))} placeholder="Any notes..." rows={3} /></ModalField>
        </Modal>
      )}
    </>
  )
}

// ── Projects tab ──────────────────────────────────────────────────────────────

const blankProject = () => ({ id: crypto.randomUUID(), name: '', clientName: '', type: '', status: 'Not Started', priority: 'Medium', dueDate: '', notes: '' })

function ProjectsTab({ reduceMotion }) {
  const [projects, setProjects] = useLocalStorage('goai-projects', [])
  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState(blankProject())

  const openAdd = () => { setDraft(blankProject()); setModal('add') }
  const openEdit = (id) => { setDraft({ ...projects.find(p => p.id === id) }); setModal('edit') }
  const handleSave = () => {
    if (!draft.name) return
    if (modal === 'add') setProjects(prev => [...prev, draft])
    else setProjects(prev => prev.map(p => p.id === draft.id ? draft : p))
    setModal(null)
  }
  const handleDelete = (id) => { if (confirm('Delete this project?')) setProjects(prev => prev.filter(p => p.id !== id)) }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-5)' }}>
        <button onClick={openAdd} style={{ height: 36, padding: '0 var(--space-4)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: '#fff', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit' }}>
          <Plus size={14} /> Add project
        </button>
      </div>
      <Table
        headers={['Project', 'Client', 'Type', 'Status', 'Priority', 'Due date']}
        rows={projects.map(p => ({ id: p.id, cells: [p.name, p.clientName || '—', p.type || '—', <Chip key="s" label={p.status} styles={STATUS_STYLES[p.status]} />, <PriorityDot key="p" priority={p.priority} />, p.dueDate || '—'] }))}
        onEdit={openEdit} onDelete={handleDelete}
      />
      {modal && (
        <Modal title={modal === 'add' ? 'Add project' : 'Edit project'} onClose={() => setModal(null)} onSave={handleSave} reduceMotion={reduceMotion}>
          <ModalField label="Project name" id="p-name"><ModalInput id="p-name" value={draft.name} onChange={v => setDraft(p => ({ ...p, name: v }))} placeholder="e.g. Santorini Villas — Website Build" /></ModalField>
          <div className="grid grid-cols-2 gap-4">
            <ModalField label="Client" id="p-client"><ModalInput id="p-client" value={draft.clientName} onChange={v => setDraft(p => ({ ...p, clientName: v }))} placeholder="Client name" /></ModalField>
            <ModalField label="Type" id="p-type"><ModalInput id="p-type" value={draft.type} onChange={v => setDraft(p => ({ ...p, type: v }))} placeholder="e.g. Website Build, SEO, Video" /></ModalField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ModalField label="Status" id="p-status"><ModalSelect id="p-status" value={draft.status} onChange={v => setDraft(p => ({ ...p, status: v }))} options={STATUSES} /></ModalField>
            <ModalField label="Priority" id="p-priority"><ModalSelect id="p-priority" value={draft.priority} onChange={v => setDraft(p => ({ ...p, priority: v }))} options={PRIORITIES} /></ModalField>
          </div>
          <ModalField label="Due date" id="p-due"><ModalInput id="p-due" type="date" value={draft.dueDate} onChange={v => setDraft(p => ({ ...p, dueDate: v }))} /></ModalField>
          <ModalField label="Notes" id="p-notes"><ModalTextarea id="p-notes" value={draft.notes} onChange={v => setDraft(p => ({ ...p, notes: v }))} placeholder="Notes..." /></ModalField>
        </Modal>
      )}
    </>
  )
}

// ── Tasks tab ─────────────────────────────────────────────────────────────────

const blankTask = () => ({ id: crypto.randomUUID(), title: '', project: '', status: 'Not Started', priority: 'Medium', dueDate: '', notes: '' })

function TasksTab({ reduceMotion }) {
  const [tasks, setTasks] = useLocalStorage('goai-tasks', [])
  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState(blankTask())
  const [filter, setFilter] = useState('All')

  const openAdd = () => { setDraft(blankTask()); setModal('add') }
  const openEdit = (id) => { setDraft({ ...tasks.find(t => t.id === id) }); setModal('edit') }
  const handleSave = () => {
    if (!draft.title) return
    if (modal === 'add') setTasks(prev => [...prev, draft])
    else setTasks(prev => prev.map(t => t.id === draft.id ? draft : t))
    setModal(null)
  }
  const handleDelete = (id) => { if (confirm('Delete this task?')) setTasks(prev => prev.filter(t => t.id !== id)) }
  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.status === filter)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {['All', ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ height: 28, padding: '0 var(--space-3)', fontSize: 'var(--text-xs)', fontWeight: 500, background: filter === s ? 'var(--color-brand-500)' : 'transparent', color: filter === s ? '#fff' : 'var(--text-secondary)', border: filter === s ? '1px solid var(--color-brand-600)' : '1px solid var(--border-default)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={openAdd} style={{ height: 36, padding: '0 var(--space-4)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: '#fff', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
          <Plus size={14} /> Add task
        </button>
      </div>
      <Table
        headers={['Task', 'Project', 'Status', 'Priority', 'Due date']}
        rows={filtered.map(t => ({ id: t.id, cells: [t.title, t.project || '—', <Chip key="s" label={t.status} styles={STATUS_STYLES[t.status]} />, <PriorityDot key="p" priority={t.priority} />, t.dueDate || '—'] }))}
        onEdit={openEdit} onDelete={handleDelete}
      />
      {modal && (
        <Modal title={modal === 'add' ? 'Add task' : 'Edit task'} onClose={() => setModal(null)} onSave={handleSave} reduceMotion={reduceMotion}>
          <ModalField label="Task title" id="t-title"><ModalInput id="t-title" value={draft.title} onChange={v => setDraft(p => ({ ...p, title: v }))} placeholder="e.g. Write homepage copy" /></ModalField>
          <ModalField label="Project" id="t-project"><ModalInput id="t-project" value={draft.project} onChange={v => setDraft(p => ({ ...p, project: v }))} placeholder="Project name" /></ModalField>
          <div className="grid grid-cols-2 gap-4">
            <ModalField label="Status" id="t-status"><ModalSelect id="t-status" value={draft.status} onChange={v => setDraft(p => ({ ...p, status: v }))} options={STATUSES} /></ModalField>
            <ModalField label="Priority" id="t-priority"><ModalSelect id="t-priority" value={draft.priority} onChange={v => setDraft(p => ({ ...p, priority: v }))} options={PRIORITIES} /></ModalField>
          </div>
          <ModalField label="Due date" id="t-due"><ModalInput id="t-due" type="date" value={draft.dueDate} onChange={v => setDraft(p => ({ ...p, dueDate: v }))} /></ModalField>
          <ModalField label="Notes" id="t-notes"><ModalTextarea id="t-notes" value={draft.notes} onChange={v => setDraft(p => ({ ...p, notes: v }))} placeholder="Notes..." /></ModalField>
        </Modal>
      )}
    </>
  )
}

// ── Daily log tab ─────────────────────────────────────────────────────────────

const blankLog = () => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString().split('T')[0],
  completedToday: '', workingOn: '', blockers: '', needsShane: '', nextStep: '',
})

function DailyLogTab() {
  const [log, setLog] = useLocalStorage('goai-daily-log', [])
  const [entry, setEntry] = useState(blankLog())
  const [submitted, setSubmitted] = useState(false)

  const setField = (key) => (v) => setEntry(p => ({ ...p, [key]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLog(prev => [entry, ...prev])
    setEntry(blankLog())
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const deleteEntry = (id) => { if (confirm('Delete this log entry?')) setLog(prev => prev.filter(l => l.id !== id)) }

  return (
    <div style={{ display: 'grid', gap: 'var(--space-8)' }} className="daily-grid">
      {/* Form */}
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
          Log today's update
        </h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <ModalField label="Date" id="log-date"><ModalInput id="log-date" type="date" value={entry.date} onChange={setField('date')} /></ModalField>
          <ModalField label="Completed today" id="log-done"><ModalTextarea id="log-done" value={entry.completedToday} onChange={setField('completedToday')} placeholder="What did you finish today?" /></ModalField>
          <ModalField label="Working on" id="log-wip"><ModalTextarea id="log-wip" value={entry.workingOn} onChange={setField('workingOn')} placeholder="What are you currently working on?" /></ModalField>
          <ModalField label="Blockers" id="log-block"><ModalTextarea id="log-block" value={entry.blockers} onChange={setField('blockers')} placeholder="Anything blocking progress?" rows={2} /></ModalField>
          <ModalField label="Needs Shane" id="log-shane"><ModalTextarea id="log-shane" value={entry.needsShane} onChange={setField('needsShane')} placeholder="What needs Shane's input or decision?" rows={2} /></ModalField>
          <ModalField label="Next step" id="log-next"><ModalTextarea id="log-next" value={entry.nextStep} onChange={setField('nextStep')} placeholder="What's the immediate next action?" rows={2} /></ModalField>
          <button type="submit" style={{ height: 40, padding: '0 var(--space-5)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', alignSelf: 'flex-start', fontSize: 'var(--text-sm)', fontWeight: 500, background: submitted ? 'var(--color-success)' : 'var(--color-brand-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms ease' }}>
            <Save size={13} />
            {submitted ? 'Saved!' : 'Save update'}
          </button>
        </form>
      </div>

      {/* Log history */}
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
          Update history ({log.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {log.length === 0 && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>No updates logged yet.</p>}
          {log.map(l => (
            <div key={l.id} style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', position: 'relative' }}>
              <button onClick={() => deleteEntry(l.id)} style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)', background: 'none', border: 'none', color: 'var(--text-disabled)', cursor: 'pointer' }} title="Delete">
                <Trash2 size={13} />
              </button>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-brand-400)', marginBottom: 'var(--space-4)' }}>{l.date}</p>
              {[['Completed', l.completedToday], ['Working on', l.workingOn], ['Blockers', l.blockers], ['Needs Shane', l.needsShane], ['Next step', l.nextStep]].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} style={{ marginBottom: 'var(--space-3)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>{k}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{v}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .daily-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .daily-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'clients',  label: 'Clients',       icon: Users },
  { id: 'projects', label: 'Projects',      icon: FolderKanban },
  { id: 'tasks',    label: 'Tasks',         icon: CheckSquare },
  { id: 'daily',    label: 'Daily Updates', icon: BookOpen },
]

export default function ControlCentre() {
  const reduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState('clients')
  useSEO({ title: 'Control Centre', description: 'GO AI internal control centre — clients, projects, tasks and daily updates.' })

  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--surface-base)' }}>
      {/* Header */}
      <div style={{ background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-default)', padding: 'var(--space-6) var(--space-8)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
            <div>
              <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
                Control Centre
              </h1>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
                Internal tool — clients, projects, tasks and daily updates
              </p>
            </div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-tertiary)', background: 'var(--surface-overlay)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-full)', padding: '3px var(--space-3)' }}>
              Staff only
            </span>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            {TABS.map(tab => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    height: 36, padding: '0 var(--space-4)',
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)', fontWeight: 500,
                    background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                    color: active ? 'var(--color-brand-400)' : 'var(--text-secondary)',
                    border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 120ms ease',
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'var(--surface-subtle)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', padding: 'var(--space-8)' }}>
        <motion.div
          key={activeTab}
          initial={reduceMotion ? {} : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'clients'  && <ClientsTab reduceMotion={reduceMotion} />}
          {activeTab === 'projects' && <ProjectsTab reduceMotion={reduceMotion} />}
          {activeTab === 'tasks'    && <TasksTab reduceMotion={reduceMotion} />}
          {activeTab === 'daily'    && <DailyLogTab />}
        </motion.div>
      </div>
    </main>
  )
}
