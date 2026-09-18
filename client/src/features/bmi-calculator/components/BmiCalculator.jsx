import { useState, useEffect } from 'react';

const BmiCalculator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [uyari, setUyari] = useState("");
    const [formData, setFormData] = useState({
        kilogram: "",
        metre: ""
    });
    const [hesapla, setHesapla] = useState(null);

    useEffect(() => {
        if (hesapla !== null) {
            if (hesapla < 18.5) {
                setUyari("Ideal kilonun altındasınız: " + hesapla);
            } else if (hesapla >= 18.5 && hesapla <= 24.9) {
                setUyari("İdeal kilodasınız: " + hesapla);
            } else if (hesapla >= 25 && hesapla <= 29.9) {
                setUyari("İdeal kilonun üstündesiniz: " + hesapla);
            } else if (hesapla >= 30 && hesapla <= 39.9) {
                setUyari("Obez: " + hesapla);
            } else if (hesapla >= 40) {
                setUyari("Morbid obez: " + hesapla);
            }
        }
    }, [hesapla]);

    const handleClick = () => {
        setIsLoading(true);
        setUyari("");
        setTimeout(() => {
            const result = formData.kilogram / (formData.metre * formData.metre);
            setHesapla(result);
            setIsLoading(false);
        }, 2000);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value ? Number(value) : "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-full rounded-2xl border p-6 bg-gradient-to-r from-white to-gray-50 shadow-sm">
            <h4 className="text-xl font-bold text-slate-800 mb-4">Vücut Kitle Endeksi Hesapla</h4>
            <p>{uyari}</p>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kilo</label>
                    <input
                        type="number"
                        name="kilogram"
                        value={formData.kilogram}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Kilonuzu girin"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Boy</label>
                    <input
                        type="number"
                        name="metre"
                        value={formData.metre}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Boyunuzu metre cinsinden girin"
                        required
                    />
                </div>
            </form>
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    {isLoading ? (
                        <span className="animate-spin text-lg">⟳</span>
                    ) : (
                        <button
                            onClick={handleClick}
                            className={`mt-2 flex justify-center items-center w-fit gap-2 bg-green-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-green-600 transition-all duration-200 mx-auto ${isLoading ? 'bg-gray-400' : ''}`}
                        >
                            🍔&nbsp; Hesapla
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BmiCalculator;
