
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, CheckCircle2, Printer, Trash2, Plus, MessageCircle, AlertTriangle, Smartphone, Edit2, Check, X as XIcon, Zap } from 'lucide-react';
import { ShoppingItem, UserProfile, DayPlan } from '../types';
import { UserService } from '../services/userService';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.385 4.025-1.627 4.476-1.635z"/>
  </svg>
);

interface ShoppingListProps {
  weeklyPlan: DayPlan[]; 
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ user, weeklyPlan, onUpdateUser }) => {
  const [customItems, setCustomItems] = useState<ShoppingItem[]>(user.customShoppingList || []);
  const [newItemName, setNewItemName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomItems(user.customShoppingList || []);
  }, [user]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const uniqueItems = useMemo(() => {
    return [...customItems].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
  }, [customItems]);

  const updateCustomItems = async (newItems: ShoppingItem[]) => {
    setCustomItems(newItems);
    const updatedUser = await UserService.updateShoppingList(user.username, newItems);
    onUpdateUser(updatedUser);
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

  const handleGenerateFromPlan = async () => {
    if (!weeklyPlan || weeklyPlan.length === 0) {
      alert('ابتدا یک برنامه غذایی بسازید.');
      return;
    }

    const aggregated = new Map<string, { amount: number, unit: string }>();

    weeklyPlan.forEach(plan => {
      plan.dish.ingredients.forEach(ing => {
        const key = `${ing.item.trim()}_${ing.unit.trim()}`;
        const current = aggregated.get(key);
        if (current) {
          aggregated.set(key, { ...current, amount: current.amount + ing.amount });
        } else {
          aggregated.set(key, { amount: ing.amount, unit: ing.unit });
        }
      });
    });

    const newShoppingItems: ShoppingItem[] = Array.from(aggregated.entries()).map(([key, data]) => {
      const name = key.split('_')[0];
      return {
        id: `auto-${Date.now()}-${Math.random()}`,
        name: name,
        amount: data.amount,
        unit: data.unit,
        checked: false,
        fromRecipe: 'برنامه هفتگی'
      };
    });

    updateCustomItems([...customItems, ...newShoppingItems]);
    alert('لیست خرید بر اساس برنامه هفتگی شما ساخته شد.');
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

  const toPersianDigits = (num: number | undefined) => num ? num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]) : '';

  const getRawListText = () => {
    const activeItems = uniqueItems.filter(i => !i.checked);
    if (activeItems.length === 0) return 'سبد خرید خالی است.';

    let text = `سلام، لیست خرید من 🛒:\n\n`;
    activeItems.forEach((item, index) => {
       text += `${index + 1}. ${item.name} ${item.amount ? `(${toPersianDigits(item.amount)} ${item.unit})` : ''}\n`;
    });
    text += `\nممنونم\n${user.fullName || user.username}`;
    return text;
  };

  const handlePrint = () => window.print();

  const handleSMS = () => {
    const text = getRawListText();
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1;
    const separator = isIOS ? '&' : '?';
    window.location.href = `sms:${separator}body=${encodeURIComponent(text)}`;
  };

  const encodedText = encodeURIComponent(getRawListText());

  return (
    <div id="shopping-list-content" className="bg-white rounded-2xl p-6 min-h-full flex flex-col">
      <div className="screen-only">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">سبد خرید</h2>
              <p className="text-sm text-gray-500">اقلام مورد نیاز شما ({uniqueItems.filter(i => !i.checked).length} قلم)</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-end">
            <button 
              onClick={handleGenerateFromPlan}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-teal-700 transition-all shadow-md active:scale-95"
              title="ساخت لیست از برنامه هفتگی"
            >
              <Zap size={18} /> لیست خودکار هفته
            </button>
            
            <button onClick={handlePrint} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border" title="چاپ">
              <Printer size={20} />
            </button>
            
            <button onClick={handleSMS} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border" title="پیامک">
              <Smartphone size={20} />
            </button>

            <a href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noreferrer" className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border">
              <MessageCircle size={20} />
            </a>
            
            {customItems.length > 0 && (
               <button onClick={() => setShowDeleteConfirm(true)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border">
                 <Trash2 size={20} />
               </button>
            )}
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between animate-enter">
             <div className="text-red-700 font-bold text-sm flex items-center gap-2"><AlertTriangle size={18} /> حذف کل لیست؟</div>
             <div className="flex gap-2">
                <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1 bg-white border rounded-lg text-xs">انصراف</button>
                <button onClick={handleDeleteAll} className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs">حذف</button>
             </div>
          </div>
        )}

        <div className="flex-grow overflow-y-auto">
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex gap-2 sticky top-0 bg-white z-10 py-2">
              <input 
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                placeholder="افزودن کالای دستی..."
                className="flex-grow px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-amber-500 outline-none text-sm transition-colors text-slate-900"
              />
              <button onClick={handleAddItem} className="px-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors shadow-md active:scale-95">
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-2 pb-10">
              {uniqueItems.length === 0 ? (
                <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                  <ShoppingCart size={48} className="mx-auto mb-3 opacity-20" />
                  <p>سبد خرید شما فعلاً خالی است</p>
                </div>
              ) : (
                uniqueItems.map((item) => (
                  <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${item.checked ? 'bg-gray-50 opacity-60' : 'bg-white shadow-sm'}`}>
                    <div className="flex items-center gap-3 cursor-pointer flex-grow" onClick={() => toggleCheck(item.id)}>
                      <div className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center ${item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                        {item.checked && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${item.checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                          {item.name}
                        </span>
                        {item.amount && (
                          <span className="text-[10px] text-teal-600 font-black">
                            {toPersianDigits(item.amount)} {item.unit}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <div className="print-view print-view-modal" id="shopping-list-print">
          <div className="p-8">
              <div className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="text-3xl font-black mb-2 text-black">لیست خرید نوش</h1>
                <p className="text-sm text-black">تاریخ: {new Date().toLocaleDateString('fa-IR')}</p>
              </div>
              <table style={{width: '100%', borderCollapse: 'collapse', direction: 'rtl'}}>
                  <thead>
                    <tr style={{backgroundColor: '#f3f4f6'}}>
                      <th style={{border: '1px solid black', padding: '10px', width: '10%'}}>ردیف</th>
                      <th style={{border: '1px solid black', padding: '10px', textAlign: 'right'}}>نام کالا</th>
                      <th style={{border: '1px solid black', padding: '10px', width: '20%'}}>مقدار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueItems.filter(i => !i.checked).map((item, index) => (
                      <tr key={item.id}>
                        <td style={{border: '1px solid black', padding: '10px', textAlign: 'center'}}>{index + 1}</td>
                        <td style={{border: '1px solid black', padding: '10px'}}>{item.name}</td>
                        <td style={{border: '1px solid black', padding: '10px', textAlign: 'center'}}>
                          {item.amount ? `${toPersianDigits(item.amount)} ${item.unit}` : '---'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ShoppingList;
