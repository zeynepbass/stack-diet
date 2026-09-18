const StatPill = ({ value, label }) => (
  <div>
    <h3 className="text-3xl font-bold text-green-700">{value}</h3>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default StatPill;
