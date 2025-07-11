import '../styles/TagStatusStyle.css';

export default function TagStatus({ status }) {
  return <div className={`tag-status status-${status}`}>{status}</div>;
}