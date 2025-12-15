
import React, { useState, useRef } from 'react';
import { Upload, FileJson, Copy, CheckCircle2, Trash2, Plus, FileText, Download } from 'lucide-react';
import { Dish, DishCategory, Ingredient } from '../../types';
import { RecipeService } from '../../services/recipeService';

const DatabaseManager: React.FC = () => {
  const [accumulatedDishes, setAccumulatedDishes] = useState<Dish[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mapCategory = (catName: string): DishCategory => {
    const normalized = catName?.trim().toLowerCase() || '';
    if (normalized.includes('خورش')) return 'stew';
    if (normalized.includes('پلو') || normalized.includes('چلو')) return 'polo';
    if (normalized.includes('کباب')) return 'kabab';
    if (normalized.includes('آش')) return 'ash';
    if (normalized.includes('سوپ')) return 'soup';
    if (normalized.includes('کوکو') || normalized.includes('املت')) return 'kuku';
    if (normalized.includes('دلمه') || normalized.includes('کوفته')) return 'dolma';
    if (normalized.includes('محلی') || normalized.includes('سنتی')) return 'local';
    if (normalized.includes('نانی') || normalized.includes('خوراک')) return 'nani';
    if (normalized.includes('فست') || normalized.includes('ساندویچ')) return 'fastfood';
    if (normalized.includes('دسر')) return 'dessert';
    if (normalized.includes('ملل') || normalized.includes('خارجی')) return 'international';
    return 'other';
  };

  // Robust CSV Parser (State Machine) to handle Excel CSV quirks (quotes, newlines, commas inside fields)
  const parseCSVLineByLine = (text: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = '';
    let insideQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Escaped quote ("") -> becomes single quote
          currentField += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        // Field separator
        currentRow.push(currentField);
        currentField = '';
      } else if ((char === '\n' || char === '\r') && !insideQuotes) {
        // Row separator
        // Handle CRLF (\r\n) or just LF (\n) or just CR (\r)
        if (char === '\r' && nextChar === '\n') i++;
        
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      } else {
        // Normal character
        currentField += char;
      }
    }
    
    // Push last field/row if exists
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }

    return rows;
  };

  const parseCSV = (csvText: string): Dish[] => {
    const rows = parseCSVLineByLine(csvText);
    
    // Remove empty rows
    const cleanRows = rows.filter(r => r.length > 1 || (r.length === 1 && r[0].trim() !== ''));
    
    if (cleanRows.length < 2) throw new Error('فایل خالی یا بدون هدر است');

    const headers = cleanRows[0].map(h => h.toLowerCase().trim());
    const idxName = headers.findIndex(h => h.includes('name') || h.includes('نام'));
    
    if (idxName === -1) throw new Error('ستون "name" پیدا نشد.');

    const newDishes: Dish[] = [];
    const idxCat = headers.findIndex(h => h.includes('cat') || h.includes('دسته'));
    const idxIng = headers.findIndex(h => h.includes('ing') || h.includes('مواد'));
    const idxRecipe = headers.findIndex(h => h.includes('recipe') || h.includes('دستور'));
    const idxDesc = headers.findIndex(h => h.includes('desc') || h.includes('توضیح'));

    for (let i = 1; i < cleanRows.length; i++) {
      try {
        const cols = cleanRows[i];
        
        // Safety check for short rows
        if (cols.length <= idxName) continue;

        const name = cols[idxName]?.trim();
        if (!name || name.length < 2) continue;

        const rawCat = idxCat > -1 ? cols[idxCat] : 'other';
        const rawIng = idxIng > -1 ? cols[idxIng] : '';
        const rawRecipe = idxRecipe > -1 ? cols[idxRecipe] : '';
        const rawDesc = idxDesc > -1 ? cols[idxDesc] : '';

        // Ingredients parsing: handle | separator
        const ingredients: Ingredient[] = rawIng ? rawIng.split('|').map(s => {
          // Try split by first colon for "Item: Amount" format
          const firstColon = s.indexOf(':');
          if (firstColon > -1) {
             return { 
                item: s.substring(0, firstColon).trim(), 
                amount: s.substring(firstColon + 1).trim() 
             };
          }
          return { item: s.trim(), amount: '' };
        }).filter(ing => ing.item) : [];

        // Recipe parsing: handle | separator OR newlines if they pasted full text
        let recipeSteps: string[] = [];
        if (rawRecipe) {
           if (rawRecipe.includes('|')) {
              recipeSteps = rawRecipe.split('|').map(s => s.trim()).filter(Boolean);
           } else {
              // If no pipe, check for newlines or just treat as one big paragraph
              // But user asked for full text, so if it's one block, keep it as one block or split by sentences
              // Better to assume | is the explicit step separator, if missing, treat as one block or try newline
              recipeSteps = rawRecipe.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
              if (recipeSteps.length === 0 && rawRecipe.trim()) {
                 recipeSteps = [rawRecipe.trim()];
              }
           }
        }

        // Generate ID
        const uniqueId = `dish-${Date.now()}-${Math.random().toString(36).substr(2, 5)}-${i}`;

        newDishes.push({
          id: uniqueId,
          name: name,
          category: mapCategory(rawCat),
          description: rawDesc || name,
          ingredients: ingredients,
          recipeSteps: recipeSteps,
          hasRealData: recipeSteps.length > 0
        });
      } catch (err) {
        console.warn(`Row ${i} skipped`);
      }
    }
    return newDishes;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        const dishes = parseCSV(content);
        if (dishes.length === 0) throw new Error("هیچ غذایی یافت نشد.");
        
        // Accumulate
        setAccumulatedDishes(prev => [...prev, ...dishes]);
        setMessage({ type: 'success', text: `${dishes.length} غذا اضافه شد. مجموع: ${accumulatedDishes.length + dishes.length}` });
      } catch (err: any) {
        setMessage({ type: 'error', text: err.message });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyToClipboard = () => {
    const jsonStr = JSON.stringify(accumulatedDishes, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setMessage({ type: 'success', text: 'کد JSON با موفقیت کپی شد!' });
  };

  const clearAll = () => {
    if(confirm('آیا لیست تجمیع شده پاک شود؟')) {
        setAccumulatedDishes([]);
        setMessage(null);
    }
  };

  const handleExportCurrentDatabase = () => {
    const allDishes = RecipeService.getAllDishes();
    const headers = ['ID', 'Name', 'Category', 'Description', 'Ingredients (Separated by |)', 'Recipe Steps (Separated by |)'];
    
    // Create CSV rows
    const csvRows = [headers.join(',')];

    for (const dish of allDishes) {
      const ingredientsStr = dish.ingredients.map(i => `${i.item}: ${i.amount}`).join(' | ');
      const stepsStr = dish.recipeSteps.join(' | ');
      
      const row = [
        dish.id,
        dish.name,
        dish.category,
        dish.description,
        ingredientsStr,
        stepsStr
      ].map(field => {
        // Proper CSV escaping: wrap in quotes, escape existing quotes
        const stringField = String(field || '');
        return `"${stringField.replace(/"/g, '""')}"`; 
      });
      
      csvRows.push(row.join(','));
    }

    // Add BOM for Excel to read Persian (UTF-8) correctly
    const csvString = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `noosh_recipes_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setMessage({ type: 'success', text: `لیست کامل ${allDishes.length} غذا دانلود شد.` });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileJson size={24} className="text-indigo-600" />
            مدیریت پایگاه داده
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            ابزار تبدیل اکسل به JSON و دانلود لیست غذاهای فعلی
          </p>
        </div>
        
        <button 
          onClick={handleExportCurrentDatabase}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Download size={18} />
          دانلود لیست کل غذاها (Excel/CSV)
        </button>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
           <div className="flex items-center gap-3">
              <span className="bg-white px-3 py-1 rounded-lg font-bold text-indigo-700 shadow-sm">
                تعداد غذاهای جمع‌آوری شده (جدید): {accumulatedDishes.length}
              </span>
              {accumulatedDishes.length > 0 && (
                <button onClick={clearAll} className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1">
                   <Trash2 size={16} /> پاکسازی
                </button>
              )}
           </div>
        </div>

        {message && (
          <div className={`p-4 rounded-xl flex items-center gap-2 font-bold animate-in fade-in ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {message.type === 'success' ? <CheckCircle2 /> : <Trash2 />}
            {message.text}
          </div>
        )}

        {/* Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-indigo-200 rounded-2xl p-8 text-center bg-white hover:bg-indigo-50 transition-colors cursor-pointer group"
        >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Plus size={32} className="text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-700 text-lg">افزودن فایل CSV</h3>
            <p className="text-slate-500 text-sm mt-1">موتور جدید: پشتیبانی از متن‌های طولانی و ویرگول‌دار</p>
            <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
        </div>

        {/* Output Area */}
        {accumulatedDishes.length > 0 && (
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">خروجی JSON نهایی:</label>
                    <button 
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
                    >
                        <Copy size={18} />
                        کپی کد
                    </button>
                </div>
                <div className="relative">
                    <textarea 
                        readOnly
                        value={JSON.stringify(accumulatedDishes, null, 2)}
                        className="w-full h-64 p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl shadow-inner outline-none dir-ltr text-left"
                    />
                </div>
                <p className="text-xs text-slate-500 text-center">
                    این کد را کپی کنید و برای برنامه‌نویس ارسال کنید تا در اپلیکیشن قرار دهد.
                </p>
            </div>
        )}

        <div className="text-xs text-slate-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <strong className="block mb-2 flex items-center gap-1 text-gray-700"><FileText size={14}/> راهنما:</strong>
          <ul className="list-disc list-inside space-y-1">
             <li>برای دانلود لیست فعلی غذاهای موجود در برنامه، از دکمه سبز رنگ بالای صفحه استفاده کنید. فایل دانلود شده با اکسل سازگار است.</li>
             <li>برای تبدیل فایل اکسل خود به فرمت برنامه (JSON)، فایل CSV خود را در کادر بالا آپلود کنید.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DatabaseManager;
