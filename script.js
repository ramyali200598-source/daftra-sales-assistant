/* Pricing Engine */
const plans=[
 {name:'الأساسية',annual:1140,monthly:120,users:1,warehouses:1,invoices:100,employees:1,manufacturing:false,customers:100,storageGb:5,aiCoins:60,cashAccounts:2,einvoicePhase:'المرحلة الأولى'},
 {name:'المتقدمة',annual:1860,monthly:220,users:2,warehouses:3,invoices:500,employees:2,manufacturing:false,customers:300,storageGb:10,aiCoins:200,cashAccounts:5,einvoicePhase:'المرحلة الأولى والثانية'},
 {name:'الشاملة',annual:2700,monthly:320,users:2,warehouses:5,invoices:Infinity,employees:3,manufacturing:true,customers:Infinity,storageGb:20,aiCoins:500,cashAccounts:Infinity,einvoicePhase:'المرحلة الأولى والثانية'}
];
const rates={annual:{user:315,branch:1860,warehouse:540,employee:99},monthly:{user:35,branch:195,warehouse:58.5,employee:11.25}};
const competitorData={
 Excel:{pitch:'الانتقال من العشوائية والخطأ البشري إلى الأتمتة الكاملة، الأمان، والامتثال الضريبي الإلزامي.',points:[
  'مراقبة ومنع التلاعب: صلاحيات دقيقة لكل موظف، مستحيل كاشير أو موظف مخزن يعدل أو يحذف حاجة بدون علمك، بعكس الإكسيل المفتوح لأي تعديل.',
  'تقارير لحظية: قوائم الأرباح والخسائر، والميزانية العمومية، وحركة المخازن تطلع بضغطة زر فوراً، بدل ما تضيع أيام في تجميع الجداول يدوياً.',
  'الأمان السحابي: بيانات العميل محمية ومشفرة على سحابة آمنة، مفيش خوف من ضياع ملف الإكسيل أو ضرب الهارد ديسك.'
 ]},
 Odoo:{pitch:'نظام ERP متكامل وقوي جداً، لكن بتكلفة واضحة وثابتة وبدون مصاريف خفية أو فواتير صادمة.',points:[
  'التكلفة الإجمالية للملكية (TCO): في أودو، العميل بيدفع تمن الرخص، وفوقها مصاريف ضخمة للاستضافة، ومصاريف فلكية لشركات التطوير (Implementation Partners). في دفترة السعر شامل كل حاجة (الاستضافة، الدعم، التحديثات).',
  'تعريب حقيقي ونقي: واجهة دفترة عربية بنسبة 100% ومبنية للثقافة الخليجية، مش مجرد "ترجمة آلية" مشوهة لبعض الكلمات زي أودو.',
  'جاهز فوراً: في أودو، العميل بيدخل في دوامة تعديل الكود والتطوير وممكن يقعد 6 شهور عشان يبدأ يبيع. في دفترة السيستم جاهز للعمل من اليوم الأول.'
 ]},
 Zoho:{pitch:'نظام سحابي محلي، يفهم بيئة الأعمال واللوائح السعودية بدقة متناهية مقارنة بالأنظمة العالمية العامة.',points:[
  'التوافق السلس مع ZATCA: نظام الفوترة والربط في دفترة مدمج ومصمم خصيصاً للسوق السعودي، بينما زوهو يحتاج إعدادات وربط إضافي معقد في بعض الأحيان.',
  'دعم فني محلي وعربي: الدعم الفني في دفترة متواجد لخدمة العميل مباشرة باللغة العربية وفي نفس توقيت المملكة، بعكس دعم زوهو اللي أغلبه بالإنجليزية ومبني على نظام التذاكر البطيء.',
  'بساطة الواجهة: دفترة يركز على تيسير الخطوات؛ إدخال فاتورة أو عمل قيد محاسبي أسرع بكتير وأقل تعقيداً في الخطوات من زوهو.'
 ]},
 SAP:{pitch:'قوة ومرونة الأنظمة العالمية الضخمة، لكن بكسر بسيط جداً من التكلفة ووقت تشغيل قياسي.',points:[
  'لا حاجة لفريق IT: ساب يحتاج خوادم ضخمة، وفريق مهندسين IT متخصصين لمتابعته وصيانته (وهذا مكلف جداً). دفترة نظام سحابي بالكامل تفتحه من المتصفح والشركة هي اللي بتدير السيرفرات والأمان.',
  'مرونة وسرعة التعديل: أي تعديل في صلاحيات الموظفين أو إضافة مستودع جديد في دفترة بياخد ثواني، في ساب بيحتاج طلب تغيير برمجيات ومبالغ إضافية.',
  'مناسب للنمو السريع: يمنح الشركات المتوسطة والناشئة نفس القوة الإدارية للشركات الكبرى بدون ما يضغط على ميزانيتها.'
 ]},
 Qoyod:{pitch:'دفترة هو نظام ERP تشغيلي متكامل، يتجاوز مجرد القيود المحاسبية البسيطة ليدير كافة مفاصل الشركة.',points:[
  'نظام تصنيع حقيقي (BOM): قيود برنامج محاسبي بسيط؛ لا يحتوي على نظام تصنيع وتحويل المواد الخام إلى منتجات تامّة ومراقبة خطوط الإنتاج مثل دفترة.',
  'إدارة موارد بشرية (HR) متقدمة: دفترة يحتوي على نظام HR احترافي كامل (مسيرات رواتب متوافقة مع الأنظمة السعودية، تتبع حضور وانصراف، إجازات وعقود)، بينما قيود يحتاج برامج وسيطة.',
  'دورة مخازن وفروع أقوى: إدارة متطورة جداً للجرد، والتحويل بين الفروع، ونقاط البيع السريعة (POS) للمطاعم والتجزئة مع ربطها تلقائياً بالمخزن الرئيسي.'
 ]},
 Wafeq:{pitch:'دفترة يمنحك السيطرة الكاملة على الدورة المستندية والتجارية لشركتك، وليس فقط استخراج الفواتير الضريبية.',points:[
  'دورة مستندية وتجارية كاملة: وافق يركز بشكل أساسي على الفواتير والضرائب. دفترة يدير دورتك التجارية بالكامل من أول (عروض الأسعار، أوامر البيع، سندات تسليم البضائع، سندات الصرف والقبض، أوامر المشتريات).',
  'نظام إدارة علاقات العملاء (CRM): دفترة يحتوي على موديول كامل للـ CRM لإنشاء خطوط سير الصفقات (Sales Pipelines) ومتابعة الـ Leads وفريق المبيعات، وهو ما يفتقده وافق تماماً.',
  'تخصيص القوالب والفواتير: مرونة لانهائية في تصميم وتخصيص شكل الفواتير المطبوعة، وإضافة الشروط والأحكام لتناسب هوية الشركة التجارية بالملي.'
 ]}
};
competitorData.Oracle=competitorData.SAP;
competitorData.SMACC={context:'عادةً العميل اللي بيقارن بسماك بيكون من الشركات القديمة في السوق أو المحاسب بتاعه متعود عليه.',pitch:'الانتقال من الأنظمة التقليدية المعقدة إلى جيل جديد من الـ ERP السحابي المرن، السهل، والحديث.',points:[
 'سهولة الاستخدام والتدريب: سماك واجهته قديمة وخطواتها كتير وصعبة جداً في تدريب الموظفين الجداد (الكاشير أو موظف المخزن). دفترة واجهته عصرية وأي موظف بيتعلم عليها في نص ساعة.',
 'نظام CRM حقيقي: سماك نظام محاسبة ومخازن وبس. دفترة بيديك موديول كامل لإدارة علاقات العملاء (CRM) ومتابعة فريق المبيعات والصفقات عشان يزود مبيعات الشركة.',
 'التقارير الرسومية والداشبورد: دفترة بيديك لوحة تحكم ذكية برسم بياني واضح لصاحب العمل يشوف منها أداء شركته فوراً من موبايله، بعكس تقارير سماك الجافة والتقليدية.'
]};
competitorData.AlAmeen={context:'ده البعبع بتاع المحاسبين القدام، بيكون شغال على سيرفر محلي في الشركة.',pitch:'التحرر من قيود السيرفرات المحلية والأجهزة المكلفة إلى أمان وحرية النظام السحابي الكامل.',points:[
 'توفير تكلفة البنية التحتية: الأمين بيحتاج تشتري رخص غالية جداً كاش مقدماً، وبيحتاج جهاز سيرفر في الشركة، وشبكة داخلية، ومهندس IT للصيانة. دفترة اشتراك شهري أو سنوي بسيط جداً وتفتحه من أي لاب توب أو موبايل.',
 'العمل من أي مكان: لو صاحب الشغل مسافر أو في البيت، يقدر يتابع المخازن والمبيعات لحظة بلحظة. في الأمين لازم يكون جوه الشركة أو يربط VPN معقد وبطيء.',
 'تحديثات ZATCA التلقائية: لما هيئة الزكاة بتعدل أي شرط في الفوترة الإلكترونية، التحديث بينزل في دفترة فوراً ومجاناً لكل العملاء. في الأمين لازم تدفع تمن التحديث ومهندس يجيلك الشركة يثبته يدوي على السيرفر.'
]};
competitorData.Foodics={context:'ده هتقابله لو العميل (مطعم، كافيه، أو مخبز) وبيقارن بنقاط البيع.',pitch:'إدارة الشركة بالكامل بنظام ERP ومحاسبة ومخازن حقيقي، وليس مجرد شاشة كاشير لطلب الأكل.',points:[
 'قوة النظام الخلفي (Back Office ERP): فودكس وحش في شاشة الكاشير والمطاعم، لكن موديول المحاسبة والمخازن والموردين بتاعه بسيط جداً، وغالباً العميل بيضطر يشتري برنامج محاسبة تاني ويربطه مع فودكس بفلوس زيادة. دفترة بيديك الـPOS والـERP والمحاسبة والـHR في سيستم واحد مدمج.',
 'التكلفة وأجهزة نقاط البيع: فودكس بيجبر العميل على أجهزة معينة (iPad) واشتراكاته غالية مع كل فرع وجهاز إضافي. دفترة بيشتغل على أي شاشة، أي تابلت، أو حتى موبايل أندرويد، وده بيوفر على العميل آلاف الريالات في التأسيس.',
 'إدارة شؤون الموظفين (HR): دفترة بيدير مسيرات رواتب موظفين المطعم، شيفتاتهم، وحضورهم وانصرافهم، وده مش موجود في فودكس.'
]};
competitorData.QuickBooks={context:'دول هتقابلهم مع الشركات التقنية الناشئة (Startups) أو الشركات اللي مدرائها أجانب.',pitch:'نظام ERP معتمد ومتوافق 100% مع السوق السعودي واللوائح المحلية بدون الحاجة لتطبيقات ربط خارجية (Bridges).',points:[
 'الاعتماد المباشر للمرحلة الثانية (ZATCA): كويك بوكس وزيرو برامج عالمية، وعشان تربطها مع هيئة الزكاة والجمارك في السعودية للمرحلة الثانية، العميل لازم يشتري برنامج وسيط (Middleware) غالي جداً ومشاكله التقنية كتير. دفترة معتمد وبيربط مباشرة بضغطة زر.',
 'الدعم الفني واللغة: دفترة دعمه الفني عربي ومتواجد في نفس توقيت المملكة لحل أي مشكلة فوراً. البرامج العالمية دعمها بالإنجليزي وبنظام التذاكر وبياخد أيام.',
 'الدورة المستندية العربية: تصميم الفواتير، وعروض الأسعار، وسندات القبض والصرف في دفترة مبني على طريقة التجارة العربية والسعودية بالملي، بعكس البرامج الغربية.'
]};
competitorData.Xero=competitorData.QuickBooks;
function planFeatures(plan){const f=(n)=>n===Infinity?'غير محدود':arDigits(n);return[
 `${f(plan.invoices)} فاتورة/عرض سعر شهريًا`,
 `${f(plan.customers)} عميل`,
 plan.users===1?'مستخدم واحد فقط (الأدمن) — أي مستخدم إضافي بمقابل':`الأدمن + ${arDigits(plan.users-1)} مستخدم إضافي متضمن (إجمالي ${arDigits(plan.users)}) — أي مستخدم أكتر بمقابل`,
 `${arDigits(plan.warehouses)} مستودع متضمن`,
 `${arDigits(plan.employees)} حساب موظف (HR) متضمن`,
 `${arDigits(plan.storageGb)} GB مساحة تخزين`,
 `${arDigits(plan.aiCoins)} عملة ذكاء اصطناعي شهريًا`,
 `${f(plan.cashAccounts)} حساب خزينة/بنك`,
 `فاتورة إلكترونية: ${plan.einvoicePhase}`,
 plan.manufacturing?'إدارة التصنيع وقائمة المواد (BOM) متاحة':'بدون إدارة تصنيع (متاحة في الشاملة فقط)',
 `نقاط بيع سحابية غير محدودة، ودعم فني ${arDigits('24/7')}`
];}
let billingPeriod='annual';
const byId=id=>document.getElementById(id);
const number=id=>Math.max(0,Number(byId(id).value)||0);
const arDigits=value=>String(value).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const currency=value=>arDigits(Number(value||0).toLocaleString('ar-SA',{maximumFractionDigits:2}));

function customerRequirements(){return{users:Math.max(0,number('users')),branches:Math.max(1,number('branches')),warehouses:Math.max(1,number('warehouses')),invoices:number('invoices'),employees:Math.max(1,number('employees')),manufacturing:byId('manufacturing').checked};}
function limitations(plan,index,requirements){const reasons=[];if(requirements.manufacturing&&!plan.manufacturing)reasons.push('التصنيع / BOM مطلوب وهو غير متاح');if(index===0&&requirements.branches>1)reasons.push(`عدد الفروع (${arDigits(requirements.branches)}) يتجاوز حد فرع واحد`);if(requirements.invoices>plan.invoices&&plan.invoices!==Infinity)reasons.push(`الفواتير (${arDigits(requirements.invoices)}) تتجاوز الحد (${arDigits(plan.invoices)})`);return reasons;}
function planQuote(plan,index,requirements){const rate=rates[billingPeriod],base=plan[billingPeriod],totalUsers=requirements.users+1,extraUsers=Math.max(0,totalUsers-plan.users),extraBranches=Math.max(0,requirements.branches-1),extraWarehouses=Math.max(0,requirements.warehouses-plan.warehouses),extraEmployees=Math.max(0,requirements.employees-plan.employees);const line=(qty,unit,label)=>`${arDigits(qty)} ${label} إضافي × ${currency(unit)} = ${currency(qty*unit)} ر.س`;const addonItems=[extraUsers>0&&{label:line(extraUsers,rate.user,'مستخدم'),cost:extraUsers*rate.user},extraBranches>0&&{label:line(extraBranches,rate.branch,'فرع'),cost:extraBranches*rate.branch},extraWarehouses>0&&{label:line(extraWarehouses,rate.warehouse,'مستودع'),cost:extraWarehouses*rate.warehouse},extraEmployees>0&&{label:line(extraEmployees,rate.employee,'موظف'),cost:extraEmployees*rate.employee}].filter(Boolean);const addons=addonItems.reduce((s,i)=>s+i.cost,0);return{plan,index,base,addons,addonItems,preTax:base+addons,limitations:limitations(plan,index,requirements)};}
function quotes(){const requirements=customerRequirements();return plans.map((plan,index)=>planQuote(plan,index,requirements));}

/* VAT Engine */
function vatEnabled(){return byId('vatIncluded').checked;}
function discountPlanPercent(){return Math.min(100,Math.max(0,number('discountPlan')));}
function discountAddonsPercent(){return Math.min(100,Math.max(0,number('discountAddons')));}
function displayPrice(quote){const planDiscount=discountPlanPercent(),addonsDiscount=discountAddonsPercent();const planDiscountAmount=quote.base*planDiscount/100,addonsDiscountAmount=quote.addons*addonsDiscount/100,discountAmount=planDiscountAmount+addonsDiscountAmount,discounted=quote.preTax-discountAmount,vat=discounted*.15;return{planDiscount,addonsDiscount,planDiscountAmount,addonsDiscountAmount,discountAmount,discounted,vat,total:discounted+vat,shown:vatEnabled()?discounted+vat:discounted};}
function priceDetails(quote){const price=displayPrice(quote);const addonsHtml=quote.addonItems.length?`<div class="addons">${quote.addonItems.map(i=>`+ ${i.label}`).join('<br>')}</div>`:'';const subtotalLine=quote.addonItems.length?`<br>الإجمالي قبل الضريبة: ${currency(quote.preTax)} ر.س`:'';const discountLines=[price.planDiscount>0?`خصم الباقة ${arDigits(price.planDiscount)}%: -${currency(price.planDiscountAmount)} ر.س`:'',price.addonsDiscount>0?`خصم الإضافات ${arDigits(price.addonsDiscount)}%: -${currency(price.addonsDiscountAmount)} ر.س`:''].filter(Boolean);const discountHtml=discountLines.length?`<br><span class="addons">${discountLines.join('<br>')}</span><br>بعد الخصم: ${currency(price.discounted)} ر.س`:'';return vatEnabled()?`<div class="price-details">السعر الأساسي: ${currency(quote.base)} ر.س<br>${addonsHtml}${subtotalLine}${discountHtml}<br>VAT (15%): ${currency(price.vat)} ر.س<br><b>الإجمالي شامل الضريبة: ${currency(price.total)} ر.س</b></div>`:`<div class="price-details">السعر الأساسي: ${currency(quote.base)} ر.س<br>${addonsHtml}${discountHtml}<br><b>الإجمالي: ${currency(price.discounted)} ر.س</b><br>الأسعار لا تشمل الضريبة</div>`;}

/* Recommendation Engine */
function recommendation(){const allQuotes=quotes(),suitable=allQuotes.filter(quote=>!quote.limitations.length),selected=(suitable.length?suitable:allQuotes).sort((a,b)=>a.preTax-b.preTax)[0];const req=customerRequirements();const confidence=Math.max(45,97-(req.invoices>6000?7:0)-(req.branches>4?5:0)-(byId('need').value==='Low'?12:0));return{allQuotes,selected,suitable,confidence};}
function recommendationExplanation(selected,allQuotes){const rejected=allQuotes.filter(quote=>quote.index<selected.index&&quote.limitations.length);return `<b>لماذا تم اختيارها؟</b><br><span class="ok">✓ أقل باقة تحقق جميع المتطلبات دون تنازل</span>${rejected.map(quote=>quote.limitations.map(reason=>`<br><span class="bad">● ${quote.plan.name}: ${reason}</span>`).join('')).join('')||'<br><span class="ok">✓ لا توجد باقة أقل مناسبة</span>'}`;}

/* Proposal and WhatsApp Generators */
function whatsAppText(){const {selected,confidence}=recommendation(),requirements=customerRequirements(),price=displayPrice(selected);const discountLines=[price.planDiscount>0?`خصم الباقة ${arDigits(price.planDiscount)}%: -${currency(price.planDiscountAmount)} ر.س\n`:'',price.addonsDiscount>0?`خصم الإضافات ${arDigits(price.addonsDiscount)}%: -${currency(price.addonsDiscountAmount)} ر.س\n`:''].join('');return `مرحباً ${byId('customerName').value||''}،\n\nنوصي بـ باقة ${selected.plan.name} لأنها أقل باقة تحقق متطلباتكم دون تنازلات.\n✓ ${arDigits(requirements.users+1)} مستخدم (شامل الأدمن) و${arDigits(requirements.branches)} فرع و${arDigits(requirements.employees)} موظف${requirements.manufacturing?' مع التصنيع':''}.\nثقة التوصية: ${arDigits(confidence)}%\n${vatEnabled()?`السعر الأساسي: ${currency(selected.preTax)} ر.س\n${discountLines}VAT 15%: ${currency(price.vat)} ر.س\nالإجمالي: ${currency(price.total)} ر.س`:`السعر الأساسي: ${currency(selected.preTax)} ر.س\n${discountLines}الإجمالي: ${currency(price.discounted)} ر.س (غير شامل VAT)`}\n\nيسعدنا استكمال الخطوات القادمة.`;}
function buildProposal(){const {selected}=recommendation(),req=customerRequirements(),price=displayPrice(selected);const discountRows=[price.planDiscount>0?`<tr><td>خصم الباقة (${arDigits(price.planDiscount)}%)</td><td>-${currency(price.planDiscountAmount)} ر.س</td></tr>`:'',price.addonsDiscount>0?`<tr><td>خصم الإضافات (${arDigits(price.addonsDiscount)}%)</td><td>-${currency(price.addonsDiscountAmount)} ر.س</td></tr>`:''].join('');return `<header><h1 style="color:#0e3d36">دفتـرة ERP</h1><p>عرض تجاري · ${new Date().toLocaleDateString('ar-SA')}</p></header><h2>عرض إلى: ${byId('customerName').value}</h2><p>نوصي بباقة <b>${selected.plan.name}</b> لأنها أقل باقة مؤهلة تحقق المتطلبات.</p><table><tr><th>البند</th><th>التفاصيل</th></tr><tr><td>المستخدمون والفروع</td><td>${arDigits(req.users+1)} مستخدم (شامل الأدمن) · ${arDigits(req.branches)} فرع · ${arDigits(req.warehouses)} مستودع</td></tr><tr><td>الموظفون (الموارد البشرية)</td><td>${arDigits(req.employees)} موظف</td></tr><tr><td>الوحدات</td><td>المبيعات، المحاسبة، المخزون، CRM ${req.manufacturing?'، التصنيع':''}</td></tr><tr><td>السعر الأساسي</td><td>${currency(selected.preTax)} ر.س</td></tr>${discountRows}${vatEnabled()?`<tr><td>ضريبة القيمة المضافة (15%)</td><td>${currency(price.vat)} ر.س</td></tr><tr><th>الإجمالي شامل الضريبة</th><th>${currency(price.total)} ر.س</th></tr>`:`<tr><th>الإجمالي قبل الضريبة</th><th>${currency(price.discounted)} ر.س</th></tr>`}</table><p>الشروط: الأسعار خاضعة للمراجعة والاعتماد النهائي من دفتـرة.</p><button class="btn primary" onclick="print()">تصدير PDF / طباعة</button> <button class="btn" onclick="proposalModal.classList.remove('show')">إغلاق</button>`;}

/* ROI Calculator */
function renderRoi(monthlyCost){const hours=number('wastedHours')*number('roiEmployees')*4,saved=hours*(number('averageSalary')/160);byId('timeSaved').textContent=currency(hours)+' ساعة';byId('moneySaved').textContent=currency(saved)+' ر.س';byId('roiValue').textContent=monthlyCost?arDigits(Math.round(saved/monthlyCost*100))+'%':'—';}

/* Knowledge Base */
function searchKb(term){term=(term||'').trim();if(!term)return[];const words=term.split(/\s+/).filter(Boolean);return kbData.filter(item=>{const haystack=`${item.tags} ${item.title} ${item.content}`;return words.every(w=>haystack.includes(w));});}
function kbCard(item){const badges=item.tags.split(/\s+/).filter(Boolean).map(tag=>`<span class="kb-tag">#${tag}</span>`).join('');return `<article class="kb-item"><div class="kb-tags">${badges}</div><h3>${item.title}</h3><p>${item.content}</p></article>`;}
function renderKb(){const term=byId('kbSearch').value,container=byId('kbResults'),results=term.trim()?searchKb(term):kbData;container.innerHTML=results.length?results.map(kbCard).join(''):'<p class="kb-hint">لا توجد نتائج مطابقة. جرب كلمة أخرى.</p>';}

/* Local Storage */
function saveDraft(){const data={};document.querySelectorAll('input:not(#kbSearch),select,textarea').forEach(element=>data[element.id]=element.type==='checkbox'?element.checked:element.value);localStorage.setItem('daftraSalesAssistant',JSON.stringify({data,billingPeriod,dark:document.body.classList.contains('dark')}));}
function restoreDraft(){try{const saved=JSON.parse(localStorage.getItem('daftraSalesAssistant'));if(!saved)return;Object.entries(saved.data||{}).forEach(([id,value])=>{const element=byId(id);if(element)element.type==='checkbox'?element.checked=value:element.value=value;});billingPeriod=saved.billingPeriod||billingPeriod;document.body.classList.toggle('dark',saved.dark);}catch{}}
function quoteHistory(){return JSON.parse(localStorage.getItem('daftraQuoteHistory')||'[]');}

/* UI Rendering */
function renderPlans(){const {allQuotes,selected,suitable}=recommendation();byId('plans').innerHTML=allQuotes.map(quote=>{const selectedPlan=quote===selected,qualified=!quote.limitations.length;const tradeoff=qualified&&suitable.length>1?`<small>${selectedPlan?'ميزة: أقل تكلفة مؤهلة.':'ميزة: مرونة أعلى للنمو مقابل تكلفة أكبر.'}</small>`:'';return `<article class="plan ${selectedPlan?'best':''}" style="opacity:${qualified?1:.72}"><h3>${quote.plan.name} ${selectedPlan?'✓':''}</h3><div class="price">${currency(displayPrice(quote).shown)} <small>ر.س</small></div>${priceDetails(quote)}<ul class="features">${planFeatures(quote.plan).map(item=>`<li>${item}</li>`).join('')}</ul><div class="decision">${qualified?'<span class="ok">✓ مؤهلة: تغطي الاحتياج الحالي</span>':`<b class="bad">● غير مؤهلة</b><br>${quote.limitations.map(reason=>`<span class="bad">● ${reason}</span>`).join('<br>')}`}${selectedPlan?`<hr>${recommendationExplanation(selected,allQuotes)}`:''}</div>${tradeoff}</article>`;}).join('');}
function renderDashboard(){const {selected,confidence}=recommendation(),price=displayPrice(selected),monthly=price.shown/(billingPeriod==='annual'?12:1);byId('dashboardPlan').textContent='باقة '+selected.plan.name;byId('dashboardDeal').textContent=currency(price.shown)+' ر.س';byId('dashboardMrr').textContent=currency(monthly)+' ر.س';byId('dashboardScore').textContent=arDigits(confidence)+'%';byId('dashboardQualification').textContent=byId('need').value==='High'?'جاهزة للنقاش':'تحتاج استكشافاً إضافياً';}
function renderAssistant(){const {selected,confidence}=recommendation(),req=customerRequirements(),price=displayPrice(selected);byId('recommendationTitle').textContent='باقة '+selected.plan.name;byId('matchScore').textContent=arDigits(confidence)+'%';byId('scoreRing').style.setProperty('--score',confidence+'%');byId('consultantAdvice').innerHTML=`<span class="ok">ثقة التوصية: ${arDigits(confidence)}%</span><br>${recommendationExplanation(selected,quotes())}`;const items=[['العميل',byId('customerName').value||'غير محدد'],['النشاط',byId('activity').value||'غير محدد'],['الدولة',byId('country').value],['المستخدمون (شامل الأدمن)',arDigits(req.users+1)],['الفروع',arDigits(req.branches)],['المستودعات',arDigits(req.warehouses)],['الفواتير',arDigits(req.invoices)],['الموظفون',arDigits(req.employees)],['التصنيع',req.manufacturing?'نعم':'لا'],['الباقة',selected.plan.name],['السعر',currency(price.shown)+' ر.س']];byId('customerSummary').innerHTML=items.map(([label,value])=>`<div><span>${label}</span><b>${value}</b></div>`).join('');renderRoi(price.shown);}
function renderHistory(){byId('quoteHistory').innerHTML=quoteHistory().map((quote,index)=>`<div><b>${quote.customer||'عميل بدون اسم'}</b><br>${quote.date} · ${quote.plan}<br><button class="btn" onclick="loadQuote(${index})">تعديل</button><button class="btn" onclick="deleteQuote(${index})">حذف</button></div>`).join('')||'لا توجد عروض محفوظة';}
function render(){renderPlans();renderDashboard();renderAssistant();const message=whatsAppText();byId('whatsAppMessage').value=message;byId('whatsAppLink').href='https://wa.me/?text='+encodeURIComponent(message);byId('vatDescription').textContent=vatEnabled()?'يعرض الأساسي والضريبة والإجمالي':'يعرض السعر الأساسي فقط';saveDraft();}

/* Events and utilities */
function copyText(value){navigator.clipboard?.writeText(value);alert('تم النسخ');}
function saveQuote(){const {selected}=recommendation(),price=displayPrice(selected),history=quoteHistory();history.unshift({customer:byId('customerName').value,date:new Date().toLocaleDateString('ar-SA'),plan:selected.plan.name,total:price.shown,form:JSON.parse(localStorage.getItem('daftraSalesAssistant')).data});localStorage.setItem('daftraQuoteHistory',JSON.stringify(history.slice(0,50)));renderHistory();}
window.loadQuote=index=>{const quote=quoteHistory()[index];Object.entries(quote.form).forEach(([id,value])=>{const element=byId(id);if(element)element.type==='checkbox'?element.checked=value:element.value=value;});render();};window.deleteQuote=index=>{const history=quoteHistory();history.splice(index,1);localStorage.setItem('daftraQuoteHistory',JSON.stringify(history));renderHistory();};
document.querySelectorAll('input:not(#kbSearch),select,textarea').forEach(element=>element.addEventListener('input',render));document.querySelectorAll('.period').forEach(button=>button.addEventListener('click',()=>{billingPeriod=button.dataset.period;render();}));document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>copyText(byId(button.dataset.copy).value||byId(button.dataset.copy).innerText)));byId('copyPricing').addEventListener('click',()=>copyText(whatsAppText()));byId('themeButton').addEventListener('click',()=>{document.body.classList.toggle('dark');saveDraft();});byId('newCustomerButton').addEventListener('click',()=>{if(confirm('مسح بيانات العميل الحالي؟')){document.querySelectorAll('input,textarea').forEach(element=>element.type==='checkbox'?element.checked=false:element.value='');render();}});byId('proposalButton').addEventListener('click',()=>{if(!byId('customerName').value.trim())return alert('يرجى إدخال اسم العميل أولاً');byId('proposalSheet').innerHTML=buildProposal();byId('proposalModal').classList.add('show');});byId('saveQuoteButton').addEventListener('click',saveQuote);byId('competitor').addEventListener('change',event=>{const data=competitorData[event.target.value];byId('competitorTip').innerHTML=data?`${data.context?`<i>${data.context}</i><br>`:''}<b>${data.pitch}</b><ul class="features">${data.points.map(point=>`<li>${point}</li>`).join('')}</ul>`:'اختر المنافس لعرض نقاط البيع.';});
byId('kbSearch').addEventListener('input',renderKb);
byId('knowledgeButton').addEventListener('click',()=>{const opening=byId('kbSection').hidden;byId('kbSection').hidden=!opening;byId('dashboardSection').hidden=opening;byId('layoutSection').hidden=opening;byId('knowledgeButton').textContent=opening?'💰 حاسبة الأسعار':'📚 الموسوعة';if(opening){renderKb();byId('kbSearch').focus();}});
restoreDraft();render();renderHistory();renderKb();
