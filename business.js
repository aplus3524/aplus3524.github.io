// Curriculum structures: HKU Business School, 2026–27 entry. Mechanics are fictional.
export const BBA_MAJORS=['Entrepreneurship, Design and Innovation','Finance','Human Resource Management','Information Systems and Analytics','Marketing'];
const p=(id,degree,name,primary,extras={})=>({id,degree,name,years:4,total:240,ug:54,primary,field:'quant',min:66,weight:8,flex:true,majors:[name],source:'https://ug.hkubs.hku.hk/programme/'+id, ...extras});
export const PROGRAMS=[
 p('bba','BBA','Business Administration',78,{weight:22,majors:BBA_MAJORS,note:'Choose one of five BBA majors before Year 2. EDI requires selection. 54 university + 78 major + 108 elective credits.'}),
 p('bba-acc-and-fin','BBA(Acc&Fin)','Accounting and Finance',108,{required:36,requiredLabel:'Compulsory Finance minor',crp:true,note:'108-credit Accounting core, 36-credit Finance minor, 42 elective credits and compulsory non-credit Career Readiness. Finance can be upgraded to a second major.'}),
 p('bba-ada','BBA(ADA)','Accounting Data Analytics',156,{crp:true,weight:5,note:'156-credit professional core (144 core + 12 disciplinary electives), 30 free electives and compulsory Career Readiness. No additional FBE major is permitted.'}),
 p('bba-ba','BBA(BA)','Business Analytics',96,{note:'72 core + 24 disciplinary elective credits; 90 free electives. ISA is not a permissible additional major/minor.'}),
 p('bba-ibgm','BBA(IBGM)','International Business and Global Management',96,{min:86,weight:8,mandatorySecond:true,mandatoryExchange:true,note:'96-credit IBGM major, a compulsory second major (at least 72 credits under its own syllabus), and an exchange outside Hong Kong. This game requires a completed overseas semester, then a final home semester.'}),
 p('bba-law-and-llb','BBA(Law)&LLB','Business Administration (Law) and Laws',78,{years:5,total:300,ug:36,required:156,requiredLabel:'Professional Core in Law',min:84,weight:6,majors:[...BBA_MAJORS,'Professional Accounting'],note:'Five years, 300 credits. Business stream: 78 business + 156 law + 36 university + 30 elective credits. Accounting stream: 108 accounting + 156 law + 36 university. Two capstones. Professional practice requires further steps.'}),
 p('becon','BEcon','Economics',78,{note:'60 core + 18 economics elective credits. At least 42 advanced-level major credits, including the economics capstone. 108 free electives.'}),
 p('becon-and-fin','BEcon&Fin','Economics and Finance',96,{min:72,note:'72 core + 12 economics electives + 12 finance electives. At least 60 advanced-level major credits. 90 free electives.'}),
 p('bfin-ampb','BFin(AMPB)','Asset Management and Private Banking',96,{min:81,note:'96-credit AMPB major with prescribed yearly courses and a capstone; 90 free electives.'}),
 p('bsc-mat','BSc(MAT)','Marketing Analytics and Technology',96,{note:'72 core + 24 disciplinary elective credits; 90 free electives. The capstone is quantitative marketing. A Marketing minor is not permitted.'}),
 p('bsc-qfin','BSc(QFin)','Quantitative Finance',96,{min:88,weight:5,note:'96-credit quantitative major, including mathematics and a designated finance capstone; 90 free electives.'}),
 p('bglis','BGLIS','Global Leadership, Innovation and Society',162,{ug:36,min:84,weight:4,global:true,majors:['Technology and Development','Business and Development','Society and Development'],note:'36 university + 162 major (including 24 specialization credits and capstone) + 42 electives. Three compulsory Year 2 global modules: Peking University, UC Berkeley and HKU Europe Campus in Barcelona.'})
];
export const MAJORS=['Artificial Intelligence in Business','Asset Management and Private Banking','Economics',...BBA_MAJORS,'Quantitative Finance'];
export const MINORS=['Accounting','Artificial Intelligence in Business','Business and Economy in China','Economics','Finance','Human Resource Management','Information Systems and Analytics','Marketing','Sustainability in Business'];
export const majorCredits=subject=>['Asset Management and Private Banking','Quantitative Finance'].includes(subject)?96:78;
export function secondaryOptions(s,type){if(!type)return[];let a=type==='double'?MAJORS:MINORS;a=a.filter(x=>x!==s.major&&x!==PROGRAMS.find(p=>p.id===s.program)?.name);if(s.major==='Professional Accounting')a=a.filter(x=>x!=='Accounting');
 if(type==='double'){
  if(['bba-ada','bba-law-and-llb','bglis'].includes(s.program))return[];
  if(s.program==='bba-acc-and-fin')a=a.filter(x=>!['Asset Management and Private Banking','Quantitative Finance'].includes(x));
 }else{if(['bba-ada','bba-acc-and-fin'].includes(s.program))a=a.filter(x=>x!=='Accounting');if(['becon','becon-and-fin'].includes(s.program))a=a.filter(x=>x!=='Economics');if(s.program==='bsc-mat')a=a.filter(x=>x!=='Marketing');}
 if(['bba-ba','bba-ada'].includes(s.program))a=a.filter(x=>x!=='Information Systems and Analytics');
 if(s.program==='becon-and-fin')a=a.filter(x=>!['Economics','Finance'].includes(x));
 if(s.program==='bba-acc-and-fin'&&type==='minor')a=a.filter(x=>x!=='Finance');
 return a;
}
export const SOCIETIES=[
 {id:'bea',name:'Business and Economics Association',area:'Campus community',desc:'Faculty events, peer connections and organising experience.',skill:'people'},
 {id:'ba',name:'Business Association',area:'Business community',desc:'Business activities, member events and committee work.',skill:'people'},
 {id:'efs',name:'Economics and Finance Society',area:'Finance',desc:'Market discussions and economics-focused activities.',skill:'finance'},
 {id:'iaa',name:'Information Analytics Association',area:'Analytics',desc:'Analytics interests, peer learning and student activities.',skill:'data'},
 {id:'hics',name:'HKU International Case Society',area:'Case competitions',desc:'Case analysis, presentation practice and team projects.',skill:'consulting'},
 {id:'180dc',name:'180 Degrees Consulting',area:'Social-impact consulting',desc:'Problem solving and projects for social organisations.',skill:'consulting'},
 {id:'ubcc',name:'University Business Consulting Club',area:'Consulting',desc:'Case learning, industry sharing and business projects.',skill:'consulting'},
 {id:'ibc',name:'HKU Investment Banking Club',area:'Investment banking',desc:'Finance learning, recruitment preparation and peers.',skill:'finance'},
 {id:'quant',name:'HKU Quantitative Research Society',area:'Quantitative finance',desc:'Quantitative research interests and technical teamwork.',skill:'data'},
 {id:'trading',name:'HKU Trading Group',area:'Markets',desc:'Market ideas, trading discussions and research.',skill:'finance'},
 {id:'entrepreneur',name:'Entrepreneur Society',area:'Entrepreneurship',desc:'Find collaborators and test early business ideas.',skill:'people'},
 {id:'aiesec',name:'AIESEC HKU',area:'Leadership & global connections',desc:'Organising projects and meeting people across cultures.',skill:'people'},
 {id:'iss',name:'International Student Society',area:'International community',desc:'Cross-cultural friendships and a wider campus circle.',skill:'people'},
 {id:'badminton',name:'The Hong Kong University Badminton Club',group:'Sports',area:'Sport · badminton',desc:'Weekly rallies, social games and friends beyond your faculty.',skill:'people'},
 {id:'climbing',name:'HKU Sport Climbing Club',group:'Sports',area:'Sport · climbing',desc:'Work on a route together and build confidence on the wall.',skill:'people'},
 {id:'football',name:'HKU Football Club',group:'Sports',area:'Sport · football',desc:'Team practice, casual matches and a regular reason to move.',skill:'people'},
 {id:'tabletennis',name:'Table Tennis Club',group:'Sports',area:'Sport · table tennis',desc:'Fast rallies, friendly games and a break from your desk.',skill:'people'},
 {id:'dance',name:'Dancing Club, Cultural Association, HKU',group:'Arts & fun',area:'Arts · dance',desc:'Learn choreography, rehearse and find your stage confidence.',skill:'people'},
 {id:'photo',name:'Photographic Society, Cultural Association, HKU',group:'Arts & fun',area:'Arts · photography',desc:'Photo walks, creative projects and seeing familiar streets differently.',skill:'people'},
 {id:'drama',name:'Drama Society, Cultural Association, HKU',group:'Arts & fun',area:'Arts · theatre',desc:'Rehearsals, backstage teamwork and the buzz before a performance.',skill:'people'},
 {id:'boardgames',name:'Chess and Board Games Club, Cultural Association, HKU',group:'Arts & fun',area:'Fun · board games',desc:'A table, a new game and a friendship that starts with one more round.',skill:'people'},
 {id:'anime',name:'Animation and Comics Association, Cultural Association, HKU',group:'Arts & fun',area:'Fun · anime & comics',desc:'Share favourite stories, sketch characters and meet fellow fans.',skill:'people'},
 {id:'astronomy',name:'HKU Astronomy Club',group:'Arts & fun',area:'Fun · astronomy',desc:'Learn the night sky and plan a stargazing evening with friends.',skill:'people'}
];
// Current school names; quotas, funding, nomination and future availability are simulated.
export const EXCHANGE_DESTINATIONS=[
 ['Rotterdam','Europe','Erasmus School of Economics · Netherlands'],
 ['Rotterdam · RSM','Europe','Rotterdam School of Management · Netherlands'],
 ['Amsterdam','Europe','University of Amsterdam · Netherlands'],
 ['Maastricht','Europe','Maastricht University · Netherlands'],
 ['Tilburg','Europe','Tilburg University · Netherlands'],
 ['Copenhagen','Europe','Copenhagen Business School · Denmark'],
 ['Aarhus','Europe','Aarhus University · Denmark'],
 ['Milan','Europe','Bocconi University · Italy'],
 ['Rome','Europe','LUISS · Italy'],
 ['Dublin','Europe','University College Dublin · Ireland'],
 ['London','Europe','King’s College London · United Kingdom'],
 ['London · Bayes','Europe','Bayes Business School · United Kingdom'],
 ['Stockholm','Europe','Stockholm School of Economics · Sweden'],
 ['Lund','Europe','Lund University · Sweden'],
 ['Helsinki / Espoo','Europe','Aalto University School of Business · Finland'],
 ['Frankfurt','Europe','Frankfurt School of Finance & Management · Germany'],
 ['Mannheim','Europe','University of Mannheim · Germany'],
 ['Barcelona','Europe','Universitat Pompeu Fabra · Spain'],
 ['Seoul','Asia','Korea University Business School · South Korea'],
 ['Seoul · SNU','Asia','Seoul National University · South Korea'],
 ['Singapore','Asia','National University of Singapore'],
 ['Singapore · NTU','Asia','Nanyang Technological University'],
 ['Singapore · SMU','Asia','Singapore Management University'],
 ['Taipei','Asia','National Taiwan University · Taiwan'],
 ['Melbourne','Oceania','Melbourne · city preference'],
 ['Vancouver','North America','Vancouver · city preference']
].map(([id,region,school])=>({id,region,school}));
export const INDUSTRIES=[
 {id:'banking',name:'Banking & wealth',skill:'finance',fit:['Finance','Economics','Asset Management','Quantitative'],firms:[['HSBC','Wealth & Personal Banking Analyst'],['J.P. Morgan','Payments Analyst'],['UBS','COO / Business Management Analyst']],pay:30000,intern:15000},
 {id:'investments',name:'Investments & markets',skill:'finance',fit:['Finance','Economics','Asset Management','Quantitative'],firms:[['BlackRock','Client Solutions Analyst'],['HSBC','Markets Analyst'],['Bloomberg','Analytics & Sales Associate']],pay:34000,intern:18000},
 {id:'consulting',name:'Consulting & transformation',skill:'consulting',fit:['Business','Management','Analytics'],firms:[['Deloitte','Business Transformation Analyst'],['Accenture','Customer & Growth Analyst'],['EY','Business Consulting Analyst']],pay:25000,intern:12000},
 {id:'accounting',name:'Audit, accounting & tax',skill:'finance',fit:['Accounting','Finance'],firms:[['PwC','Audit Associate'],['KPMG','Tax Associate'],['Deloitte','Audit & Assurance Associate']],pay:22000,intern:11000},
 {id:'marketing',name:'Marketing & consumer brands',skill:'people',fit:['Marketing','Management'],firms:[["L’Oréal",'Marketing Trainee'],['Cathay Pacific','Customer Insights Analyst'],['Unilever','Brand Assistant']],pay:23000,intern:11000},
 {id:'technology',name:'Technology, data & fintech',skill:'data',fit:['Analytics','Technology','Systems','Quantitative'],firms:[['Bloomberg','Client Support Associate'],['IBM','Technology Sales Analyst'],['HKEX','Data & Business Analyst']],pay:29000,intern:14000},
 {id:'management',name:'General management & operations',skill:'people',fit:['Management','Business','Leadership'],firms:[['Swire','Management Trainee'],['AIA','Business Operations Analyst'],['MTR','Graduate Trainee']],pay:26000,intern:12000},
 {id:'impact',name:'Social impact & research',skill:'consulting',fit:['Economics','Leadership','Society'],firms:[['Civic Futures (fictional NGO)','Programme Officer'],['Harbour Research (fictional)','Research Analyst'],['Impact Works (fictional)','Project Associate']],pay:20000,intern:9000}
];
// Fictional smaller employers broaden entry routes. Scope describes the market served,
// not an actual employer's nationality policy. All recruitment odds are game assumptions.
export const EMPLOYER_TYPES=[['accessible','Small firms & startups'],['large','Established / big-name firms'],['all','Explore every size']];
const smallerFirms={
 banking:[['Harbour Lending','Credit Operations Analyst'],['Pearl River Wealth','Client Services Assistant'],['PocketLedger','Fintech Operations Analyst']],
 investments:[['Juniper Advisory','Investment Research Assistant'],['Lingnan Capital Studio','Markets Research Analyst'],['SignalNest','Market Data Analyst']],
 consulting:[['Hill Road Advisory','Business Consulting Analyst'],['GBA Growth Studio','Strategy Project Assistant'],['LaunchWorks','Operations & Strategy Analyst']],
 accounting:[['Wong & Lau Practice','Accounts & Audit Assistant'],['Yue Finance Services','Accounting Assistant'],['LedgerSprout','Finance Operations Analyst']],
 marketing:[['Neighbourhood Creative','Digital Marketing Assistant'],['Pearl River Commerce','Brand Operations Assistant'],['LittleOrbit','Growth & Content Analyst']],
 technology:[['Harbour Data Studio','Business Data Analyst'],['Shenzhen Bridge Labs','Product Operations Analyst'],['CloudSeed','Customer Success Associate']],
 management:[['Local Table Group','Operations Assistant'],['BayLink Trading','Commercial Operations Analyst'],['LoopCart','Business Development Associate']],
 impact:[['Community Steps','Programme Assistant'],['Bay Community Research','Research Assistant'],['KindLab','Social Enterprise Associate']]
};
// These are fictional openings at named employers, not live programmes or salary claims.
const moreEstablished={
 banking:[['Standard Chartered','Corporate Banking Analyst'],['Citi','Treasury & Trade Solutions Analyst'],['Bank of China (Hong Kong)','Commercial Banking Analyst'],['DBS','Risk Management Analyst']],
 investments:[['Morgan Stanley','Investment Management Analyst'],['Goldman Sachs','Asset Management Analyst'],['Fidelity International','Investment Operations Analyst'],['Schroders','Portfolio Analytics Analyst']],
 consulting:[['McKinsey & Company','Business Analyst'],['Boston Consulting Group','Consulting Associate'],['Bain & Company','Associate Consultant'],['Oliver Wyman','Consulting Analyst'],['Kearney','Business Analyst'],['PwC Strategy&','Strategy Associate']],
 accounting:[['EY','Assurance Associate'],['BDO','Business Services Associate'],['Grant Thornton','Audit Associate'],['Forvis Mazars','Tax Associate']],
 marketing:[['Procter & Gamble','Consumer Insights Analyst'],['LVMH','Retail Marketing Assistant'],['adidas','E-commerce Analyst'],['Ogilvy','Account Management Trainee']],
 technology:[['Microsoft','Business Programme Analyst'],['Tencent','Product Operations Analyst'],['Alibaba','Commercial Data Analyst'],['SAP','Business Solutions Analyst']],
 management:[['Jardine Matheson','Commercial Graduate Trainee'],['DHL','Supply Chain Analyst'],['CLP','Business Planning Analyst'],['Link REIT','Leasing & Asset Operations Analyst']],
 impact:[['Harbour Civic Foundation (fictional)','Social Impact Analyst'],['Asia Sustainability Institute (fictional)','ESG Research Analyst'],['Community Futures Network (fictional)','Programme Evaluation Officer'],['Regional Policy Centre (fictional)','Economic Research Analyst']]
};
const moreSmall={
 banking:[['Sheung Wan Credit','SME Lending Assistant'],['YuePay Studio','Payments Operations Analyst'],['NestWallet','Customer Operations Associate']],
 investments:[['Island Research Desk','Equity Research Assistant'],['BayView Asset Studio','Fund Operations Assistant'],['QuantSprout','Investment Data Analyst']],
 consulting:[['Common Ground Advisory','Organisation Design Analyst'],['Delta Strategy Partners','Market Entry Analyst'],['PivotBench','Digital Transformation Analyst']],
 accounting:[['Kennedy Town Accounts','Tax Assistant'],['Huaxin Ledger Studio','Audit Assistant'],['CloseBooks','Financial Reporting Analyst']],
 marketing:[['Side Street Studio','Social Media Assistant'],['GBA Brand House','E-commerce Operations Analyst'],['MintLoop','CRM & Growth Analyst']],
 technology:[['Lantern Analytics','Business Intelligence Analyst'],['Bay Product Lab','Product Research Assistant'],['FlowPilot','Fintech Product Analyst']],
 management:[['Island Logistics','Supply Chain Assistant'],['Delta Retail Studio','Merchandising Analyst'],['ReLoop Market','Marketplace Operations Associate']],
 impact:[['Open Neighbourhood','Community Partnerships Assistant'],['Bay Impact Studio','Sustainability Research Assistant'],['GoodMetric','Impact Measurement Analyst']]
};
for(const industry of INDUSTRIES){
 industry.firms.push(...moreEstablished[industry.id]);
 smallerFirms[industry.id].push(...moreSmall[industry.id]);
}
for(const industry of INDUSTRIES){
 industry.firms=industry.firms.map(f=>[...f,'multinational',industry.id==='impact'&&['Civic Futures','Harbour Research','Impact Works'].some(name=>f[0].startsWith(name))?'small':'large',1]);
 industry.firms.push(...smallerFirms[industry.id].map((f,i)=>[f[0]+' (fictional)',f[1],['local','mainland','multinational'][i%3],i%3===2?'startup':'small',i%3===2?.78:.7]));
}
export const employerInfo=(industry,company)=>industry?.firms.find(f=>f[0]===company)||[company,'Graduate Analyst','multinational','large',1];
export const PLACEMENTS=[{id:'summer',name:'Summer internship',months:2,terms:0,desc:'Two months in the coming summer; no teaching term missed.'},{id:'semester',name:'Semester placement',months:6,terms:1,desc:'Six months from the next teaching semester; one teaching term on leave.'},{id:'year',name:'Year placement',months:12,terms:2,desc:'Twelve months from the next teaching semester; two teaching terms on leave.'}];
export const SOURCES=[
 ['Employer examples','BCG Hong Kong office','https://www.bcg.com/offices/hong-kong','Employer names provide setting only. All in-game roles, vacancies, salaries and hiring odds are fictional; the expanded company pool does not change interview difficulty.'],
 ['Exchange destinations','HKU Business School exchange partners','https://ug.hkubs.hku.hk/exchange-partner','Expanded destination choices use listed partners. Future availability, nominations and a flat game budget are simplified; city-only options preserve the original edition.'],
 ['Campus societies','HKU CEDARS registered student societies','https://leaf.cedars.hku.hk/student-societies/','Sports, cultural and leisure club names. Participation costs and committee progression are game rules.'],
 ['Student activities','HKU Business School competitions','https://ug.hkubs.hku.hk/competition','Student competition opportunities. Invitations, selection, funding and outcomes in the game are fictional approximations.'],
 ['2026 curriculum','HKU Business School degree regulations and syllabuses','https://www4.hku.hk/pubunit/drcd/undergraduate-2026-2027/1129-business','Each programme links to its 2026-entry syllabus. Some PDFs remain marked subject to approval. The game uses credit buckets, not a course-by-course official audit.'],
 ['Major / minor rules','2026–27 FBE majors and minors','https://ug.hkubs.hku.hk/f/curriculum/255599/Major%20and%20Minor%20Programmes%20offered%20by%20FBE%202026-27_v20260721.pdf','Permissible combinations, 78/96-credit FBE majors, 36-credit minors, selection and declaration windows. Shared faculty cores do not reduce total degree credits.'],
 ['Exchange timing','HKU Business School outgoing exchange','https://ug.hkubs.hku.hk/outgoing-exchange','The published 2026–27 main round ran 22 December 2025 to 22 January 2026. Future annual windows are simulated. One semester exchange per life, no exchange in the final year, automatic scheduling and repeatable short schools are requested game rules.'],
 ['Societies','HKU Business School student-run organisations','https://ug.hkubs.hku.hk/student-enrichment/student-run-organizations','Real organisation names; game participation, project selection and workload are fictional.'],
 ['Placements','HSBC student work placement','https://apply.careers.hsbc.com/emergingtalent/job/Central-HSBC-Student-Work-Placement-Hong/1367003857/','An example of a real six-month placement format. All in-game vacancies, pay and hiring outcomes are invented.'],
 ['Inspiration','1 in 8 Billion','https://1in8b.life/zh/','Original HKU-inspired stories and interface; no affiliation with HKU or employers.']
];
