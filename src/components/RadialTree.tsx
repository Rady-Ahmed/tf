import React, { useMemo, useState } from 'react';
import { Person, FamilyBranch } from '../types/database';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface RadialTreeProps {
  persons: Person[];
  branches: FamilyBranch[];
  onSelectPerson: (p: Person) => void;
  selectedPersonId?: string;
}

export const RadialTree: React.FC<RadialTreeProps> = ({
  persons,
  onSelectPerson,
  selectedPersonId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredPerson, setHoveredPerson] = useState<Person | null>(null);

  const maxGen = Math.max(...persons.map(p => p.generation), 1);
  const width = 800;
  const height = 800;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = 340;
  const radiusStep = maxRadius / maxGen;

  // Compute polar positions for each person
  const nodes = useMemo(() => {
    const genMap = new Map<number, Person[]>();
    persons.forEach(p => {
      const list = genMap.get(p.generation) || [];
      list.push(p);
      genMap.set(p.generation, list);
    });

    const result: Array<{
      person: Person;
      x: number;
      y: number;
      radius: number;
      color: string;
      isRoot: boolean;
    }> = [];

    // Root person at center
    const root = persons.find(p => p.generation === 1 || p.legacy_id === 'w5n4zuk');
    if (root) {
      result.push({
        person: root,
        x: centerX,
        y: centerY,
        radius: 26,
        color: '#f59e0b',
        isRoot: true
      });
    }

    // Outer generations
    for (let gen = 2; gen <= maxGen; gen++) {
      const list = genMap.get(gen) || [];
      const r = gen * radiusStep;
      const angleStep = (2 * Math.PI) / (list.length || 1);

      list.forEach((p, idx) => {
        const angle = idx * angleStep - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        const color = p.branch_id === 'abdel-samad' ? '#10b981' :
                      p.branch_id === 'hamad' ? '#f59e0b' :
                      p.branch_id === 'waqqad' ? '#3b82f6' : '#d97706';

        result.push({
          person: p,
          x,
          y,
          radius: gen <= 4 ? 14 : 9,
          color,
          isRoot: false
        });
      });
    }

    return result;
  }, [persons, maxGen, radiusStep, centerX, centerY]);

  return (
    <div className="relative flex flex-col items-center select-none overflow-hidden">
      
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 glass-panel p-1.5 rounded-full border-amber-500/20">
        <button
          onClick={() => setZoom(prev => Math.max(0.6, prev - 0.15))}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
          title="تصغير"
        >
          <ZoomOut size={16} />
        </button>
        <span className="text-[11px] font-mono text-slate-400 w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(prev => Math.min(2, prev + 0.15))}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
          title="تكبير"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
          title="إعادة ضبط"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Hover preview tooltip */}
      {hoveredPerson && (
        <div className="absolute top-4 left-4 z-10 glass-panel p-3 border-amber-500/40 text-xs space-y-1 pointer-events-none animate-fadeIn">
          <div className="font-bold text-white text-sm">{hoveredPerson.first_name}</div>
          <div className="text-slate-400 text-[11px]">{hoveredPerson.full_name}</div>
          <div className="flex items-center gap-2 pt-1 text-[10px]">
            <span className="badge badge-gold">الجيل {hoveredPerson.generation}</span>
            <span className="text-amber-300">{hoveredPerson.branch_name || 'الأصل'}</span>
          </div>
        </div>
      )}

      {/* SVG Canvas */}
      <div className="overflow-auto max-w-full max-h-[750px] p-4 flex justify-center">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}
          className="overflow-visible"
        >
          {/* Background Concentric Generation Rings */}
          {Array.from({ length: maxGen }, (_, i) => i + 1).map(gen => {
            const r = gen * radiusStep;
            return (
              <g key={`ring-${gen}`}>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={r}
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={centerX}
                  y={centerY - r + 12}
                  fill="rgba(148, 163, 184, 0.4)"
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="'IBM Plex Sans Arabic', sans-serif"
                >
                  الجيل {gen}
                </text>
              </g>
            );
          })}

          {/* Radial Nodes */}
          {nodes.map(item => {
            const isSelected = selectedPersonId === item.person.id || selectedPersonId === item.person.legacy_id;
            const isHovered = hoveredPerson?.id === item.person.id;

            return (
              <g
                key={item.person.id}
                onClick={() => onSelectPerson(item.person)}
                onMouseEnter={() => setHoveredPerson(item.person)}
                onMouseLeave={() => setHoveredPerson(null)}
                className="cursor-pointer group"
              >
                {(isSelected || isHovered) && (
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={item.radius + 6}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                )}

                <circle
                  cx={item.x}
                  cy={item.y}
                  r={item.radius}
                  fill={item.isRoot ? '#d97706' : item.color}
                  stroke="#070d18"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-125"
                />

                {(item.isRoot || item.person.generation <= 3 || isHovered || isSelected) && (
                  <text
                    x={item.x}
                    y={item.y + (item.isRoot ? 4 : item.radius + 12)}
                    fill={item.isRoot ? '#070d18' : '#ffffff'}
                    fontSize={item.isRoot ? '12' : '10'}
                    fontWeight={item.isRoot ? 'bold' : 'normal'}
                    textAnchor="middle"
                    fontFamily="'Readex Pro', sans-serif"
                    className="pointer-events-none drop-shadow"
                  >
                    {item.person.first_name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-3 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>فرع عبدالصمد</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span>فرع حمد</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span>فرع وقاد</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-600" />
          <span>المؤسس راضي (المركز)</span>
        </div>
      </div>

    </div>
  );
};

