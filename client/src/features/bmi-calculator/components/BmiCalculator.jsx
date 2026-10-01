import { useState } from 'react';

const CATEGORIES = [
  { below: 18.5, label: 'İdeal kilonun altındasınız' },
  { below: 25, label: 'İdeal kilodasınız' },
  { below: 30, label: 'İdeal kilonun üstündesiniz' },
  { below: 40, label: 'Obez' },
  { below: Infinity, label: 'Morbid obez' },
];

const MAX_HEIGHT_IN_METRES = 3;

const describeBmi = (bmi) => {
  const { label } = CATEGORIES.find((category) => bmi < category.below);
  return `${label}: ${bmi.toFixed(1)}`;
};

const BmiCalculator = () => {
  const [formData, setFormData] = useState({ weight: '', height: '' });
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult('');

    const weight = Number(formData.weight);
    const height = Number(formData.height);

    if (!(weight > 0) || !(height > 0)) {
      setError('Kilo ve boy için geçerli değerler girin.');
      return;
    }
    if (height > MAX_HEIGHT_IN_METRES) {
      setError('Boyunuzu metre cinsinden girin (ör. 1.70).');
      return;
    }

    setError('');
    setResult(describeBmi(weight / (height * height)));
  };

  return (
    <div className="w-full rounded-2xl border p-6 bg-gradient-to-r from-white to-gray-50 shadow-sm">
      <h4 className="text-xl font-bold text-slate-800 mb-4">Vücut Kitle Endeksi Hesapla</h4>
      {result && <p role="status">{result}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} noValidate className="space-y-6 mt-4">
        <div>
          <label htmlFor="bmi-weight" className="block text-sm font-medium text-gray-700">
            Kilo
          </label>
          <input
            id="bmi-weight"
            type="number"
            name="weight"
            min="0"
            step="any"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Kilonuzu girin"
          />
        </div>
        <div>
          <label htmlFor="bmi-height" className="block text-sm font-medium text-gray-700">
            Boy
          </label>
          <input
            id="bmi-height"
            type="number"
            name="height"
            min="0"
            step="any"
            value={formData.height}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Boyunuzu metre cinsinden girin"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center w-fit gap-2 bg-green-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-green-600 transition-all duration-200 mx-auto"
        >
          🍔&nbsp; Hesapla
        </button>
      </form>
    </div>
  );
};

export default BmiCalculator;
