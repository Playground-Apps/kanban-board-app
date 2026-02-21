import { useState, useRef, useEffect } from "react";

type Props = {
  key: string ;
  value: string;
  onConfirm: (newValue: string,key:string) => void;
  onCancel?: () => void;
};
export function InlineEdit({
  key,
  value,
  onConfirm,
  onCancel,
}: Props) {
    console.log("InlineEdit value:", value);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const confirm = () => {
    onConfirm(draft, key);
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
