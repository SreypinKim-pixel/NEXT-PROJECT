
export default function Userpage() {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Profile</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Your account</h1>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-slate-950 text-lg font-bold text-white">NU</div>
          <div><p className="font-bold">Nova User</p><p className="text-sm text-slate-500 dark:text-slate-400">user@example.com</p></div>
        </div>
        <div className="mt-7 border-t border-slate-100 pt-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">This area is ready for your profile settings and account details.</div>
      </div>
    </div>
  )
}
