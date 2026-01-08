interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = "";
  let badgeText = "";
  let badgeClass = "";

  if (score > 70) {
    badgeColor = "bg-badge-green text-green-600";
    badgeText = "Strong";
    badgeClass = "strong";
  } else if (score > 49) {
    badgeColor = "bg-badge-yellow text-yellow-600";
    badgeText = "Good Start";
    badgeClass = "good";
  } else {
    badgeColor = "bg-badge-red text-red-600";
    badgeText = "Needs Work";
    badgeClass = "weak";
  }

  return (
    <div className={`score-badge px-3 py-1 rounded-full ${badgeColor} ${badgeClass}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
