import * as E from './engine.js';
import {SOCIETIES,secondaryOptions} from './business.js';

export const yearNumber=s=>1+Math.floor(s.turn/4);
export const yearLabel=s=>`${2025+yearNumber(s)}–${String(2026+yearNumber(s)).slice(-2)}`;
export const expectedYears=E.expectedGraduationYear;
export const isAnnual=s=>s?.playMode==='annual';
const baseOptions=[
 {id:'study',name:'A stronger study routine',icon:'▤',cost:2,group:'Everyday',desc:'Study support in both semesters. Better preparation, with classes handled for you.'},
 {id:'friends',name:'Make memories',icon:'♡',cost:2,group:'Everyday',desc:'Friends, campus lunches and a few nights out throughout the year.'},
 {id:'internship',name:'Build your work experience',icon:'↗',cost:3,group:'Everyday',desc:'Prepare, apply and interview. Accept a suitable offer and start when it is due.'},
 {id:'wellness',name:'Keep some balance',icon:'☀',cost:1,group:'Everyday',desc:'Movement during term and time to recharge in the breaks.'},
 {id:'exchangeapply',name:'Plan an exchange',icon:'◎',cost:1,group:'World',desc:'Apply this winter for next academic year. CGPA 2.40 minimum; places are competitive.'},
 {id:'competition',name:'Try local case competitions',icon:'◇',cost:2,group:'Projects',desc:'Team up and enter in both semesters. Preparation and results run automatically.'},
 {id:'work',name:'Earn on the side',icon:'$',cost:2,group:'Everyday',desc:'Part-time work during the semesters. More money, less room for study and rest.'},
 {id:'winterexchange',name:'Winter overseas school',icon:'◎',cost:1,group:'World',desc:'Six transfer credits if completed. Repeat in eligible years before your final year; HK$9,000.'},
 {id:'summerexchange',name:'Summer overseas school',icon:'◎',cost:1,group:'World',desc:'Six transfer credits if completed. Repeat before your final year; work takes priority. HK$9,000.'},
 {id:'travel',name:'Travel or go home',icon:'↝',cost:1,group:'World',desc:'A summer away if work or required study does not take priority. HK$4,500 extra.'},
 {id:'research',name:'Work on research',icon:'⌕',cost:2,group:'Projects',desc:'Two semesters of research experience and closer contact with a supervisor.'},
 {id:'venture',name:'Build a small business',icon:'⚡',cost:2,group:'Projects',desc:'Test your idea during term. It may become a bigger opportunity.'},
 {id:'creative',name:'Make something of your own',icon:'◈',cost:1,group:'Projects',desc:'Photography, music, content or a creative project in your breaks.'},
 {id:'volunteer',name:'Give back',icon:'✧',cost:1,group:'Projects',desc:'Contribute to a community project during the year.'},
 {id:'postgrad',name:'Prepare for further study',icon:'⌕',cost:2,group:'After HKU',desc:'Build a research record and apply for postgraduate study in your final year.'},
 {id:'gap',name:'Take a rest semester',icon:'Ⅱ',cost:1,group:'Big changes',desc:'Pause one teaching semester. Your degree may take longer.'},
 {id:'gapyear',name:'Take a year out',icon:'Ⅱ',cost:2,group:'Big changes',desc:'Pause two teaching semesters. Every run must end by Year 6.'},
 {id:'transfer',name:'Explore a programme change',icon:'⇄',cost:2,group:'Big changes',desc:'A personal turning point and a competitive transfer request; credits may be lost.'},
 {id:'exit',name:'Consider another path',icon:'↝',cost:0,group:'Big changes',desc:'Have an explicit stay, pause or withdraw decision. Selecting this does not withdraw you.'}
];
export function options(s){return [...baseOptions,...(s.housing==='Hall'?[{id:'hall',name:'Hall activities',icon:'⌂',cost:2,group:'Everyday',desc:'Join dinners, games and hall projects in both home semesters. Closer friendships, with an energy cost.'}]:[]),...SOCIETIES.map(x=>({id:'society:'+x.id,name:x.name,icon:x.group==='Sports'?'↝':x.group==='Arts & fun'?'◈':'✳',cost:2,group:'Societies',desc:'Participate in both home semesters. Membership and connections deepen over time.'})),...s.societies.filter(m=>E.societyTerms(m)>=2&&!E.runsSociety(m)).map(m=>({id:'committee:'+m.id,name:'Run '+m.name,icon:'⚑',cost:3,group:'Societies',desc:'Take a committee role, attend during term and organise one break activity.'})),...(E.caseVisible(s)?[{id:'international',name:s.caseRecord.unlocked?'Represent HKU internationally':'Take up your School invitation',icon:'✦',cost:3,group:'Projects',desc:'Selection, three training weekends and the sponsored trip. Future teams still compete for nomination.'}]:[])];}
export function reservedPoints(s){return (s.placement?Math.min(6,s.placement.remaining>6?6:3):0)+(s.exchangeBooking&&s.exchangeBooking.turn>=s.turn&&s.exchangeBooking.turn<=s.annual.endTurn?3:0);}
export const usedPoints=s=>reservedPoints(s)+s.annual.plan.choices.reduce((n,id)=>n+(options(s).find(x=>x.id===id)?.cost||0),0);
export function reason(s,id){const c=E.context(s),a=s.annual.plan;
 if(id==='exchangeapply')return E.exchangeApplicationReason(s);
 if(['winterexchange','summerexchange'].includes(id)&&E.finalCalendarYear(s))return 'Overseas schools are available before your final year.';
 if(id==='hall'&&s.housing!=='Hall')return 'Available to hall residents.';
 if(id==='postgrad'&&!c.final)return 'Available once your final study year begins.';
 if(id==='internship'&&s.placement)return 'Your accepted placement is already reserved in this year.';
 if(['gap','gapyear'].includes(id)){if(s.placement||s.exchangeBooking)return 'Resolve your booked placement or exchange before planning leave.';if(s.gapCount+(id==='gap'?1:2)>4)return 'You have reached the game’s leave allowance.';if(a.choices.some(x=>['gap','gapyear'].includes(x)&&x!==id))return 'Choose a semester or a year away.';}
 if(id.startsWith('society:')&&a.choices.includes('committee:'+id.split(':')[1])||id.startsWith('committee:')&&a.choices.includes('society:'+id.split(':')[1]))return 'Committee work already includes participation in this group.';
 if(id==='international'&&!s.caseRecord.unlocked&&s.caseRecord.invitation?.status!=='accepted')return 'A new School invitation would be needed.';
 return '';
}
function defaultPlan(s){return {choices:[],style:'balanced',load:30,primary:s.major,autoCourses:true,goExchange:true,shortSeason:1,after:s.aim||'job',story:'key',secondary:s.secondary||(E.program(s).mandatorySecond?'double':''),subject:s.secondarySubject||(E.program(s).mandatorySecond?'Finance':''),preset:'balanced'};}
export function ensure(s){if(!s||s.status==='ending')return;const migrating=!isAnnual(s);s.playMode='annual';E.updateCareerFocus(s);if(s.annual){if(s.annual.version<2){const a=s.annual.plan;a.choices=a.choices.map(id=>id==='shortexchange'?(a.shortSeason===3?'summerexchange':'winterexchange'):id);a.goExchange=true;s.annual.version=2;while(s.annual.stage==='plan'&&usedPoints(s)>10)a.choices.pop();}return;}const y=yearNumber(s);s.annual={version:2,year:y,endTurn:Math.min(23,y*4-1),stage:'plan',plan:defaultPlan(s),history:[],migrated:migrating&&(s.turn>0||s.studyTerms>0)};preset(s,'balanced');}
export function preset(s,kind){ensure(s);if(s.annual.stage!=='plan')return false;const a=s.annual.plan;a.choices=[];a.preset=kind;a.style=kind==='academic'?'academic':kind==='social'?'social':kind==='career'?'career':'balanced';const club=s.societies[0]?.id||'bea';const sets={balanced:['study','wellness','internship','society:'+club,'friends'],academic:['study','wellness','research','society:'+club,'friends'],career:['internship','competition','study','wellness','society:'+club],social:['friends','society:'+club,'society:photo','wellness','work']};for(const id of sets[kind]||sets.balanced)toggle(s,id);if(E.caseVisible(s)&&s.caseRecord.invitation?.status==='accepted'&&!s.caseRecord.unlocked){while(usedPoints(s)>7&&a.choices.length)a.choices.pop();toggle(s,'international');}return true;}
export function toggle(s,id){ensure(s);if(s.annual.stage!=='plan'||!options(s).some(x=>x.id===id))return false;const a=s.annual.plan,i=a.choices.indexOf(id);if(i>=0){a.choices.splice(i,1);a.preset='custom';return true;}if(reason(s,id)||usedPoints(s)+(options(s).find(x=>x.id===id).cost)>10)return false;a.choices.push(id);return true;}
function snapshot(s){return {gpa:E.gpa(s),credits:s.credits,cash:s.cash,internships:s.internships,exchanges:s.exchanges,wellbeing:s.wellbeing,energy:s.energy,bonds:s.bonds,log:s.log.length,grades:s.grades.length,experience:s.experience.length,awards:s.achievements.length};}
export function start(s){ensure(s);const y=s.annual;if(y.stage!=='plan'||usedPoints(s)>10||y.plan.choices.some(id=>reason(s,id)))return false;if(s.turn>23){s.endType='incomplete';s.endReason='Six years, and a different next chapter';E.finish(s);return true;}y.before=snapshot(s);y.seasons=[];y.spotlights=0;y.skipped=[];y.preparedTurn=null;y.recordedTurn=null;y.stage='running';s.needsGuide=false;s.aim=y.plan.after;s.flags.aimChosen=true;

 if(y.plan.choices.includes('gap')||y.plan.choices.includes('gapyear')){const n=y.plan.choices.includes('gapyear')?2:1;s.leaveTerms=Math.max(s.leaveTerms,n);s.gapCount+=n;E.record(s,'A planned pause',`${n} teaching semester(s) away. Your calendar continues; Year 6 remains the final limit.`,'Turning point');}
 E.reconcileReturns(s);
 if(s.status==='plan'&&y.plan.choices.some(id=>['transfer','exit'].includes(id))){s.queue=[y.plan.choices.includes('exit')?'exitdecision':'transfer'];s.eventIndex=0;s.resumePlanAfterCampus=true;s.status='event';}
 return true;}
function add(s,id,label=id,required=false){const a=E.actionById(s,id);if(!a)return false;const blocked=E.actionStatus(s,a);if(blocked){s.annual.skipped.push({turn:s.turn,title:label,reason:blocked});return false;}if(required&&a.cost>s.cash){const funding=a.cost-s.cash;s.cash+=funding;s.debt+=funding;E.record(s,'Funding arranged for booked travel',`HK$${funding.toLocaleString()} added to the funding gap so your booked trip can proceed.`,'Money');}if(E.toggleAction(s,id))return true;s.annual.skipped.push({turn:s.turn,title:label,reason:E.actionStatus(s,a)||'Other commitments or the spending budget took priority.'});return false;}
function degreeSetup(s){const a=s.annual.plan,c=E.context(s);if(a.primary!==s.major&&!s.flags.majorLocked&&(c.year>=2||c.phase===3)&&(!c.final||c.phase===0)&&c.p.majors.includes(a.primary)){if(a.primary!=='Entrepreneurship, Design and Innovation'||(E.gpa(s)||0)>=3){s.major=a.primary;s.flags.majorLocked=true;E.record(s,'A major direction chosen',s.major,'Study');}}if(!s.secondary&&a.secondary&&a.subject){if(E.setSecondary(s,a.secondary,a.subject))E.record(s,'Study track declared',`${a.secondary==='double'?'Second major':'Minor'} in ${a.subject}.`,'Study');}s.plan.load=a.autoCourses&&s.credits<s.studyTerms*30?36:a.load;s.plan.focus=a.style;s.plan.spare='rest';}
function preparePhase(s){const y=s.annual,a=y.plan,c=E.context(s),has=id=>a.choices.includes(id);s.plan=E.freshPlan();degreeSetup(s);y.phaseStart=s.log.length;y.preparedTurn=s.turn;
 if(E.placementActive(s)){E.startPlacement(s);add(s,'rest');return;}
 if(s.leaveTerms&&c.term){add(s,'rest');return;}
 if(s.exchangeBooking?.turn===s.turn){if(!add(s,'exchange','Booked exchange',true))E.declineExchange(s);}
 if(c.p.global&&!E.actionStatus(s,E.actionById(s,'global')))add(s,'global','Required global module',true);
 if(c.p.crp&&!s.flags.crp)add(s,'crp','Required career readiness');
 // Required exchange applications are prepared automatically; optional exchanges are opt-in.
 if(c.phase===1&&!s.exchangeBooking&&!c.p.global&&!E.semesterExchangeTaken(s)&&(has('exchangeapply')||c.p.mandatoryExchange&&!s.semesterExchanges)){if(c.p.mandatoryExchange)s.exchangeChoice=0;add(s,'exchangeapply','Next-year exchange application');}
 const invited=s.caseRecord.invitation?.status==='accepted'&&s.caseRecord.invitation.targetTurn===s.turn;
 if(c.term&&(has('international')||invited))add(s,'caseinternational','International case team');
 if(c.term){
  if(has('internship')){if(!s.placement&&!s.offers.some(o=>o.kind==='intern'&&o.status==='pending')&&!E.finalCalendarYear(s))add(s,'recruit','Internship applications');else if(E.finalCalendarYear(s)&&s.aim==='job'&&E.graduateChoices(s).length<2)add(s,'job','Graduate applications');}
  if(has('postgrad')&&c.final&&!s.flags.postgradOffer){s.aim='study';add(s,'postgrad','Postgraduate applications');}
  for(const id of a.choices.filter(x=>x.startsWith('committee:'))){const m=s.societies.find(m=>m.id===id.split(':')[1]);add(s,E.runsSociety(m)?'society:'+m.id:id,options(s).find(x=>x.id===id)?.name||'Society work');}
  for(const id of a.choices.filter(x=>x.startsWith('society:')))add(s,id,options(s).find(x=>x.id===id)?.name||'Society participation');
  for(const id of ['study','competition','research','venture','hall','work','friends'])if(has(id))add(s,id,options(s).find(x=>x.id===id)?.name);
  if(has('internship')&&!s.plan.actions.some(id=>['job','recruit'].includes(id)))add(s,'careers','Career preparation');
  if(has('wellness'))add(s,'sport','Movement');
 }else{
  if(has(c.phase===1?'winterexchange':'summerexchange'))add(s,'shortexchange','Short overseas study');
  if(c.phase===3&&s.credits<s.studyTerms*30&&!c.final)add(s,'summer','Make-up summer course');
  if(has('travel')&&c.phase===3)add(s,'travel','Summer travel');
  if(has('creative'))add(s,'creative','Creative project');
  if(has('volunteer')&&c.phase===3)add(s,'volunteer','Community project');
  if(c.phase===3)for(const id of a.choices.filter(x=>x.startsWith('committee:')))add(s,'society:'+id.split(':')[1],'Committee summer work');
  if(has('friends'))add(s,'friends','Time with friends');
  if(has('wellness'))add(s,'rest','Recovery');
 }
}
function reviewOffers(s){E.reconcileReturns(s);for(const o of s.offers.filter(o=>o.status==='pending'&&o.expires>=s.turn)){
 if(o.kind==='job'&&s.aim==='job'&&s.job){o.status='held';o.expires=23;continue;}
 const wanted=o.kind==='intern'?(s.annual.plan.choices.includes('internship')||!!o.referredBy):(s.aim==='job'&&(!s.job||o.salary>s.job.salary));
 if(wanted){if(!E.acceptOffer(s,o.id))E.declineOffer(s,o.id);}else E.declineOffer(s,o.id);
}}
const forced=new Set(['exitdecision','discipline']);
const interesting=new Set(['romance','transfer','startup','burnout','integrity','scouted','viral']);
function shouldPause(s,e){if(!e||e.id.startsWith('interview-'))return false;if(e.id.endsWith('-invitation')||e.id.endsWith('-referral')||forced.has(e.id))return true;return (interesting.has(e.id)||s.annual.plan.story==='more')&&s.annual.spotlights<(s.annual.plan.story==='more'?2:1);}
function autoChoice(s,e){const a=s.annual.plan;const safe=e.choices.map((o,i)=>({o,i})).filter(({o})=>!E.eventChoiceReason(s,o)&&!['withdraw','cheat','ignorehearing','transfer','considerexit','businessgap','healthleave'].includes(o.special)&&o.special!=='case:withdraw');if(!safe.length)return e.choices.findIndex(o=>!E.eventChoiceReason(s,o));
 const prefer=e.id.startsWith('interview-')?'interview:evidence':e.id.includes('-training-')?'case:train:steady':e.id.includes('-selection')?'case:select:balanced':e.id.includes('-international')?'case:final:evidence':e.id.includes('-local')?'case:local:evidence':null;if(prefer){const found=safe.find(x=>x.o.special===prefer);if(found)return found.i;}
 const weights=a.style==='academic'?{academic:15,knowledge:1,energy:.3}:a.style==='career'?{career:2,network:1,energy:.2}:a.style==='social'?{bonds:2,wellbeing:.5}: {wellbeing:1,energy:.7,bonds:.5,academic:6};return safe.map(x=>({...x,score:Object.entries(x.o.effects||{}).reduce((n,[k,v])=>n+v*(weights[k]||0),0)+E.random(s)*4})).sort((a,b)=>b.score-a.score)[0].i;
}
function recordSeason(s){const y=s.annual;if(y.recordedTurn===s.turn)return;y.recordedTurn=s.turn;const entries=s.log.slice(y.phaseStart??y.before.log).filter(x=>x.turn===s.turn&&!['Plan','Money'].includes(x.tag));const priority=t=>/Exchange application|Placement completed|offer accepted|A semester abroad|Global module|Champion|Podium|representing HKU/.test(t.title+' '+t.text)?4:t.tag==='Study'?1:2;const highlights=entries.map((x,i)=>({...x,i})).sort((a,b)=>priority(b)-priority(a)||b.i-a.i).slice(0,2).sort((a,b)=>a.i-b.i);y.seasons.push({turn:s.turn,label:['Semester 1','Winter','Semester 2','Summer'][s.turn%4],highlights,grade:s.grades.filter(g=>g.date===E.dateLabel(s)).at(-1)||null});}
function recap(s){E.reconcileReturns(s);const y=s.annual;y.after=snapshot(s);y.stage='recap';y.summary={credits:s.credits-y.before.credits,internships:s.internships-y.before.internships,exchanges:s.exchanges-y.before.exchanges,gpa:E.gpa(s),newWork:s.experience.slice(y.before.experience),newAwards:s.achievements.slice(y.before.awards),exchangeApplications:(s.exchangeApplications||[]).filter(x=>x.turn>=y.year*4-4&&x.turn<=y.endTurn)};}
// Run at most one teaching phase per tick. Rendering can animate the year without extra decisions.
export function tick(s){const y=s.annual;if(!y||y.stage!=='running'||s.status==='ending')return;const initial=s.turn;let guard=0;while(guard++<100){
 if(s.status==='event'){const e=E.currentEvent(s);if(shouldPause(s,e)){y.stage='choice';y.spotlights++;return;}if(!E.chooseEvent(s,autoChoice(s,e)))throw Error('Unable to resolve annual event');continue;}
 if(s.status==='reaction'){
  // A strong study-and-work plan keeps searching after rejection, without new player prompts.
  const o=s.application,e=E.currentEvent(s);if(e?.id.startsWith('interview-')&&o?.status==='rejected'&&!o.followupChecked&&E.annualInterviewLimit(s)===3){o.followupChecked=true;if(E.recruitment(s,o.kind))s.queue.splice(s.eventIndex+1,0,s.interviewEvent.id);}
  E.continueReaction(s);continue;
 }
 if(s.status==='ending'){recap(s);return;}
 if(s.status==='results'){reviewOffers(s);recordSeason(s);if(s.readyToGraduate||s.turn>=y.endTurn){recap(s);return;}E.nextPhase(s);if(s.turn!==initial)return;continue;}
 if(s.status==='plan'){if(y.preparedTurn!==s.turn)preparePhase(s);if(!E.commitPlan(s))throw Error(E.pendingDecision(s)||'Annual schedule could not be committed');continue;}
 throw Error('Unexpected annual state: '+s.status);
 }throw Error('Annual phase loop exceeded its limit');}
export function choose(s,index){if(s.annual?.stage!=='choice'||!E.chooseEvent(s,index))return false;s.annual.stage='outcome';return true;}
export function continueYear(s){if(s.annual?.stage!=='outcome')return false;E.continueReaction(s);s.annual.stage='running';return true;}
export function nextYear(s){const old=s.annual;if(old?.stage!=='recap')return false;old.history.push({year:old.year,summary:old.summary,seasons:old.seasons});if(s.status==='ending')return true;E.nextPhase(s);if(s.status==='ending')return true;const history=old.history;s.annual=null;ensure(s);s.annual.history=history;return true;}
export function arrive(s,housing=1,ocamp=1){if(!s.onboarding)return false;while(s.onboarding){if(s.status==='event'){const e=E.currentEvent(s);if(!E.chooseEvent(s,e.id==='housing'?housing:ocamp))return false;}else if(s.status==='reaction')E.continueReaction(s);else break;}ensure(s);return true;}
