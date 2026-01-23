import { useState, useRef, useEffect } from "react";

export function InlineEdit({
  value,
  onConfirm,
  onCancel,
}) {
    console.log("InlineEdit value:", value);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const confirm = () => {
    onConfirm(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    onCancel?.();
    setEditing(false);
  };

  return editing ? (
    <input
      ref={inputRef}
      className="inline-edit-input"
      value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={confirm}
      onKeyDown={e => {
        if (e.key === "Enter") confirm();
        if (e.key === "Escape") cancel();
      }}
    />
  ) : (
    <span
      className="inline-edit"
      onClick={() => setEditing(true)}
    >
      {value}
    </span>
  );
}
