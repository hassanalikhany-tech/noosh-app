
import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, CheckCircle2, Printer, Trash2, Plus, MessageCircle, AlertTriangle, Smartphone, X, Hash, Ruler } from 'lucide-react';
import { ShoppingItem, UserProfile, DayPlan } from '../types';
import { UserService } from '../services/userService';

interface ShoppingListProps {
  weeklyPlan: DayPlan[]; 
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onPrintInternal?: () => void;
}

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z"/>
  </svg>
);

const ShoppingList: React.FC<ShoppingListProps> = ({ user, weeklyPlan, onUpdateUser, onPrintInternal }) => {
  const [customItems, setCustomItems] = useState<ShoppingItem[]>(user.customShoppingList || []);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    setCustomItems(user.customShoppingList || []);
  }, [user]);

  const uniqueItems = useMemo(() => {
    return [...customItems].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
  }, [customItems]);

  const activeItems = useMemo(() => uniqueItems.filter(i => !i.checked), [uniqueItems]);

  // تقسیم‌بندی اقلام برای چاپ (۱۰ قلم در هر صفحه برای اطمینان از عدم تداخل با فوتر)
  const chunkedItemsForPrint = useMemo(() => {
    const chunks: ShoppingItem[][] = [];
    const ITEMS_PER_PAGE = 10; 
    for (let i = 0; i < activeItems.length; i += ITEMS_PER_PAGE) {
      chunks.push(activeItems.slice(i, i + ITEMS_PER_PAGE));
    }
    return chunks;
  }, [activeItems]);

  const updateCustomItems = async (newItems: ShoppingItem[]) => {
    setCustomItems(newItems);
    onUpdateUser({ ...user, customShoppingList: newItems });
    UserService.updateShoppingList(user.username, newItems);
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      amount: newItemAmount ? parseFloat(newItemAmount) : undefined,
      unit: newItemUnit.trim() || undefined,
      checked: false
    };
    updateCustomItems([...customItems, newItem]);
    setNewItemName('');
    setNewItemAmount('');
    setNewItemUnit('');
  };

  const handleDeleteItem = (id: string) => {
    updateCustomItems(customItems.filter(i => i.id !== id));
  };

  const handleDeleteAll = () => {
    updateCustomItems([]);
    setShowDeleteConfirm(false);
  };

  const toggleCheck = (id: string) => {
    updateCustomItems(customItems.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const toPersianDigits = (num: number | string | undefined) => {
    if (num === undefined || num === 0 || num === '') return '';
    const val = typeof num === 'number' ? Math.round(num * 10) / 10 : num;
    return val.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);
  };

  const persianDate = useMemo(() => {
    return new Intl.DateTimeFormat('fa-IR').format(new Date());
  }, []);

  const getFormattedListText = () => {
    if (activeItems.length === 0) return 'سبد خرید شما خالی است.';

    let text = `⚪️ NOOSH 🟢 APP\n`;
    text += `همراه سلامتی و آسایش شما\n`;
    text += `📅 تاریخ: ${persianDate}\n`;
    text += `------------------------------------------\n\n`;
    text += `🛒 *لیست مواد مورد نیاز:*\n\n`;

    activeItems.forEach((item, index) => {
       const qty = item.amount ? ` (${toPersianDigits(item.amount)} ${item.unit || ''})` : '';
       const source = item.fromRecipe ? ` [بابت: ${item.fromRecipe}]` : '';
       text += `${toPersianDigits(index + 1)}. ${item.name}${qty}${source}\n`;
    });

    text += `\n------------------------------------------\n`;
    text += `🌐 www.nooshapp.ir\n`;
    
    return text;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSMS = () => {
    const text = getFormattedListText();
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1;
    const separator = isIOS ? '&' : '?';
    window.location.href = `sms:${separator}body=${encodeURIComponent(text)}`;
  };

  const shareText = getFormattedListText();
  const encodedText = encodeURIComponent(shareText);
  const appUrl = encodeURIComponent('https://nooshapp.ir');
  
  const telegramShareLink = `https://t.me/share/url?url=${appUrl}&text=${encodedText}`;

  return (
    <div className="bg-white rounded-2xl min-h-full flex flex-col relative">
      
      {/* بخش مخصوص چاپ - بهینه شده برای حذف تصاویر ناخواسته */}
      <div className="print-only dir-rtl text-right w-full bg-white">
        {chunkedItemsForPrint.length === 0 ? (
          <div className="p-10 text-center font-black bg-white">لیست خرید خالی است.</div>
        ) : (
          chunkedItemsForPrint.map((chunk, pageIdx) => (
            <div key={pageIdx} className="print-page flex flex-col bg-white">
              {/* هدر پرینت */}
              <div className="print-brand flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-6">
                <div className="flex-1 flex flex-col items-start" style={{ direction: 'ltr' }}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black italic uppercase text-slate-900">NOOSH</span>
                    <span className="text-xl font-black text-teal-600 italic uppercase">APP</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Premium Kitchen Assistant</span>
                </div>

                <div className="flex-1 flex justify-center">
                  <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh Logo" className="w-12 h-12 object-contain" />
                </div>
                
                <div className="flex-1 text-left font-black text-slate-800">
                  <div className="text-[10px] opacity-50 mb-1">تاریخ تهیه لیست</div>
                  <div className="text-lg">{toPersianDigits(persianDate)}</div>
                  <div className="text-[8px] opacity-40 mt-1">صفحه {toPersianDigits(pageIdx + 1)} از {toPersianDigits(chunkedItemsForPrint.length)}</div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-slate-50 border-r-4 border-teal-500 rounded-l-2xl">
                <p className="text-sm font-black text-slate-700 leading-relaxed">
                  لیست مواد اولیه مورد نیاز جهت خرید - همراه سلامتی و آسایش شما
                </p>
              </div>

              {/* جدول اقلام */}
              <div className="flex-grow">
                <table className="w-full border-collapse mb-8" style={{ border: '2px solid black' }}>
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border p-3 text-right font-black text-sm" style={{ border: '1px solid black' }}>ردیف</th>
                      <th className="border p-3 text-right font-black text-sm" style={{ border: '1px solid black' }}>شرح کالا</th>
                      <th className="border p-3 text-right font-black text-sm" style={{ border: '1px solid black' }}>مقدار/واحد</th>
                      <th className="border p-3 text-right font-black text-sm" style={{ border: '1px solid black' }}>بابت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chunk.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="border p-3 text-center text-sm font-bold" style={{ border: '1px solid black' }}>{toPersianDigits((pageIdx * 10) + idx + 1)}</td>
                        <td className="border p-3 text-sm font-black" style={{ border: '1px solid black' }}>{item.name}</td>
                        <td className="border p-3 text-sm font-bold" style={{ border: '1px solid black' }}>{item.amount ? `${toPersianDigits(item.amount)} ${item.unit || ''}` : '-'}</td>
                        <td className="border p-3 text-xs text-slate-500 font-bold" style={{ border: '1px solid black' }}>{item.fromRecipe || '-'}</td>
                      </tr>
                    ))}
                    {/* ردیف‌های خالی برای حفظ فرمت ثابت */}
                    {chunk.length < 10 && Array.from({ length: 10 - chunk.length }).map((_, emptyIdx) => (
                      <tr key={`empty-${emptyIdx}`}>
                        <td className="border p-5" style={{ border: '1px solid black' }}>&nbsp;</td>
                        <td className="border p-5" style={{ border: '1px solid black' }}>&nbsp;</td>
                        <td className="border p-5" style={{ border: '1px solid black' }}>&nbsp;</td>
                        <td className="border p-5" style={{ border: '1px solid black' }}>&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* فوتر پرینت */}
              <div className="text-center border-t pt-6 mt-10">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">تهیه شده توسط اپلیکیشن هوشمند آشپزی نوش</div>
                <div className="text-sm font-black text-slate-800">www.nooshapp.ir</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* بخش نمایش در اپلیکیشن */}
      <div className="no-print p-6 flex flex-col flex-grow overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6 flex-shrink-0 pl-12 md:pl-0 pt-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl">
              <ShoppingCart size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 leading-none">سبد خرید</h2>
              <p className="text-[10px] text-slate-400 font-bold mt-1">({toPersianDigits(activeItems.length)} قلم کالا)</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button onClick={handlePrint} className="p-3 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200 active:scale-90 shadow-sm" title="چاپ لیست">
              <Printer size={22} />
            </button>
            
            <button onClick={handleSMS} className="p-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-all border border-blue-100 active:scale-90 shadow-sm" title="ارسال پیامک">
              <Smartphone size={22} />
            </button>

            <a href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noreferrer" className="p-3 text-green-600 hover:bg-green-50 rounded-2xl transition-all border border-green-100 active:scale-90 shadow-sm" title="ارسال به واتس‌اپ">
              <MessageCircle size={22} />
            </a>

            <a href={telegramShareLink} target="_blank" rel="noreferrer" className="p-3 text-sky-500 hover:bg-sky-100 rounded-2xl transition-all border border-sky-100 active:scale-90 shadow-sm" title="ارسال به تلگرام">
              <TelegramIcon />
            </a>
            
            {customItems.length > 0 && (
               <button onClick={() => setShowDeleteConfirm(true)} className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all border border-rose-100 active:scale-90 shadow-sm" title="حذف همه">
                 <Trash2 size={22} />
               </button>
            )}
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mb-6 p-5 bg-rose-50 border-2 border-rose-100 rounded-[2rem] flex items-center justify-between animate-enter shadow-lg shadow-rose-100/30">
             <div className="text-rose-700 font-black text-sm flex items-center gap-3"><AlertTriangle size={20} /> حذف کل لیست خرید؟</div>
             <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="px-5 py-2 bg-white border border-rose-200 rounded-xl text-xs font-black text-slate-500">انصراف</button>
                <button onClick={handleDeleteAll} className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-black shadow-md active:scale-95">تایید حذف</button>
             </div>
          </div>
        )}

        <div className="flex-grow overflow-y-auto">
          <div className="space-y-8 max-w-2xl mx-auto pb-12 pr-1">
            <div className="sticky top-0 bg-white z-10 py-3 space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    placeholder="نام کالای جدید..."
                    className="w-full px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-teal-500 outline-none text-base font-black transition-all text-slate-800 bg-slate-50/50 shadow-inner"
                  />
                </div>
                <div className="relative w-24">
                   <input 
                    type="number" 
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    placeholder="مقدار"
                    className="w-full px-4 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-teal-500 outline-none text-sm font-black transition-all text-slate-800 bg-slate-50/50 shadow-inner text-center"
                  />
                </div>
                <div className="relative w-28">
                   <input 
                    type="text" 
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    placeholder="واحد"
                    className="w-full px-4 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-teal-500 outline-none text-sm font-black transition-all text-slate-800 bg-slate-50/50 shadow-inner text-center"
                  />
                </div>
                <button onClick={handleAddItem} className="px-5 bg-teal-600 text-white rounded-[1.5rem] hover:bg-teal-700 shadow-xl shadow-teal-100 active:scale-95 transition-all flex items-center justify-center">
                  <Plus size={32} />
                </button>
              </div>
              <div className="flex justify-center gap-6 px-4">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><ShoppingCart size={10} /> نام کالا</span>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Hash size={10} /> مقدار</span>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Ruler size={10} /> واحد</span>
              </div>
            </div>

            <div className="space-y-3">
              {uniqueItems.length === 0 ? (
                <div className="text-center py-24 text-slate-300 border-2 border-dashed border-slate-100 rounded-[3.5rem] bg-slate-50/30">
                  <ShoppingCart size={64} className="mx-auto mb-6 opacity-5" />
                  <p className="font-black text-sm text-slate-400">سبد خرید شما خالی است</p>
                </div>
              ) : (
                uniqueItems.map((item) => (
                  <div key={item.id} className={`group flex items-center justify-between p-4 rounded-[1.5rem] border-2 transition-all ${item.checked ? 'bg-slate-50 border-slate-50 opacity-40' : 'bg-white border-slate-50 shadow-sm hover:border-teal-100'}`}>
                    <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => toggleCheck(item.id)}>
                      <div className={`w-7 h-7 rounded-xl border-2 flex-shrink-0 flex items-center justify-center transition-all ${item.checked ? 'bg-emerald-500 border-emerald-500 shadow-lg' : 'border-slate-200 group-hover:border-teal-400'}`}>
                        {item.checked && <CheckCircle2 size={18} className="text-white" />}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-base font-black transition-all ${item.checked ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                          {item.name}
                        </span>
                        {(item.amount || item.fromRecipe) && (
                          <div className="flex flex-wrap gap-2 items-center mt-1">
                            {item.amount && item.amount > 0 && <span className="text-[10px] text-teal-600 font-black bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100">{toPersianDigits(item.amount)} {item.unit}</span>}
                            {item.fromRecipe && <span className="text-[9px] text-slate-400 font-bold bg-slate-100/50 px-2 py-0.5 rounded-lg border border-slate-100/50 truncate max-w-[150px]">بابت: {item.fromRecipe}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
