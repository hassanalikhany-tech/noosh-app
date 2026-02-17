
import React from 'react';
import { Trophy, CheckCircle2, Circle } from 'lucide-react';
import { UserProfile } from '../types';
import { UserService } from '../services/userService';
import { CHALLENGES } from '../data/challenges';

interface ChallengesProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onNotify: (title: string, message: string, color: string, icon: any) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ user, onUpdateUser, onNotify }) => {
  
  const toggleChallenge = async (id: string) => {
    const selectedChallenge = CHALLENGES.find(c => c.id === id);
    if (!selectedChallenge) return;

    if (user.activeChallengeId === id) {
      const updatedUser = await UserService.updateProfile(user.username, { activeChallengeId: null });
      onUpdateUser(updatedUser);
      onNotify(
        'چالش غیرفعال شد',
        'برنامه غذایی شما به حالت عادی بازگشت.',
        'bg-slate-600',
        Trophy
      );
    } else {
      const updatedUser = await UserService.updateProfile(user.username, { activeChallengeId: id });
      onUpdateUser(updatedUser);
      onNotify(
        `چالش ${selectedChallenge.title} فعال شد`,
        selectedChallenge.description,
        selectedChallenge.color.replace('bg-', 'bg-').split('-')[1] === 'blue' ? 'bg-blue-600' : 
        selectedChallenge.color.replace('bg-', 'bg-').split('-')[1] === 'green' ? 'bg-green-600' :
        selectedChallenge.color.replace('bg-', 'bg-').split('-')[1] === 'emerald' ? 'bg-emerald-600' :
        selectedChallenge.color.replace('bg-', 'bg-').split('-')[1] === 'red' ? 'bg-red-600' : 
        selectedChallenge.color.replace('bg-', 'bg-').split('-')[1] === 'rose' ? 'bg-rose-600' : 'bg-purple-600',
        selectedChallenge.icon
      );
    }
  };

  return (
    <div className="flex flex-col h-full animate-enter">
      {/* هدر ثابت چالش‌ها */}
      <div className="sticky top-0 z-[900] bg-[#f8fafc]/95 backdrop-blur-md px-4 py-3 sm:py-6 sm:px-10">
          <div className="metallic-navy rounded-2xl sm:rounded-[3.5rem] p-5 sm:p-12 text-white shadow-2xl relative overflow-hidden max-w-7xl mx-auto">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-96 sm:h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-[40px] sm:blur-[100px]"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="p-3 sm:p-6 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-[2rem] shadow-xl border border-white/10">
                 <Trophy size={30} className="text-yellow-300 sm:w-16 sm:h-16" />
              </div>
              <div className="text-center sm:text-right">
                  <h2 className="text-lg sm:text-5xl font-black mb-1 sm:mb-4 leading-tight">چالش‌های هفتگی غذا</h2>
                  <p className="text-indigo-100 max-w-2xl text-[10px] sm:text-xl opacity-90 font-medium leading-relaxed">
                    با شرکت در چالش‌های هفتگی نوش، عادت‌های غذایی سالم‌تری بسازید و تنوع غذاهای سفره خود را افزایش دهید.
                  </p>
              </div>
            </div>
          </div>
      </div>

      {/* بخش اسکرول با فاصله ۳ خطی */}
      <div className="flex-grow overflow-y-auto px-4 sm:px-10 pb-20 no-scrollbar">
          <div className="h-10 sm:h-12 w-full"></div> {/* ۳ خط فاصله خالی */}
          <div className="max-w-7xl mx-auto py-4 sm:py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {CHALLENGES.map((challenge) => {
                  const isActive = user.activeChallengeId === challenge.id;
                  const Icon = challenge.icon;
                  
                  return (
                    <div 
                      key={challenge.id}
                      className={`
                        group relative bg-white rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-8 border-2 transition-all duration-500 cursor-pointer overflow-hidden
                        ${isActive 
                          ? 'border-violet-500 shadow-2xl shadow-violet-100 transform -translate-y-1 sm:-translate-y-2 ring-4 sm:ring-8 ring-violet-50' 
                          : 'border-slate-50 hover:border-violet-200 hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2'
                        }
                      `}
                      onClick={() => toggleChallenge(challenge.id)}
                    >
                      <div className={`w-14 h-14 sm:w-20 sm:h-20 ${challenge.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white mb-4 sm:mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <Icon size={28} className="sm:w-10 sm:h-10" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-slate-800 mb-2 sm:mb-4">{challenge.title}</h3>
                      <p className="text-slate-500 text-xs sm:text-base leading-relaxed mb-10 h-12 sm:h-16">
                        {challenge.description}
                      </p>
                      <div className={`
                        absolute bottom-0 left-0 w-full p-4 sm:p-5 transition-colors duration-500
                        ${isActive ? 'bg-violet-600 text-white' : 'bg-slate-50 group-hover:bg-slate-100 text-slate-600'}
                      `}>
                        <div className="flex items-center justify-center gap-2 sm:gap-3 font-black text-[10px] sm:text-sm">
                          {isActive ? (
                            <>
                              <CheckCircle2 size={16} className="animate-pulse sm:w-6" />
                              لغو چالش فعال
                            </>
                          ) : (
                            <>
                              <Circle size={16} className="sm:w-6" />
                              پذیرش این چالش غذا
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Challenges;
