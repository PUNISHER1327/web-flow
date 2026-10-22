import React, { useState } from 'react';
import {
  Activity,
  Flame,
  CheckCircle2,
  Calendar,
  ChevronRight,
  TrendingUp,
  Play,
  RotateCcw,
  Smartphone,
  Monitor,
  Dumbbell
} from 'lucide-react';
import type { ExerciseItem } from '../types';

export const DashboardPreview: React.FC = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(148);
  const [selectedWeekMetric, setSelectedWeekMetric] = useState<'tonnage' | 'deadlift'>('deadlift');

  // Interactive exercises state
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { id: 'ex-1', name: 'Barbell Bench Press', sets: 4, reps: '8, 8, 6, 6', targetWeight: '92.5 kg', completed: true },
    { id: 'ex-2', name: 'Wide-Grip Lat Pulldown', sets: 3, reps: '10, 10, 8', targetWeight: '75.0 kg', completed: true },
    { id: 'ex-3', name: 'Incline Dumbbell Press', sets: 3, reps: '10, 10, 10', targetWeight: '32.0 kg', completed: false },
    { id: 'ex-4', name: 'Seated Cable Row', sets: 3, reps: '12, 12, 10', targetWeight: '68.0 kg', completed: false },
  ]);

  const toggleExercise = (id: string) => {
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  // 8-week progression data
  const progressionData = [
    { week: 'W1', deadlift: 160, tonnage: 28.5 },
    { week: 'W2', deadlift: 165, tonnage: 30.2 },
    { week: 'W3', deadlift: 167.5, tonnage: 32.0 },
    { week: 'W4', deadlift: 172.5, tonnage: 33.4 },
    { week: 'W5', deadlift: 175, tonnage: 31.8 },
    { week: 'W6', deadlift: 180, tonnage: 35.6 },
    { week: 'W7', deadlift: 187.5, tonnage: 37.2 },
    { week: 'W8', deadlift: 195, tonnage: 38.5 },
  ];

  // Active workout timer simulation
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setElapsedSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const completedCount = exercises.filter(e => e.completed).length;

  return (
    <div className="w-full">
      {/* Device Viewport Switcher Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-elevated p-1 rounded-btn border border-border">
            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-accent text-[#10110F] font-bold shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Monitor size={14} strokeWidth={1.5} />
              DESKTOP VIEW
            </button>
            <button
              type="button"
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-accent text-[#10110F] font-bold shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Smartphone size={14} strokeWidth={1.5} />
              MOBILE INTERFACE
            </button>
          </div>

          <span className="hidden md:inline-block label-mono text-[10px] text-text-muted">
            LIVE INTERACTIVE PREVIEW
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>DATA SYNC: LOCAL DEMO REPOSITORY</span>
        </div>
      </div>

      {/* Main SaaS Platform Dashboard Frame */}
      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          viewMode === 'mobile'
            ? 'max-w-[420px] rounded-[36px] p-3 border-4 border-[#30332C] bg-[#0A0B09] shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
            : 'w-full rounded-card border border-border bg-[#10110F] text-[#F1F0E9] shadow-2xl overflow-hidden'
        }`}
      >
        {/* Mobile speaker notch if mobile view */}
        {viewMode === 'mobile' && (
          <div className="w-28 h-4 bg-[#20221D] rounded-full mx-auto mb-2" />
        )}

        <div className="p-4 sm:p-6 md:p-8 bg-[#10110F] text-[#F1F0E9] rounded-[24px]">
          {/* Top Bar / Brand header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#22251F]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="label-mono text-accent text-[10px]">PLATFORM v2.4</span>
                <span className="text-[#30332C]">•</span>
                <span className="text-xs font-mono text-[#A1A49A]">ATHLETE: ALEX R.</span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[#F1F0E9]">
                YOUR TRAINING OVERVIEW
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A49A] mt-0.5">
                One session at a time. One week at a time.
              </p>
            </div>

            {/* Quick status pill & action */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-btn bg-[#191B17] border border-[#30332C]">
                <Activity size={14} className="text-accent" />
                <span className="label-mono text-[11px] text-[#F1F0E9]">
                  WEEK 4 / DAY 3
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-btn text-xs font-mono font-bold transition-all ${
                  isWorkoutActive
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                    : 'bg-accent text-[#10110F] hover:bg-[#E2FA7D]'
                }`}
              >
                {isWorkoutActive ? (
                  <>
                    <RotateCcw size={13} />
                    STOP ({formatTimer(elapsedSeconds)})
                  </>
                ) : (
                  <>
                    <Play size={13} fill="currentColor" />
                    START WORKOUT
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4 Summary Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 my-6">
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#191B17] border border-[#22251F]">
              <div className="flex items-center justify-between text-[#A1A49A] mb-2">
                <span className="label-mono text-[10px]">COMPLETED</span>
                <CheckCircle2 size={15} className="text-accent" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#F1F0E9]">
                4 <span className="text-sm font-mono text-[#A1A49A]">/ 5</span>
              </div>
              <p className="text-[11px] text-[#A1A49A] mt-1 font-mono">Sessions this week</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#191B17] border border-[#22251F]">
              <div className="flex items-center justify-between text-[#A1A49A] mb-2">
                <span className="label-mono text-[10px]">CURRENT STREAK</span>
                <Flame size={15} className="text-accent" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-accent">
                14 <span className="text-sm font-mono text-[#F1F0E9]">DAYS</span>
              </div>
              <p className="text-[11px] text-[#A1A49A] mt-1 font-mono">Unbroken consistency</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#191B17] border border-[#22251F]">
              <div className="flex items-center justify-between text-[#A1A49A] mb-2">
                <span className="label-mono text-[10px]">WEEKLY TONNAGE</span>
                <Dumbbell size={15} className="text-accent" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#F1F0E9]">
                38,450 <span className="text-xs font-mono text-[#A1A49A]">KG</span>
              </div>
              <p className="text-[11px] text-accent mt-1 font-mono">+8.4% vs last week</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#191B17] border border-[#22251F]">
              <div className="flex items-center justify-between text-[#A1A49A] mb-2">
                <span className="label-mono text-[10px]">ADHERENCE</span>
                <TrendingUp size={15} className="text-accent" />
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#F1F0E9]">
                80%
              </div>
              <div className="w-full bg-[#30332C] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-accent h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
          </div>

          {/* Dual Panel: Left Workout Card, Right Progress Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Active/Scheduled Workout Card (5 Cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#191B17] border border-[#22251F] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#22251F]">
                  <div>
                    <span className="label-mono text-[10px] text-accent">TODAY'S SESSION</span>
                    <h4 className="font-heading text-xl font-bold text-[#F1F0E9] mt-0.5">
                      UPPER BODY — DAY 03
                    </h4>
                  </div>
                  <span className="label-mono text-[11px] text-[#A1A49A] bg-[#22251F] px-2.5 py-1 rounded">
                    45 MIN EST.
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A49A] px-1">
                    <span>EXERCISE</span>
                    <span>SETS & LOAD</span>
                  </div>

                  {exercises.map(exercise => (
                    <div
                      key={exercise.id}
                      onClick={() => toggleExercise(exercise.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        exercise.completed
                          ? 'bg-[#10110F]/70 border-[#30332C] opacity-80'
                          : 'bg-[#22251F] border-[#30332C] hover:border-accent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            exercise.completed
                              ? 'bg-accent text-[#10110F]'
                              : 'border border-[#73756F]'
                          }`}
                        >
                          {exercise.completed && <CheckCircle2 size={13} strokeWidth={2.5} />}
                        </div>
                        <div>
                          <div
                            className={`text-sm font-medium ${
                              exercise.completed ? 'line-through text-[#A1A49A]' : 'text-[#F1F0E9]'
                            }`}
                          >
                            {exercise.name}
                          </div>
                          <div className="text-[11px] font-mono text-[#A1A49A]">
                            {exercise.sets} sets • {exercise.reps} reps
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="label-mono text-xs text-accent">
                          {exercise.targetWeight}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workout Progress Bar & Action */}
              <div className="mt-5 pt-4 border-t border-[#22251F]">
                <div className="flex items-center justify-between text-xs font-mono text-[#A1A49A] mb-2">
                  <span>COMPLETION: {completedCount} OF {exercises.length} LOGGED</span>
                  <span className="text-accent">{Math.round((completedCount / exercises.length) * 100)}%</span>
                </div>
                <div className="w-full bg-[#30332C] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-accent h-full rounded-full transition-all duration-300"
                    style={{ width: `${(completedCount / exercises.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Progress Chart & Weekly Calendar (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Strength Line Chart */}
              <div className="rounded-2xl bg-[#191B17] border border-[#22251F] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#22251F]">
                  <div>
                    <span className="label-mono text-[10px] text-accent">PROGRESS METRIC</span>
                    <h4 className="font-heading text-lg font-bold text-[#F1F0E9]">
                      ESTIMATED 1RM DEADLIFT (KG)
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 bg-[#10110F] p-1 rounded-btn border border-[#22251F]">
                    <button
                      type="button"
                      onClick={() => setSelectedWeekMetric('deadlift')}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                        selectedWeekMetric === 'deadlift' ? 'bg-accent text-[#10110F] font-bold' : 'text-[#A1A49A]'
                      }`}
                    >
                      1RM PEAK
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedWeekMetric('tonnage')}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                        selectedWeekMetric === 'tonnage' ? 'bg-accent text-[#10110F] font-bold' : 'text-[#A1A49A]'
                      }`}
                    >
                      TONNAGE (T)
                    </button>
                  </div>
                </div>

                {/* SVG Line Chart */}
                <div className="mt-4">
                  <div className="h-44 w-full relative">
                    <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D9F36A" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#D9F36A" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#22251F" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#22251F" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#22251F" strokeDasharray="3 3" />

                      {/* Line Path */}
                      <path
                        d="M 20,135 Q 80,120 150,110 T 290,85 T 420,50 T 480,25"
                        fill="none"
                        stroke="#D9F36A"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Gradient Area Fill */}
                      <path
                        d="M 20,135 Q 80,120 150,110 T 290,85 T 420,50 T 480,25 L 480,150 L 20,150 Z"
                        fill="url(#chartGradient)"
                      />

                      {/* Data dots */}
                      {[
                        { x: 20, y: 135, val: '160kg' },
                        { x: 85, y: 122, val: '165kg' },
                        { x: 150, y: 110, val: '167kg' },
                        { x: 215, y: 98, val: '172kg' },
                        { x: 280, y: 88, val: '175kg' },
                        { x: 345, y: 72, val: '180kg' },
                        { x: 410, y: 52, val: '187kg' },
                        { x: 480, y: 25, val: '195kg' },
                      ].map((pt, i) => (
                        <g key={i} className="group/dot cursor-pointer">
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="4.5"
                            className="fill-[#10110F] stroke-accent stroke-2 hover:r-6 transition-all"
                          />
                          <text
                            x={pt.x}
                            y={pt.y - 10}
                            textAnchor="middle"
                            className="fill-[#D9F36A] font-mono text-[9px] font-bold opacity-0 group-hover/dot:opacity-100 transition-opacity"
                          >
                            {pt.val}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* X Axis Labels */}
                  <div className="flex justify-between text-[11px] font-mono text-[#A1A49A] mt-2 px-2 border-t border-[#22251F] pt-2">
                    {progressionData.map(d => (
                      <span key={d.week}>{d.week}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Activity Schedule Strip */}
              <div className="rounded-2xl bg-[#191B17] border border-[#22251F] p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="label-mono text-[10px] text-accent">MICROCYCLE SCHEDULE</span>
                  <span className="text-xs font-mono text-[#A1A49A] flex items-center gap-1">
                    <Calendar size={13} /> CURRENT WEEK
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {[
                    { day: 'MON', tag: 'UPPER', done: true, current: false },
                    { day: 'TUE', tag: 'LOWER', done: true, current: false },
                    { day: 'WED', tag: 'REST', done: true, current: false },
                    { day: 'THU', tag: 'UPPER', done: true, current: true },
                    { day: 'FRI', tag: 'LOWER', done: false, current: false },
                    { day: 'SAT', tag: 'COND', done: false, current: false },
                    { day: 'SUN', tag: 'REST', done: false, current: false },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-lg text-center border transition-all ${
                        s.current
                          ? 'border-accent bg-accent/15'
                          : s.done
                          ? 'border-[#30332C] bg-[#10110F]'
                          : 'border-transparent bg-[#22251F]/40 opacity-50'
                      }`}
                    >
                      <div className="label-mono text-[9px] text-[#A1A49A]">{s.day}</div>
                      <div
                        className={`text-xs font-bold font-mono mt-1 ${
                          s.current ? 'text-accent' : s.done ? 'text-[#F1F0E9]' : 'text-[#73756F]'
                        }`}
                      >
                        {s.tag}
                      </div>
                      <div className="mt-1 flex justify-center">
                        {s.done ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#30332C]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer note in dashboard */}
          <div className="mt-6 pt-4 border-t border-[#22251F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A1A49A] gap-2 font-mono">
            <span>DEMO INTERACTION: Toggle exercises or start workout session to preview software behaviour.</span>
            <span className="text-accent flex items-center gap-1">
              CLOUD SYNC SIMULATOR <ChevronRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
