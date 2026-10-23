import {SOCIETIES,INDUSTRIES} from './business.js';
import {context,random,clamp,dateLabel,record,effects,placementActive,recruitment,finalCalendarYear,graduateChoices} from './engine.js';
const memo=(s,title,text)=>{s.notes.push({title,text,tag:'Campus'});record(s,title,text,'Campus');};
export const runsSociety=m=>!!m&&(m.running===true||m.role==='Committee member');
export const societyTerms=m=>m?.teachingTurns?.length||0;
export function upgradeCampus(s){
 if(s.campusEdition===4){hidePrematureAnnouncements(s);return s;}
 s.societies??=[];s.achievements??=[];s.skills??={finance:0,consulting:0,people:0,data:0};
 for(const m of s.societies){m.teachingTurns??=[...new Set(s.log.filter(x=>x.title===m.name&&x.tag==='Campus'&&[0,2].includes(x.turn%4)).map(x=>x.turn))];m.running=runsSociety(m);m.trust??=Math.min(60,societyTerms(m)*12);m.performance??=m.id==='hics'?caseReadiness(s):0;}
 s.caseRecord??={unlocked:false,localEntries:0,localAwards:s.flags.award?1:0,localChampions:0,internationalEntries:0,internationalAwards:0,internationalChampions:0,lastApplied:null,history:[]};
 const r=s.caseRecord,ongoing=s.caseAttempt&&['application','training','ready'].includes(s.caseAttempt.status)&&['event','reaction'].includes(s.status);
 r.unlocked=r.internationalEntries>0;r.discovered=!!r.unlocked||!!ongoing;
 r.localThreshold??=secretRoll(s,'award-threshold')<.6?2:3;
 r.circleTrust??=Math.min(100,r.internationalEntries*16);r.lastReviewed??=null;r.invitation??=null;
 if(ongoing&&!r.unlocked)r.invitation={status:'accepted',seen:true,issuedTurn:s.turn,targetTurn:s.turn,city:s.caseAttempt.city};
 s.referrals??=[];s.referralLead??=null;s.lastReferralReview??=null;s.lastReferralTurn??=-99;
 s.caseEvents??={};s.campusEdition=4;
 if(s.status==='plan')s.plan.actions=s.plan.actions.map(id=>id==='society'?`society:${s.societyTarget||'bea'}`:id==='committee'?`committee:${s.societies.find(m=>societyTerms(m)>=2)?.id||s.societyTarget||'bea'}`:id).filter(id=>!id.startsWith('society:')||context(s).term||runsSociety(s.societies.find(m=>m.id===id.split(':')[1])));
 if(s.status==='plan'&&!r.unlocked&&!r.invitation)s.plan.actions=s.plan.actions.filter(id=>id!=='caseinternational');hidePrematureAnnouncements(s);return s;
}
function hidePrematureAnnouncements(s){if(s.caseRecord?.discovered||s.caseRecord?.unlocked)return;for(const item of [...(s.log||[]),...(s.notes||[])]){if(item.title==='International case pathway unlocked'){item.title='Your case experience is growing';item.text='Your teamwork, preparation and competition experience are becoming part of your university story.';}if(item.text)item.text=item.text.replace(' Your international nomination pathway is open.','');}if(s.reaction?.text)s.reaction.text=s.reaction.text.replace(' Your international nomination pathway is open.','');}
export function campusAction(s,id){
 if(id==='caseinternational')return {id,name:s.caseRecord.unlocked?'Represent HKU internationally':'Join your invited case team',desc:s.caseRecord.unlocked?'Form a team and seek selection. Reserve 3 slots for selection, three training weekends and a sponsored trip.':'Take up your invitation this semester. Complete three training weekends before the sponsored trip.',category:'Career',icon:'✦',time:3,cost:0,special:id};
 const [kind,key]=id.split(':');if(!['society','committee'].includes(kind))return null;const x=SOCIETIES.find(x=>x.id===key);if(!x)return null;
 const m=s.societies.find(m=>m.id===key),lead=kind==='committee';
 return {id,name:`${lead?'Run for committee':context(s).term?'Society participation':'Organise break activities'} · ${x.name}`,desc:lead?'Take responsibility for this group after two teaching semesters.':context(s).term?x.desc:'You run this society: organise its projects and prepare activities during the break.',category:'Campus',icon:lead?'⚑':x.group==='Sports'?'↝':x.group==='Arts & fun'?'◈':'✳',time:lead?2:1,cost:300,effects:lead?{network:7,career:5,energy:-9,academic:-.1}:x.group==='Sports'?{bonds:7,wellbeing:8,energy:3}:x.group==='Arts & fun'?{bonds:7,wellbeing:6,creative:5,energy:-2}:{bonds:7,network:5,energy:-4},special:id};
}
export function campusActions(s){return [...(caseVisible(s)?[campusAction(s,'caseinternational')]:[]),...s.plan.actions.filter(id=>id.includes(':')).map(id=>campusAction(s,id)).filter(Boolean)];}
export function campusReason(s,a){
 const c=context(s),[kind,key]=a.id.split(':');
 if(['society','committee'].includes(kind)){
  const m=s.societies.find(m=>m.id===key);
  if(!c.term&&(kind==='committee'||!runsSociety(m)))return 'Winter and summer society work is for students running this particular group.';
  if(kind==='committee'&&runsSociety(m))return 'You already run this society. Choose its participation activity.';
  if(kind==='committee'&&societyTerms(m)<2)return 'Attend this society for two teaching semesters before running for committee.';
  if(s.plan.actions.includes(`${kind==='society'?'committee':'society'}:${key}`))return 'Choose participation or committee work for this group this semester; committee work includes participation.';
  if(s.plan.actions.some(id=>['exchange','global'].includes(id)))return 'Home-campus society work does not overlap an overseas study phase.';
 }
 if(a.id==='caseinternational'){
  if(!c.term)return 'Team selection opens once each teaching semester.';
  if(!s.caseRecord.unlocked){const invitation=s.caseRecord.invitation;if(!invitation||invitation.status!=='accepted')return 'This opportunity needs an active Business School invitation.';if(invitation.targetTurn!==s.turn)return `Your invitation is for ${dateLabel({...s,turn:invitation.targetTurn})}.`;}
  if(s.caseRecord.lastApplied===s.turn)return 'Your team has already applied this semester. You can try again next semester.';
  if(s.plan.actions.some(id=>['exchange','global'].includes(id)))return 'Keep a home semester free for training and the competition trip.';
 }
 if(['exchange','global'].includes(a.id)&&s.plan.actions.some(id=>/^(society:|committee:|caseinternational$)/.test(id)))return 'Remove home-campus society or international case commitments before overseas study.';
 return '';
}
export function caseReadiness(s){return Math.round(clamp((s.skills.consulting||0)*.45+s.knowledge*.3+s.career*.25+Math.min(4,societyTerms(s.societies.find(m=>m.id==='hics')))*5));}
// Hidden, stable draws prevent reloading or repeatedly checking eligibility from rerolling opportunities.
export function secretRoll(s,key){let h=s.seed>>>0;for(const ch of key)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;h=Math.imul(h^(h>>>16),2246822507)>>>0;return ((h^(h>>>13))>>>0)/4294967296;}
export const caseVisible=s=>!!(s.caseRecord?.discovered||s.caseRecord?.unlocked);
export function schoolRoster(s,turn=s.turn){const r=s.caseRecord,year=Math.floor(turn/4);if(r.school?.year!==year)r.school={year,npcs:58+Math.floor(secretRoll(s,`case-roster-${year}`)*22),capacity:79};if(r.unlocked)r.school.npcs=Math.min(78,r.school.npcs);return r.school;}
export function invitationEligibility(s){const r=s.caseRecord,m=s.societies.find(m=>m.id==='hics');return r.localAwards>=r.localThreshold||societyTerms(m)>=2&&m.performance>=40&&caseReadiness(s)>=40;}
export function checkCaseUnlock(s){
 const r=s.caseRecord,c=context(s);if(!r||r.unlocked||!c.term||s.leaveTerms||placementActive(s)||s.currentExchange||s.endReason||r.lastReviewed===s.turn)return;
 r.lastReviewed=s.turn;
 if(r.invitation&&['pending','accepted','joined'].includes(r.invitation.status))return;
 if(!invitationEligibility(s))return;
 const targetTurn=s.turn+2;if(targetTurn>23)return;const roster=schoolRoster(s,targetTurn);if(roster.npcs>=roster.capacity)return;
 const chance=Math.min(.22,.1+Math.max(0,r.localAwards-r.localThreshold)*.025+(s.societies.find(m=>m.id==='hics')?.performance>=55?.04:0)+(r.localChampions>0?.025:0));
 if(secretRoll(s,`case-invitation-${s.turn}`)>=chance)return;
 r.invitation={status:'pending',seen:false,issuedTurn:s.turn,targetTurn,city:['Singapore','Copenhagen','Rotterdam','Vancouver'][Math.floor(secretRoll(s,`case-city-${s.turn}`)*4)]};
 // Reveal only when the School's invitation is presented, never on the qualifying award screen.
}
export function connectionSources(s){const sources=s.societies.filter(m=>societyTerms(m)>=3&&m.trust>=36).map(m=>({id:m.id,name:m.name,strength:m.trust,skill:SOCIETIES.find(x=>x.id===m.id)?.skill||'people'}));if(s.caseRecord.internationalEntries>=2&&s.caseRecord.circleTrust>=30)sources.push({id:'case-circle',name:'your international case competition circle',strength:s.caseRecord.circleTrust,skill:'consulting'});return sources;}
export function reviewReferrals(s){
 const c=context(s);if(!c.term||s.onboarding||s.leaveTerms||placementActive(s)||s.lastReferralReview===s.turn)return;s.lastReferralReview=s.turn;
 if(s.turn-s.lastReferralTurn<6||graduateChoices(s).length>=2||s.offers.some(o=>o.status==='pending')||!finalCalendarYear(s)&&s.placement)return;
 const contacts=connectionSources(s);if(!contacts.length)return;
 const contact=contacts[Math.floor(secretRoll(s,`referral-contact-${s.turn}`)*contacts.length)],chance=Math.min(.075,.035+Math.max(0,contact.strength-36)*.0004+(contact.id==='case-circle'?.005:0));
 if(secretRoll(s,`referral-chance-${s.turn}`)>=chance)return;
 const pool=INDUSTRIES.filter(i=>i.skill===contact.skill),industry=pool[Math.floor(secretRoll(s,`referral-industry-${s.turn}`)*pool.length)],firm=industry.firms[Math.floor(secretRoll(s,`referral-firm-${s.turn}`)*industry.firms.length)],kind=finalCalendarYear(s)?'job':'intern';
 const lead={id:`referral-${s.turn}-${contact.id}`,created:s.turn,kind,industry:industry.id,company:firm[0],role:kind==='job'?firm[1]:firm[1].replace(/Associate|Analyst|Trainee|Officer|Assistant/,'Intern'),salary:Math.round((kind==='job'?industry.pay:industry.intern)*firm[4]/500)*500,mode:'summer',source:contact.name,status:'invited',contact:['Jamie','Alex','Sam','Kelly'][Math.floor(secretRoll(s,`referral-name-${s.turn}`)*4)]};
 s.referralLead=lead;s.referrals.push(lead);s.lastReferralTurn=s.turn;
}
export function openCampusInterludes(s){
 const r=s.caseRecord,inv=r.invitation,events=[];
 if(inv&&inv.status==='pending'&&!inv.seen){inv.seen=true;r.discovered=true;events.push(addEvent(s,'invitation','An unexpected email from the Business School',`Your recent work caught someone’s attention. The School invites you to join a small international case team for ${dateLabel({...s,turn:inv.targetTurn})} in ${inv.city}. You had not expected this email. The trip is fully sponsored and requires three weekends of training.`,[
 choice('Accept the invitation','Reserve 3 slots in the invited semester; prepare before travelling','case:invite:accept'),
 choice('Thank them, but pass this time','Keep space for your own priorities; another invitation is not guaranteed','case:invite:decline')]))}
 const lead=s.referralLead;if(lead?.status==='invited'&&lead.created===s.turn){events.push(addEvent(s,'referral','A familiar name in your messages',`${lead.contact}, someone you have got to know through ${lead.source}, has thought of you for ${lead.role} at ${lead.company}. They offer to introduce you to the hiring team. Fictional pay: HK$${lead.salary.toLocaleString()}/month. A referral opens a conversation; the interview and offer are still up to the employer.`,[
 choice('Accept the introduction and prepare','Hear about the role, then interview','case:referral:accept',{energy:-3}),
 choice('Thank them and stay in touch','This opening does not have to be your next step','case:referral:decline',{bonds:2})]));s.caseEvents[events.at(-1)].category='Connections';}
 if(events.length){s.queue=events;s.eventIndex=0;s.reaction=null;s.resumePlanAfterCampus=true;s.status='event';}
}
export const casePriority=s=>s.caseRecord.internationalChampions>0?'International champion priority':s.caseRecord.localChampions>0?'Local champion priority':s.caseRecord.localAwards+s.caseRecord.internationalAwards>0?'Award-winner priority':'Developing team';
export function selectionScore(s,team){const r=s.caseRecord,bonus=r.internationalChampions?24:r.localChampions?18:r.localAwards+r.internationalAwards?8:0;return caseReadiness(s)+bonus+(team==='balanced'?8:team==='specialists'?(s.skills.finance+s.skills.data>=25?12:2):3)-(s.energy<25?12:0);}
function addEvent(s,id,title,text,choices){const e={id:`case-${s.turn}-${id}`,category:'Case competitions',title,text,choices};s.caseEvents[e.id]=e;return e.id;}
const choice=(label,hint,special,effects={})=>({label,hint,special,effects});
export function runCampusAction(s,id){
 const [kind,key]=id.split(':');
 if(['society','committee'].includes(kind)){
  const x=SOCIETIES.find(x=>x.id===key);let m=s.societies.find(m=>m.id===key);
  if(!m){m={id:key,name:x.name,terms:0,teachingTurns:[],role:'Participant',running:false,trust:0,performance:0};s.societies.push(m);}
  m.terms++;if(context(s).term&&!m.teachingTurns.includes(s.turn))m.teachingTurns.push(s.turn);
  if(kind==='committee'){m.running=true;m.role='Committee member';s.flags.leadership=true;}else if(!runsSociety(m)&&societyTerms(m)>=2)m.role='Project contributor';
  s.flags.society=true;s.skills[x.skill]=(s.skills[x.skill]||0)+(key==='hics'?8:4);m.trust=clamp((m.trust||0)+(context(s).term?kind==='committee'?16:12:5));if(key==='hics'&&context(s).term){const n=societyTerms(m);m.performance=((m.performance||0)*(n-1)+caseReadiness(s))/n;}if(societyTerms(m)===3&&context(s).term)memo(s,'Familiar faces, deeper friendships',`After showing up for ${x.name} over several semesters, teammates remember what you are good at. You have people you can turn to.`);
  memo(s,x.name,`${m.role} · ${societyTerms(m)} teaching semester(s) attended.${context(s).term?'':' You organise break activities as a committee member.'}`);return [];
 }
 if(id==='competition'){
  s.skills.consulting+=8;s.caseRecord.localEntries++;
  return [addEvent(s,'local','Your local case competition','The team has a solution. Before presenting to a simulated Hong Kong business-case panel, what gets your final attention?',[
   choice('Test the numbers and sharpen the story','Evidence and a coherent recommendation','case:local:evidence',{energy:-4,knowledge:3}),
   choice('Rehearse together and challenge assumptions','Stronger teamwork and delivery','case:local:team',{energy:-3,bonds:3}),
   choice('Improvise on the day','Save energy; a less prepared presentation','case:local:improvise',{energy:3})])];
 }
 if(id==='caseinternational'){
  const r=s.caseRecord;r.lastApplied=s.turn;
  if(!r.unlocked&&r.invitation?.status==='accepted'){
   r.invitation.status='joined';s.caseAttempt={turn:s.turn,city:r.invitation.city,status:'training',weekends:0,training:0,firstInvitation:true};
   return [trainingEvent(s)];
  }
  s.caseAttempt={turn:s.turn,city:['Singapore','Copenhagen','Rotterdam','Vancouver'][Math.floor(random(s)*4)],status:'application',weekends:0,training:0,threshold:45+random(s)*30};
  return [addEvent(s,'selection','Build the team you want to represent HKU','Choose a team for this semester’s international nomination. Case capability, energy, complementary skills and past awards affect selection. Former champions receive the strongest priority. Three slots are reserved for selection, training and travel; unused training time becomes rest if you are not selected.',[
   choice('Build a balanced team','Combine analysis, finance and presentation strengths','case:select:balanced'),
   choice('Bring technical specialists','Best when your finance and data skills are developed','case:select:specialists'),
   choice('Team up with close friends','Familiarity and connection; less emphasis on complementary skills','case:select:friends',{bonds:4})])];
 }
 return null;
}
function appendNext(s,id){s.queue.splice(s.eventIndex+1,0,id);}
function trainingEvent(s){const a=s.caseAttempt,n=a.weekends+1,titles=['Case cracking & research','Financial analysis & feasibility','Presentation & judge Q&A'];return addEvent(s,`training-${n}`,`Training weekend ${n} of 3 · ${titles[n-1]}`,`Your team is selected for a simulated international invitational in ${a.city}. All three weekends must be completed before departure. HKU covers travel, accommodation, entry fees and training in this game.`,[
 choice('Prepare thoroughly and work through feedback','Build case skills; spend energy',`case:train:deep`,{energy:-5}),
 choice('Practise at a sustainable pace','Complete the weekend with a lighter workload',`case:train:steady`,{energy:-2}),
 choice('Withdraw from this trip','Keep the pathway open for another semester',`case:withdraw`,{energy:6})]);}
function finalEvent(s){return addEvent(s,'international','You are representing HKU',`Three training weekends completed. Your team arrives in ${s.caseAttempt.city} for the simulated International Business Case Invitational. HKU has covered the trip. The result now depends on preparation, delivery and the strength of the field.`,[
 choice('Make a clear, evidence-led recommendation','Use your analysis and preparation','case:final:evidence',{energy:-3}),
 choice('Trust the team and adapt in Q&A','Draw on teamwork and presentation practice','case:final:team',{energy:-3}),
 choice('Try a bold last-minute pivot','Higher uncertainty; the idea may miss the brief','case:final:bold',{energy:-5})]);}
export function caseChoice(s,id){
 if(!id?.startsWith('case:'))return null;
 const [,stage,style]=id.split(':'),r=s.caseRecord,a=s.caseAttempt;
 if(stage==='invite'){
  const inv=r.invitation;if(!inv||inv.status!=='pending')return 'You have already replied to this invitation.';
  inv.status=style==='accept'?'accepted':'declined';
  return style==='accept'?`You accept. Your place is reserved for ${dateLabel({...s,turn:inv.targetTurn})}. ${s.playMode==='annual'?'Your training and sponsored trip will be arranged automatically when the time comes.':'Select “Join your invited case team” in that semester and keep three slots free for training and travel.'} Future nominations open only after you take part in this first competition.`:'You thank the School and decline. Your time is yours to choose; there is no standing invitation.';
 }
 if(stage==='referral'){
  const lead=s.referralLead;if(!lead||lead.status!=='invited')return 'You have already replied to this introduction.';
  lead.status=style==='accept'?'interview':'declined';const saved=s.referrals.find(x=>x.id===lead.id);if(saved)saved.status=lead.status;
  if(style==='decline')return `You thank ${lead.contact} and stay in touch. No application or job is added to your CV.`;
  if(!recruitment(s,lead.kind,lead)){lead.status='unavailable';if(saved)saved.status=lead.status;return 'This introduction cannot progress while another offer or placement conflicts. Your connection remains.';}
  appendNext(s,s.interviewEvent.id);return `${lead.contact} sends the introduction. ${lead.company} invites you to interview for ${lead.role}. You still need to demonstrate fit; an offer is not guaranteed.`;
 }
 if(stage==='local'){
  const score=caseReadiness(s)+(style==='evidence'?10:style==='team'?8:-8)+random(s)*45;
  const result=score>=82?'Champion':score>=64?'Podium award':score>=48?'Finalist':'Participant';
  if(['Champion','Podium award'].includes(result)){r.localAwards++;s.flags.award=true;effects(s,{career:6});}if(result==='Champion')r.localChampions++;
  const detail=`${result} · Hong Kong student business case competition (simulated).`;r.history.push({turn:s.turn,date:dateLabel(s),kind:'Local competition',result});s.achievements.push({date:dateLabel(s),title:'Local business case competition · '+result,detail});return `${detail} The result is recorded on your CV.`;
 }
 if(!a||a.turn!==s.turn)return 'This competition is no longer active.';
 if(stage==='select'&&a.status==='application'){
  a.team=style;a.score=selectionScore(s,style);a.priority=casePriority(s);
  if(a.score<a.threshold||caseReadiness(s)<30){a.status='not selected';effects(s,{energy:6,wellbeing:4});r.history.push({turn:s.turn,date:dateLabel(s),kind:'International nomination',result:'Not selected',city:a.city});return `Your team is not selected this semester. ${a.priority}; selection score ${Math.round(a.score)}, competing-team benchmark ${Math.round(a.threshold)}. Two reserved slots return to rest. ${r.unlocked?'Your pathway stays open for next semester.':'A new School invitation would be needed to try again.'} No international representation is added to your CV.`;}
  a.status='training';appendNext(s,trainingEvent(s));return `Selected for ${a.city}. ${a.priority} helped your application. Before departure, complete three training weekends. Training, flights, accommodation and entry are fully sponsored by HKU in this simulation.`;
 }
 if(stage==='withdraw'&&a.status==='training'){a.status='withdrawn';if(a.firstInvitation&&r.invitation)r.invitation.status='withdrawn';r.history.push({turn:s.turn,date:dateLabel(s),kind:'International nomination',result:`Withdrew after ${a.weekends}/3 training weekends`,city:a.city});return `You withdraw before travelling. There is no completed international competition on your CV. ${r.unlocked?'You can form a team again next semester.':'Future entry would need another School invitation.'}`;}
 if(stage==='train'&&a.status==='training'){
  a.weekends++;a.training+=style==='deep'?6:3;s.skills.consulting+=style==='deep'?4:2;
  if(a.weekends===3){a.status='ready';s.achievements.push({date:dateLabel(s),title:'International case team training',detail:'Completed all three weekends: case research, financial analysis and presentation / Q&A.'});appendNext(s,finalEvent(s));}else appendNext(s,trainingEvent(s));
  return `Training weekend ${a.weekends}/3 completed. ${a.weekends===3?'Your preparation is complete. The sponsored trip is next.':'Your next training weekend is scheduled before departure.'}`;
 }
 if(stage==='final'&&a.status==='ready'&&a.weekends===3){
  const score=caseReadiness(s)+a.training+(style==='evidence'?8:style==='team'?6:-8)+random(s)*(style==='bold'?50:30),result=score>=110?'Champion':score>=92?'Podium award':score>=75?'Finalist':'Participant';
  a.status='completed';a.result=result;r.internationalEntries++;r.circleTrust=clamp((r.circleTrust||0)+16+(result==='Champion'?4:0));if(!r.unlocked){r.unlocked=true;r.unlockedTurn=s.turn;r.discovered=true;if(r.invitation)r.invitation.status='completed';memo(s,'You are part of the circle now','After your first international competition, you can form a team and seek nomination once per teaching semester. Selection remains competitive.');}schoolRoster(s);if(['Champion','Podium award'].includes(result))r.internationalAwards++;if(result==='Champion')r.internationalChampions++;
  effects(s,{career:result==='Champion'?14:8,network:10,bonds:5});const detail=`Represented HKU in ${a.city} · ${result}. Three training weekends completed; trip fully sponsored by HKU (simulated).`;
  r.history.push({turn:s.turn,date:dateLabel(s),kind:'International competition',result,city:a.city});s.achievements.push({date:dateLabel(s),title:'International Business Case Invitational · '+result,detail});return `${detail} You can form a team once again next teaching semester.${result==='Champion'?' You now receive the highest nomination priority.':' Future selection still depends on capability and the competing teams.'}`;
 }
 return 'This stage has already been completed.';
}
export function advanceCampus(s){const inv=s.caseRecord.invitation;if(inv&&['pending','accepted'].includes(inv.status)&&s.turn>inv.targetTurn){inv.status='expired';memo(s,'An invitation passes','The invited semester has passed. You would need another School invitation to take part.');}reviewReferrals(s);openCampusInterludes(s);}
export const caseReminder=s=>s.caseRecord?.unlocked&&context(s).term&&s.caseRecord.lastApplied!==s.turn&&!s.leaveTerms&&!placementActive(s)?'Optional: your international case pathway is open. Form a team in Case competitions; nomination is competitive each semester.':'';
