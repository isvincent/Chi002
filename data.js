/* 〈孔乙己〉學習網站 — 教材資料（繁體中文／English） */
'use strict';

const ROLES = {
  kong:  { zh: '孔乙己', en: 'Kong Yiji', ch: '孔', color: '#6f7f94' },
  zhang: { zh: '掌櫃', en: 'Shopkeeper', ch: '掌', color: '#c2410c' },
  ke:    { zh: '酒客', en: 'Customers', ch: '客', color: '#4f46e5' },
  wo:    { zh: '「我」小伙計', en: '"I" the waiter', ch: '我', color: '#0d9488' }
};

/* 對話判讀：[說話人, 中文引文, 英文, 中文解說, 英文解說] */
const QUOTES = [
  ['kong','「溫兩碗酒，要一碟茴香豆。」','"Warm two bowls of wine, and a dish of aniseed beans."','「排」出九文大錢——宣告清白、維護尊嚴，也掩飾窘迫。','He lays out nine coppers — asserting innocence and dignity, hiding his poverty.'],
  ['kong','「你怎麼這樣憑空汙人清白……」','"How can you slander an innocent man like this…"','被酒客揭短偷書，強調自己「清白」。','Caught stealing books, he flushes red and protests.'],
  ['kong','「竊書不能算偷……竊書！……讀書人的事，能算偷麼？」','"Taking books isn\'t stealing… a scholar\'s affair — how can it be stealing?"','用「竊」字粉飾偷竊，迂腐自欺。','He dresses theft in fancy words — pedantic self-deception.'],
  ['kong','「君子固窮。」','"A gentleman stays firm in poverty."','搬出《論語》掩飾窘境。','He quotes Confucius to cover his plight.'],
  ['kong','「你讀過書麼？」','"Have you studied your books?"','想在小伙計身上找回一點讀書人的尊嚴。','Seeking a scrap of scholarly dignity from the boy.'],
  ['kong','「回字有四樣寫法，你知道麼？」','"Did you know 回 can be written four ways?"','學問無用武之地，只能考孩子。','His learning has no use left but quizzing a child.'],
  ['kong','「不多不多！多乎哉？不多也。」','"Not many, not many! Many? Not many indeed."','對孩子也滿口文言，可笑又可憐。','Even to children he speaks classical Chinese — comic and sad.'],
  ['kong','「我教給你，記著！這些字應該記著。將來做掌櫃的時候，寫帳要用。」','"Let me teach you — remember these! You\'ll need them for the accounts one day."','難得的善意，卻無人領情。','A rare kindness that no one welcomes.'],
  ['kong','「跌斷，跌，跌……」','"Broke them in a fall, fell, fell…"','不肯承認腿是被打斷的。','He won\'t admit his legs were broken by a beating.'],
  ['kong','「不要取笑！」','"Don\'t make fun of me!"','最後一次來店，仍想保住面子。','On his last visit he still tries to save face.'],
  ['kong','「這……下回還清罷。這一回是現錢，酒要好。」','"This… I\'ll pay next time. This time it\'s cash — make the wine good."','坐在蒲包上，仍惦記酒要好。','Sitting on a rush mat, he still asks for good wine.'],
  ['zhang','「孔乙己長久沒有來了。還欠十九個錢呢！」','"Kong Yiji hasn\'t come for ages. He still owes nineteen coins!"','掌櫃只記得欠帳，不關心人。','The shopkeeper remembers the debt, not the man.'],
  ['zhang','「孔乙己麼？你還欠十九個錢呢！」','"Kong Yiji? You still owe nineteen coins!"','見到斷腿的他，第一句仍是帳。','Seeing him crippled, his first words are about money.'],
  ['zhang','「後來怎麼樣？」','"And what happened after that?"','聽人講孔乙己被打，只當作閒話。','He hears of the beating as idle gossip.'],
  ['zhang','「打折了怎樣呢？」','"His legs broken — then what?"','冷淡的追問，像在聽故事。','A cold follow-up, as if hearing a story.'],
  ['zhang','「孔乙己，你又偷了東西了！」','"Kong Yiji, you\'ve been stealing again!"','面對傷殘的他，掌櫃仍笑著揭短。','Even facing the crippled man, he laughs and mocks.'],
  ['ke','「孔乙己，你臉上又添上新傷疤了！」','"Kong Yiji, you\'ve got new scars on your face!"','酒客以取笑他為樂。','The customers make sport of him.'],
  ['ke','「你一定又偷了人家的東西了！」','"You must have stolen something again!"','故意高聲嚷，引來哄笑。','Shouted on purpose, to get a laugh.'],
  ['ke','「什麼清白？我前天親眼見你偷了何家的書，吊著打。」','"Innocent? I saw you strung up and beaten for stealing the He family\'s books."','當眾揭短，毫不留情。','Exposing him in public, without mercy.'],
  ['ke','「孔乙己，你當真認識字麼？」','"Kong Yiji, can you really read?"','專挑他最在意的痛處問。','Aiming right at what he cares about most.'],
  ['ke','「你怎的連半個秀才也撈不到呢？」','"Then how come you never got even half a degree?"','一句話讓他頹唐不安。','One line leaves him crushed and uneasy.'],
  ['ke','「怎樣？……誰曉得？許是死了。」','"What happened? …Who knows? Dead, maybe."','一個人的生死，輕描淡寫。','A man\'s life or death, shrugged off.'],
  ['wo','「誰要你教，不是草頭底下一個來回的回字麼？」','"Who needs you to teach me? Isn\'t it just 回 under the grass radical?"','小伙計也瞧不起他。','Even the boy looks down on him.'],
  ['wo','「討飯一樣的人，也配考我麼？」','"A man no better than a beggar — fit to test me?"','「我」的心裡話——連孩子也歧視他。','The narrator\'s private thought — even a child scorns him.'],
  ['wo','「我到現在終於沒有見——大約孔乙己的確死了。」','"To this day I have not seen him — probably Kong Yiji really is dead."','全文最後一句，「大約」與「的確」並置。','The final line: "probably" and "really" side by side.']
];

/* 學習指引 */
const GUIDE = {
  goals: [
    { icon: '📚', zh: '認識魯迅生平與五四新文學、科舉廢除的時代背景。', en: 'Know Lu Xun and the May Fourth / end-of-exam-system background.' },
    { icon: '🧥', zh: '分析孔乙己「站著喝酒而穿長衫」的矛盾形象。', en: 'Analyse Kong Yiji\'s contradiction: a long gown, yet drinking standing.' },
    { icon: '🔍', zh: '掌握細節描寫、對比手法與第一人稱旁觀敘事。', en: 'Master detail, contrast, and first-person observer narration.' },
    { icon: '💗', zh: '反思「看客」心態，學會同理他人、尊重每一個生命。', en: 'Reflect on bystander culture; practise empathy and respect for life.' }
  ],
  steps: [
    { key: 'guide',    icon: '🧭', page: 'guide',    zh: '課前暖身：讀作者與背景', en: 'Warm-up: author & background' },
    { key: 'explore',  icon: '🗺️', page: 'visual',   zh: '互動探索：完成 4 個視覺化元件', en: 'Explore: try 4 visual tools' },
    { key: 'game',     icon: '🎮', page: 'visual',   zh: '對話判讀：玩一局「誰說的？」', en: 'Play one round of "Who said it?"' },
    { key: 'advanced', icon: '🚀', page: 'advanced', zh: '進階延伸：展開 3 個主題', en: 'Go further: open 3 topics' },
    { key: 'practice', icon: '✏️', page: 'practice', zh: '反覆練習：累計作答 10 題', en: 'Practise: answer 10 items' },
    { key: 'quiz',     icon: '📝', page: 'quiz',     zh: '單元測驗：完成一次測驗', en: 'Quiz: finish one quiz' },
    { key: 'reflect',  icon: '🌱', page: 'portfolio',zh: '學習反思：寫下一則反思', en: 'Reflect: save one reflection' }
  ],
  author: {
    zh: [
      ['本名', '周樟壽，後改名周樹人'],
      ['生卒', '清光緒七年（1881）生，民國二十五年（1936）卒，浙江紹興人'],
      ['筆名', '1918 年發表〈狂人日記〉，首次使用「魯迅」'],
      ['經歷', '十八歲進南京江南水師學堂，二十二歲以官費赴日本學醫，後棄醫從文，企圖用文學改變國民精神'],
      ['風格', '小說著力「揭出病苦，引起療救」；雜文潑辣犀利，批判意識強烈'],
      ['作品', '小說集《吶喊》《徬徨》；文集《朝花夕拾》《野草》《且介亭雜文》；另著《中國小說史略》']
    ],
    en: [
      ['Real name', 'Zhou Zhangshou, later Zhou Shuren (courtesy name Yucai)'],
      ['Life', '1881–1936, Shaoxing, Zhejiang'],
      ['Pen name', 'First used "Lu Xun" for "A Madman\'s Diary" (1918)'],
      ['Path', 'Entered the Jiangnan Naval Academy at 18; went to Japan on a government scholarship at 22 to study medicine, then turned to literature to change the national spirit'],
      ['Style', 'Fiction that "exposes the illness to prompt a cure"; sharp, critical essays'],
      ['Works', 'Call to Arms, Wandering; Dawn Blossoms Plucked at Dusk, Wild Grass; A Brief History of Chinese Fiction']
    ]
  },
  background: {
    zh: ['光緒三十一年（1905）清廷頒布停止科舉的詔令，舊式讀書人頓失出路。', '〈孔乙己〉寫於 1918 年冬，1919 年 4 月發表於《新青年》，後收入《吶喊》。', '故事由「我」倒敘二十多年前在魯鎮咸亨酒店當小伙計的見聞，時空背景為清末民初；魯鎮是魯迅以故鄉紹興為藍本虛構的地名。', '本文既描寫腐舊思想（科舉思想）對讀書人的戕害，也暴露社會大眾的冷漠無情；主旨在揭露社會的腐舊與涼薄。'],
    en: ['In 1905 the Qing court abolished the imperial exams, leaving countless scholars without a future.', '"Kong Yiji" was written in winter 1918 and published in New Youth in April 1919, later collected in Call to Arms.', 'The narrator looks back more than twenty years to his boyhood at the Xianheng Tavern in Luzhen (late Qing / early Republic); Luzhen is modelled on Lu Xun\'s hometown, Shaoxing.', 'The story attacks the exam system\'s damage to scholars and exposes society\'s coldness toward the weak.']
  },
  tips: [
    { icon: '👀', zh: '看細節：衣著、錢、姿態怎麼變化？', en: 'Watch details: how do clothes, money and posture change?' },
    { icon: '👂', zh: '聽語氣：誰滿口之乎者也？誰只談欠帳？', en: 'Listen to tone: who speaks classically? who only talks debts?' },
    { icon: '⚖️', zh: '找對比：前後、人我、笑聲與冷漠。', en: 'Find contrasts: before/after, self/others, laughter/indifference.' },
    { icon: '🧒', zh: '想敘事者：為什麼用孩子的眼睛來說？', en: 'Think about the narrator: why tell it through a child\'s eyes?' }
  ],
  story: [
    { zh: '初登場：站著喝酒而穿長衫，排出九文大錢', en: 'First visit: a long gown, drinking standing, lays out nine coppers' },
    { zh: '教小伙計「我」：茴香豆的茴字，有四樣寫法', en: 'Teaching the boy: the "hui" in aniseed beans has four forms' },
    { zh: '中秋過後：腿被打折，盤著兩腿、用手走來', en: 'After Mid-Autumn: legs broken, he comes in on his hands' },
    { zh: '年關到次年：粉板仍記著「欠十九個錢」', en: 'New Year and beyond: the board still says "owes nineteen coppers"' }
  ],
  summary: {
    zh: '魯鎮咸亨酒店裡，短衣幫站在櫃外喝酒，穿長衫的坐進裡屋。孔乙己是「站著喝酒而穿長衫的唯一的人」：讀過書卻沒考上秀才，又不會營生，只能替人抄書，偶爾偷書而被打。他滿口之乎者也，成為眾人取笑的對象，只有在孩子面前才顯出一點善意。後來他偷到丁舉人家，被打斷了腿，最後一次用手「走」來店裡喝酒，從此再也沒有出現——「大約孔乙己的確死了」。',
    en: 'At the Xianheng Tavern, labourers drink standing outside the counter while long-gowned gentlemen sit inside. Kong Yiji is "the only long-gowned customer who drank standing": educated but never passing even the first exam, unable to make a living, he copies books and sometimes steals them. Mocked by everyone, he shows kindness only to children. After stealing from Juren Ding his legs are broken; he "walks" in on his hands for one last bowl and is never seen again — "probably Kong Yiji really is dead."'
  }
};

/* 酒店空間圖熱點 */
const TAVERN = [
  { id: 'counter', x: 50, y: 52, icon: '🪵', zh: '曲尺形大櫃檯', en: 'L-shaped counter',
    q: { zh: '「魯鎮的酒店的格局……都是當街一個曲尺形的大櫃檯，櫃裡面預備著熱水，可以隨時溫酒。」', en: '"The taverns in Luzhen… had a large L-shaped counter facing the street, with hot water ready to warm wine."' },
    a: { zh: '櫃檯像一道界線，把顧客分成櫃外與屋內兩個世界，也就是兩種社會階層。', en: 'The counter is a boundary dividing customers into two worlds — two social classes.' } },
  { id: 'short', x: 18, y: 74, icon: '👷', zh: '短衣幫（櫃外站著喝）', en: 'Short-coated labourers (standing)',
    q: { zh: '「做工的人，傍午傍晚散了工，每每花四文銅錢，買一碗酒……靠櫃外站著，熱熱的喝了休息。」', en: '"Working men… spent four coppers on a bowl of wine… stood outside the counter, drinking it hot."' },
    a: { zh: '短衣代表勞動階層，經濟拮据，只能站著喝。', en: 'Short coats mark labourers with little money; they drink standing.' } },
  { id: 'long', x: 82, y: 22, icon: '🎩', zh: '長衫主顧（隔壁房坐喝）', en: 'Long-gowned patrons (seated inside)',
    q: { zh: '「只有穿長衫的，才踱進店面隔壁的房子裡，要酒要菜，慢慢地坐喝。」', en: '"Only those in long gowns strolled into the room next door, ordered wine and dishes, and sat drinking slowly."' },
    a: { zh: '長衫象徵讀書人與有錢階層，「踱」字寫出從容與身分。', en: 'Long gowns mean scholars and the well-off; "strolled" shows their ease and status.' } },
  { id: 'kong', x: 46, y: 80, icon: '🧥', zh: '孔乙己（站著＋長衫）', en: 'Kong Yiji (standing + gown)',
    q: { zh: '「孔乙己是站著喝酒而穿長衫的唯一的人。」', en: '"Kong Yiji was the only long-gowned customer who drank standing."' },
    a: { zh: '全文的「文眼」：他放不下讀書人的身分（長衫），經濟上卻與短衣幫無異（站著），兩邊都不接納他。', en: 'The key line: he clings to scholarly status (gown) yet is as poor as labourers (standing) — accepted by neither side.' } },
  { id: 'board', x: 70, y: 40, icon: '📋', zh: '粉板（記帳）', en: 'Chalk board (debts)',
    q: { zh: '「孔乙己還欠十九個錢呢！」', en: '"Kong Yiji still owes nineteen coins!"' },
    a: { zh: '粉板上的十九個錢，是掌櫃唯一記得的「孔乙己」——人被化約成一筆帳。', en: 'The nineteen coins on the board are all the shopkeeper remembers — a man reduced to a debt.' } },
  { id: 'boy', x: 34, y: 36, icon: '🧒', zh: '小伙計「我」（溫酒）', en: 'The boy "I" (warming wine)',
    q: { zh: '「我從此便整天的站在櫃檯裡，專管我的職務……只有孔乙己到店，才可以笑幾聲。」', en: '"From then on I stood behind the counter all day… only when Kong Yiji came could I laugh a little."' },
    a: { zh: '涉世未深的小伙計既是在場者也是旁觀者，讓故事得以客觀呈現；但他也「附和著笑」，可見冷漠已感染到孩子。', en: 'The twelve-year-old narrator watches with a child\'s numb innocence, deepening the sense of coldness.' } },
  { id: 'jar', x: 14, y: 30, icon: '🏺', zh: '酒罈（羼水）', en: 'Wine jar (watered down)',
    q: { zh: '「他們往往要親眼看著黃酒從罈子裡舀出，看過壺子底裡有水沒有，又親看將壺子放在熱水裡，然後放心：在這嚴重監督下，羼水也很為難。」', en: '"Ladling wine from the jar, they checked the bottom of the pot for water… under such scrutiny, watering it down was hard."' },
    a: { zh: '短衣主顧嚴格監督（「嚴重」此指嚴格），想羼水也難，寫出人與人之間互不信任；小伙計因此被改派專管溫酒。', en: 'The shopkeeper waters wine, customers watch — a world of distrust and petty calculation.' } }
];

/* 人物關係 */
const PEOPLE = [
  { id: 'kong', ch: '孔', x: 50, y: 50, color: '#6f7f94', zh: '孔乙己', en: 'Kong Yiji',
    d: { zh: '讀書而未進學的落魄文人。好喝懶做、偶爾偷竊，卻也從不拖欠酒錢、對孩子和善。迂腐、自尊又可憐。', en: 'A failed scholar. Lazy and sometimes thieving, yet never late with his tab and kind to children. Pedantic, proud and pitiable.' }, rel: { zh: '核心人物', en: 'Centre' } },
  { id: 'zhang', ch: '掌', x: 18, y: 18, color: '#c2410c', zh: '掌櫃', en: 'Shopkeeper',
    d: { zh: '只記得欠帳的生意人，聽到孔乙己被打斷腿也只追問「後來怎麼樣？」。', en: 'A businessman who remembers only debts; told of the beating he just asks "And then?"' }, rel: { zh: '只認錢：十九個錢', en: 'Only money: 19 coins' } },
  { id: 'ke', ch: '客', x: 82, y: 18, color: '#4f46e5', zh: '短衣幫酒客', en: 'Customers',
    d: { zh: '以揭孔乙己的傷疤取樂，「店內外充滿了快活的空氣」。代表冷漠的「看客」。', en: 'They mock his scars for fun — "the whole tavern was merry." Symbol of cold onlookers.' }, rel: { zh: '取笑、揭短', en: 'Mocking' } },
  { id: 'wo', ch: '我', x: 18, y: 82, color: '#0d9488', zh: '小伙計「我」', en: 'The boy "I"',
    d: { zh: '十二歲起在店裡當伙計的敘事者。孔乙己要考他「茴」字怎麼寫，他心想：「討飯一樣的人，也配考我麼？」孔乙己熱心教字，他也不耐煩地走開。', en: 'The 12-year-old narrator. Kong Yiji offers to teach him; he sneers, "A beggar — fit to test me?"' }, rel: { zh: '輕視、旁觀', en: 'Scorn, watching' } },
  { id: 'kids', ch: '童', x: 82, y: 82, color: '#db2777', zh: '鄰舍孩子', en: 'Neighbour children',
    d: { zh: '孔乙己分給他們茴香豆，一人一顆——全文唯一流露溫情的時刻。', en: 'He gives them one aniseed bean each — the story\'s only moment of warmth.' }, rel: { zh: '分豆的溫情', en: 'Shared beans' } },
  { id: 'ding', ch: '丁', x: 50, y: 8, color: '#7c3aed', zh: '丁舉人', en: 'Juren Ding',
    d: { zh: '有功名的舉人。孔乙己偷到他家，「先寫服辯，後來是打，打了大半夜，再打折了腿」。同為讀書人卻濫用私刑，代表科舉制度中的勝利者與權力者。', en: 'A degree holder. Kong Yiji steals from him and is beaten all night until his legs break — power inside the exam system.' }, rel: { zh: '施暴、權勢', en: 'Violence, power' } },
  { id: 'he', ch: '何', x: 50, y: 92, color: '#0891b2', zh: '何家', en: 'The He family',
    d: { zh: '孔乙己曾偷何家的書，被「吊著打」。', en: 'He once stole their books and was "strung up and beaten."' }, rel: { zh: '偷書被打', en: 'Beaten for books' } }
];

/* 情節時間軸 */
const TIMELINE = [
  { t: { zh: '出場', en: 'Entrance' }, fall: 25, pose: 'stand', money: 9,
    look: { zh: '高大、青白臉、傷痕、花白鬍子；長衫又髒又破', en: 'Tall, pale, scarred, grizzled beard; filthy torn gown' },
    pay: { zh: '排出九文大錢', en: 'Lays out nine coppers' },
    q: { zh: '「溫兩碗酒，要一碟茴香豆。」', en: '"Warm two bowls of wine, and a dish of beans."' },
    a: { zh: '「排」的動作緩慢從容，是在宣告「我有九文大錢，一文都不少」，維護尊嚴，也掩飾內心的自卑。', en: '"Lays out" shows him trying to look respectable.' } },
  { t: { zh: '偷書被嘲', en: 'Mocked for theft' }, fall: 40, pose: 'stand', money: 9,
    look: { zh: '漲紅了臉，額上青筋條條綻出', en: 'Face flushed, veins bulging on his forehead' },
    pay: { zh: '從不拖欠，記在粉板上不出一月定然還清', en: 'Never late; tab cleared within a month' },
    q: { zh: '「竊書不能算偷……讀書人的事，能算偷麼？」', en: '"Taking books isn\'t stealing…"' },
    a: { zh: '自欺欺人的強辯，以維持自己的尊嚴；接著又說「君子固窮」等難懂的話，引得眾人哄笑。', en: 'Theft and pride side by side; his classical self-defence draws laughter.' } },
  { t: { zh: '教茴字', en: 'Teaching 茴' }, fall: 45, pose: 'stand', money: 9,
    look: { zh: '用指甲蘸了酒，想在櫃上寫字', en: 'Dips a fingernail in wine to write on the counter' },
    pay: { zh: '—', en: '—' },
    q: { zh: '「回字有四樣寫法，你知道麼？」', en: '"Did you know 回 has four forms?"' },
    a: { zh: '孔乙己的懇切熱心，與小伙計的不耐煩形成強烈對比；他只能「嘆一口氣，顯出極惋惜的樣子」。', en: 'His kindness is coldly refused; he looks "very regretful."' } },
  { t: { zh: '分茴香豆', en: 'Sharing beans' }, fall: 45, pose: 'stand', money: 9,
    look: { zh: '伸開五指將碟子罩住，彎腰說話', en: 'Covers the dish with spread fingers, bending to speak' },
    pay: { zh: '—', en: '—' },
    q: { zh: '「不多不多！多乎哉？不多也。」', en: '"Not many! Many? Not many indeed."' },
    a: { zh: '可見他雖落魄、迂腐，仍有一顆善良的心；想與孩子分享卻又無法真正大方，困窘之態可見。', en: 'The warmest scene: generous to children, yet down to a few beans.' } },
  { t: { zh: '被打斷腿', en: 'Legs broken' }, fall: 80, pose: 'none', money: 0,
    look: { zh: '（未出場，只在酒客口中）', en: '(Off-stage, only in gossip)' },
    pay: { zh: '欠十九個錢', en: 'Owes nineteen coins' },
    q: { zh: '「他總仍舊是偷。這一回，是自己發昏，竟偷到丁舉人家裡去了。」', en: '"He kept stealing. This time he was fool enough to rob Juren Ding."' },
    a: { zh: '他的苦難只成為酒客與掌櫃的閒談材料。', en: 'His suffering is mere gossip for drinkers and shopkeeper.' } },
  { t: { zh: '最後一次', en: 'Last visit' }, fall: 95, pose: 'sit', money: 4,
    look: { zh: '黑而且瘦，穿破夾襖，盤著兩腿坐在蒲包上', en: 'Dark and gaunt, in a torn jacket, sitting cross-legged on a rush mat' },
    pay: { zh: '摸出四文大錢', en: 'Fumbles out four coppers' },
    q: { zh: '「跌斷，跌，跌……」', en: '"Broke them in a fall, fell, fell…"' },
    a: { zh: '「摸」對照「排」；長衫換成破夾襖；他「用這手走來的」——在新舊交替的時代中，既不能「坐」也不能「站」，只能「爬」。', en: '"Fumble" versus "lay out"; gown turned to rags; he "walked here on his hands."' } },
  { t: { zh: '結局', en: 'Ending' }, fall: 100, pose: 'none', money: 0,
    look: { zh: '再也沒有出現', en: 'Never seen again' },
    pay: { zh: '年關、第二年端午仍說欠十九個錢，到中秋卻沒有說', en: 'Debt mentioned at New Year and Dragon Boat, then forgotten' },
    q: { zh: '「我到現在終於沒有見——大約孔乙己的確死了。」', en: '"Probably Kong Yiji really is dead."' },
    a: { zh: '「大約」是無人確知，「的確」是推斷必然——一個人的消失無聲無息。', en: '"Probably" — no one knows; "really" — it must be so. A life vanishes unnoticed.' } }
];

/* 對比翻牌 */
const CONTRAST = [
  { a: { zh: '排出九文大錢', en: 'Lays out 9 coppers' }, b: { zh: '摸出四文大錢', en: 'Fumbles out 4 coppers' },
    n: { zh: '「排」是炫耀，「摸」是窘迫；錢由九文變四文，地位一落千丈。', en: '"Lay out" shows off; "fumble" shows distress.' } },
  { a: { zh: '穿長衫', en: 'Long gown' }, b: { zh: '穿破夾襖', en: 'Torn jacket' },
    n: { zh: '讀書人的身分象徵最後也失去了。', en: 'Even the badge of scholarship is lost.' } },
  { a: { zh: '站著喝酒', en: 'Drinks standing' }, b: { zh: '坐在蒲包上，用手走', en: 'Sits on a mat, walks on hands' },
    n: { zh: '連「站著」的尊嚴也被剝奪。', en: 'Even the dignity of standing is taken.' } },
  { a: { zh: '滿口之乎者也', en: 'Classical phrases' }, b: { zh: '「跌斷，跌，跌……」', en: '"Fell, fell…"' },
    n: { zh: '從賣弄文言到語不成句，精神也被擊垮。', en: 'From showy rhetoric to broken words — his spirit crushed.' } },
  { a: { zh: '店內外充滿快活的空氣', en: 'The tavern was merry' }, b: { zh: '沒有他，別人也便這麼過', en: 'Without him, life went on' },
    n: { zh: '他只是眾人取樂的工具，存在與否無人在乎。', en: 'He is only entertainment; no one cares if he exists.' } },
  { a: { zh: '大約', en: 'Probably' }, b: { zh: '的確', en: 'Really' },
    n: { zh: '看似矛盾的並置：沒人確知他的死，但人人都相信他必死。', en: 'A paradox: no one knows, yet everyone is sure.' } }
];

/* 回字四寫 */
const HUI = [
  { c: '回', zh: '今日通行的寫法', en: 'The standard form today' },
  { c: '囘', zh: '常見寫法之二（異體字）', en: 'Second common form (variant)' },
  { c: '囬', zh: '常見寫法之三（異體字）', en: 'Third common form (variant)' },
  { c: '？', zh: '第四種寫法：見《康熙字典・備考》，極少見，一般字型無法顯示', en: 'Fourth form: in the Kangxi Dictionary appendix — so rare that ordinary fonts cannot display it' }
];

/* 旁觀者情境抉擇 */
const SCENE = {
  q: { zh: '你是咸亨酒店的小伙計。酒客又在揭孔乙己的傷疤，全店哄堂大笑，孔乙己漲紅了臉……你會怎麼做？', en: 'You are the tavern boy. Customers mock Kong Yiji\'s scars, everyone roars, and he flushes red… What do you do?' },
  opts: [
    { icon: '😆', zh: '跟著大家一起笑', en: 'Laugh along', heart: 0, fb: { zh: '笑聲很容易傳染，但被笑的人會更孤單。想一想：如果被笑的是你呢？', en: 'Laughter spreads easily, but it isolates the target. What if it were you?' } },
    { icon: '🤐', zh: '默不作聲，繼續溫酒', en: 'Stay silent', heart: 1, fb: { zh: '沉默很常見，但旁觀也是一種選擇。魯迅筆下的「看客」正是如此。', en: 'Silence is common, but standing by is a choice — Lu Xun\'s "onlookers."' } },
    { icon: '🔄', zh: '轉移話題，替他解圍', en: 'Change the subject', heart: 3, fb: { zh: '你用一個小行動保住了他的尊嚴——勇敢又溫柔的「挺身者」。', en: 'A small act that protected his dignity — a brave, kind upstander.' } },
    { icon: '🤝', zh: '事後私下關心他', en: 'Check on him later', heart: 3, fb: { zh: '私下的一句問候，常是一個人最需要的溫暖。', en: 'A private kind word is often what someone needs most.' } },
    { icon: '🙋', zh: '請掌櫃制止大家', en: 'Ask the shopkeeper to stop it', heart: 2, fb: { zh: '懂得尋求協助是負責任的選擇；即使大人不一定回應，你仍表明了立場。', en: 'Seeking help is responsible; even if adults don\'t respond, you took a stand.' } }
  ]
};

/* 科舉階梯 */
const EXAM = [
  { n: { zh: '童生', en: 'Tongsheng' }, d: { zh: '尚未考取秀才的讀書人。孔乙己終其一生停在這裡——「連半個秀才也撈不到」。', en: 'A candidate who has not passed the first exam. Kong Yiji never rose beyond this.' }, kong: true },
  { n: { zh: '秀才（生員）', en: 'Xiucai' }, d: { zh: '童生參加童試考取生員（也稱秀才），入府學或縣學修習學業，稱為「進學」。', en: 'Passing the prefectural exam ("entering school") brought basic gentry status.' } },
  { n: { zh: '舉人', en: 'Juren' }, d: { zh: '通過省級鄉試，可候補做官，地方上的權勢人物——如丁舉人。', en: 'Passing the provincial exam; eligible for office; local power — like Juren Ding.' } },
  { n: { zh: '進士', en: 'Jinshi' }, d: { zh: '通過會試、殿試，是科舉最高功名。', en: 'Passing the metropolitan and palace exams — the highest degree.' } }
];

/* 進階延伸 */
const ADV = [
  { id: 'exam', icon: '🏛️', color: '#7c3aed', zh: '科舉制度與孔乙己', en: 'The exam system and Kong Yiji', widget: 'exam',
    body: { zh: '科舉是孔乙己唯一認得的人生道路。他「讀過書，但終於沒有進學，又不會營生」，於是愈過愈窮。點選下方階梯，看看他卡在哪一層，而打斷他雙腿的丁舉人又在哪一層。1905 年科舉廢除，像孔乙己這樣的人更是徹底被時代拋棄。', en: 'The exams were the only path Kong Yiji knew. "He had studied but never passed, and could not earn a living." Tap the ladder to see where he was stuck — and where Juren Ding stood. After 1905, men like him were abandoned by history.' } },
  { id: 'narr', icon: '🧒', color: '#0d9488', zh: '敘事視角：孩子的眼睛', en: 'Narration: a child\'s eyes',
    body: { zh: '本文採第一人稱（配角觀點），由酒店小伙計追憶二十多年前的往事：先倒敘寫孔乙己第一次出場，再插敘「聽人家背地裡談論」交代他的出身，接著順敘其他三次出場，最後以「大約孔乙己的確死了」收束。\n小伙計涉世未深，既是在場者又是旁觀者，不帶成人社會勢利的眼光，可如實而客觀地描述，避免流於作者主觀批判；但連他也覺得「只有孔乙己到店，才可以笑幾聲」、心想「討飯一樣的人，也配考我麼？」，可見社會的冷漠已感染單純的孩子。', en: 'The adult narrator recalls what he saw at twelve. The child feels no pity — "only when Kong Yiji came could I laugh." This innocent coldness is more chilling than adult mockery, and the calm final line leaves readers to feel the sorrow themselves.' } },
  { id: 'crowd', icon: '👥', color: '#db2777', zh: '看客文化與棄醫從文', en: 'Onlookers and Lu Xun\'s turn to literature',
    body: { zh: '魯迅在〈吶喊・自序〉中回憶：在日本仙台學醫時，看到幻燈片裡一群中國人圍觀同胞被處決，神情麻木。他因而認為醫治精神比醫治身體更重要，決定棄醫從文。咸亨酒店裡哄笑的酒客，正是這種「看客」的縮影。', en: 'In the preface to Call to Arms Lu Xun recalls seeing, as a medical student in Sendai, a slide of Chinese onlookers numbly watching a compatriot\'s execution. He decided curing minds mattered more than curing bodies. The laughing customers are such onlookers.' } },
  { id: 'fan', icon: '📜', color: '#c2410c', zh: '比較閱讀：〈范進中舉〉', en: 'Compare: "Fan Jin Passes the Exam"', widget: 'compare',
    body: { zh: '清代吳敬梓《儒林外史》中的范進，考了二十多次終於中舉，卻喜極而瘋；孔乙己則一生未進學而潦倒至死。兩篇都在諷刺科舉對讀書人的扭曲。', en: 'In Wu Jingzi\'s The Scholars, Fan Jin finally passes after twenty-odd tries and goes mad with joy; Kong Yiji never passes and dies destitute. Both satirise the exam system.' } },
  { id: 'nahan', icon: '📕', color: '#0891b2', zh: '《吶喊》名篇導覽', en: 'More from Call to Arms',
    body: { zh: '〈狂人日記〉：中國第一篇現代白話小說，控訴「吃人」的禮教。\n〈藥〉：以人血饅頭寫愚昧與革命者的寂寞。\n〈阿Q正傳〉：「精神勝利法」的經典形象。\n〈故鄉〉：閏土與「我」之間的隔閡與希望。\n〈社戲〉：童年鄉間看戲的溫暖記憶。', en: '"A Madman\'s Diary": the first modern vernacular story, attacking "cannibalistic" tradition.\n"Medicine": ignorance and the loneliness of revolutionaries.\n"The True Story of Ah Q": the "spiritual victory" archetype.\n"My Old Home": distance between the narrator and Runtu.\n"Village Opera": warm childhood memories.' } },
  { id: 'think', icon: '💡', color: '#f59e0b', zh: '思辨討論', en: 'Discussion', widget: 'discuss',
    body: { zh: '寫下你的看法，送出後會存入學習歷程。', en: 'Write your views; they will be saved to your portfolio.' } }
];

const DISCUSS = [
  { zh: '孔乙己的悲劇，是社會造成的，還是他自己造成的？請舉文中證據說明。', en: 'Is Kong Yiji\'s tragedy caused by society or by himself? Give textual evidence.' },
  { zh: '現代校園或網路上，是否也有「咸亨酒店式」的哄笑？我們可以怎麼做？', en: 'Is there "Xianheng-style" laughter at school or online today? What can we do?' },
  { zh: '如果你可以改寫結局，你會讓孔乙己遇到什麼樣的人？為什麼？', en: 'If you could rewrite the ending, whom would Kong Yiji meet, and why?' }
];

const COMPARE = {
  head: { zh: ['比較項目', '孔乙己', '范進'], en: ['Aspect', 'Kong Yiji', 'Fan Jin'] },
  rows: [
    { zh: ['出處', '魯迅《吶喊》', '吳敬梓《儒林外史》'], en: ['Source', 'Lu Xun, Call to Arms', 'Wu Jingzi, The Scholars'] },
    { zh: ['科舉結果', '始終未進學', '多次落第後中舉'], en: ['Exam result', 'Never passed', 'Passed after many failures'] },
    { zh: ['結局', '斷腿、消失，大約死了', '喜極而瘋，後被打醒'], en: ['Ending', 'Crippled, vanished, probably dead', 'Mad with joy, slapped back to sense'] },
    { zh: ['旁人態度', '取笑、冷漠', '中舉前鄙視，中舉後奉承'], en: ['Others', 'Mockery, indifference', 'Scorn before, flattery after'] },
    { zh: ['諷刺重點', '科舉失敗者被社會拋棄', '科舉成功者的扭曲與世態炎涼'], en: ['Satire', 'Failures discarded by society', 'Success distorts; fickle society'] }
  ]
};

/* 字詞卡 */
const WORDS = [
  ['傍午', 'ㄅㄤ ㄨˇ', '將近中午的時候。傍，臨近。', 'Nearly noon (傍: approaching).'],
  ['茴香豆', 'ㄏㄨㄟˊ ㄒㄧㄤ ㄉㄡˋ', '蠶豆加茴香、桂皮、食鹽煮成的下酒物。', 'Broad beans boiled with aniseed, cinnamon and salt, eaten with wine.'],
  ['短衣幫', 'ㄉㄨㄢˇ ㄧ ㄅㄤ', '穿短衣衫的人，此指做工的人。幫，同性質的一群人。', 'People in short coats — labourers.'],
  ['闊綽', 'ㄎㄨㄛˋ ㄔㄨㄛˋ', '豪華奢侈。', 'Lavish, well-off.'],
  ['踱', 'ㄉㄨㄛˋ', '慢步走路。', 'To stroll slowly.'],
  ['舀', 'ㄧㄠˇ', '用瓢、勺等器具汲取液體。', 'To ladle out liquid.'],
  ['羼水', 'ㄔㄢˋ ㄕㄨㄟˇ', '和水混雜在一起。羼，混雜。', 'Mixed with water (羼: to mix in).'],
  ['薦頭', 'ㄐㄧㄢˋ ㄊㄡˊ', '舊時以介紹佣工為業的人。', 'A person who found jobs for workers.'],
  ['描紅紙', 'ㄇㄧㄠˊ ㄏㄨㄥˊ ㄓˇ', '一種印有紅色楷體字的習字帖，供兒童練習毛筆字。', 'Tracing paper printed with red characters for children\'s brush practice.'],
  ['君子固窮', 'ㄐㄩㄣ ㄗˇ ㄍㄨˋ ㄑㄩㄥˊ', '君子窮困的時候，仍能堅守節操。固，堅守。語出《論語・衛靈公》。', 'A gentleman keeps his integrity in poverty (Analects).'],
  ['進學', 'ㄐㄧㄣˋ ㄒㄩㄝˊ', '明清科舉制度，童生參加童試考取生員（秀才），入府學或縣學修習學業。', 'Passing the county exam to become a xiucai.'],
  ['間或', 'ㄐㄧㄢˋ ㄏㄨㄛˋ', '偶爾、有時候。', 'Occasionally.'],
  ['粉板', 'ㄈㄣˇ ㄅㄢˇ', '油漆成白色的木板，舊時店鋪用來記事或記帳。', 'A white-painted board for notes and debts.'],
  ['置辯', 'ㄓˋ ㄅㄧㄢˋ', '申辯、反駁。', 'To argue back.'],
  ['頹唐', 'ㄊㄨㄟˊ ㄊㄤˊ', '委靡不振。在此有情緒低落之意。', 'Dispirited, downcast.'],
  ['蘸', 'ㄓㄢˋ', '沾。', 'To dip.'],
  ['多乎哉？不多也', 'ㄉㄨㄛ ㄏㄨ ㄗㄞ　ㄅㄨˋ ㄉㄨㄛ ㄧㄝˇ', '「多麼？不多啊！」之意。語出《論語・子罕》，此處表現孔乙己賣弄才學。', '"Many? Not many!" — from the Analects, showing off his learning.'],
  ['服辯', 'ㄈㄨˊ ㄅㄧㄢˋ', '又作「伏辯」，即認罪書。', 'A written confession.'],
  ['夾襖', 'ㄐㄧㄚˊ ㄠˇ', '用兩層布製成的上衣。襖，有襯裡的上衣。', 'A lined two-layer jacket.'],
  ['蒲包', 'ㄆㄨˊ ㄅㄠ', '用蒲草編成的袋子或坐墊。', 'A rush bag or mat.'],
  ['年關', 'ㄋㄧㄢˊ ㄍㄨㄢ', '年底。舊時農曆年底要把欠帳結清，過年如過關卡。', 'Year\'s end, when debts had to be settled.']
];

/* 題庫：type mc 選擇 / tf 是非；ans 為正確索引 */
const BANK = [
  { c: 'author', q: { zh: '〈孔乙己〉的作者魯迅，本名為何？', en: 'What was Lu Xun\'s real name?' }, o: { zh: ['周作人', '周樹人', '胡適', '周建人'], en: ['Zhou Zuoren', 'Zhou Shuren', 'Hu Shi', 'Zhou Jianren'] }, ans: 1, e: { zh: '魯迅本名周樟壽，後改名周樹人；周作人是他的弟弟。', en: 'Born Zhou Zhangshou, renamed Zhou Shuren; Zhou Zuoren was his brother.' } },
  { c: 'author', q: { zh: '〈孔乙己〉收錄在魯迅的哪一部小說集？', en: 'Which collection contains "Kong Yiji"?' }, o: { zh: ['《徬徨》', '《朝花夕拾》', '《吶喊》', '《故事新編》'], en: ['Wandering', 'Dawn Blossoms', 'Call to Arms', 'Old Tales Retold'] }, ans: 2, e: { zh: '〈孔乙己〉收入《吶喊》；《朝花夕拾》是散文集。', en: 'It is in Call to Arms; Dawn Blossoms is an essay collection.' } },
  { c: 'author', q: { zh: '魯迅決定「棄醫從文」，最主要的原因是什麼？', en: 'Why did Lu Xun give up medicine for literature?' }, o: { zh: ['醫學課程太難', '認為醫治國民精神比醫治身體更重要', '家中經濟困難', '想當報社記者'], en: ['Medicine was too hard', 'Healing minds mattered more than bodies', 'Family poverty', 'He wanted to be a reporter'] }, ans: 1, e: { zh: '幻燈片事件讓他感到國民精神麻木，決定以文藝改變精神。', en: 'The slide incident convinced him to change minds through literature.' } },
  { c: 'author', q: { zh: '清廷廢除科舉是在哪一年？', en: 'When were the imperial exams abolished?' }, o: { zh: ['1898 年', '1905 年', '1911 年', '1919 年'], en: ['1898', '1905', '1911', '1919'] }, ans: 1, e: { zh: '1905 年廢除科舉；1919 年是五四運動及〈孔乙己〉發表之年。', en: '1905; 1919 was the May Fourth year and the story\'s publication.' } },
  { c: 'plot', q: { zh: '咸亨酒店中，「短衣幫」通常如何喝酒？', en: 'How did the short-coated labourers drink?' }, o: { zh: ['坐在隔壁房裡慢慢喝', '靠櫃外站著喝', '把酒帶回家喝', '坐在門口台階喝'], en: ['Seated inside', 'Standing outside the counter', 'Took it home', 'On the doorstep'] }, ans: 1, e: { zh: '「靠櫃外站著，熱熱的喝了休息」。', en: '"Stood outside the counter, drinking it hot."' } },
  { c: 'plot', q: { zh: '「孔乙己」這個綽號是怎麼來的？', en: 'Where does the nickname "Kong Yiji" come from?' }, o: { zh: ['是他的本名', '取自描紅紙上「上大人孔乙己」', '掌櫃為他取的字號', '來自科舉榜單'], en: ['His real name', 'From the tracing-paper line "上大人孔乙己"', 'Given by the shopkeeper', 'From an exam list'] }, ans: 1, e: { zh: '因他姓孔，別人便從描紅紙上的話替他取了綽號，暗示他連真名都無人知曉。', en: 'Because his surname was Kong; no one even knew his real name.' } },
  { c: 'plot', q: { zh: '孔乙己最後被打斷腿，是因為偷了誰家的東西？', en: 'Whose house was he robbing when his legs were broken?' }, o: { zh: ['何家', '掌櫃家', '丁舉人家', '趙太爺家'], en: ['The He family', 'The shopkeeper\'s', 'Juren Ding\'s', 'Squire Zhao\'s'] }, ans: 2, e: { zh: '偷何家的書被吊著打；偷到丁舉人家才被打斷腿。', en: 'Beaten for the He family\'s books; legs broken at Juren Ding\'s.' } },
  { c: 'plot', q: { zh: '孔乙己最後一次到店，是怎麼來的？', en: 'How did Kong Yiji arrive on his last visit?' }, o: { zh: ['拄著拐杖走來', '由孩子攙扶而來', '坐著轎子來', '用手撐地「走」來'], en: ['On crutches', 'Helped by children', 'In a sedan chair', '"Walking" on his hands'] }, ans: 3, e: { zh: '「他是用這手走來的」，坐在蒲包上，用草繩掛在肩上。', en: '"He had walked here on his hands," sitting on a rush mat.' } },
  { c: 'plot', q: { zh: '孔乙己最後欠了酒店多少錢？', en: 'How much did Kong Yiji finally owe?' }, o: { zh: ['九文', '四文', '十九個錢', '二十個錢'], en: ['9', '4', '19 coins', '20 coins'] }, ans: 2, e: { zh: '掌櫃一再說「孔乙己還欠十九個錢呢！」', en: 'The shopkeeper keeps saying "He still owes nineteen coins!"' } },
  { c: 'char', q: { zh: '「孔乙己是站著喝酒而穿長衫的唯一的人」，主要表現什麼？', en: 'What does "the only long-gowned customer who drank standing" mainly show?' }, o: { zh: ['他喜歡站著喝比較暢快', '他經濟上像短衣幫，卻放不下讀書人身分', '他是酒店最受歡迎的客人', '長衫是酒店的制服'], en: ['He liked standing', 'Poor as labourers but clinging to scholar status', 'He was the favourite customer', 'Gowns were a uniform'] }, ans: 1, e: { zh: '「站著」與「長衫」的矛盾，就是他尷尬處境的縮影。', en: 'The contradiction sums up his awkward position.' } },
  { c: 'char', q: { zh: '下列哪一項最能表現孔乙己「善良」的一面？', en: 'Which best shows Kong Yiji\'s kindness?' }, o: { zh: ['排出九文大錢', '辯稱「竊書不能算偷」', '分茴香豆給鄰舍孩子', '說「君子固窮」'], en: ['Laying out nine coppers', '"Taking books isn\'t stealing"', 'Sharing beans with children', '"A gentleman stays firm in poverty"'] }, ans: 2, e: { zh: '他給孩子們茴香豆吃，一人一顆，也曾熱心教「我」寫字。', en: 'He gives each child a bean and offers to teach the boy.' } },
  { c: 'char', q: { zh: '掌櫃得知孔乙己被打斷腿，反應是？', en: 'How does the shopkeeper react to the news of the broken legs?' }, o: { zh: ['立刻去探望他', '替他抱不平', '只追問「後來怎麼樣？」', '免除他的欠帳'], en: ['Visits him', 'Is outraged', 'Just asks "And then?"', 'Forgives the debt'] }, ans: 2, e: { zh: '掌櫃把別人的苦難當閒話，仍只記得十九個錢。', en: 'He treats suffering as gossip and remembers only the debt.' } },
  { c: 'char', q: { zh: '孔乙己品行上「比別人都好」的地方是？', en: 'In what way was Kong Yiji\'s conduct "better than others"?' }, o: { zh: ['從不偷竊', '從不拖欠酒錢', '從不喝醉', '從不說謊'], en: ['Never stole', 'Never fell behind on his tab', 'Never got drunk', 'Never lied'] }, ans: 1, e: { zh: '「雖然間或沒有現錢……但不出一月，定然還清」。', en: '"Though sometimes short of cash… he always paid within a month."' } },
  { c: 'char', q: { zh: '孔乙己要考「我」茴字怎麼寫，「我」心裡想「討飯一樣的人，也配考我麼？」這表現什麼？', en: 'The boy thinks "A beggar — fit to test me?" What does this show?' }, o: { zh: ['「我」很謙虛', '連孩子也看不起孔乙己', '「我」已經會寫字', '孔乙己真的在討飯'], en: ['The boy is modest', 'Even a child scorns him', 'The boy can already write', 'Kong Yiji is begging'] }, ans: 1, e: { zh: '社會的歧視已深入孩子心中，更見冷漠。', en: 'Social contempt has reached even children.' } },
  { c: 'word', q: { zh: '「羼水」的意思是？', en: 'What does 羼水 mean?' }, o: { zh: ['溫酒', '和水混雜在一起', '倒掉酒', '加熱水洗碗'], en: ['Warming wine', 'Watering down wine', 'Pouring out wine', 'Washing bowls'] }, ans: 1, e: { zh: '羼，音ㄔㄢˋ，混雜。小伙計在短衣主顧的「嚴重監督」下，羼水也很為難。', en: '羼 (chàn) means to mix in.' } },
  { c: 'word', q: { zh: '「進學」在文中指的是？', en: 'What does 進學 mean in the story?' }, o: { zh: ['進入新式學堂', '考取秀才', '開始讀書識字', '當上教書先生'], en: ['Entering a modern school', 'Passing the first exam (xiucai)', 'Learning to read', 'Becoming a teacher'] }, ans: 1, e: { zh: '明清科舉制度，童生參加童試考取生員（也稱秀才），入府學或縣學修習學業，稱為進學。', en: 'In Ming–Qing times it meant becoming a xiucai.' } },
  { c: 'word', q: { zh: '「君子固窮」出自哪部經典？', en: 'Where does 君子固窮 come from?' }, o: { zh: ['《孟子》', '《論語》', '《老子》', '《詩經》'], en: ['Mencius', 'The Analects', 'Laozi', 'Book of Songs'] }, ans: 1, e: { zh: '出自《論語・衛靈公》。孔乙己用來掩飾窘境。', en: 'From the Analects; he uses it to cover his plight.' } },
  { c: 'word', q: { zh: '「頹唐」最接近哪個意思？', en: 'Which is closest to 頹唐?' }, o: { zh: ['精神委靡', '得意洋洋', '憤怒不平', '驚慌失措'], en: ['Dispirited', 'Smug', 'Angry', 'Panicked'] }, ans: 0, e: { zh: '被問「怎的連半個秀才也撈不到」後，他「臉上籠上了一層灰色」，顯得頹唐。', en: 'After the jibe about the degree, he turns grey and dispirited.' } },
  { c: 'tech', q: { zh: '從「排出九文大錢」到「摸出四文大錢」，主要運用什麼手法？', en: '"Lays out nine" vs "fumbles out four" — which technique?' }, o: { zh: ['誇飾', '前後對比', '譬喻', '倒裝'], en: ['Hyperbole', 'Contrast', 'Metaphor', 'Inversion'] }, ans: 1, e: { zh: '「排」是從容地宣告清白、維護尊嚴，「摸」是窘迫；動詞與錢數的前後對比，寫出他的窮途末路。', en: 'The verbs and numbers contrast pride with destitution.' } },
  { c: 'tech', q: { zh: '本文採用的敘事觀點是？', en: 'What point of view does the story use?' }, o: { zh: ['第一人稱主角觀點', '第一人稱配角觀點（小伙計追憶）', '第二人稱', '全知觀點'], en: ['First-person protagonist', 'First-person observer recalling the past', 'Second person', 'Omniscient third person'] }, ans: 1, e: { zh: '由酒店小伙計「我」追憶二十多年前的往事，是第一人稱配角觀點；他既是在場者，也是旁觀者。', en: 'The waiter boy recalls events twenty years earlier as an observer.' } },
  { c: 'tech', q: { zh: '「大約孔乙己的確死了」中「大約」與「的確」並用，效果為何？', en: 'What is the effect of "probably" and "really" together?' }, o: { zh: ['作者寫錯字', '表示孔乙己其實還活著', '無人確知其死，卻可推斷必死，凸顯冷漠', '強調掌櫃很關心他'], en: ['A mistake', 'He is actually alive', 'No one knows, yet his death is certain — showing indifference', 'The shopkeeper cared'] }, ans: 2, e: { zh: '矛盾並置寫出他死得無聲無息、無人在意。', en: 'The paradox shows he died unnoticed.' } },
  { c: 'tech', q: { zh: '文中多次寫眾人「哄笑」，主要用意是？', en: 'Why does the story repeatedly mention everyone laughing?' }, o: { zh: ['表現酒店氣氛歡樂可親', '以樂景寫哀，凸顯社會冷漠', '說明孔乙己很幽默', '增加故事笑點'], en: ['To show a happy tavern', 'Joyful scenes deepen sorrow; show coldness', 'Kong Yiji is funny', 'For comic relief'] }, ans: 1, e: { zh: '笑聲越熱鬧，越顯孔乙己的孤獨與眾人的麻木。', en: 'The louder the laughter, the lonelier he seems.' } },
  { c: 'theme', q: { zh: '下列何者「不是」〈孔乙己〉要批判的對象？', en: 'Which is NOT a target of the story\'s criticism?' }, o: { zh: ['科舉制度對讀書人的毒害', '社會對弱者的冷漠', '人與人之間的嘲弄', '孩子對長者的孝順'], en: ['Exams harming scholars', 'Indifference to the weak', 'Mockery', 'Children\'s filial piety'] }, ans: 3, e: { zh: '本文並未談孝順；前三者皆是批判重點。', en: 'Filial piety is not discussed.' } },
  { c: 'theme', q: { zh: '「孔乙己是這樣的使人快活，可是沒有他，別人也便這麼過。」說明什麼？', en: '"He made people merry, yet without him life went on." What does it show?' }, o: { zh: ['大家很想念他', '他只是眾人取樂的對象，無足輕重', '酒店生意變差', '他是酒店的靈魂人物'], en: ['Everyone missed him', 'He was mere entertainment, insignificant', 'Business suffered', 'He was the tavern\'s soul'] }, ans: 1, e: { zh: '一句話道盡他在社會中的位置：可有可無。', en: 'He was dispensable.' } },
  { c: 'char', q: { zh: '孔乙己面對嘲笑多半自圓其說，但哪一句話會讓他「立刻顯出頹唐不安模樣」？', en: 'Which jibe instantly leaves Kong Yiji crestfallen?' }, o: { zh: ['你臉上又添上新傷疤了', '你當真認識字麼', '你怎的連半個秀才也撈不到呢', '你一定又偷了人家的東西了'], en: ['New scars on your face', 'Can you really read?', 'How come you never got even half a degree?', 'You must have stolen again'] }, ans: 2, e: { zh: '被質問沒考上秀才是他最大的痛處；被問是否識字時，他反而「顯出不屑置辯的神氣」。', en: 'Failing the exam is his deepest wound; asked whether he can read, he looks disdainful instead.' } },
  { c: 'tech', q: { zh: '關於本文的敘述線索，下列何者正確？', en: 'Which describes the story\'s narrative order?' }, o: { zh: ['全篇順敘，從孔乙己出生寫起', '先倒敘追憶往事，再插敘「聽人家背地裡談論」交代孔乙己出身，接著順敘', '先寫結局，再全篇倒敘', '以書信體交錯敘述'], en: ['Strictly chronological from his birth', 'Flashback, then an inserted account from gossip, then chronological', 'Ending first, then all in reverse', 'Letters interwoven'] }, ans: 1, e: { zh: '全文以小伙計追憶二十多年前的往事寫起（倒敘），插敘他的出身與性格，再順敘其他三次出場。', en: 'Flashback frame, inserted background, then chronological scenes.' } },
  { c: 'word', q: { zh: '依課本注釋，「回」字通常有幾種寫法？', en: 'Per the textbook note, how many common forms does 回 have?' }, o: { zh: ['一種', '兩種', '三種，第四種極少見', '四種皆很常見'], en: ['One', 'Two', 'Three; a fourth is very rare', 'Four, all common'] }, ans: 2, e: { zh: '回字通常只有回、囘、囬三種寫法，第四種見《康熙字典・備考》，極少見。', en: 'Usually 回, 囘, 囬; the fourth (Kangxi appendix) is very rare.' } },
  { c: 'tf', type: 'tf', q: { zh: '孔乙己是酒店中唯一穿長衫卻站著喝酒的人。', en: 'Kong Yiji was the only gowned customer who drank standing.' }, ans: 0, e: { zh: '正確，這是全文的關鍵句。', en: 'True — the key line.' } },
  { c: 'tf', type: 'tf', q: { zh: '孔乙己最後考上了秀才，生活逐漸好轉。', en: 'Kong Yiji finally passed the exam and his life improved.' }, ans: 1, e: { zh: '錯誤，他「連半個秀才也撈不到」，最後大約死了。', en: 'False — he never passed and probably died.' } },
  { c: 'tf', type: 'tf', q: { zh: '「我」在咸亨酒店從十二歲起當小伙計。', en: 'The narrator began working at the tavern at twelve.' }, ans: 0, e: { zh: '正確，「我從十二歲起，便在鎮口的咸亨酒店裡當伙計」。', en: 'True.' } },
  { c: 'tf', type: 'tf', q: { zh: '掌櫃在孔乙己斷腿後，主動免除他的欠款。', en: 'The shopkeeper forgave his debt after the injury.' }, ans: 1, e: { zh: '錯誤，掌櫃仍說「你還欠十九個錢呢！」', en: 'False — he still demanded the nineteen coins.' } },
  { c: 'tf', type: 'tf', q: { zh: '〈孔乙己〉是以白話文寫成的現代小說。', en: '"Kong Yiji" is a modern story in vernacular Chinese.' }, ans: 0, e: { zh: '正確，是五四時期的白話小說。', en: 'True — a May Fourth vernacular story.' } },
  { c: 'tf', type: 'tf', q: { zh: '孔乙己教「我」寫字時，「我」十分感激並認真學習。', en: 'The boy gratefully learned when Kong Yiji taught him.' }, ans: 1, e: { zh: '錯誤，「我」不耐煩地回答，愛理不理。', en: 'False — the boy answered impatiently.' } }
];

const CATS = {
  author: { zh: '作者背景', en: 'Author' }, plot: { zh: '情節', en: 'Plot' }, char: { zh: '人物', en: 'Character' },
  word: { zh: '字詞', en: 'Words' }, tech: { zh: '寫作手法', en: 'Technique' }, theme: { zh: '主旨', en: 'Theme' }, tf: { zh: '是非題', en: 'True/False' }
};

/* 反思選項 */
const MOODS = [['😄', '開心', 'Happy'], ['🤔', '好奇', 'Curious'], ['😌', '平靜', 'Calm'], ['😢', '難過', 'Sad'], ['😤', '憤慨', 'Indignant'], ['💪', '有收穫', 'Fulfilled']];

const BADGES = [
  { id: 'first',    icon: '🎉', zh: '踏進咸亨', en: 'Through the door', d: { zh: '第一次開啟學習網站', en: 'Opened the site' } },
  { id: 'explorer', icon: '🗺️', zh: '細節偵探', en: 'Detail detective', d: { zh: '完成 4 個視覺化元件', en: 'Used 4 visual tools' } },
  { id: 'ear',      icon: '👂', zh: '聽聲辨人', en: 'Sharp ear', d: { zh: '對話遊戲得分 ≥ 500', en: 'Game score ≥ 500' } },
  { id: 'scholar',  icon: '📚', zh: '用功學子', en: 'Diligent', d: { zh: '練習累計 30 題', en: 'Practised 30 items' } },
  { id: 'ace',      icon: '🏆', zh: '單元高手', en: 'Unit ace', d: { zh: '測驗 90 分以上', en: 'Quiz ≥ 90' } },
  { id: 'heart',    icon: '💗', zh: '溫柔挺身者', en: 'Kind upstander', d: { zh: '情境抉擇選擇伸出援手', en: 'Chose to help in the scenario' } },
  { id: 'thinker',  icon: '💡', zh: '思辨者', en: 'Thinker', d: { zh: '送出一則思辨討論', en: 'Submitted a discussion' } },
  { id: 'complete', icon: '🌟', zh: '學習全制霸', en: 'All complete', d: { zh: '完成學習路徑 7 步驟', en: 'Finished all 7 steps' } }
];
