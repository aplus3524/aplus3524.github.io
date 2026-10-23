export {PROGRAMS,SOURCES} from './business.js';
export const ROUTES = [
 {id:'dse',label:'Local · HKDSE / JUPAS',weight:40,local:true,places:['Sha Tin','Yuen Long','Kwun Tong','Tseung Kwan O','North Point','Tuen Mun']},
 {id:'localib',label:'Local · international qualifications',weight:13,local:true,places:['Kowloon','Hong Kong Island','New Territories']},
 {id:'mainland',label:'Mainland · Gaokao route',weight:22,local:false,places:['Guangzhou','Shanghai','Chengdu','Beijing','Hangzhou']},
 {id:'overseas',label:'Non-local · international qualifications',weight:13,local:false,places:['Singapore','Kuala Lumpur','Jakarta','Seoul','New Delhi','London','Toronto']},
 {id:'asso',label:'Local · associate-degree pathway',weight:9,local:true,places:['Kowloon','Sha Tin','Yuen Long']},
 {id:'hd',label:'Local · higher-diploma pathway',weight:3,local:true,places:['Tuen Mun','Kowloon','Tsuen Wan']}
];
export const PHASES = ['Semester one','Winter break','Semester two','Summer break'];
export const FOCUSES = [
 {id:'balanced',name:'Find a balance',desc:'Room for work, friends, and yourself.',icon:'◒',academic:0,wellbeing:3},
 {id:'academic',name:'Hit the books',desc:'Protect study time. Social life takes a back seat.',icon:'▤',academic:.35,wellbeing:-4},
 {id:'career',name:'Build a future',desc:'More preparation for a competitive job market.',icon:'↗',academic:-.12,career:5,wellbeing:-2},
 {id:'social',name:'Say yes to life',desc:'Meet people, collect memories, find your circle.',icon:'✳',academic:-.18,bonds:7,wellbeing:4},
 {id:'recover',name:'Take a breath',desc:'A gentler pace. Progress can wait a little.',icon:'☁',academic:-.08,wellbeing:12,energy:9}
];
// All costs, weights, thresholds and probabilities below are game-design assumptions.
export const ACTIONS = [
 {id:'study',name:'Library study group',desc:'A regular desk, shared notes, and fewer last-minute panics.',category:'Study',icon:'▤',time:1,cost:0,effects:{academic:.28,knowledge:5,energy:-3}},
 {id:'office',name:'Office hours',desc:'Ask the question you were too nervous to ask in class.',category:'Study',icon:'?',time:1,cost:0,effects:{academic:.18,knowledge:3,network:3}},
 {id:'sport',name:'Sport & movement',desc:'Kennedy Town swims, a team practice, or a sunset run.',category:'Life',icon:'↝',time:1,cost:200,effects:{wellbeing:8,energy:7,bonds:3}},
 {id:'friends',name:'Make time for people',desc:'Canteen lunches turn into friendships if you keep going.',category:'Life',icon:'♡',time:1,cost:400,effects:{bonds:9,wellbeing:7}},
 {id:'party',name:'A few late nights',desc:'Lan Kwai Fong, hall gatherings, and a story to tell.',category:'Life',icon:'✦',time:1,cost:1100,effects:{bonds:8,wellbeing:5,energy:-9,academic:-.12}},
 {id:'hall',name:'Hall activities',desc:'High-table dinners, inter-hall games and late rehearsals. A closer circle, with an energy cost.',category:'Campus',icon:'⌂',time:1,cost:300,effects:{bonds:8,network:4,wellbeing:4,energy:-7},requires:(s,c)=>s.housing==='Hall'&&c.term&&!s.currentExchange&&!s.plan.actions.includes('exchange'),reason:'For hall residents during home teaching semesters.'},
 {id:'work',name:'Paid part-time work',desc:'Tutoring or campus work; non-local work is eligibility-checked in the story.',category:'Career',icon:'$',time:2,cost:0,effects:{cash:5000,career:3,energy:-9,academic:-.12}},
 {id:'careers',name:'Interview practice & CV',desc:'Practise interviews and turn experiences into evidence.',category:'Career',icon:'↗',time:1,cost:0,effects:{career:9,network:3}},
 {id:'competition',name:'Local business case competition',desc:'Enter a Hong Kong case competition. Work with your team on analysis and presentation; prepare for a competitive judging panel.',category:'Career',icon:'◇',time:2,cost:600,effects:{career:9,network:6,energy:-8,academic:-.1},flag:'competition',special:'competition'},
 {id:'research',name:'Research assistant project',desc:'Learn a method, help a lab, and get to know a supervisor.',category:'Study',icon:'⌕',time:2,cost:0,effects:{research:12,knowledge:6,career:4,energy:-6}},
 {id:'volunteer',name:'Community volunteering',desc:'An afternoon that matters to someone outside your timetable.',category:'Campus',icon:'✧',time:1,cost:200,effects:{bonds:5,wellbeing:6,career:4},flag:'service'},
 {id:'creative',name:'Create something',desc:'Photography, dance, music, or a tiny campus channel.',category:'Life',icon:'◈',time:1,cost:500,effects:{creative:9,wellbeing:5,bonds:3},flag:'creator'},
 {id:'venture',name:'Build a small business',desc:'Test an idea with real customers before going all in.',category:'Career',icon:'⚡',time:2,cost:2200,effects:{venture:1,career:8,creative:5,energy:-7},flag:'venture'},
 {id:'support',name:'Ask for support',desc:'Speak to an adviser or counsellor and make a workable plan.',category:'Life',icon:'☀',time:1,cost:0,effects:{wellbeing:13,energy:6,academic:.08},flag:'support'},
 {id:'aid',name:'Funding applications',desc:'Put together a scholarship or hardship-support application.',category:'Study',icon:'+',time:1,cost:0,effects:{},special:'aid'},
 {id:'shortexchange',name:'Winter / summer overseas study',desc:'A short international programme with a pre-approved six-credit module.',category:'World',icon:'◎',time:1,cost:9000,effects:{network:5,knowledge:5,wellbeing:6},special:'shortexchange',requires:(s,c)=>!c.term&&!c.medical,reason:'Available in breaks for non-MBBS students.'},
 {id:'summer',name:'Summer school / repeat a course',desc:'Complete six graded credits. Useful when a failed course holds you back.',category:'Study',icon:'▤',time:1,cost:1800,effects:{academic:.2,knowledge:4},special:'summer',requires:(s,c)=>c.phase===3&&!c.final,reason:'Before final year, during summer break.'},
 {id:'travel',name:'Travel or visit home',desc:'Get off campus, see family, and have a life beyond university.',category:'World',icon:'↝',time:2,cost:4500,effects:{wellbeing:13,bonds:5,energy:8},requires:(s,c)=>!c.term,reason:'Available during winter and summer breaks.'},
 {id:'job',name:'Graduate applications',desc:'A targeted recruitment campaign. Competition and hiring conditions still matter.',category:'Career',icon:'↗',time:2,cost:0,effects:{career:6,energy:-5},special:'job',requires:(s,c)=>true,reason:'Final year; compare at most two graduate offers.'},
 {id:'postgrad',name:'Postgraduate applications',desc:'Prepare a research proposal or taught-master’s application and funding plan.',category:'Study',icon:'⌕',time:2,cost:1200,effects:{research:5},special:'postgrad',requires:(s,c)=>c.final,reason:'Available in the final stage of your degree.'},
 {id:'leave',name:'Apply for a gap semester',desc:'Pause this teaching term for rest. Academic progress resumes next term.',category:'Life',icon:'Ⅱ',time:1,cost:0,effects:{wellbeing:16,energy:15},special:'leave',requires:(s,c)=>c.term&&!s.leaveTerms&&s.gapCount<4,reason:'Teaching terms only; up to four gap terms in this version.'},
 {id:'recruit',name:'Targeted internship applications',desc:'Choose an industry and placement length in Careers. Prepare, interview, then review an offer.',category:'Career',icon:'↗',time:1,cost:0,effects:{career:4},special:'internapply',requires:(s,c)=>(c.term||c.phase===1)&&!s.placement&&!s.offers?.some(o=>o.kind==='intern'&&o.status==='pending'),reason:'Recruitment opens in semester one, winter and semester two; no overlapping placement.'},
 {id:'exchangeapply',name:'Apply for next-year exchange',desc:'Annual winter deadline. Choose a destination; the semester is scheduled automatically next academic year.',category:'World',icon:'◎',time:1,cost:0,effects:{},special:'exchangeapply',requires:(s,c)=>c.phase===1&&!s.exchangeBooking&&!c.p.global,reason:'Apply in winter, before next academic year. Final-year and BGLIS students use other planning routes.'},
 {id:'exchange',name:'Take your scheduled exchange',desc:'Approved overseas semester; pre-approved passes transfer without host grades in GPA.',category:'World',icon:'◎',time:3,cost:18000,effects:{network:8,bonds:5,wellbeing:7,career:5},special:'exchange',requires:(s,c)=>c.term&&s.exchangeBooking?.turn===s.turn&&!s.placement&&!s.leaveTerms,reason:'Only your booked semester; never the final year. Cannot overlap leave or placement.'},
 {id:'crp',name:'Complete Career Readiness',desc:'The compulsory non-credit Career Readiness Programme for Acc&Fin / ADA.',category:'Study',icon:'✓',time:1,cost:0,effects:{career:7},special:'crp',requires:(s,c)=>c.p.crp&&!s.flags.crp,reason:'Required for Acc&Fin and ADA; once completed, stays complete.'},
 {id:'global',name:'BGLIS global learning module',desc:'Complete the next prescribed module: Peking University, UC Berkeley, then Barcelona.',category:'World',icon:'◎',time:2,cost:3000,effects:{knowledge:6,network:6},special:'global',requires:(s,c)=>c.p.global&&c.year>=2&&((s.globalModules||[]).length===0&&c.phase===0||(s.globalModules||[]).length===1&&c.phase===2||(s.globalModules||[]).length===2&&c.phase===3),reason:'BGLIS Year 2 onward: first module in S1, second in S2, third in summer.'},
 {id:'rest',name:'Leave some space',desc:'Sleep, cook, wander. Not every hour needs an achievement.',category:'Life',icon:'◒',time:1,cost:0,effects:{wellbeing:9,energy:13}}
];
const opt=(label,hint,effects={},outcome='',special)=>({label,hint,effects,outcome,special});
const ev=(id,category,title,text,choices,extra={})=>({id,category,title,text,choices,...extra});
export const EVENTS = [
 ev('ocamp','First days','A group chat called “O-camp family”','Your phone lights up. A senior has invited you to orientation camp. You know almost nobody yet. Somewhere between the games and the awkward introductions, this could become your first circle.',[
 opt('Go to the full camp','HK$900 · connections, less energy',{cash:-900,bonds:11,energy:-6},'You forget most of the chants. You remember the person who saved you a seat.','friend'),
 opt('Try a quieter orientation day','Meet a few people without the overnight programme',{bonds:6,wellbeing:3},'You find your first lunch companion while both looking for the wrong classroom.','friend'),
 opt('Explore campus on your own','Recover energy; friendships can come later',{energy:8,wellbeing:3},'You find a quiet corner of campus that feels like yours.')],{opening:true}),
 ev('housing','Where you live','A room, a commute, a different life','Your housing choice changes your everyday routine. A hall place is an application, not a guarantee. Living costs here are simplified amounts after your baseline funding.',[
 opt('Apply for a residential hall','Possible HK$1,500 deposit; ongoing costs','', '', 'hall'),
 opt('Keep your current arrangement','Local students commute; non-local students share a flat',{energy:-2},'You learn the route to campus and start recognising the same faces.')],{opening:true}),
 ev('groupwork','Academic life','“Can someone merge the slides?”','The group assignment is due on Friday. One teammate has gone silent. Another wants to start again. You also have a test tomorrow.',[
 opt('Set a fair task split','Build leadership; spend energy',{career:5,network:3,energy:-4},'The result is imperfect, but everyone knows what they own.'),
 opt('Do the missing work yourself','Protect this result; risk exhaustion',{academic:.2,energy:-10},'The submission goes through at 11:58 p.m. You are too tired to celebrate.'),
 opt('Document the issue and ask the tutor','Use a formal, honest route',{academic:.1,wellbeing:3},'The tutor helps clarify contributions. You learn that asking early is a skill.')]),
 ev('friend','Friendship','The seat beside you','Your friend has started saving you a seat every Tuesday. Today they ask if you want dinner after class. Your to-do list is still long.',[
 opt('Stay for dinner','HK$150 · deepen a friendship',{cash:-150,bonds:9,wellbeing:7},'The conversation gets past majors and grades. Someone on campus knows you a little better.'),
 opt('Suggest another day and follow through','Make room without abandoning your plans',{bonds:5,academic:.08},'Saturday becomes your little routine.'),
 opt('Say “maybe next time”','Protect time; the connection fades a little',{bonds:-3,academic:.13},'You finish the reading, then notice the group photo in the chat.')]),
 ev('romance','Relationships','More than a study buddy?','Someone you have been spending time with asks if this is a date. It is suddenly harder to find the right words.',[
 opt('See where it goes','Build a relationship with its own needs',{bonds:10,wellbeing:8,energy:-3},'You start learning each other’s routines, and how to share your time.','romance'),
 opt('Be honest: friendship feels right','A clear boundary',{bonds:4,wellbeing:3},'A slightly awkward conversation is better than a long misunderstanding.'),
 opt('Take it slowly','Leave space for both of you',{bonds:6,wellbeing:4},'You agree there is no need to turn everything into a deadline.')],{when:s=>s.bonds>38&&!s.flags.romance}),
 ev('distance','Relationships','Two calendars, very little overlap','You and your partner keep cancelling plans. Neither of you is trying to be unkind. University has become very full.',[
 opt('Have the difficult conversation','Invest time in the relationship',{bonds:5,wellbeing:4,energy:-3},'You make a smaller promise you can actually keep.'),
 opt('Agree to part kindly','Sadness now; room to recover',{bonds:-6,wellbeing:-6,energy:5},'Some relationships belong to one chapter. You let this one end honestly.','breakup'),
 opt('Keep postponing it','Short-term time; more strain',{bonds:-9,wellbeing:-7,academic:.1},'The silence starts feeling like an answer.')],{when:s=>s.flags.romance}),
 ev('societyrole','Society life','They want you on the committee','Your society needs someone to organise its next event. You have ideas. You also know “a few hours” is rarely a few hours.',[
 opt('Take the lead with a realistic scope','Leadership and a substantial time cost',{career:7,network:8,energy:-9,academic:-.08},'The event has hiccups. Afterwards a first-year says it made them feel welcome.','leadership'),
 opt('Take a smaller, defined role','Contribute with clearer boundaries',{career:3,bonds:5,energy:-3},'You do your part well and leave before the last bus.'),
 opt('Decline this time','Protect your capacity',{wellbeing:4,energy:4},'You learn that membership does not require saying yes to everything.')],{when:()=>false}),
 ev('competitionfinal','Competitions','One more round','Your team has reached the final presentation. A judge’s feedback is blunt: the story is good, but the numbers are weak.',[
 opt('Rebuild the analysis together','Improve evidence and teamwork',{career:7,knowledge:5,energy:-7},'Your argument becomes clearer. The experience is useful even if the trophy goes elsewhere.','award'),
 opt('Rehearse a simpler, honest pitch','Trade scope for clarity',{career:5,network:3},'You say what the data can support and answer the hard question calmly.'),
 opt('Keep the exciting claims','A credibility risk',{career:-5,wellbeing:-4},'The judges notice the gap. You leave with a lesson about evidence.')],{when:()=>false}),
 ev('commoncore','Classroom','The course you chose for an “easy A”','Your Common Core group ends up discussing something you had never thought about seriously. The workload is higher than the course-review chat suggested.',[
 opt('Follow the curiosity','Academic growth beyond your major',{knowledge:7,academic:.15},'You keep a reading even after the course is over.'),
 opt('Do a careful, manageable version','Steady progress',{academic:.12,energy:2},'A sensible schedule gets you to the end without an all-nighter.'),
 opt('Do the bare minimum','More time, weaker learning',{academic:-.2,energy:5},'The course ends. You mostly remember the deadline.')],{when:(s,c)=>!c.medical}),
 ev('funding','Money','The monthly budget stops adding up','An unexpected household expense means less support this term. Your baseline tuition arrangements remain in place, but everyday costs are suddenly harder.',[
 opt('Seek emergency support and cut extras','Uncertain assistance, less strain',{wellbeing:2},'You explain the situation to an adviser and put a short-term budget together.','emergencyaid'),
 opt('Take on extra paid work','HK$3,000, less study and rest',{cash:3000,energy:-10,academic:-.18},'The shifts cover the immediate gap. Your calendar is much tighter.'),
 opt('Use savings','HK$1,500 cost',{cash:-1500,wellbeing:-3},'You make it through the month and start watching small expenses.')]),
 ev('scholarship','Opportunity','A scholarship application opens','A department circulates a scholarship call. It asks for a statement, evidence and a reference. You are not sure you are “the kind of person” who wins these.',[
 opt('Make a thoughtful application','A chance of funding',{energy:-3},'You ask for a reference and explain what you hope to do next.','scholarship'),
 opt('Ask for feedback for next time','Build confidence and a relationship',{network:4,career:3},'A teacher points out strengths you had not thought to mention.'),
 opt('Let this deadline pass','Protect current workload',{energy:4},'There will be other opportunities, though this one closes.')]),
 ev('homesick','Belonging','A familiar voice on a small screen','Home feels far away tonight—even if it is only across Hong Kong. Other people seem to have found their circle already.',[
 opt('Call home and make a plan with a friend','Connection and care',{bonds:7,wellbeing:9},'Nothing dramatic changes. You feel less alone.'),
 opt('Try a peer-support gathering','One small step towards belonging',{bonds:5,wellbeing:7},'You hear someone describe almost exactly what you were feeling.'),
 opt('Keep busy until it passes','Temporary distraction',{career:2,wellbeing:-5,energy:-3},'The work gets done. You still need a place to put the feeling.')]),
 ev('language','Campus life','A conversation switches languages','At lunch, the table slips between Cantonese, Mandarin and English. Someone quietly loses the thread.',[
 opt('Help make the conversation inclusive','Build trust across circles',{bonds:7,network:5},'You ask a question that brings everyone back into the conversation.'),
 opt('Suggest a language-exchange lunch','Learn something and meet people',{knowledge:4,bonds:6},'Everyone gets to be the beginner at something.'),
 opt('Stay with the people you know','Comfort, a smaller circle',{wellbeing:3},'It is an easy lunch. Your world stays about the same size.')]),
 ev('internmentor','Work life','Your supervisor has ten minutes','During your placement, a supervisor asks what you want to learn. You could describe the job you think sounds impressive, or admit what you are still figuring out.',[
 opt('Ask for specific feedback and a stretch task','Learn and build a real connection',{career:9,network:6,energy:-4},'The feedback is useful. You start improving something the team actually needs.'),
 opt('Explore the work honestly','Understand your fit',{career:6,wellbeing:3},'You leave with a clearer sense of what energises you and what drains you.'),
 opt('Stay quiet and finish your tasks','Steady but less visibility',{career:2},'You do the work, though the relationship never quite develops.')],{when:s=>s.internships>0}),
 ev('rejection','Recruitment','“We will not be proceeding…”','Another application closes with a polite rejection. Your feed is full of offer announcements. You cannot see the rejected applications behind them.',[
 opt('Review the pattern with a careers adviser','Better preparation, some relief',{career:7,wellbeing:4},'You identify a weak interview answer and practise it properly.'),
 opt('Broaden your target roles','More flexibility',{career:5,network:4},'A less familiar role turns out to use skills you enjoy.'),
 opt('Apply everywhere without changing anything','Energy spent without much learning',{career:1,energy:-8,wellbeing:-4},'You send more applications. The process still feels opaque.')],{when:(s,c)=>c.year>=2&&!c.medical}),
 ev('exchangefriend','World beyond campus','A different city, a different version of you','Away from HKU, you find yourself saying yes to things you would normally avoid. A local friend invites you on a weekend trip before a transfer-credit assessment.',[
 opt('Go after making a study plan','HK$800 · memories and a little risk',{cash:-800,wellbeing:8,bonds:7,academic:-.08},'You remember the train ride long after the assessment.'),
 opt('Protect the assessment first','Transfer progress matters',{academic:.3,knowledge:4},'You choose a smaller celebration after the exam.'),
 opt('Travel and ignore the assessment','A real risk to transferable credits',{wellbeing:7,academic:-.8,energy:-5},'The weekend is wonderful. The missing preparation follows you home.')],{when:s=>s.currentExchange}),
 ev('creditapproval','Academic planning','An overseas course changes','A host course is cancelled. Its replacement sounds interesting, but the credit mapping is not automatic.',[
 opt('Get written approval before enrolling','Protect your transfer plan',{academic:.18,energy:-2},'The paperwork is dull. The certainty is useful.'),
 opt('Choose the approved alternative','Less exciting, more predictable',{academic:.12},'You keep the plan on track.'),
 opt('Assume it will count','Possible credit loss',{wellbeing:3},'The content is good, but credit approval is a separate question.','lostcredit')],{when:s=>s.currentExchange}),
 ev('burnout','Wellbeing','Everything feels loud','You are exhausted. Even a small email feels like a task. This is a signal to change the load, not a verdict on your ability.',[
 opt('Ask for support and a reduced workload','Recovery now; gentler academic expectations',{wellbeing:17,energy:16,academic:.1},'You make a concrete plan with someone who listens.'),
 opt('Apply for a rest semester','Pause academic progress with an approved plan',{wellbeing:20,energy:18},'There is room for your life to take longer.','healthleave'),
 opt('Push through without changing anything','More strain and weaker preparation',{wellbeing:-9,energy:-12,academic:-.35},'Your effort is real. Your capacity still has limits.')],{when:s=>s.wellbeing<35||s.energy<25,priority:4}),
 ev('integrity','A consequential choice','A suspiciously perfect answer','A group chat offers a ready-made answer to an assessed task. The deadline is close. Submitting someone else’s work as your own could lead to disciplinary proceedings.',[
 opt('Submit your own honest attempt','Some marks may be lost',{academic:-.1,energy:-3},'It is not your best work, but it is your work.'),
 opt('Ask the lecturer for legitimate help','Use the proper process',{academic:.08,network:2},'You clarify what support is available and what the rules require.'),
 opt('Submit the copied work','Serious misconduct risk; possible exclusion',{academic:.12},'You submit it. The decision may outlast this deadline.','cheat')],{when:(s,c)=>c.term,weight:.65}),
 ev('discipline','Formal review','An academic-conduct hearing','You have received a notice and an opportunity to respond. Outcomes depend on seriousness, prior incidents and the review. This is a fictional procedure, not an HKU policy prediction.',[
 opt('Respond honestly and seek advice','Accept the review and explain the circumstances',{},'','hearing'),
 opt('Submit a documented appeal','A chance of mitigation; not automatic clearance',{},'','appeal'),
 opt('Ignore the hearing','Further damage to your standing',{},'','ignorehearing')],{forced:true}),
 ev('academicwarning','Academic support','A progression meeting','Your recent academic performance is below the game’s progression threshold. An adviser wants to discuss a recovery plan. One difficult term does not automatically end your degree.',[
 opt('Make a realistic recovery plan','Preparation and support',{academic:.5,wellbeing:7,knowledge:5},'You work out which courses need repeating and what you can change.'),
 opt('Take an approved pause','Leave this term and return with a plan',{wellbeing:16,energy:15},'The next step is recovery, then a return to study.','healthleave'),
 opt('Do not change the approach','Continued risk',{academic:-.3,wellbeing:-5},'The warning remains unresolved.')],{when:(s,c)=>s.warnings>0&&c.term,priority:3}),
 ev('transfer','Changing direction','“What if I chose the wrong subject?”','A course outside your main field feels unexpectedly right. Changing your study direction could mean prerequisites, lost time, and a faculty decision.',[
 opt('Ask for a transfer review','Competitive; may add a term or more',{},'','transfer'),
 opt('Explore it through electives first','A smaller commitment',{knowledge:6,wellbeing:4},'You give curiosity some room without promising it your whole future.'),
 opt('Stay and reshape your current path','Recommit with a clearer reason',{academic:.15,career:3},'The degree is not the only way to build the life you want.')],{when:(s,c)=>c.year<=3&&!s.flags.transferred,weight:.55}),
 ev('startup','A different future','Your side project has paying customers','The small project you built is receiving repeat orders. A collaborator wants to turn it into something bigger. This could work. It could also consume your savings.',[
 opt('Keep studying and test the business','HK$2,000 · measured growth',{cash:-2000,venture:2,career:6,energy:-5},'You set a small revenue target before making a larger commitment.'),
 opt('Apply for a full gap year to build it','Pause two teaching terms',{venture:3,career:8},'You write down a return date and give the idea a serious test.','businessgap'),
 opt('Start a withdrawal discussion','A second decision will confirm leaving',{},'','considerexit')],{when:s=>s.venture>=2,weight:.6}),
 ev('scouted','An unlikely invitation','A casting enquiry in your inbox','Someone has seen your creative work and invites you to an audition. It is an opportunity to check carefully, not proof of a future career.',[
 opt('Verify the opportunity and try it','Some time and a possible new path',{energy:-3,creative:5},'','audition'),
 opt('Keep creating on your own terms','A creative life without a contract',{creative:6,wellbeing:5},'You keep ownership of what makes it enjoyable.'),
 opt('Focus on university for now','Protect study time',{academic:.15},'You reply politely and return to your current commitments.')],{when:s=>s.creative>45&&s.flags.creator,rare:true}),
 ev('viral','An unexpected turn','Your campus video escapes the group chat','A small video travels much further than you expected. Brands begin sending messages. An audience is not the same as a reliable income.',[
 opt('Build slowly and protect your privacy','HK$1,000 · creative momentum',{cash:1000,creative:12,career:4},'You choose a manageable schedule and decline a dubious offer.','creatorbreak'),
 opt('Make content the centre of this term','Bigger reach, substantial distraction',{creative:20,academic:-.35,energy:-8},'There are new opportunities, and more expectations than you anticipated.','creatorbreak'),
 opt('Step back from the attention','Protect wellbeing',{wellbeing:10,energy:8},'You turn off notifications for a while. Your friends still know where to find you.')],{when:s=>s.creative>35,rare:true}),
 ev('exitdecision','A major decision','Leave university, or leave some room?','Withdrawal would end this undergraduate run without a degree. A temporary pause preserves a possible return. There is no universally right answer, but the difference matters.',[
 opt('Stay enrolled and keep options open','Continue your degree',{wellbeing:4},'You choose to keep building your life alongside university.'),
 opt('Apply for a gap year instead','Pause two teaching terms',{},'You make a return plan.','businessgap'),
 opt('Confirm withdrawal','End this run without an HKU degree',{},'','withdraw')],{forced:true}),
 ev('family','Family','Someone at home needs you','A family member needs help for a few weeks. You want to be there. You also have responsibilities on campus.',[
 opt('Share the care and tell your adviser','A sustainable plan',{bonds:8,wellbeing:3,academic:.05},'You find help with both sets of responsibilities.'),
 opt('Do everything yourself','Family connection, less capacity',{bonds:9,energy:-12,academic:-.15},'You are glad you showed up. You are also tired.'),
 opt('Offer a smaller, specific kind of help','Boundaries and care',{bonds:5,energy:-3},'A clear promise is easier for everyone to rely on.')]),
 ev('typhoon','Hong Kong days','Rain against the library windows','Severe weather disrupts your carefully planned day. The group project, commute and evening plans all need rearranging.',[
 opt('Check official notices and reorganise','A little flexibility',{academic:.08,energy:4},'You move the meeting online and stay somewhere safe.'),
 opt('Use the unexpected pause to rest','Recovery',{wellbeing:7,energy:8},'For once, the whole city seems to tell you to slow down.'),
 opt('Help coordinate your group','Build trust',{network:4,bonds:4},'A practical message saves everyone some confusion.')]),
 ev('housingnoise','Hall life','It is 2 a.m. in the corridor','A hall event is still going. You have a morning assessment. The people making noise are also your friends.',[
 opt('Ask for quiet, kindly and directly','Set a boundary',{energy:5,bonds:2},'The conversation is less dramatic than you feared.'),
 opt('Join for half an hour','A memory, less sleep',{bonds:6,energy:-6,academic:-.08},'You make it to bed later than planned.'),
 opt('Find a quiet study space earlier next time','Adjust your routine',{academic:.12,energy:-2},'You start learning how to live with a whole building of people.')],{when:s=>s.housing==='Hall'}),
 ev('commute','Everyday life','Another long ride home','You know exactly which carriage puts you nearest the exit. The commute gives you time to think, but it takes time from everything else.',[
 opt('Group campus commitments on fewer days','Protect energy',{energy:7,academic:.08},'Your timetable becomes a little kinder.'),
 opt('Share the journey with a friend','Make the ordinary more social',{bonds:7,wellbeing:5},'The ride feels shorter when it becomes a conversation.'),
 opt('Apply for a hall place for next term','An uncertain housing change',{},'','hall')],{when:s=>s.housing==='Family home'}),
 ev('researchpaper','Research','The result is not what you hoped','Your research project has a null result. A supervisor asks what you learned from it.',[
 opt('Report it accurately and improve the method','Research skill and integrity',{research:9,knowledge:6},'You begin to understand how careful knowledge is made.'),
 opt('Ask to try a different question','Explore with guidance',{research:5,creative:4},'A narrower question turns out to be more interesting.'),
 opt('Step back from research for now','Reconsider fit',{wellbeing:6,career:2},'Learning what you do not enjoy is also information.')],{when:s=>s.research>=20}),
 ev('clinicalday','Medicine','The answer is more than a diagnosis','A patient in a supervised teaching session seems worried about something beyond the condition being discussed. Your notes are already full.',[
 opt('Listen and ask your supervisor','Practise humane, supervised care',{knowledge:6,bonds:4,academic:.15},'You learn something no flashcard would have taught you.'),
 opt('Focus on the clinical checklist','Build structure',{knowledge:4,academic:.12},'The checklist helps. You see why it is only part of the work.'),
 opt('Ask for feedback afterwards','Reflect on the encounter',{knowledge:5,wellbeing:3},'The supervisor helps turn discomfort into a practical next step.')],{when:(s,c)=>c.medical&&c.year>=4}),
 ev('medpressure','Medicine','Everyone seems to know more','The next assessment is approaching. Your classmates have different study methods, and each sounds like the one you should be using.',[
 opt('Practise weak areas with a small group','Preparation and peer support',{academic:.4,knowledge:5,bonds:4,energy:-3},'You discover that several classmates were quietly worried too.'),
 opt('Protect sleep and a consistent plan','Sustainable preparation',{academic:.2,energy:8,wellbeing:5},'You arrive prepared enough to think clearly.'),
 opt('Switch to all-nighters','More hours, lower effectiveness',{academic:-.25,energy:-14,wellbeing:-6},'The notes pile up faster than your ability to absorb them.')],{when:(s,c)=>c.medical}),
 ev('placement','Professional learning','Feedback after the placement','The work feels different from lectures. A supervisor has noticed both your preparation and your hesitation.',[
 opt('Ask for one concrete improvement','Build competence',{career:7,knowledge:6},'You practise that skill and ask for another observation.'),
 opt('Talk it through with a peer','Reflect with support',{bonds:5,knowledge:4,wellbeing:4},'It helps to know that confidence grows unevenly.'),
 opt('Avoid the feedback','Miss a learning opportunity',{career:-2,academic:-.1},'The uncertainty remains.')],{when:s=>['nursing','engineering','architecture'].includes(s.program)}),
 ev('lawpath','After the degree','A law degree, then what?','You explore legal practice, compliance, public service and further study. Professional admission involves additional requirements beyond the LLB.',[
 opt('Prepare a PCLL / further-study application','Build the next-step plan',{research:6,career:6},'You check the prerequisites and make a realistic application plan.'),
 opt('Explore adjacent graduate roles','Broaden the search',{career:8,network:3},'You find roles that value legal reasoning outside the practising route.'),
 opt('Concentrate on the degree first','Protect academic performance',{academic:.3},'A stronger academic foundation keeps more options open.')],{when:(s,c)=>s.program==='bba-law-and-llb'&&c.year>=3}),
 ev('summerfomo','Summer','Everyone seems to be somewhere else','One friend is overseas. Another has an internship. You are at home scrolling through their highlights.',[
 opt('Make a small project of your own','Useful work without a prestigious label',{career:6,creative:5,wellbeing:3},'You finish something you can actually show someone.'),
 opt('Enjoy a quieter season','Rest has value',{wellbeing:10,energy:10},'You become better company for yourself.'),
 opt('Keep comparing yourself','A familiar but draining habit',{wellbeing:-6,energy:-3},'The feed never tells you the whole story.')],{when:(s,c)=>!c.term}),
 ev('friendopportunity','A connection','“I thought of you for this”','A friend forwards an opportunity because they remember what you enjoy. It is a warm introduction, not a guaranteed selection.',[
 opt('Follow up thoughtfully','Turn a connection into preparation',{career:7,network:5},'You arrive at the conversation with useful questions.'),
 opt('Ask what the work is actually like','Learn before committing',{career:5,wellbeing:3},'The role becomes more concrete, including its unglamorous parts.'),
 opt('Pass it to someone better suited','Care for your network',{bonds:6,network:3},'Your friend appreciates an honest response.')],{when:s=>s.bonds>55}),
 ev('jobmarket','The wider world','A hiring team freezes its headcount','A company changes its plans midway through recruitment. Your preparation has not disappeared, but the opening has.',[
 opt('Broaden the search and keep practising','Protect momentum',{career:6,energy:-3},'You contact smaller teams and consider adjacent roles.'),
 opt('Build a portfolio while applying','Evidence that survives one hiring cycle',{career:5,creative:3},'You give the next interviewer something specific to discuss.'),
 opt('Take a brief pause before restarting','Protect wellbeing',{wellbeing:8,energy:7},'You choose a restart date instead of refreshing your inbox all day.')],{when:(s,c)=>c.final&&!c.medical&&!s.flags.jobOffer}),
 ev('gradchoice','The next chapter','What do you want the next year to be?','Your university chapter is nearing its end. You can aim for work, further study, a business, or a deliberate pause. Choosing a direction does not create an offer by itself.',[
 opt('Aim for graduate employment','Use recruitment or an existing return offer',{},'You make employment your next-step priority.','aimjob'),
 opt('Aim for further study','An application and funding are still needed',{},'You start thinking carefully about what further study would give you.','aimstudy'),
 opt('Build a business / creative career','Needs evidence of a viable project',{},'You choose to test the life you have been building outside class.','aimventure'),
 opt('Take time before the next commitment','A deliberate pause after graduation',{},'You decide to leave room to recover and choose with more clarity.','aimpause')],{when:(s,c)=>c.final&&!s.flags.aimChosen,priority:2}),
 ev('smalljoy','An ordinary day','Nothing to put on LinkedIn','A pink sky over the harbour. A cheap dinner. A friend who makes you laugh until the MTR arrives. Nothing measurable happened today.',[
 opt('Let the evening be enough','A memory',{wellbeing:9,bonds:5},'Years later, this is one of the days you remember.'),
 opt('Take a photograph','Keep a small piece of the day',{creative:3,wellbeing:6},'The picture is slightly blurred. It still works.'),
 opt('Send a message to someone you miss','Reconnect',{bonds:7,wellbeing:5},'They reply faster than you expected.')])
];
