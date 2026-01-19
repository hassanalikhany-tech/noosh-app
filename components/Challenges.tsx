
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
      // Fix: Using updateProfile instead of non-existent updatePreferences
      const updatedUser = await UserService.updateProfile(user.username, { activeChallengeId: null });
      onUpdateUser(updatedUser);
      onNotify(
        'چالش غیرفعال شد',
        'برنامه غذایی شما به حالت عادی بازگشت.',
        'bg-slate-600',
        Trophy
      );
    } else {
      // Fix: Using updateProfile instead of non-existent updatePreferences
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="metallic-navy rounded-[2rem] p-8 text-white mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/30 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-lg border border-white/10">
             <Trophy size={32} className="text-yellow-300 drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-black mb-3 leading-tight text-halo">چالش‌های هفتگی</h2>
          <p className="text-indigo-100 max-w-xl text-lg opacity-90 font-medium text-halo">
            با شرکت در چالش‌ها، عادت‌های غذایی سالم‌تری بسازید و تنوع غذایی خود را بالا ببرید.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHALLENGES.map((challenge) => {
          const isActive = user.activeChallengeId === challenge.id;
          const Icon = challenge.icon;
          
          return (
            <div 
              key={challenge.id}
              className={`
                group relative bg-white rounded-3xl p-6 border-2 transition-all duration-300 cursor-pointer overflow-hidden
                ${isActive 
                  ? 'border-violet-500 shadow-xl shadow-violet-100 transform -translate-y-1 ring-4 ring-violet-50' 
                  : 'border-gray-100 hover:border-violet-200 hover:shadow-lg hover:-translate-y-1'
                }
              `}
              onClick={() => toggleChallenge(challenge.id)}
            >
              <div className={`w-16 h-16 ${challenge.color} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={32} strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{challenge.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12">
                {challenge.description}
              </p>
              
              <div className={`
                absolute bottom-0 left-0 w-full p-4 transition-colors duration-300
                ${isActive ? 'bg-violet-50' : 'bg-gray-50 group-hover:bg-gray-100'}
              `}>
                <div className={`flex items-center justify-center gap-2 font-bold ${isActive ? 'text-violet-700' : 'text-gray-600'}`}>
                  {isActive ? (
                    <>
                      <CheckCircle2 size={20} className="fill-violet-200" />
                      فعال (برای لغو کلیک کنید)
                    </>
                  ) : (
                    <>
                      <Circle size={20} />
                      شروع چالش
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;
