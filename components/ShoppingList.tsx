
import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, CheckCircle2, Printer, Trash2, Plus, MessageCircle, AlertTriangle, Smartphone } from 'lucide-react';
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    setCustomItems(user.customShoppingList || []);
  }, [user]);

  const uniqueItems = useMemo(() => {
    return [...customItems].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
  }, [customItems]);

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
      checked: false
    };
    updateCustomItems([...customItems, newItem]);
    setNewItemName('');
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

  const getFormattedListText = () => {
    const activeItems = uniqueItems.filter(i => !i.checked);
    if (activeItems.length === 0) return 'سبد خرید شما خالی است.';

    const dateStr = new Date().toLocaleDateString('fa-IR');
    
    let text = `⚪️ NOOSH 🟢 APP\n`;
    text += `✨ برنامه غذایی هوشمند شما\n`;
    text += `------------------------------------------\n\n`;
    text += `🛒 *لیست خرید*\n`;
    text += `👤 کاربر: ${user.fullName || user.username}\n`;
    text += `📅 تاریخ: ${dateStr}\n\n`;

    activeItems.forEach((item, index) => {
       const qty = item.amount ? ` (${toPersianDigits(item.amount)} ${item.unit || ''})` : '';
       const source = item.fromRecipe ? ` [بابت: ${item.fromRecipe}]` : '';
       text += `${toPersianDigits(index + 1)}. ${item.name}${qty}${source}\n`;
    });

    text += `\n------------------------------------------\n`;
    text += `🌐 www.nooshapp.ir\n`;
    // ترفند: قرار دادن لینک عکس در انتهای پیام برای فعال شدن پیش‌نمایش لوگو در تلگرام/واتس‌اپ
    // بدون اینکه در بدنه اصلی متن به چشم بیاید
    text += `‏‏​​​https://i.ibb.co/gMDKtj4p/3.png`; 
    
    return text;
  };

  const handlePrint = () => {
    if (onPrintInternal) onPrintInternal();
    else window.print();
  };

  const handleSMS = () => {
    const text = getFormattedListText();
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1;
    const separator = isIOS ? '&' : '?';
    window.location.href = `sms:${separator}body=${encodeURIComponent(text)}`;
  };

  const encodedText = encodeURIComponent(getFormattedListText());

  return (
    <div id="shopping-list-content" className="bg-white rounded-2xl p-6 min-h-full flex flex-col">
      <div className="screen-only">
        {/* pl-28 برای ایجاد فضای کاملا آزاد جهت دکمه ضربدر X که در گوشه بالا سمت چپ قرار دارد */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6 flex-shrink-0 pl-28 md:pl-0 pt-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl">
              <ShoppingCart size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 leading-none">سبد خرید</h2>
              <p className="text-[10px] text-slate-400 font-bold mt-1">({toPersianDigits(uniqueItems.filter(i => !i.checked).length)} قلم کالا)</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button onClick={handlePrint} className="p-3 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200 active:scale-90 shadow-sm" title="چاپ">
              <Printer size={22} />
            </button>
            
            <button onClick={handleSMS} className="p-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-all border border-blue-100 active:scale-90 shadow-sm" title="پیامک">
              <Smartphone size={22} />
            </button>

            <a href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noreferrer" className="p-3 text-green-600 hover:bg-green-50 rounded-2xl transition-all border border-green-100 active:scale-90 shadow-sm" title="واتس‌اپ">
              <MessageCircle size={22} />
            </a>

            {/* حذف پارامتر url برای جلوگیری از نمایش تکراری آدرس وب‌سایت در بالای پیام تلگرام */}
            <a href={`https://t.me/share/url?text=${encodedText}`} target="_blank" rel="noreferrer" className="p-3 text-sky-500 hover:bg-sky-100 rounded-2xl transition-all border border-sky-100 active:scale-90 shadow-sm" title="تلگرام">
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
            <div className="flex gap-3 sticky top-0 bg-white z-10 py-3">
              <input 
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                placeholder="افزودن کالای دستی..."
                className="flex-grow px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-teal-500 outline-none text-base font-black transition-all text-slate-800 bg-slate-50/50 shadow-inner"
              />
              <button onClick={handleAddItem} className="px-6 bg-teal-600 text-white rounded-[1.5rem] hover:bg-teal-700 shadow-xl shadow-teal-100 active:scale-95 transition-all">
                <Plus size={32} />
              </button>
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
