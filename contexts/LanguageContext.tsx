import React, { createContext, ReactNode, useContext, useState } from "react";

export type Language = "en" | "ja" | "uz";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translateJobData: (data: any) => any;
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
    "header.newJobs": "New Jobs",

    // Home Screen
    "home.allJobsCompleted": "All jobs checked!",
    "home.waitForNewJobs": "Please wait for new jobs to be added",

    // Common
    "common.pullToRefresh": "Pull to refresh",
    "common.done": "Done",

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
    "filter.clearAll": "Clear",
    "filter.applyFilters": "Apply",
    "filter.bySalary": "By Salary",
    "filter.commutingTimeHome": "Commuting Time (from Home)",
    "filter.commutingTimeSchool": "Commuting Time (from School)",
    "filter.byPublicationDate": "By Publication Date",
    "filter.adjustSalaryRange": "Use buttons below to adjust salary range:",
    "filter.filters": "Filters",

    // Salary options
    "salary.hourly": "Hourly",
    "salary.daily": "Daily",
    "salary.weekly": "Weekly",
    "salary.monthly": "Monthly",
    "salary.selectTypeAndRange": "Select salary type and range:",
    "salary.selectRange": "Select Range",
    "salary.range": "Range",

    // Time options
    "time.5minutes": "~5 minutes",
    "time.10minutes": "~10 minutes",
    "time.15minutes": "~15 minutes",
    "time.20minutes": "~20 minutes",
    "time.30minutes": "~30 minutes",
    "time.45minutes": "~45 minutes",
    "time.60minutes": "~60 minutes",

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
    "profession.callCenter": "Call Center",
    "profession.security": "Security Guard",
    "profession.hotelCleaning": "Hotel Cleaning",
    "profession.translationAssistant": "Translation Assistant",
    "profession.serving": "Serving",
    "profession.itSupport": "IT Support",
    "profession.inspection": "Inspection Work",
    "profession.cafeStaff": "Cafe Staff",
    "profession.inventoryManagement": "Inventory Management",
    "profession.receptionGuide": "Reception & Guide",

    // Stations
    "station.shibuya": "Shibuya",
    "station.shinjuku": "Shinjuku",
    "station.ikebukuro": "Ikebukuro",
    "station.shinagawa": "Shinagawa",
    "station.ueno": "Ueno",
    "station.tokyo": "Tokyo",
    "station.akihabara": "Akihabara",
    "station.ginza": "Ginza",
    "station.yurakucho": "Yurakucho",
    "station.otemachi": "Otemachi",
    "station.shimbashi": "Shimbashi",
    "station.hamamatsucho": "Hamamatsucho",
    "station.kanda": "Kanda",
    "station.ebisu": "Ebisu",
    "station.roppongi": "Roppongi",
    "station.meguro": "Meguro",
    "station.omotesando": "Omotesando",
    "station.aoyamaItchome": "Aoyama-itchome",
    "station.akasakaMitsuke": "Akasaka-mitsuke",
    "station.tameikeSanno": "Tameike-sanno",
    "station.harajuku": "Harajuku",
    "station.yoyogi": "Yoyogi",
    "station.yotsuya": "Yotsuya",

    // Days of Week
    "day.monday": "Monday",
    "day.tuesday": "Tuesday",
    "day.wednesday": "Wednesday",
    "day.thursday": "Thursday",
    "day.friday": "Friday",
    "day.saturday": "Saturday",
    "day.sunday": "Sunday",

    // Japanese Language Levels
    "jlpt.n1": "N1",
    "jlpt.n2": "N2",
    "jlpt.n3": "N3",
    "jlpt.n4": "N4",
    "jlpt.n5": "N5",

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

    // Date options
    "date.today": "Today",
    "date.yesterday": "Yesterday",
    "date.last7Days": "Last 7 days",
    "date.last30Days": "Last 30 days",
    "date.thisMonth": "This month",
    "date.lastMonth": "Last month",

    // Watch List
    "watchList.title": "New Jobs",
    "watchList.newJobs": "Incoming Jobs",
    "watchList.noNewJobs": "No new jobs available",
    "watchList.checkBackLater": "Check back later for new opportunities",

    // Card Component Info
    "card.info.company": "Name of the company offering this job position",
    "card.info.position": "Job title and role description for this position",
    "card.info.salary": "Hourly or monthly salary range for this job",
    "card.info.languageSkill": "Required Japanese language proficiency level",
    "card.info.walkTime": "Walking time from nearest station to workplace",
    "card.info.station": "Nearest train station to the workplace",
    "card.info.schedule": "Working days and hours for this position",
    "card.info.rating": "Company rating based on employee reviews",

    // Field names for info modal
    "field.company": "Company",
    "field.position": "Position",
    "field.salary": "Salary",
    "field.languageSkill": "Language Skill",
    "field.walkTime": "Walk Time",
    "field.station": "Station",
    "field.rating": "Rating",
    "field.hours": "Hours",
    "field.schedule": "Schedule",
    "field.id": "ID",
    "field.age": "Age",
    "field.country": "Country",
    "field.location": "Location",
    "field.email": "Email",
    "field.phone": "Phone",
    "field.certification": "Certification",
    "field.jobType": "Job Type",
    "field.bankInfo": "Bank Info",
    "field.information": "Information",
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
    "header.newJobs": "ウォッチリスト",

    // Home Screen
    "home.allJobsCompleted": "すべての仕事を確認しました！",
    "home.waitForNewJobs": "新しい仕事が追加されるまでお待ちください",

    // Common
    "common.pullToRefresh": "引っ張って更新",
    "common.done": "完了",

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
    "filter.clearAll": "クリア",
    "filter.applyFilters": "適用",
    "filter.bySalary": "給与順",
    "filter.commutingTimeHome": "通勤時間（自宅から）",
    "filter.commutingTimeSchool": "通勤時間（学校から）",
    "filter.byPublicationDate": "掲載日順",
    "filter.adjustSalaryRange": "下のボタンで給与範囲を調整:",
    "filter.filters": "フィルター",

    // Salary options
    "salary.hourly": "時給",
    "salary.daily": "日給",
    "salary.weekly": "週給",
    "salary.monthly": "月給",
    "salary.selectTypeAndRange": "給与の種類と範囲を選択してください：",
    "salary.selectRange": "範囲を選択",
    "salary.range": "範囲",

    // Time options
    "time.5minutes": "～5分",
    "time.10minutes": "～10分",
    "time.15minutes": "～15分",
    "time.20minutes": "～20分",
    "time.30minutes": "～30分",
    "time.45minutes": "～45分",
    "time.60minutes": "～60分",

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
    "profession.callCenter": "コールセンター",
    "profession.security": "警備員",
    "profession.hotelCleaning": "ホテル清掃",
    "profession.translationAssistant": "翻訳アシスタント",
    "profession.serving": "配膳",
    "profession.itSupport": "ITサポート",
    "profession.inspection": "検品作業",
    "profession.cafeStaff": "カフェスタッフ",
    "profession.inventoryManagement": "在庫管理",
    "profession.receptionGuide": "受付・案内",

    // Stations
    "station.shibuya": "渋谷駅",
    "station.shinjuku": "新宿駅",
    "station.ikebukuro": "池袋駅",
    "station.shinagawa": "品川駅",
    "station.ueno": "上野駅",
    "station.tokyo": "東京駅",
    "station.akihabara": "秋葉原駅",
    "station.ginza": "銀座駅",
    "station.yurakucho": "有楽町駅",
    "station.otemachi": "大手町駅",
    "station.shimbashi": "新橋駅",
    "station.hamamatsucho": "浜松町駅",
    "station.kanda": "神田駅",
    "station.ebisu": "恵比寿駅",
    "station.roppongi": "六本木駅",
    "station.meguro": "目黒駅",
    "station.omotesando": "表参道駅",
    "station.aoyamaItchome": "青山一丁目駅",
    "station.akasakaMitsuke": "赤坂見附駅",
    "station.tameikeSanno": "溜池山王駅",
    "station.harajuku": "原宿駅",
    "station.yoyogi": "代々木駅",
    "station.yotsuya": "四ツ谷駅",

    // Days of Week
    "day.monday": "月曜日",
    "day.tuesday": "火曜日",
    "day.wednesday": "水曜日",
    "day.thursday": "木曜日",
    "day.friday": "金曜日",
    "day.saturday": "土曜日",
    "day.sunday": "日曜日",

    // Japanese Language Levels
    "jlpt.n1": "N1",
    "jlpt.n2": "N2",
    "jlpt.n3": "N3",
    "jlpt.n4": "N4",
    "jlpt.n5": "N5",

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

    // Date options
    "date.today": "今日",
    "date.yesterday": "昨日",
    "date.last7Days": "過去7日間",
    "date.last30Days": "過去30日間",
    "date.thisMonth": "今月",
    "date.lastMonth": "先月",

    // Watch List
    "watchList.title": "ウォッチリスト",
    "watchList.newJobs": "ウォッチリスト",
    "watchList.noNewJobs": "新着求人はありません",
    "watchList.checkBackLater": "新しい求人をお待ちください",

    // Card Component Info
    "card.info.company": "この求人を提供している会社名",
    "card.info.position": "この求人の職種と役割の説明",
    "card.info.salary": "この仕事の時給または月給の範囲",
    "card.info.languageSkill": "必要な日本語能力レベル",
    "card.info.walkTime": "最寄り駅から職場までの徒歩時間",
    "card.info.station": "職場最寄りの電車駅",
    "card.info.schedule": "この職種の勤務日と勤務時間",
    "card.info.rating": "従業員レビューに基づく会社評価",

    // Field names for info modal
    "field.company": "会社名",
    "field.position": "職種",
    "field.salary": "給与",
    "field.languageSkill": "語学力",
    "field.walkTime": "徒歩時間",
    "field.station": "駅",
    "field.rating": "評価",
    "field.hours": "時間",
    "field.schedule": "スケジュール",
    "field.id": "ID",
    "field.age": "年齢",
    "field.country": "国",
    "field.location": "場所",
    "field.email": "メール",
    "field.phone": "電話",
    "field.certification": "資格",
    "field.jobType": "職種",
    "field.bankInfo": "銀行情報",
    "field.information": "情報",
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
    "header.newJobs": "Yangi ishlar",

    // Home Screen
    "home.allJobsCompleted": "Barcha ishlar ko'rib chiqildi!",
    "home.waitForNewJobs": "Yangi ishlar qo'shilguncha kuting",

    // Common
    "common.pullToRefresh": "Yangilash uchun torting",
    "common.done": "Tayyor",

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
    "filter.clearAll": "Tozalash",
    "filter.applyFilters": "Qo'llash",
    "filter.bySalary": "Maosh bo'yicha",
    "filter.commutingTimeHome": "Ishga borish vaqti (uydan)",
    "filter.commutingTimeSchool": "Ishga borish vaqti (maktabdan)",
    "filter.byPublicationDate": "E'lon sanasi bo'yicha",
    "filter.adjustSalaryRange":
      "Maosh diapazonini sozlash uchun tugmalardan foydalaning:",
    "filter.filters": "Filtrlar",

    // Salary options
    "salary.hourly": "Soatlik",
    "salary.daily": "Kunlik",
    "salary.weekly": "Haftalik",
    "salary.monthly": "Oylik",
    "salary.selectTypeAndRange": "Maosh turi va diapazonini tanlang:",
    "salary.selectRange": "Diapazonni tanlang",
    "salary.range": "Diapazon",

    // Time options
    "time.5minutes": "~5 daqiqa",
    "time.10minutes": "~10 daqiqa",
    "time.15minutes": "~15 daqiqa",
    "time.20minutes": "~20 daqiqa",
    "time.30minutes": "~30 daqiqa",
    "time.45minutes": "~45 daqiqa",
    "time.60minutes": "~60 daqiqa",

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
    "profession.callCenter": "Qo'ng'iroqlar markazi",
    "profession.security": "Xavfsizlik xodimi",
    "profession.hotelCleaning": "Mehmonxona tozalash",
    "profession.translationAssistant": "Tarjimon yordamchisi",
    "profession.serving": "Xizmat ko'rsatish",
    "profession.itSupport": "IT yordam",
    "profession.inspection": "Tekshirish ishi",
    "profession.cafeStaff": "Kafe xodimi",
    "profession.inventoryManagement": "Inventar boshqaruvi",
    "profession.receptionGuide": "Qabulxona va yo'lboshchi",

    // Stations
    "station.shibuya": "Shibuya",
    "station.shinjuku": "Shinjuku",
    "station.ikebukuro": "Ikebukuro",
    "station.shinagawa": "Shinagawa",
    "station.ueno": "Ueno",
    "station.tokyo": "Tokyo",
    "station.akihabara": "Akihabara",
    "station.ginza": "Ginza",
    "station.yurakucho": "Yurakucho",
    "station.otemachi": "Otemachi",
    "station.shimbashi": "Shimbashi",
    "station.hamamatsucho": "Hamamatsucho",
    "station.kanda": "Kanda",
    "station.ebisu": "Ebisu",
    "station.roppongi": "Roppongi",
    "station.meguro": "Meguro",
    "station.omotesando": "Omotesando",
    "station.aoyamaItchome": "Aoyama-itchome",
    "station.akasakaMitsuke": "Akasaka-mitsuke",
    "station.tameikeSanno": "Tameike-sanno",
    "station.harajuku": "Harajuku",
    "station.yoyogi": "Yoyogi",
    "station.yotsuya": "Yotsuya",

    // Days of Week
    "day.monday": "Dushanba",
    "day.tuesday": "Seshanba",
    "day.wednesday": "Chorshanba",
    "day.thursday": "Payshanba",
    "day.friday": "Juma",
    "day.saturday": "Shanba",
    "day.sunday": "Yakshanba",

    // Japanese Language Levels
    "jlpt.n1": "N1",
    "jlpt.n2": "N2",
    "jlpt.n3": "N3",
    "jlpt.n4": "N4",
    "jlpt.n5": "N5",

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

    // Date options
    "date.today": "Bugun",
    "date.yesterday": "Kecha",
    "date.last7Days": "So'nggi 7 kun",
    "date.last30Days": "So'nggi 30 kun",
    "date.thisMonth": "Bu oy",
    "date.lastMonth": "O'tgan oy",

    // Watch List
    "watchList.title": "Yangi ishlar",
    "watchList.newJobs": "Yangi kelgan ishlar",
    "watchList.noNewJobs": "Yangi ishlar yo'q",
    "watchList.checkBackLater": "Yangi imkoniyatlar uchun keyinroq qarang",

    // Card Component Info
    "card.info.company": "Bu ish o'rnini taklif qiluvchi kompaniya nomi",
    "card.info.position": "Bu lavozim uchun ish nomi va rol tavsifi",
    "card.info.salary": "Ushbu ish uchun soatlik yoki oylik maosh oralig'i",
    "card.info.languageSkill": "Talab qilinadigan yapon tili bilim darajasi",
    "card.info.walkTime":
      "Eng yaqin bekattan ish joyigacha piyoda yurish vaqti",
    "card.info.station": "Ish joyiga eng yaqin poyezd stansiyasi",
    "card.info.schedule": "Ushbu lavozim uchun ish kunlari va soatlari",
    "card.info.rating": "Xodimlar sharhlariga asoslangan kompaniya reytingi",

    // Field names for info modal
    "field.company": "Kompaniya",
    "field.position": "Lavozim",
    "field.salary": "Maosh",
    "field.languageSkill": "Til bilish",
    "field.walkTime": "Piyoda yurish vaqti",
    "field.station": "Stansiya",
    "field.rating": "Reyting",
    "field.hours": "Soatlar",
    "field.schedule": "Jadval",
    "field.id": "ID",
    "field.age": "Yosh",
    "field.country": "Mamlakat",
    "field.location": "Joylashuv",
    "field.email": "Email",
    "field.phone": "Telefon",
    "field.certification": "Sertifikat",
    "field.jobType": "Ish turi",
    "field.bankInfo": "Bank ma'lumotlari",
    "field.information": "Ma'lumot",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ja");

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage] as Record<string, string>;
    return translation[key] || key;
  };

  const translateJobData = (data: any): any => {
    if (!data) return data;

    const translatePosition = (position: string): string => {
      const positionMap: Record<string, string> = {
        仕分け: "profession.sorting",
        配送: "profession.delivery",
        清掃: "profession.cleaning",
        レジ: "profession.cashier",
        倉庫作業: "profession.warehouse",
        調理補助: "profession.cookingAssistant",
        データ入力: "profession.dataEntry",
        販売員: "profession.salesClerk",
        事務補助: "profession.officeAssistant",
        梱包作業: "profession.packing",
        受付: "profession.reception",
        ピッキング: "profession.picking",
        製造補助: "profession.manufacturingAssistant",
        コールセンター: "profession.callCenter",
        警備員: "profession.security",
        ホテル清掃: "profession.hotelCleaning",
        翻訳アシスタント: "profession.translationAssistant",
        配膳: "profession.serving",
        ITサポート: "profession.itSupport",
        検品作業: "profession.inspection",
        カフェスタッフ: "profession.cafeStaff",
        在庫管理: "profession.inventoryManagement",
        "受付・案内": "profession.receptionGuide",
      };
      return t(positionMap[position] || position);
    };

    // Helper function to translate station
    const translateStation = (station: string): string => {
      const stationMap: Record<string, string> = {
        渋谷駅: "station.shibuya",
        新宿駅: "station.shinjuku",
        池袋駅: "station.ikebukuro",
        品川駅: "station.shinagawa",
        上野駅: "station.ueno",
        東京駅: "station.tokyo",
        秋葉原駅: "station.akihabara",
        銀座駅: "station.ginza",
        有楽町駅: "station.yurakucho",
        大手町駅: "station.otemachi",
        新橋駅: "station.shimbashi",
        浜松町駅: "station.hamamatsucho",
        神田駅: "station.kanda",
        恵比寿駅: "station.ebisu",
        六本木駅: "station.roppongi",
        目黒駅: "station.meguro",
        表参道駅: "station.omotesando",
        青山一丁目駅: "station.aoyamaItchome",
        赤坂見附駅: "station.akasakaMitsuke",
        溜池山王駅: "station.tameikeSanno",
        原宿駅: "station.harajuku",
        代々木駅: "station.yoyogi",
        四ツ谷駅: "station.yotsuya",
      };
      return t(stationMap[station] || station);
    };

    // Helper function to translate days
    const translateDays = (onAir: string): string => {
      const dayMap: Record<string, string> = {
        月: "day.monday",
        火: "day.tuesday",
        水: "day.wednesday",
        木: "day.thursday",
        金: "day.friday",
        土: "day.saturday",
        日: "day.sunday",
      };

      return onAir
        .split("&")
        .map((day) => {
          const translatedDay = t(dayMap[day] || day);

          if (currentLanguage === "en") {
            return translatedDay.substring(0, 1);
          }

          if (currentLanguage === "uz") {
            return translatedDay.substring(0, 1);
          }
          return translatedDay;
        })
        .join(" & ");
    };

    const translateLanguageSkill = (skill: string): string => {
      const skillMap: Record<string, string> = {
        N1: "jlpt.n1",
        N2: "jlpt.n2",
        N3: "jlpt.n3",
        N4: "jlpt.n4",
        N5: "jlpt.n5",
      };
      return t(skillMap[skill] || skill);
    };

    if (Array.isArray(data)) {
      return data.map((item) => translateJobData(item));
    }

    if (typeof data === "object") {
      const translated = { ...data };

      if (translated.position) {
        translated.position = translatePosition(translated.position);
      }

      if (translated.station) {
        translated.station = translateStation(translated.station);
      }

      if (translated.onAir) {
        translated.onAir = translateDays(translated.onAir);
      }

      if (translated.languageSkill) {
        translated.languageSkill = translateLanguageSkill(
          translated.languageSkill
        );
      }

      return translated;
    }

    return data;
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, t, translateJobData }}
    >
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
