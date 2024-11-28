interface BadgeProps {
  label: string;
  badge: string;
}

const Badge: React.FC<BadgeProps> = ({ label, badge }) => {
  return (
    <div className="badge">
      {badge} <p className="label">{label}</p>
    </div>
  );
};

export default Badge;
