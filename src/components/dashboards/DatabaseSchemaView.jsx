import React, { useState } from 'react';
import { Database, Key, Table, Code, Copy, Check, Server, Layers, FileCode } from 'lucide-react';
import { DATABASE_SCHEMA_OVERVIEW } from '../../data/mockData';

export default function DatabaseSchemaView() {
  const [selectedTable, setSelectedTable] = useState(DATABASE_SCHEMA_OVERVIEW[0].table);
  const [copiedSql, setCopiedSql] = useState(false);

  const activeTableObj = DATABASE_SCHEMA_OVERVIEW.find(t => t.table === selectedTable) || DATABASE_SCHEMA_OVERVIEW[0];

  const generateSqlDdl = () => {
    return DATABASE_SCHEMA_OVERVIEW.map(t => {
      const cols = t.columns.map(c => {
        let line = `  ${c.name.padEnd(20)} ${c.type}`;
        if (c.pk) line += ' PRIMARY KEY';
        if (c.fk) line += ` REFERENCES ${c.fk}`;
        return line;
      }).join(',\n');
      return `-- Table: ${t.table}\n-- Purpose: ${t.purpose}\nCREATE TABLE ${t.table.toLowerCase()} (\n${cols}\n);`;
    }).join('\n\n');
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(generateSqlDdl());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div style={{ padding: '40px 0', background: 'var(--bg-main)', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '28px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Database size={28} color="white" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.6rem', color: 'white' }}>PostgreSQL / Supabase Database Architecture</h2>
                  <span className="badge badge-amber">Section 7 Specification</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '4px' }}>
                  Relational Schema Inspection • Core 8 Tables • Relational Keys & SQL DDL Export
                </div>
              </div>
            </div>

            <button onClick={handleCopySql} className="btn-primary" style={{ background: copiedSql ? '#059669' : '#f59e0b', color: '#0f172a', fontWeight: 800 }}>
              {copiedSql ? <Check size={16} /> : <FileCode size={16} />}
              {copiedSql ? 'SQL Script Copied!' : 'Export PostgreSQL DDL Script'}
            </button>
          </div>
        </div>

        {/* 8 Tables Explorer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px', alignItems: 'start' }}>
          
          {/* Table List Sidebar */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
              Relational Tables (8)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {DATABASE_SCHEMA_OVERVIEW.map(t => {
                const isSelected = t.table === selectedTable;
                return (
                  <button
                    key={t.table}
                    onClick={() => setSelectedTable(t.table)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: isSelected ? '1px solid #f59e0b' : '1px solid transparent',
                      background: isSelected ? '#fffbeb' : '#f8fafc',
                      color: isSelected ? '#b45309' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Table size={16} color={isSelected ? '#b45309' : '#64748b'} />
                      <span>{t.table}</span>
                    </div>
                    <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>{t.columns.length} Cols</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Schema Detail view */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '6px' }}>Table Inspection</span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-900)' }}>public.{activeTableObj.table.toLowerCase()}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>{activeTableObj.purpose}</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Engine</div>
                <div style={{ fontWeight: 800, color: '#0f172a' }}>PostgreSQL / Supabase</div>
              </div>
            </div>

            {/* Columns Table */}
            <div style={{ overflowX: 'auto', marginBottom: '28px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px' }}>Column Name</th>
                    <th style={{ padding: '12px' }}>Data Type</th>
                    <th style={{ padding: '12px' }}>Constraint</th>
                    <th style={{ padding: '12px' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTableObj.columns.map((col, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', fontWeight: 700, fontFamily: 'monospace', color: '#1e40af' }}>{col.name}</td>
                      <td style={{ padding: '12px', fontFamily: 'monospace', color: '#d97706' }}>{col.type}</td>
                      <td style={{ padding: '12px' }}>
                        {col.pk && <span className="badge badge-amber"><Key size={11} /> PK</span>}
                        {col.fk && <span className="badge badge-purple" style={{ marginLeft: '4px' }}>FK ➔ {col.fk}</span>}
                        {!col.pk && !col.fk && <span style={{ color: '#cbd5e1' }}>—</span>}
                      </td>
                      <td style={{ padding: '12px', color: '#475569', fontSize: '0.82rem' }}>{col.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Generated DDL Code snippet */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Generated PostgreSQL DDL</h4>
              <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '18px', borderRadius: '10px', fontSize: '0.82rem', fontFamily: 'monospace', overflowX: 'auto' }}>
{`CREATE TABLE ${activeTableObj.table.toLowerCase()} (
${activeTableObj.columns.map(c => `  ${c.name.padEnd(20)} ${c.type}${c.pk ? ' PRIMARY KEY' : ''}${c.fk ? ` REFERENCES ${c.fk}` : ''}`).join(',\n')}
);`}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
