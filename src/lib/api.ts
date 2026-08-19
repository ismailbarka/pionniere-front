export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

if (typeof window !== "undefined") {
  console.log("[Pionniere API URL]:", API_URL);
}

export type SupportedLocale = "fr" | "ar";

const exactErrorTranslations: Record<SupportedLocale, Record<string, string>> = {
  fr: {
    // Auth & Profile
    "Username is already taken": "Ce nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre.",
    "An account with this email already exists": "Un compte avec cette adresse e-mail existe déjà.",
    "Invalid credentials": "Adresse e-mail ou mot de passe incorrect.",
    "Please verify your email before logging in": "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
    "Verification token is required": "Le lien de vérification est manquant.",
    "Invalid or expired verification token": "Le lien de vérification est invalide ou a expiré.",
    "Verification token has expired. Please request a new one.": "Le lien de vérification a expiré. Veuillez en demander un nouveau.",
    "Invalid Google token": "Le jeton Google est invalide. Veuillez réessayer.",
    "Could not retrieve email from Google": "Impossible de récupérer l'adresse e-mail depuis votre compte Google.",
    "Google sign-in could not be completed. Please try again.": "La connexion avec Google a échoué. Veuillez réessayer.",
    "Unable to complete profile": "Impossible d'enregistrer le profil. Veuillez vérifier vos informations.",
    "Your session has expired. Please log in again.": "Votre session a expiré. Veuillez vous reconnecter.",
    "Student not found": "Élève introuvable.",
    "User not found": "Utilisateur introuvable.",

    // Validation
    "username must be longer than or equal to 3 characters": "Le nom d'utilisateur doit comporter au moins 3 caractères.",
    "username should not be empty": "Le nom d'utilisateur ne doit pas être vide.",
    "email must be an email": "Veuillez saisir une adresse e-mail valide.",
    "email must be a valid email": "Veuillez saisir une adresse e-mail valide.",
    "password must be longer than or equal to 6 characters": "Le mot de passe doit comporter au moins 6 caractères.",
    "password should not be empty": "Veuillez saisir un mot de passe.",

    // Subjects, Lessons, Quizzes, Placement
    "A subject with this name already exists for this school level": "Une matière portant ce nom existe déjà pour ce niveau scolaire.",
    "This lesson is locked. Complete the previous lesson first.": "Cette leçon est verrouillée. Veuillez valider la leçon précédente d'abord.",
    "Complete the placement test first": "Veuillez d'abord effectuer l'évaluation diagnostique.",
    "This lesson order is already used by another lesson in this subject": "Ce numéro d'ordre est déjà attribué à une autre leçon dans cette matière.",
    "You have already completed the placement test": "Vous avez déjà complété l'évaluation diagnostique.",
    "You have already taken this placement test": "Vous avez déjà passé ce test de niveau.",
    "You must submit all placement tests": "Veuillez répondre à toutes les questions du test de niveau.",
    "No placement tests are available": "Aucun test de niveau n'est disponible pour le moment.",
    "This placement test has no questions": "Ce test de niveau ne contient aucune question.",
    "Something went wrong": "Une erreur est survenue. Veuillez réessayer.",
    "Request failed": "La requête a échoué. Veuillez réessayer.",
    "Internal server error": "Une erreur serveur est survenue. Veuillez réessayer plus tard.",
  },
  ar: {
    // Auth & Profile
    "Username is already taken": "اسم المستخدم مستخدم بالفعل. يرجى اختيار اسم مستخدم آخر.",
    "An account with this email already exists": "يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل.",
    "Invalid credentials": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    "Please verify your email before logging in": "يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.",
    "Verification token is required": "رابط التفعيل غير موجود أو غير مكتمل.",
    "Invalid or expired verification token": "رابط التفعيل غير صالح أو انتهت صلاحيته.",
    "Verification token has expired. Please request a new one.": "انتهت صلاحية رابط التفعيل. يرجى طلب رابط تفعيل جديد.",
    "Invalid Google token": "رمز Google غير صالح. يرجى إعادة المحاولة.",
    "Could not retrieve email from Google": "تعذر الحصول على البريد الإلكتروني من حساب Google.",
    "Google sign-in could not be completed. Please try again.": "تعذر تسجيل الدخول بواسطة Google. يرجى المحاولة مرة أخرى.",
    "Unable to complete profile": "تعذر إكمال الملف الشخصي. يرجى مراجعة البيانات.",
    "Your session has expired. Please log in again.": "انتهت صلاحية جلستك. يرجى تسجيل الدخول مجددًا.",
    "Student not found": "لم يتم العثور على حساب التلميذ.",
    "User not found": "المستخدم غير موجود.",

    // Validation
    "username must be longer than or equal to 3 characters": "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل.",
    "username should not be empty": "يرجى كتابة اسم المستخدم.",
    "email must be an email": "يرجى إدخال بريد إلكتروني صالح.",
    "email must be a valid email": "يرجى إدخال بريد إلكتروني صالح.",
    "password must be longer than or equal to 6 characters": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
    "password should not be empty": "يرجى إدخال كلمة المرور.",

    // Subjects, Lessons, Quizzes, Placement
    "A subject with this name already exists for this school level": "توجد مادة بهذا الاسم مسجلة بالفعل لهذا المستوى الدراسي.",
    "This lesson is locked. Complete the previous lesson first.": "هذا الدرس مغلق. يرجى إتمام واجتياز الدرس السابق أولاً.",
    "Complete the placement test first": "يرجى إجراء التقييم التشخيصي أولاً.",
    "This lesson order is already used by another lesson in this subject": "رقم ترتيب هذا الدرس مستخدم بالفعل لدرس آخر في نفس المادة.",
    "You have already completed the placement test": "لقد قمت بإجراء التقييم التشخيصي بالفعل.",
    "You have already taken this placement test": "لقد قمت باجتياز هذا الاختبار مسبقًا.",
    "You must submit all placement tests": "يرجى الإجابة عن جميع أسئلة اختبار المستوى.",
    "No placement tests are available": "لا توجد اختبارات مستوى متاحة حاليًا.",
    "This placement test has no questions": "اختبار المستوى هذا لا يحتوي على أية أسئلة.",
    "Something went wrong": "حدث خطأ ما. يرجى إعادة المحاولة.",
    "Request failed": "فشلت العملية. يرجى إعادة المحاولة.",
    "Internal server error": "حدث خطأ في الخادم. يرجى المحاولة لاحقًا.",
  },
};

function getCurrentLocale(): SupportedLocale {
  if (typeof window === "undefined") return "fr";
  const saved = window.localStorage.getItem("edu_locale");
  if (saved === "ar" || saved === "fr") return saved;
  const docLang = document.documentElement.lang;
  if (docLang === "ar" || docLang === "fr") return docLang;
  return "fr";
}

function translateSinglePiece(piece: string, locale: SupportedLocale): string {
  const trimmed = piece.trim();
  if (!trimmed) return "";

  // 1. Direct dictionary match
  const dict = exactErrorTranslations[locale];
  if (dict[trimmed]) return dict[trimmed];

  // 2. Case-insensitive dictionary match
  const lowerTrimmed = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(dict)) {
    if (key.toLowerCase() === lowerTrimmed) return val;
  }

  // 3. Pattern / Regex matches
  if (/^Order \d+ is already used/i.test(trimmed)) {
    return locale === "ar"
      ? "رقم الترتيب هذا مستخدم بالفعل لدرس آخر."
      : "Ce numéro d'ordre est déjà utilisé par une autre leçon.";
  }
  if (/Subject with ID \d+ not found/i.test(trimmed)) {
    return locale === "ar" ? "المادة الدراسية غير موجودة." : "Matière introuvable.";
  }
  if (/Lesson with ID \d+ not found/i.test(trimmed)) {
    return locale === "ar" ? "الدرس غير موجود." : "Leçon introuvable.";
  }
  if (/Placement test with ID \d+ not found/i.test(trimmed)) {
    return locale === "ar" ? "اختبار المستوى غير موجود." : "Test de niveau introuvable.";
  }
  if (/Question with ID \d+ not found/i.test(trimmed)) {
    return locale === "ar" ? "السؤال غير موجود." : "Question introuvable.";
  }
  if (/already exists/i.test(trimmed)) {
    return locale === "ar" ? "العنصر موجود بالفعل." : "Cet élément existe déjà.";
  }

  return trimmed;
}

export function getErrorMessage(error: unknown, locale?: SupportedLocale): string {
  const activeLocale = locale || getCurrentLocale();

  let raw = "";
  if (error instanceof Error) {
    raw = error.message;
  } else if (typeof error === "string") {
    raw = error;
  } else if (error && typeof error === "object" && "message" in error) {
    const msg = (error as { message: unknown }).message;
    raw = Array.isArray(msg) ? msg.join(", ") : String(msg);
  }

  if (!raw || raw === "undefined" || raw === "null") {
    return activeLocale === "ar"
      ? "حدث خطأ غير متوقع. يرجى المحاولة مجددًا."
      : "Une erreur est survenue. Veuillez réessayer.";
  }

  // If the error message contains multiple comma-separated items (e.g. from class-validator)
  if (raw.includes(",")) {
    const pieces = raw.split(",");
    const translatedPieces = pieces.map((p) => translateSinglePiece(p, activeLocale)).filter(Boolean);
    if (translatedPieces.length > 0) {
      return translatedPieces.join(" • ");
    }
  }

  return translateSinglePiece(raw, activeLocale);
}

export function cleanPayload<T extends Record<string, unknown>>(payload: T) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== "" && value !== undefined),
  );
}

export async function request<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const text = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
    throw new Error(text || "Request failed");
  }

  return data as T;
}
