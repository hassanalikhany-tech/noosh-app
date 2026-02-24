
import React, { useState, useEffect } from 'react';
import { EconomicService } from '../../services/economicService';
import { IngredientPrice } from '../../types';
import { Save, Trash2, Plus, Search, RefreshCw, Wallet, Check, AlertCircle, X, Upload, FileJson, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

const EconomicManager: React.FC = () => {
  const [prices, setPrices] = useState<IngredientPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingPrice, setEditingPrice] = useState<Partial<IngredientPrice> | null>(null);
  const [jsonInput, setJsonInput] = useState('');
  const [isJsonImportOpen, setIsJsonImportOpen] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadPrices = async (force = false) => {
    setIsLoading(true);
    try {
      const data = await EconomicService.getAllPrices(force);
      setPrices(data);
    } catch (err) {
      console.error(err);
      setMessage({ text: 'خطا در بارگذاری اطلاعات', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const handleSave = async () => {
    if (!editingPrice?.name || !editingPrice?.price) {
      setMessage({ text: 'نام و قیمت الزامی هستند', type: 'error' });
      return;
    }

    try {
      const priceToSave: IngredientPrice = {
        id: editingPrice.id || `price-${Date.now()}`,
        name: editingPrice.name,
        price: Number(editingPrice.price),
        unit: editingPrice.unit || 'گرم',
        updatedAt: Date.now()
      };

      await EconomicService.updatePrice(priceToSave);
      setMessage({ text: 'قیمت با موفقیت ذخیره شد', type: 'success' });
      setEditingPrice(null);
      loadPrices();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ text: 'خطا در ذخیره‌سازی', type: 'error' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      const extension = file.name.split('.').pop()?.toLowerCase();

      reader.onload = async (event) => {
        try {
          let data: any[] = [];

          if (extension === 'json') {
            data = JSON.parse(event.target?.result as string);
          } else if (extension === 'csv' || extension === 'xlsx' || extension === 'xls') {
            const workbook = XLSX.read(event.target?.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            data = XLSX.utils.sheet_to_json(worksheet);
          }

          if (!Array.isArray(data)) throw new Error('فرمت فایل نامعتبر است');

          let successCount = 0;
          for (const item of data) {
            if (item.name && item.price) {
              await EconomicService.updatePrice({
                id: item.id || `price-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: item.name.toString(),
                price: Number(item.price),
                unit: item.unit || 'گرم',
                updatedAt: Date.now()
              });
              successCount++;
            }
          }

          setMessage({ text: `${successCount} قلم کالا با موفقیت بروزرسانی شد`, type: 'success' });
          loadPrices();
        } catch (err) {
          setMessage({ text: 'خطا در پردازش فایل. لطفا فرمت را بررسی کنید.', type: 'error' });
        } finally {
          setIsLoading(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };

      if (extension === 'json' || extension === 'csv') {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    } catch (err) {
      setIsLoading(false);
      setMessage({ text: 'خطا در بارگذاری فایل', type: 'error' });
    }
  };

  const handleJsonImport = async () => {
    const trimmedInput = jsonInput.trim();
    if (!trimmedInput) {
      setMessage({ text: 'لطفا ابتدا کد JSON را وارد کنید', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    setMessage({ text: 'در حال پردازش و واردسازی داده‌ها...', type: 'success' });
    
    try {
      const data = JSON.parse(trimmedInput);
      const items = Array.isArray(data) ? data : [data];
      
      const pricesToUpdate: IngredientPrice[] = [];
      for (const item of items) {
        const name = item.name || item.Name || item.نام || item.item || item.نام_کالا;
        const price = item.price !== undefined ? item.price : (item.Price || item.قیمت || item.cost || item.فی);
        const unit = item.unit || item.Unit || item.واحد || 'گرم';
        const id = item.id || item.Id || `price-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        if (name && price !== undefined) {
          pricesToUpdate.push({
            id: id.toString(),
            name: name.toString(),
            price: Number(price),
            unit: unit.toString(),
            updatedAt: Date.now()
          });
        }
      }
      
      if (pricesToUpdate.length > 0) {
        // Use batch update for efficiency
        await EconomicService.updatePricesBatch(pricesToUpdate);
        setMessage({ text: `${pricesToUpdate.length} قلم کالا با موفقیت وارد و بروزرسانی شد`, type: 'success' });
        setJsonInput('');
        setIsJsonImportOpen(false);
        await loadPrices(true); // Force refresh from server
      } else {
        setMessage({ text: 'هیچ داده معتبری یافت نشد. فیلدهای name و price الزامی هستند.', type: 'error' });
      }
    } catch (err) {
      console.error("JSON Import Error:", err);
      setMessage({ text: 'خطا در قالب JSON. لطفا از صحت ساختار (آرایه یا شیء) اطمینان حاصل کنید.', type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 6000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      alert('خطا: شناسه آیتم یافت نشد. لطفا صفحه را رفرش کنید.');
      return;
    }
    
    if (!window.confirm('آیا از حذف این قیمت اطمینان دارید؟')) return;
    
    setIsLoading(true);
    try {
      await EconomicService.deletePrice(id);
      setMessage({ text: 'آیتم با موفقیت حذف شد', type: 'success' });
      await loadPrices(true);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Delete Error:", err);
      setMessage({ text: 'خطا در حذف آیتم از دیتابیس', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('هشدار قاطع: آیا از حذف تمام اقلام اطمینان دارید؟ این عمل غیرقابل بازگشت است.')) return;
    
    setIsLoading(true);
    try {
      await EconomicService.clearAllPrices();
      setMessage({ text: 'تمام اقلام با موفقیت پاکسازی شدند', type: 'success' });
      await loadPrices(true);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Clear All Error:", err);
      setMessage({ text: 'خطا در پاکسازی کلی دیتابیس', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPrices = prices.filter(p => p.name.includes(searchTerm));

  return (
    <div className="space-y-6 animate-enter">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-emerald-600 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Wallet size={40}/>
            <div className="flex flex-col">
              <h2 className="text-2xl font-black leading-none">مدیریت قیمت مواد اولیه</h2>
              <span className="text-[10px] opacity-60 font-bold mt-1 uppercase tracking-widest">Economic Management System</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".json,.csv,.xlsx,.xls" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-emerald-500 text-white border border-emerald-400 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-emerald-400 transition-all"
            >
              <Upload size={18}/> آپلود فایل (Excel/CSV/JSON)
            </button>
            <button 
              onClick={() => setIsJsonImportOpen(!isJsonImportOpen)}
              className="px-6 py-3 bg-slate-800 text-white border border-slate-700 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-slate-700 transition-all"
            >
              <FileJson size={18}/> درج کد JSON
            </button>
            <button 
              onClick={handleClearAll}
              className="px-6 py-3 bg-rose-600 text-white border border-rose-500 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-rose-700 transition-all"
            >
              <Trash2 size={18}/> حذف همه اقلام
            </button>
            <button 
              onClick={() => setEditingPrice({ name: '', price: 0, unit: 'گرم' })}
              className="px-6 py-3 bg-white text-emerald-600 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-emerald-50 transition-all"
            >
              <Plus size={18}/> افزودن قیمت جدید
            </button>
          </div>
        </div>

        {message && !editingPrice && (
          <div className="p-4 border-b animate-enter">
            <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              <div className="flex items-center gap-3">
                {message.type === 'success' ? <Check size={20}/> : <AlertCircle size={20}/>}
                <span className="text-sm font-black">{message.text}</span>
              </div>
              <button onClick={() => setMessage(null)}><X size={18}/></button>
            </div>
          </div>
        )}

        {isJsonImportOpen && (
          <div className="p-6 bg-slate-100 border-b animate-enter">
            <div className="bg-white p-6 rounded-[2rem] shadow-inner border border-slate-200 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-800 flex items-center gap-2"><FileJson size={20} className="text-indigo-600"/> وارد کردن مستقیم کد JSON</h3>
                <button onClick={() => setIsJsonImportOpen(false)} className="text-slate-400 hover:text-rose-500"><X size={20}/></button>
              </div>
              <p className="text-[10px] font-bold text-slate-400">فرمت مورد انتظار: آرایه‌ای از اشیاء با فیلدهای name و price و unit (اختیاری)</p>
              <textarea 
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder='[{"name": "برنج", "price": 120000, "unit": "کیلوگرم"}]'
                className="w-full h-40 p-4 bg-slate-50 border rounded-2xl font-mono text-xs outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end gap-3">
                <button 
                  onClick={handleJsonImport}
                  disabled={isLoading || !jsonInput.trim()}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  {isLoading ? <RefreshCw size={18} className="animate-spin"/> : 'شروع عملیات واردسازی'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border-b bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <input 
              placeholder="جستجوی ماده..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-full px-6 py-3 bg-white border rounded-2xl outline-none focus:border-emerald-500 font-bold text-sm pr-12" 
            />
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"/>
          </div>
          <button onClick={() => loadPrices(true)} className="p-3 text-slate-400 hover:text-emerald-600 transition-colors" title="بروزرسانی لیست">
            <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 font-black text-[10px] opacity-60">
              <tr>
                <th className="p-5">نام ماده</th>
                <th className="p-5 text-center">قیمت (تومان)</th>
                <th className="p-5 text-center">واحد پایه</th>
                <th className="p-5 text-center">آخرین بروزرسانی</th>
                <th className="p-5 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPrices.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-5 font-black text-slate-800">
                    {p.name}
                  </td>
                  <td className="p-5 text-center font-bold text-emerald-600">{p.price.toLocaleString('fa-IR')}</td>
                  <td className="p-5 text-center font-bold text-slate-500">{p.unit}</td>
                  <td className="p-5 text-center text-[10px] text-slate-400 font-bold">
                    {new Date(p.updatedAt).toLocaleDateString('fa-IR')}
                  </td>
                  <td className="p-5 text-left">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setEditingPrice(p)}
                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <RefreshCw size={18}/>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPrices.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-300 font-bold italic">موردی یافت نشد</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingPrice && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-enter" onClick={() => setEditingPrice(null)}>
          <div className="w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/20" onClick={e => e.stopPropagation()}>
            <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3"><Wallet size={28}/> <h3 className="text-xl font-black">ثبت / ویرایش قیمت</h3></div>
              <button onClick={() => setEditingPrice(null)} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24}/></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400">نام ماده (دقیقاً مشابه رسپی‌ها)</label>
                <input 
                  type="text" 
                  value={editingPrice.name} 
                  onChange={e => setEditingPrice({...editingPrice, name: e.target.value})}
                  className="w-full px-5 py-3 bg-slate-50 border rounded-2xl outline-none focus:border-emerald-500 font-bold"
                  placeholder="مثلاً: برنج"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400">قیمت به ازای هر واحد (تومان)</label>
                <input 
                  type="number" 
                  value={editingPrice.price || ''} 
                  onChange={e => setEditingPrice({...editingPrice, price: Number(e.target.value)})}
                  className="w-full px-5 py-3 bg-slate-50 border rounded-2xl outline-none focus:border-emerald-500 font-bold"
                  placeholder="مثلاً: ۱۰۰"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400">واحد اندازه‌گیری</label>
                <select 
                  value={editingPrice.unit} 
                  onChange={e => setEditingPrice({...editingPrice, unit: e.target.value})}
                  className="w-full px-5 py-3 bg-slate-50 border rounded-2xl outline-none focus:border-emerald-500 font-bold"
                >
                  <option value="گرم">گرم</option>
                  <option value="کیلوگرم">کیلوگرم</option>
                  <option value="عدد">عدد</option>
                  <option value="میلی‌لیتر">میلی‌لیتر</option>
                  <option value="لیتر">لیتر</option>
                  <option value="قاشق">قاشق</option>
                </select>
              </div>

              {message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {message.type === 'success' ? <Check size={20}/> : <AlertCircle size={20}/>}
                  <span className="text-xs font-bold">{message.text}</span>
                </div>
              )}

              <button 
                onClick={handleSave}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all active:scale-95"
              >
                <Save size={20}/> ذخیره اطلاعات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EconomicManager;
