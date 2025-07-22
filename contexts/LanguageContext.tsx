import React, { createContext, ReactNode, useContext, useState } from "react";

export type Language = "en" | "ja" | "uz";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation dictionaries
const translations = {
  en: {
    // Header
    "header.jobList": "Job List",
    "header.selectedJobs": "Selected Jobs",
    "header.refusedJobs": "Refused Jobs",
    "header.chosenJobs": "Chosen Jobs",
    "header.profile": "Profile",
    "header.themeMode": "Theme Mode",
    "header.language": "Language",

    // Home Screen
    "home.allJobsCompleted": "All jobs checked!",
    "home.waitForNewJobs": "Please wait for new jobs to be added",

    // Common
    "common.pullToRefresh": "Pull to refresh",

    // Filter
    "filter.all": "All",
    "filter.pending": "Pending",
    "filter.chosen": "Chosen",
    "filter.refused": "Refused",
    "filter.sortBy": "Sort by:",
    "filter.desiredProfession": "Desired Profession",
    "filter.japaneseLevel": "Japanese Level",
    "filter.salaryRange": "Salary Range",
    "filter.commutingEase": "Commuting Ease",
    "filter.rating": "Rating",
    "filter.clearAll": "Clear All",
    "filter.applyFilters": "Apply Filters",
    "filter.bySalary": "By Salary",
    "filter.commutingTimeHome": "Commuting Time (from Home)",
    "filter.commutingTimeSchool": "Commuting Time (from School)",
    "filter.byPublicationDate": "By Publication Date",
    "filter.adjustSalaryRange": "Use buttons below to adjust salary range:",

    // List Component
    "list.jobsCount": " jobs",
    "list.allStatuses": "All Statuses",
    "list.noJobsFound": "No jobs found",
    "list.noJobsForStatus": "No jobs for ",
    "list.jobDetails": "Job Details",
    "list.loading": "Loading...",

    // Swipe Actions
    "swipe.choose": "Choose",
    "swipe.refuse": "Refuse",

    // Professions
    "profession.sorting": "Sorting",
    "profession.delivery": "Delivery",
    "profession.cleaning": "Cleaning",
    "profession.cashier": "Cashier",
    "profession.warehouse": "Warehouse Work",
    "profession.cookingAssistant": "Cooking Assistant",
    "profession.dataEntry": "Data Entry",
    "profession.salesClerk": "Sales Clerk",
    "profession.officeAssistant": "Office Assistant",
    "profession.packing": "Packing Work",
    "profession.reception": "Reception",
    "profession.picking": "Picking",
    "profession.manufacturingAssistant": "Manufacturing Assistant",

    // Language names
    "language.english": "English",
    "language.japanese": "日本語",
    "language.uzbek": "O'zbek",

    // Profile Page
    "profile.edit": "Edit",
    "profile.save": "Save",
    "profile.age": "Age",
    "profile.homeStation": "Home Station",
    "profile.schoolStation": "School Station",
    "profile.postalCode": "Postal Code",
    "profile.selectPrefecture": "Please select prefecture",
    "profile.selectCity1": "Please select city 1",
    "profile.selectCity2": "Please select city 2",
    "profile.buildingName": "Building/Address",
    "profile.phoneNumber": "Phone Number",
    "profile.email": "Email Address",
    "profile.visaType": "Visa Type",
    "profile.validityPeriod": "Validity Period",
    "profile.residenceStatus": "Residence Status",
    "profile.changeSchedule": "Change Schedule",
    "profile.japaneseLevel": "Japanese Level",
    "profile.availableFromTime": "Available From",
    "profile.availableToTime": "Available To",
    "profile.currentOccupation": "Current Occupation/Student",
    "profile.desiredJobType": "Desired Job Type",
    "profile.workHistory": "Work History/Part-time Experience",
    "profile.other": "Other",

    // Profile Info Messages
    "profile.info.name":
      "Enter your full name as it appears on official documents.",
    "profile.info.age": "Choose your age from the list below.",
    "profile.info.country":
      "Choose your country of residence. This helps us provide location-specific information.",
    "profile.info.gender": "Select your gender",
    "profile.info.homeStation": "Choose your home station from the list below.",
    "profile.info.timeToHome":
      "Choose the number of minutes to your home station.",
    "profile.info.schoolStation":
      "Choose your school station from the list below.",
    "profile.info.timeToSchool":
      "Choose the number of minutes to your school station.",
    "profile.info.postalCode":
      "Enter your postal code. This helps us provide location-specific information.",
    "profile.info.prefecture": "Choose your prefecture from the list below.",
    "profile.info.city": "Select your city or town from the list below.",
    "profile.info.streetAddress":
      "Enter your street address, including building name if applicable.",
    "profile.info.phoneNumber": "Enter your phone number.",
    "profile.info.email":
      "Enter your email address for account verification and notifications.",
    "profile.info.visaType": "Choose your visa type from the list below.",
    "profile.info.residenceStatus":
      "Choose your Status of residence from the list below.",
    "profile.info.japaneseLevel":
      "Choose your Japanese language proficiency level from the list below.",
    "profile.info.availableDays":
      "Select the days you are available to work. You can choose multiple days.",
    "profile.info.availableFromTime": "Choose your available from time.",
    "profile.info.currentOccupation":
      "Enter your current occupation or student status.",
    "profile.info.desiredJobType": "Enter your desired job type.",
    "profile.info.workHistory":
      "Enter your work history and part-time job experience.",

    // Alert Messages
    "alert.error": "Error",
    "alert.success": "Success",
    "alert.noProfileData": "No profile data to export",
    "alert.pdfSavedTo": "PDF saved to: ",
    "alert.pdfGenerationFailed": "Failed to generate PDF. Please try again.",
    "alert.showUserInfo": "Show user info",

    // Contact Modal
    "contact.howToContact": "How would you like to contact?",
    "contact.phone": "Phone Call",
    "contact.email": "Email",
    "contact.chat": "Chat",
    "contact.job": "Job",
    "contact.emailSubject": "Regarding:",
  },
  ja: {
    // Header
    "header.jobList": "仕事一覧",
    "header.selectedJobs": "選択した仕事",
    "header.refusedJobs": "拒否した仕事",
    "header.chosenJobs": "選択した仕事",
    "header.profile": "プロフィール",
    "header.themeMode": "テーマモード",
    "header.language": "言語",

    // Home Screen
    "home.allJobsCompleted": "すべての仕事を確認しました！",
    "home.waitForNewJobs": "新しい仕事が追加されるまでお待ちください",

    // Common
    "common.pullToRefresh": "引っ張って更新",

    // Filter
    "filter.all": "全て",
    "filter.pending": "保留中",
    "filter.chosen": "選択済み",
    "filter.refused": "拒否済み",
    "filter.sortBy": "ソート順:",
    "filter.desiredProfession": "希望職種",
    "filter.japaneseLevel": "日本語レベル",
    "filter.salaryRange": "給与範囲",
    "filter.commutingEase": "通勤の容易さ",
    "filter.rating": "評価",
    "filter.clearAll": "すべてクリア",
    "filter.applyFilters": "フィルター適用",
    "filter.bySalary": "給与順",
    "filter.commutingTimeHome": "通勤時間（自宅から）",
    "filter.commutingTimeSchool": "通勤時間（学校から）",
    "filter.byPublicationDate": "掲載日順",
    "filter.adjustSalaryRange": "下のボタンで給与範囲を調整:",

    // List Component
    "list.jobsCount": " 件の仕事",
    "list.allStatuses": "全ステータス",
    "list.noJobsFound": "仕事が見つかりませんでした",
    "list.noJobsForStatus": "の仕事はありません",
    "list.jobDetails": "仕事詳細",
    "list.loading": "読み込み中...",

    // Swipe Actions
    "swipe.choose": "選択",
    "swipe.refuse": "拒否",

    // Professions
    "profession.sorting": "仕分け",
    "profession.delivery": "配送",
    "profession.cleaning": "清掃",
    "profession.cashier": "レジ",
    "profession.warehouse": "倉庫作業",
    "profession.cookingAssistant": "調理補助",
    "profession.dataEntry": "データ入力",
    "profession.salesClerk": "販売員",
    "profession.officeAssistant": "事務補助",
    "profession.packing": "梱包作業",
    "profession.reception": "受付",
    "profession.picking": "ピッキング",
    "profession.manufacturingAssistant": "製造補助",

    // Language names
    "language.english": "English",
    "language.japanese": "日本語",
    "language.uzbek": "O'zbek",

    // Profile Page
    "profile.edit": "編集",
    "profile.save": "保存",
    "profile.age": "年齢",
    "profile.homeStation": "自宅最寄り駅",
    "profile.schoolStation": "学校最寄り駅",
    "profile.postalCode": "郵便番号",
    "profile.selectPrefecture": "都道府県を選んでください",
    "profile.selectCity1": "市区町村1を選んでください",
    "profile.selectCity2": "市区町村2を選んでください",
    "profile.buildingName": "番地・建物名",
    "profile.phoneNumber": "電話番号",
    "profile.email": "メールアドレス",
    "profile.visaType": "ビザの種類",
    "profile.validityPeriod": "有効期間",
    "profile.residenceStatus": "在留資格",
    "profile.changeSchedule": "在留資格の変更予定",
    "profile.japaneseLevel": "日本語レベル",
    "profile.availableFromTime": "何時から",
    "profile.availableToTime": "何時まで",
    "profile.currentOccupation": "現在の職業/学生",
    "profile.desiredJobType": "希望の職種",
    "profile.workHistory": "過去の職歴・バイト歴",
    "profile.other": "その他",

    // Profile Info Messages
    "profile.info.name": "公式文書に記載されている正式名称を入力してください。",
    "profile.info.age": "以下のリストから年齢を選択してください。",
    "profile.info.country":
      "居住国を選択してください。地域固有の情報を提供するのに役立ちます。",
    "profile.info.gender": "性別を選択してください",
    "profile.info.homeStation":
      "以下のリストから自宅最寄り駅を選択してください。",
    "profile.info.timeToHome": "自宅最寄り駅までの分数を選択してください。",
    "profile.info.schoolStation":
      "以下のリストから学校最寄り駅を選択してください。",
    "profile.info.timeToSchool": "学校最寄り駅までの分数を選択してください。",
    "profile.info.postalCode":
      "郵便番号を入力してください。地域固有の情報を提供するのに役立ちます。",
    "profile.info.prefecture": "以下のリストから都道府県を選択してください。",
    "profile.info.city": "以下のリストから市区町村を選択してください。",
    "profile.info.streetAddress": "建物名を含む住所を入力してください。",
    "profile.info.phoneNumber": "電話番号を入力してください。",
    "profile.info.email":
      "アカウント確認と通知のためのメールアドレスを入力してください。",
    "profile.info.visaType": "以下のリストからビザの種類を選択してください。",
    "profile.info.residenceStatus":
      "以下のリストから在留資格を選択してください。",
    "profile.info.japaneseLevel":
      "以下のリストから日本語能力レベルを選択してください。",
    "profile.info.availableDays":
      "勤務可能な曜日を選択してください。複数選択可能です。",
    "profile.info.availableFromTime": "勤務可能開始時間を選択してください。",
    "profile.info.currentOccupation":
      "現在の職業または学生状況を入力してください。",
    "profile.info.desiredJobType": "希望する職種を入力してください。",
    "profile.info.workHistory": "職歴およびアルバイト経験を入力してください。",

    // Alert Messages
    "alert.error": "エラー",
    "alert.success": "成功",
    "alert.noProfileData": "エクスポートするプロフィールデータがありません",
    "alert.pdfSavedTo": "PDFが保存されました: ",
    "alert.pdfGenerationFailed":
      "PDFの生成に失敗しました。もう一度お試しください。",
    "alert.showUserInfo": "ユーザー情報を表示",

    // Contact Modal
    "contact.howToContact": "どのように連絡しますか？",
    "contact.phone": "電話",
    "contact.email": "メール",
    "contact.chat": "チャット",
    "contact.job": "仕事",
    "contact.emailSubject": "件名：",
  },
  uz: {
    // Header
    "header.jobList": "Ish ro'yxati",
    "header.selectedJobs": "Tanlangan ishlar",
    "header.refusedJobs": "Rad etilgan ishlar",
    "header.chosenJobs": "Tanlangan ishlar",
    "header.profile": "Profil",
    "header.themeMode": "Tema rejimi",
    "header.language": "Til",

    // Home Screen
    "home.allJobsCompleted": "Barcha ishlar ko'rib chiqildi!",
    "home.waitForNewJobs": "Yangi ishlar qo'shilguncha kuting",

    // Common
    "common.pullToRefresh": "Yangilash uchun torting",

    // Filter
    "filter.all": "Hammasi",
    "filter.pending": "Kutilmoqda",
    "filter.chosen": "Tanlangan",
    "filter.refused": "Rad etilgan",
    "filter.sortBy": "Saralash:",
    "filter.desiredProfession": "Istagan kasb",
    "filter.japaneseLevel": "Yapon tili darajasi",
    "filter.salaryRange": "Maosh diapazoni",
    "filter.commutingEase": "Ishga borish qulayligi",
    "filter.rating": "Reyting",
    "filter.clearAll": "Hammasini tozalash",
    "filter.applyFilters": "Filtrni qo'llash",
    "filter.bySalary": "Maosh bo'yicha",
    "filter.commutingTimeHome": "Ishga borish vaqti (uydan)",
    "filter.commutingTimeSchool": "Ishga borish vaqti (maktabdan)",
    "filter.byPublicationDate": "E'lon sanasi bo'yicha",
    "filter.adjustSalaryRange":
      "Maosh diapazonini sozlash uchun tugmalardan foydalaning:",

    // List Component
    "list.jobsCount": " ta ish",
    "list.allStatuses": "Barcha statuslar",
    "list.noJobsFound": "Hech qanday ish topilmadi",
    "list.noJobsForStatus": "uchun ishlar yo'q",
    "list.jobDetails": "Ish tafsilotlari",
    "list.loading": "Yuklanmoqda...",

    // Swipe Actions
    "swipe.choose": "Tanlash",
    "swipe.refuse": "Rad etish",

    // Professions
    "profession.sorting": "Saralash",
    "profession.delivery": "Yetkazib berish",
    "profession.cleaning": "Tozalash",
    "profession.cashier": "Kassir",
    "profession.warehouse": "Ombor ishi",
    "profession.cookingAssistant": "Oshpaz yordamchisi",
    "profession.dataEntry": "Ma'lumot kiritish",
    "profession.salesClerk": "Sotuvchi",
    "profession.officeAssistant": "Ofis yordamchisi",
    "profession.packing": "O'rash ishi",
    "profession.reception": "Qabulxona",
    "profession.picking": "Tanlash",
    "profession.manufacturingAssistant": "Ishlab chiqarish yordamchisi",

    // Language names
    "language.english": "English",
    "language.japanese": "日本語",
    "language.uzbek": "O'zbek",

    // Profile Page
    "profile.edit": "Tahrirlash",
    "profile.save": "Saqlash",
    "profile.age": "Yosh",
    "profile.homeStation": "Uy yaqinidagi stansiya",
    "profile.schoolStation": "Maktab yaqinidagi stansiya",
    "profile.postalCode": "Pochta indeksi",
    "profile.selectPrefecture": "Prefekturani tanlang",
    "profile.selectCity1": "1-shaharni tanlang",
    "profile.selectCity2": "2-shaharni tanlang",
    "profile.buildingName": "Bino/Manzil",
    "profile.phoneNumber": "Telefon raqami",
    "profile.email": "Elektron pochta manzili",
    "profile.visaType": "Viza turi",
    "profile.validityPeriod": "Amal qilish muddati",
    "profile.residenceStatus": "Yashash holati",
    "profile.changeSchedule": "O'zgartirish jadvali",
    "profile.japaneseLevel": "Yapon tili darajasi",
    "profile.availableFromTime": "Qachondan boshlab",
    "profile.availableToTime": "Qachongacha",
    "profile.currentOccupation": "Hozirgi kasb/Talaba",
    "profile.desiredJobType": "Istagan ish turi",
    "profile.workHistory": "Ish tajribasi/Part-time tajriba",
    "profile.other": "Boshqa",

    // Profile Info Messages
    "profile.info.name":
      "Rasmiy hujjatlarda ko'rsatilgan to'liq ismingizni kiriting.",
    "profile.info.age": "Quyidagi ro'yxatdan yoshingizni tanlang.",
    "profile.info.country":
      "Yashash mamlakatingizni tanlang. Bu bizga joyga xos ma'lumotlar taqdim etishga yordam beradi.",
    "profile.info.gender": "Jinsingizni tanlang",
    "profile.info.homeStation":
      "Quyidagi ro'yxatdan uy yaqinidagi stansiyani tanlang.",
    "profile.info.timeToHome":
      "Uy yaqinidagi stansiyagacha bo'lgan daqiqalar sonini tanlang.",
    "profile.info.schoolStation":
      "Quyidagi ro'yxatdan maktab yaqinidagi stansiyani tanlang.",
    "profile.info.timeToSchool":
      "Maktab yaqinidagi stansiyagacha bo'lgan daqiqalar sonini tanlang.",
    "profile.info.postalCode":
      "Pochta indeksingizni kiriting. Bu bizga joyga xos ma'lumotlar taqdim etishga yordam beradi.",
    "profile.info.prefecture": "Quyidagi ro'yxatdan prefekturangizni tanlang.",
    "profile.info.city":
      "Quyidagi ro'yxatdan shahar yoki qishlogingizni tanlang.",
    "profile.info.streetAddress":
      "Bino nomi bilan birga ko'cha manzilingizni kiriting.",
    "profile.info.phoneNumber": "Telefon raqamingizni kiriting.",
    "profile.info.email":
      "Hisobni tasdiqlash va bildirishnomalar uchun elektron pochta manzilingizni kiriting.",
    "profile.info.visaType": "Quyidagi ro'yxatdan viza turingizni tanlang.",
    "profile.info.residenceStatus":
      "Quyidagi ro'yxatdan yashash holatingizni tanlang.",
    "profile.info.japaneseLevel":
      "Quyidagi ro'yxatdan yapon tili malaka darajangizni tanlang.",
    "profile.info.availableDays":
      "Ishlash mumkin bo'lgan kunlarni tanlang. Bir nechta kunni tanlashingiz mumkin.",
    "profile.info.availableFromTime":
      "Ishlash mumkin bo'lgan boshlanish vaqtini tanlang.",
    "profile.info.currentOccupation":
      "Hozirgi kasb yoki talaba holingizni kiriting.",
    "profile.info.desiredJobType": "Istagan ish turingizni kiriting.",
    "profile.info.workHistory":
      "Ish tajribangiz va part-time ish tajribangizni kiriting.",

    // Alert Messages
    "alert.error": "Xato",
    "alert.success": "Muvaffaqiyat",
    "alert.noProfileData": "Eksport qilish uchun profil ma'lumotlari yo'q",
    "alert.pdfSavedTo": "PDF saqlandi: ",
    "alert.pdfGenerationFailed": "PDF yaratishda xatolik. Yana urinib ko'ring.",
    "alert.showUserInfo": "Foydalanuvchi ma'lumotlarini ko'rsatish",

    // Contact Modal
    "contact.howToContact": "Qanday aloqa qilmoqchisiz?",
    "contact.phone": "Telefon qo'ng'irog'i",
    "contact.email": "Email",
    "contact.chat": "Chat",
    "contact.job": "Ish",
    "contact.emailSubject": "Mavzu:",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ja"); // Default to Japanese

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage] as Record<string, string>;
    return translation[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
