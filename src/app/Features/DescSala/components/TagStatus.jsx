import '../styles/TagStatusStyle.css';

const TagStatus = ({ status }) => {
  return (
    <div className="tag-status">
      <h3>{status}</h3>
    </div>
  );
};

export default TagStatus;