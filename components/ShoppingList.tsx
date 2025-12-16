
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, CheckCircle2, Printer, Trash2, Plus, MessageCircle, AlertTriangle, Smartphone, Edit2, Check, X as XIcon } from 'lucide-react';
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

const ShoppingList: React.FC<ShoppingListProps> = ({ user, onUpdateUser }) => {
  const [customItems, setCustomItems] = useState<ShoppingItem[]>(user.customShoppingList || []);
  const [newItemName, setNewItemName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomItems(user.customShoppingList || []);
  }, [user]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const uniqueItems = useMemo(() => {
    const map = new Map<string, ShoppingItem>();
    
    customItems.forEach(item => {
      // Use original item name if it's currently being edited to prevent it from jumping around
      // or disappearing if user changes it to a duplicate name temporarily
      // However, for display logic, we stick to the list.
      const normalized = item.name.trim().toLowerCase();
      
      // If we encounter a duplicate name, we prefer the one that is NOT checked (active)
      if (!map.has(normalized)) {
        map.set(normalized, item);
      } else {
        const existing = map.get(normalized)!;
        if (existing.checked && !item.checked) {
          map.set(normalized, item);
        }
      }
    });

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'fa'));
  }, [customItems]);

  const updateCustomItems = (newItems: ShoppingItem[]) => {
    setCustomItems(newItems);
    const updatedUser = UserService.updateShoppingList(user.username, newItems);
    onUpdateUser(updatedUser);
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    
    const exists = customItems.some(i => i.name.trim().toLowerCase() === newItemName.trim().toLowerCase());
    if (exists) {
      alert('این کالا قبلاً در لیست وجود دارد.');
      return;
    }

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

  // --- Edit Functions ---

  const startEditing = (item: ShoppingItem) => {
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const saveEdit = () => {
    if (!editingId || !editValue.trim()) {
      cancelEdit();
      return;
    }

    const newItems = customItems.map(i => {
      if (i.id === editingId) {
        return { ...i, name: editValue.trim() };
      }
      return i;
    });

    updateCustomItems(newItems);
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // --- End Edit Functions ---

  const getRawListText = () => {
    const activeItems = uniqueItems.filter(i => !i.checked);
    if (activeItems.length === 0) return 'سبد خرید خالی است.';

    let text = `سلام خسته نباشی، لطفا سر راهت این اقلام را هم بخر 🛒:\n\n`;
    activeItems.forEach((item, index) => {
       text += `${index + 1}. ${item.name}\n`;
    });

    text += `\nممنونم\n${user.fullName || user.username}`;
    return text;
  };

  const handlePrint = () => {
    window.print();
  };

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
      
      {/* SCREEN VIEW */}
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
            {customItems.length > 0 && (
               <button 
                 onClick={() => setShowDeleteConfirm(true)} 
                 className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 mr-2" 
                 title="حذف همه"
               >
                 <Trash2 size={20} />
               </button>
            )}
            
            <button onClick={handlePrint} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="چاپ یا ذخیره PDF">
              <Printer size={20} />
            </button>
            
            <button 
              onClick={handleSMS}
              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="ارسال پیامک"
            >
              <Smartphone size={20} />
            </button>

            <a 
              href={`https://wa.me/?text=${encodedText}`} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
              title="ارسال در واتس‌اپ"
            >
              <MessageCircle size={20} />
            </a>
            
            <a 
              href={`https://t.me/share/url?url=${encodedText}&text=`} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
              title="ارسال در تلگرام"
            >
              <TelegramIcon />
            </a>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between animate-enter">
             <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
               <AlertTriangle size={18} />
               آیا مطمئن هستید که می‌خواهید همه اقلام را حذف کنید؟
             </div>
             <div className="flex gap-2">
                <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1 bg-white text-gray-600 rounded-lg text-xs border hover:bg-gray-50">انصراف</button>
                <button onClick={handleDeleteAll} className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700">بله، حذف کن</button>
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
                placeholder="افزودن کالا..."
                className="flex-grow px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-amber-500 outline-none text-sm transition-colors"
              />
              <button 
                onClick={handleAddItem}
                className="px-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors shadow-md active:scale-95"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-2">
              {uniqueItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                  <ShoppingCart size={48} className="mx-auto mb-3 opacity-20" />
                  <p>سبد خرید خالی است</p>
                </div>
              ) : (
                uniqueItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 group ${item.checked ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 hover:border-amber-200 hover:shadow-sm'}`}
                  >
                    {editingId === item.id ? (
                      // Edit Mode
                      <div className="flex items-center gap-2 flex-grow w-full">
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleEditKeyDown}
                          className="flex-grow px-3 py-2 rounded-lg border-2 border-amber-400 focus:outline-none text-gray-900 bg-white text-sm"
                        />
                        <button 
                          onClick={saveEdit}
                          className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                          title="ذخیره"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                          title="انصراف"
                        >
                          <XIcon size={18} />
                        </button>
                      </div>
                    ) : (
                      // Display Mode
                      <>
                        <div 
                          className="flex items-center gap-3 cursor-pointer flex-grow min-w-0"
                          onClick={() => toggleCheck(item.id)}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-colors ${item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-amber-400'}`}>
                            {item.checked && <CheckCircle2 size={16} className="text-white" />}
                          </div>

                          <span className={`text-base font-medium truncate ${item.checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                            {item.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => startEditing(item)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="ویرایش نام"
                          >
                            <Edit2 size={16} />
                          </button>
                          
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PRINT VIEW (Only visible when printing) - Using Portal to escape any fixed/hidden parent containers */}
      {createPortal(
        <div className="print-view print-view-modal" id="shopping-list-print">
          <div className="p-8">
              <div className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="text-3xl font-black mb-2 text-black">لیست خرید</h1>
                <p className="text-sm text-black">تاریخ: {new Date().toLocaleDateString('fa-IR')}</p>
              </div>

              {uniqueItems.length > 0 ? (
                <table style={{width: '100%', borderCollapse: 'collapse', direction: 'rtl'}}>
                  <thead>
                    <tr style={{backgroundColor: '#f3f4f6'}}>
                      <th style={{border: '1px solid black', padding: '10px', width: '10%', textAlign: 'center'}}>ردیف</th>
                      <th style={{border: '1px solid black', padding: '10px', textAlign: 'right'}}>نام کالا</th>
                      <th style={{border: '1px solid black', padding: '10px', width: '20%', textAlign: 'center'}}>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueItems.map((item, index) => (
                      <tr key={item.id} style={{backgroundColor: item.checked ? '#f9fafb' : 'white'}}>
                        <td style={{border: '1px solid black', padding: '10px', textAlign: 'center'}}>{index + 1}</td>
                        <td style={{border: '1px solid black', padding: '10px', textDecoration: item.checked ? 'line-through' : 'none'}}>
                          {item.name}
                        </td>
                        <td style={{border: '1px solid black', padding: '10px', textAlign: 'center'}}>
                          <div style={{width: '15px', height: '15px', border: '1px solid black', display: 'inline-block', marginRight: '5px'}}></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center mt-10 text-xl text-black">لیست خالی است.</p>
              )}
              
              <div className="mt-8 text-right text-sm text-black pt-4 border-t border-black font-bold">
                ممنونم<br/>
                {user.fullName || user.username}
              </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default ShoppingList;
