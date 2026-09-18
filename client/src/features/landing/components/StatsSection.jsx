import StatPill from '../../../shared/ui/molecules/StatPill';

const STATS = [
  { label: 'Toplam Üye', value: '1.200+' },
  { label: 'Paylaşılan Tarif', value: '340+' },
  { label: 'Günlük Ziyaretçi', value: '500+' },
];

const StatsSection = () => (
  <section className="bg-green-50 py-16">
    <div className="flex justify-around items-center text-center max-w-4xl mx-auto">
      {STATS.map((item) => (
        <StatPill key={item.label} value={item.value} label={item.label} />
      ))}
    </div>
  </section>
);

export default StatsSection;
