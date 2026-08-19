"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "fr" | "ar";

export type Messages = {
  nav: {
    home: string;
    subjects: string;
    placement: string;
    lessons: string;
    signIn: string;
    getStarted: string;
    signOut: string;
    adminSubjects: string;
    adminLessons: string;
    adminPlacement: string;
    profile: string;
    settings: string;
    comingSoon: string;
    userMenu: string;
    toggleMenu: string;
  };
  brand: string;
  brandTagline: string;
  switchLabel: string;
  home: {
    videoEyebrow: string;
    videoTitle: string;
    videoLead: string;
    videoCta: string;
    eyebrow: string;
    title: string;
    lead: string;
    createAccount: string;
    signIn: string;
    browseSubjects: string;
    heroBadge: string;
    heroScore: string;
    heroSteps: [string, string, string];
    builtFor: string;
    builtTitle: string;
    builtCards: [string, string, string];
    teacherEyebrow: string;
    teacherTitle: string;
    teacherCopy: string;
    whatFeelsBetter: string;
    betterItems: [string, string, string];
  };
  auth: {
    loginEyebrow: string;
    signupEyebrow: string;
    loginTitle: string;
    signupTitle: string;
    loginCopy: string;
    signupCopy: string;
    loginHero: [string, string, string];
    signupHero: [string, string, string];
    loginIntroEyebrow: string;
    signupIntroEyebrow: string;
    loginIntroTitle: string;
    signupIntroTitle: string;
    loginIntroCopy: string;
    signupIntroCopy: string;
    username: string;
    password: string;
    newHere: string;
    alreadyHave: string;
    switchToSignup: string;
    switchToLogin: string;
    securePortal: string;
    joinClassroom: string;
    backHome: string;
    resendVerification: string;
    verificationSent: string;
  };
  profile: {
    eyebrow: string;
    title: string;
    lead: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    schoolLevelLabel: string;
    saveAndContinue: string;
    saving: string;
  };
  verifyEmail: {
    loading: string;
    missingToken: string;
    successTitle: string;
    errorTitle: string;
    goToLogin: string;
  };
  common: {
    loading: string;
    loadingSession: string;
    redirecting: string;
    restoring: string;
    openingDashboard: string;
    preparingClassroom: string;
    loadingSubjects: string;
    loadingSubjectList: string;
    loadingLesson: string;
    loadingLessons: string;
    loadingPlacement: string;
    loadingPlacementTests: string;
    checkingSession: string;
    submitting: string;
    saving: string;
    refresh: string;
    backToHome: string;
    backToLessons: string;
    continue: string;
    nextLesson: string;
    previousLesson: string;
    backToLessonList: string;
    home: string;
    completed: string;
    totalLessons: string;
    questions: string;
    completedLabel: string;
    unlockedLabel: string;
    lockedLabel: string;
    watchVideo: string;
    watchVideoOnYouTube: string;
    copyright: string;
    allRightsReserved: string;
    lessonNotFound: string;
    returnToList: string;
    greatWork: string;
    unlockedNextLesson: string;
    completedSubject: string;
    continueWhileFresh: string;
    headBackOrReview: string;
    openLesson: string;
    noSubjects: string;
    noLessons: string;
    noPlacementTests: string;
    placementReady: string;
    placementComplete: string;
    placementRequired: string;
    answerEveryQuestion: string;
    lessonPath: string;
    chooseSubject: string;
    levelBadge: (level: number) => string;
  };
  landing: {
    steps: [string, string, string];
    highlightLabels: [string, string, string];
    highlightValues: [string, string, string];
  };
  subjects: {
    title: string;
    lead: string;
    placedBanner: string;
    openLessons: string;
  };
  lessonIndex: {
    title: string;
    lead: string;
    progressLabel: string;
    continueLabel: string;
    reviewNextLabel: string;
    lessonPrefix: string;
    openLessonCopy: string;
  };
  lessonDetail: {
    title: string;
    lead: string;
    lessonPrefix: string;
    passToUnlock: string;
  };
  quiz: {
    title: string;
    lead: string;
    progressText: (answered: number, total: number, pct: number) => string;
    submit: string;
    submitting: string;
    passedBadge: string;
    failedBadge: string;
    scoreSummary: (score: number, correct: number, total: number) => string;
    answerAllPrompt: string;
    noQuestions: string;
  };
  placement: {
    eyebrow: string;
    title: string;
    lead: string;
    submitAssessment: string;
    noPlacementTests: string;
    submitPlacementTest: string;
    passSummary: string;
    videoEyebrow: string;
    videoTitle: string;
    videoLead: string;
    progressText: (answered: number, total: number, pct: number) => string;
  };
  levels: Record<number, string>;
  admin: {
    title: string;
    lead: string;
    subjects: string;
    lessons: string;
    placement: string;
    createSubject: string;
    subjectName: string;
    subjectNamePlaceholder: string;
    schoolLevel: string;
    allLevels: string;
    levelFilter: (level: number) => string;
    addSubject: string;
    editSubject: string;
    saveSubject: string;
    createLesson: string;
    editLesson: string;
    saveLesson: string;
    cancelEdit: string;
    addLesson: string;
    addQuizQuestion: string;
    lessonTitle: string;
    lessonDescription: string;
    youtubeUrl: string;
    order: string;
    passPercent: string;
    chooseSubject: string;
    chooseLesson: string;
    addPlacementTest: string;
    addAnotherQuestion: string;
    createPlacementTest: string;
    placementQuestion: string;
    optionsSeparated: string;
    correctAnswerText: string;
    tests: string;
    refresh: string;
    delete: string;
    deleteLesson: string;
    addQuizHere: string;
    noQuizQuestions: string;
    loading: string;
    subjectCreated: string;
    subjectUpdated: string;
    subjectDeleted: string;
    lessonCreated: string;
    lessonUpdated: string;
    lessonDeleted: string;
    quizQuestionAdded: string;
    quizQuestionDeleted: string;
    placementTestCreated: string;
    placementTestDeleted: string;
    errorChooseSubject: string;
    errorChooseLesson: string;
    errorPlacementValidation: string;
  };
  status: {
    completed: string;
    unlocked: string;
    locked: string;
  };
  role: {
    admin: string;
    student: string;
  };
};

const messages: Record<Locale, Messages> = {
  fr: {
    nav: {
      home: "Accueil",
      subjects: "Matières",
      placement: "Test de niveau",
      lessons: "Leçons",
      signIn: "Se connecter",
      getStarted: "Commencer gratuitement",
      signOut: "Se déconnecter",
      adminSubjects: "Matières",
      adminLessons: "Leçons & Quiz",
      adminPlacement: "Tests de niveau",
      profile: "Mon profil",
      settings: "Paramètres",
      comingSoon: "Bientôt disponible",
      userMenu: "Menu utilisateur",
      toggleMenu: "Ouvrir le menu de navigation",
    },
    brand: "Daam",
    brandTagline: "Soutien scolaire & Réussite au primaire",
    switchLabel: "Changer de langue",
    home: {
      videoEyebrow: "Démonstration interactive",
      videoTitle: "Comment fonctionne la plateforme Daam",
      videoLead: "Regardez cette courte présentation pour comprendre comment nos leçons vidéo et nos quiz d'entraînement accompagnent les élèves au quotidien.",
      videoCta: "Voir la vidéo de présentation",
      eyebrow: "Soutien scolaire au primaire au Maroc",
      title: "Révisez vos cours, consolidez vos acquis et réussissez à votre rythme.",
      lead: "Des cours vidéo clairs conformes au programme marocain, suivis de quiz interactifs pour s'entraîner, progresser en toute confiance et préparer les contrôles sereinement.",
      createAccount: "Commencer gratuitement",
      signIn: "Se connecter",
      browseSubjects: "Découvrir les matières",
      heroBadge: "Programme primaire marocain",
      heroScore: "Taux de réussite aux quiz",
      heroSteps: [
        "Évaluation diagnostique",
        "Leçons vidéo structurées",
        "Quiz de validation immédiats",
      ],
      builtFor: "Une méthode conçue pour la réussite",
      builtTitle: "Simple pour les enfants, motivante au quotidien et rassurante pour les parents.",
      builtCards: [
        "Un test de niveau initial pour commencer au bon endroit et consolider les bases sans stress.",
        "Chaque matière se débloque progressivement pour assurer une progression solide et continue.",
        "Des quiz interactifs après chaque cours pour valider la compréhension avant de passer à l'étape suivante.",
      ],
      teacherEyebrow: "Espace pédagogique & enseignants",
      teacherTitle: "Une structure claire pour guider chaque élève vers l'excellence.",
      teacherCopy:
        "Organisez les matières, associez les leçons vidéo aux chapitres du programme et paramétrez des quiz adaptés pour un apprentissage fluide et mesurable.",
      whatFeelsBetter: "Les points forts de Daam",
      betterItems: [
        "Leçons conformes au programme officiel du primaire",
        "Quiz interactifs avec correction immédiate",
        "Suivi précis de la progression par matière et par niveau",
      ],
    },
    auth: {
      loginEyebrow: "Espace élève",
      signupEyebrow: "Rejoignez Daam",
      loginTitle: "Bon retour ! Reprenez vos leçons là où vous vous étiez arrêté.",
      signupTitle: "Créez votre compte et démarrez votre apprentissage personnalisé.",
      loginCopy:
        "Connectez-vous pour retrouver vos cours, poursuivre votre progression et valider vos prochains quiz d'entraînement.",
      signupCopy:
        "Inscrivez-vous en quelques secondes pour accéder gratuitement à toutes les matières et leçons de votre niveau.",
      loginHero: [
        "Progression sauvegardée",
        "Leçons débloquées pas à pas",
        "Quiz d'entraînement interactifs",
      ],
      signupHero: [
        "Programme officiel marocain",
        "Parcours guidé et motivant",
        "Résultats et bilans détaillés",
      ],
      loginIntroEyebrow: "Connexion sécurisée",
      signupIntroEyebrow: "Inscription gratuite",
      loginIntroTitle: "Se connecter",
      signupIntroTitle: "Créer un compte",
      loginIntroCopy: "Saisissez votre e-mail ou utilisez votre compte Google pour accéder à votre espace.",
      signupIntroCopy: "Remplissez le formulaire ci-dessous pour démarrer votre apprentissage dès aujourd'hui.",
      username: "Nom d’utilisateur",
      password: "Mot de passe",
      newHere: "Vous n’avez pas encore de compte ?",
      alreadyHave: "Vous avez déjà un compte ?",
      switchToSignup: "Créer un compte gratuit",
      switchToLogin: "Se connecter",
      securePortal: "Portail sécurisé",
      joinClassroom: "Rejoindre l'espace de cours",
      backHome: "Retour à l’accueil",
      resendVerification: "Renvoyer l'e-mail de confirmation",
      verificationSent: "Un e-mail de confirmation a été envoyé. Veuillez consulter votre boîte de réception.",
    },
    profile: {
      eyebrow: "Finalisation du compte",
      title: "Complétez votre profil élève",
      lead: "Choisissez un nom d'utilisateur et sélectionnez votre niveau scolaire pour accéder aux matières correspondantes.",
      usernameLabel: "Nom d'utilisateur",
      usernamePlaceholder: "ex. yassine_2026",
      schoolLevelLabel: "Niveau scolaire",
      saveAndContinue: "Enregistrer et accéder aux cours",
      saving: "Enregistrement du profil…",
    },
    verifyEmail: {
      loading: "Vérification de votre adresse e-mail en cours…",
      missingToken: "Le lien de vérification est manquant ou incomplet.",
      successTitle: "Adresse e-mail vérifiée avec succès !",
      errorTitle: "Échec de la vérification de l'e-mail",
      goToLogin: "Accéder à la page de connexion",
    },
    common: {
      loading: "Chargement…",
      loadingSession: "Vérification de la session…",
      redirecting: "Redirection vers votre espace…",
      restoring: "Restauration de votre session…",
      openingDashboard: "Ouverture de votre tableau de bord…",
      preparingClassroom: "Préparation de votre espace d'apprentissage…",
      loadingSubjects: "Chargement de vos matières…",
      loadingSubjectList: "Chargement de la liste des matières…",
      loadingLesson: "Chargement de la leçon…",
      loadingLessons: "Chargement des leçons…",
      loadingPlacement: "Chargement de l'évaluation diagnostique…",
      loadingPlacementTests: "Chargement des tests de niveau…",
      checkingSession: "Vérification de votre compte…",
      submitting: "Validation en cours…",
      saving: "Enregistrement…",
      refresh: "Actualiser",
      backToHome: "Retour à l’accueil",
      backToLessons: "Retour aux leçons",
      continue: "Continuer",
      nextLesson: "Leçon suivante",
      previousLesson: "Leçon précédente",
      backToLessonList: "Retour à la liste des leçons",
      home: "Accueil",
      completed: "leçons complétées",
      totalLessons: "leçons au total",
      questions: "questions",
      completedLabel: "Terminé",
      unlockedLabel: "Disponible",
      lockedLabel: "Verrouillé",
      watchVideo: "Regarder la leçon vidéo",
      watchVideoOnYouTube: "Regarder sur YouTube",
      copyright: "Daam Éducation",
      allRightsReserved: "Tous droits réservés",
      lessonNotFound: "Cette leçon est introuvable ou indisponible.",
      returnToList: "Retourner à la liste des matières",
      greatWork: "Excellent travail !",
      unlockedNextLesson: "Vous avez validé cette leçon et débloqué la suivante.",
      completedSubject: "Félicitations ! Vous avez terminé toutes les leçons de cette matière.",
      continueWhileFresh: "Poursuivez sur votre lancée pour consolider vos acquis.",
      headBackOrReview: "Vous pouvez revoir les leçons précédentes ou explorer une autre matière.",
      openLesson: "Commencer cette leçon",
      noSubjects: "Aucune matière n’est disponible pour ce niveau actuellement.",
      noLessons: "Aucune leçon n’est disponible dans cette matière pour le moment.",
      noPlacementTests: "Aucun test de niveau n’est configuré pour le moment.",
      placementReady: "Votre évaluation diagnostique est prête.",
      placementComplete: "Évaluation terminée avec succès",
      placementRequired: "Veuillez effectuer l'évaluation diagnostique pour débuter.",
      answerEveryQuestion: "Veuillez répondre à l'ensemble des questions avant de valider.",
      lessonPath: "Parcours d'apprentissage",
      chooseSubject: "Matières au programme",
      levelBadge: (level: number) => `${level}ère année primaire`,
    },
    landing: {
      steps: [
        "Identifiez vos points forts dès le départ",
        "Suivez les leçons dans l'ordre pédagogique",
        "Validez chaque étape avec un quiz interactif",
      ],
      highlightLabels: ["Parcours conformes", "Retours immédiats", "Gestion simplifiée"],
      highlightValues: [
        "1ère à 6ème année primaire",
        "Correction et score en direct",
        "Outils dédiés aux enseignants",
      ],
    },
    subjects: {
      title: "Vos matières au programme",
      lead: "Sélectionnez une matière pour accéder aux leçons vidéo et aux quiz d'entraînement associés.",
      placedBanner: "Évaluation initiale complétée ! Votre parcours d'apprentissage est prêt.",
      openLessons: "Accéder aux leçons",
    },
    lessonIndex: {
      title: "Parcours des leçons",
      lead: "Suivez les leçons pas à pas, regardez les explications vidéo et réussissez le quiz pour débloquer la leçon suivante.",
      progressLabel: "progression globale",
      continueLabel: "Reprendre la leçon",
      reviewNextLabel: "Revoir la leçon",
      lessonPrefix: "Leçon",
      openLessonCopy: "Regardez la vidéo explicative et testez vos connaissances avec le quiz.",
    },
    lessonDetail: {
      title: "Détail de la leçon",
      lead: "Visionnez attentivement la vidéo, puis répondez au quiz ci-dessous pour valider votre compréhension.",
      lessonPrefix: "Leçon",
      passToUnlock: "Cette leçon est verrouillée. Réussissez le quiz de la leçon précédente pour y accéder.",
    },
    quiz: {
      title: "Quiz d'évaluation",
      lead: "Répondez aux questions ci-dessous pour tester votre compréhension de la leçon.",
      progressText: (answered, total, pct) => `${answered} sur ${total} questions répondues (${pct}%)`,
      submit: "Valider mes réponses",
      submitting: "Validation en cours…",
      passedBadge: "Félicitations ! Quiz validé",
      failedBadge: "À revoir — Réessayez pour valider",
      scoreSummary: (score, correct, total) => `Score : ${score}% · ${correct}/${total} réponses correctes`,
      answerAllPrompt: "Veuillez sélectionner une réponse pour chaque question du quiz.",
      noQuestions: "Aucune question de quiz n'est disponible pour cette leçon.",
    },
    placement: {
      eyebrow: "Évaluation diagnostique",
      title: "Test de niveau initial",
      lead: "Répondez sans stress à ces quelques questions pour nous aider à déterminer votre niveau de départ et vous proposer les leçons les plus adaptées.",
      submitAssessment: "Valider mon évaluation",
      noPlacementTests: "Aucun test de niveau n'est disponible pour le moment.",
      submitPlacementTest: "Valider le test de niveau",
      passSummary: "Votre évaluation est enregistrée avec succès.",
      videoEyebrow: "Conseils avant de commencer",
      videoTitle: "Comment se déroule le test de niveau",
      videoLead: "Découvrez en quelques secondes comment fonctionne ce test diagnostique sans stress pour bien démarrer votre année.",
      progressText: (answered, total, pct) => `${answered} sur ${total} questions répondues (${pct}%)`,
    },
    levels: {
      1: "1ère année primaire (Niveau 1)",
      2: "2ème année primaire (Niveau 2)",
      3: "3ème année primaire (Niveau 3)",
      4: "4ème année primaire (Niveau 4)",
      5: "5ème année primaire (Niveau 5)",
      6: "6ème année primaire (Niveau 6)",
    },
    admin: {
      title: "Espace Administration",
      lead: "Gérez les matières du programme, organisez les leçons, concevez les quiz interactifs et paramétrez les tests de niveau.",
      subjects: "Matières",
      lessons: "Leçons & Quiz",
      placement: "Tests de niveau",
      createSubject: "Créer une nouvelle matière",
      subjectName: "Nom de la matière",
      subjectNamePlaceholder: "ex. Mathématiques, Langue française…",
      schoolLevel: "Niveau scolaire",
      allLevels: "Tous les niveaux",
      levelFilter: (lvl) => `Niveau ${lvl}`,
      addSubject: "Ajouter la matière",
      editSubject: "Modifier la matière",
      saveSubject: "Enregistrer les modifications",
      createLesson: "Ajouter une leçon au programme",
      editLesson: "Modifier la leçon",
      saveLesson: "Enregistrer les modifications",
      cancelEdit: "Annuler",
      addLesson: "Ajouter la leçon",
      addQuizQuestion: "Ajouter une question au quiz",
      lessonTitle: "Titre de la leçon",
      lessonDescription: "Description pédagogique",
      youtubeUrl: "Lien de la vidéo (YouTube)",
      order: "Ordre d'apparition",
      passPercent: "Score minimum de réussite (%)",
      chooseSubject: "Sélectionner une matière",
      chooseLesson: "Sélectionner une leçon",
      addPlacementTest: "Créer un test de niveau",
      addAnotherQuestion: "Ajouter une autre question",
      createPlacementTest: "Enregistrer le test de niveau",
      placementQuestion: "Énoncé de la question",
      optionsSeparated: "Options de réponse (séparées par des virgules)",
      correctAnswerText: "Bonne réponse",
      tests: "Tests de niveau existants",
      refresh: "Actualiser",
      delete: "Supprimer",
      deleteLesson: "Supprimer la leçon",
      addQuizHere: "Ajouter un quiz",
      noQuizQuestions: "Aucune question de quiz pour cette leçon.",
      loading: "Chargement des données administratives…",
      subjectCreated: "Matière créée avec succès.",
      subjectUpdated: "Matière modifiée avec succès.",
      subjectDeleted: "Matière supprimée avec succès.",
      lessonCreated: "Leçon créée avec succès.",
      lessonUpdated: "Leçon modifiée avec succès.",
      lessonDeleted: "Leçon supprimée avec succès.",
      quizQuestionAdded: "Question ajoutée au quiz avec succès.",
      quizQuestionDeleted: "Question supprimée avec succès.",
      placementTestCreated: "Test de niveau créé avec succès.",
      placementTestDeleted: "Test de niveau supprimé avec succès.",
      errorChooseSubject: "Veuillez sélectionner une matière.",
      errorChooseLesson: "Veuillez sélectionner une leçon.",
      errorPlacementValidation: "Chaque question doit comporter un énoncé, au moins deux options et une réponse correcte.",
    },
    status: {
      completed: "Validé",
      unlocked: "Accessible",
      locked: "Verrouillé",
    },
    role: {
      admin: "Administrateur / Enseignant",
      student: "Élève",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      subjects: "المواد الدراسية",
      placement: "اختبار المستوى",
      lessons: "الدروس",
      signIn: "تسجيل الدخول",
      getStarted: "ابدأ مجانًا",
      signOut: "تسجيل الخروج",
      adminSubjects: "المواد الدراسية",
      adminLessons: "الدروس والاختبارات",
      adminPlacement: "اختبارات المستوى",
      profile: "الملف الشخصي",
      settings: "الإعدادات",
      comingSoon: "قريبًا",
      userMenu: "قائمة المستخدم",
      toggleMenu: "فتح قائمة التنقل",
    },
    brand: "دام",
    brandTagline: "الدعم المدرسي والنجاح في الابتدائي",
    switchLabel: "تغيير اللغة",
    home: {
      videoEyebrow: "عرض توضيحي",
      videoTitle: "كيف تعمل منصة دام التعليمية",
      videoLead: "شاهد هذا العرض الموجز لتتعرف على طريقة متابعة شروحات الفيديو واجتياز الاختبارات التفاعلية لتثبيت الفهم.",
      videoCta: "مشاهدة العرض التوضيحي",
      eyebrow: "منصة الدعم المدرسي للتعليم الابتدائي بالمغرب",
      title: "راجع دروسك، ثبّت معلوماتك، وحقق التفوق الدراسي بثقة.",
      lead: "شروحات فيديو مبسطة مطابقة للمنهاج المغربي الرسمي، تليها اختبارات تفاعلية قصيرة لترسيخ الفهم والتقدم خطوة بخطوة بالوتيرة التي تناسبك.",
      createAccount: "ابدأ مجانًا",
      signIn: "تسجيل الدخول",
      browseSubjects: "استكشف المواد الدراسية",
      heroBadge: "المنهاج المغربي للتعليم الابتدائي",
      heroScore: "نسبة استيعاب الدروس",
      heroSteps: [
        "تقييم تشخيصي للمستوى",
        "دروس فيديو منظمة ومبسطة",
        "اختبارات فورية لتثبيت الفهم",
      ],
      builtFor: "طريقة تعليمية فعالة ومحفزة",
      builtTitle: "بسيطة وممتعة للتلاميذ، واضحة ومطمئنة لأولياء الأمور.",
      builtCards: [
        "اختبار تشخيصي أولي لتحديد المستوى والبدء من النقطة المناسبة دون أي ضغط.",
        "تدرج سلس ومحكم في الدروس لضمان استيعاب المفاهيم والمضي قدمًا بثقة.",
        "اختبارات تفاعلية قصيرة بعد كل درس للتحقق من الفهم وفتح الخطوة الموالية.",
      ],
      teacherEyebrow: "فضاء الأساتذة والمؤطرين",
      teacherTitle: "هيكلة بيداغوجية واضحة لقيادة التلاميذ نحو التفوق.",
      teacherCopy:
        "أدوات سهلة ومرنة لتنظيم المواد الدراسية، وإدراج فيديوهات الشرح، وإعداد اختبارات تقويمية ملائمة لكل مستوى تعليمي.",
      whatFeelsBetter: "أهم مميزات منصة دام",
      betterItems: [
        "محتوى تعليمي مطابق للبرنامج الرسمي للتعليم الابتدائي",
        "اختبارات تفاعلية مع تصحيح فوري وتوضيح الإجابات",
        "متابعة دقيقة لمستوى التقدم لكل مادة ومستوى دراسي",
      ],
    },
    auth: {
      loginEyebrow: "فضاء التلميذ",
      signupEyebrow: "انضم إلى منصة دام",
      loginTitle: "مرحبًا بك مجددًا ! واصل دروسك من حيث توقفت.",
      signupTitle: "أنشئ حسابك المجاني وابدأ مسار التفوق الدراسي.",
      loginCopy:
        "سجّل دخولك لمتابعة دروسك المفتوحة، وتتبع تقدمك الدراسي، واجتياز اختبارات التقييم.",
      signupCopy:
        "سجّل في ثوانٍ معدودة للوصول المجاني إلى جميع المواد والدروس المخصصة لمستواك الدراسي.",
      loginHero: [
        "حفظ تلقائي للتقدم",
        "دروس متسلسلة خطوة بخطوة",
        "اختبارات تفاعلية للتقييم",
      ],
      signupHero: [
        "مطابق للمقرر المغربي الرسمي",
        "مسار تعليمي موجّه ومحفز",
        "نتائج وتقارير دقيقة ومفصلة",
      ],
      loginIntroEyebrow: "تسجيل الدخول",
      signupIntroEyebrow: "تسجيل حساب جديد",
      loginIntroTitle: "تسجيل الدخول",
      signupIntroTitle: "إنشاء حساب",
      loginIntroCopy: "أدخل بريدك الإلكتروني أو استخدم حساب Google للوصول إلى فضائك التعليمي.",
      signupIntroCopy: "املأ البيانات أدناه لبدء تجربة تعلم ممتعة وفعالة.",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      newHere: "ليس لديك حساب بعد؟",
      alreadyHave: "هل لديك حساب بالفعل؟",
      switchToSignup: "إنشاء حساب مجاني",
      switchToLogin: "تسجيل الدخول",
      securePortal: "بوابة تعليمية آمنة",
      joinClassroom: "الدخول إلى الفضاء التعليمي",
      backHome: "العودة إلى الرئيسية",
      resendVerification: "إعادة إرسال رابط التفعيل",
      verificationSent: "تم إرسال رابط التفعيل إلى بريدك الإلكتروني. يرجى مراجعة صندوق الوارد.",
    },
    profile: {
      eyebrow: "إكمال التسجيل",
      title: "أكمل بيانات ملفك الشخصي",
      lead: "اختر اسم مستخدم وحدد مستواك الدراسي لعرض الدروس والمواد المناسبة لك.",
      usernameLabel: "اسم المستخدم",
      usernamePlaceholder: "مثال: amine_2026",
      schoolLevelLabel: "المستوى الدراسي",
      saveAndContinue: "حفظ ومتابعة إلى المواد",
      saving: "جارٍ حفظ البيانات…",
    },
    verifyEmail: {
      loading: "جارٍ التحقق من البريد الإلكتروني…",
      missingToken: "رابط التفعيل غير صالح أو غير مكتمل.",
      successTitle: "تم تأكيد البريد الإلكتروني بنجاح !",
      errorTitle: "تعذر التحقق من البريد الإلكتروني",
      goToLogin: "الانتقال إلى صفحة تسجيل الدخول",
    },
    common: {
      loading: "جارٍ التحميل…",
      loadingSession: "جارٍ التحقق من الجلسة…",
      redirecting: "جارٍ توجيهك إلى فضائك…",
      restoring: "جارٍ استعادة الجلسة…",
      openingDashboard: "جارٍ فتح لوحة التحكم…",
      preparingClassroom: "جارٍ تجهيز فضائك التعليمي…",
      loadingSubjects: "جارٍ تحميل المواد الدراسية…",
      loadingSubjectList: "جارٍ تحميل قائمة المواد…",
      loadingLesson: "جارٍ تحميل الدرس…",
      loadingLessons: "جارٍ تحميل الدروس…",
      loadingPlacement: "جارٍ تحميل اختبار المستوى…",
      loadingPlacementTests: "جارٍ تحميل اختبارات المستوى…",
      checkingSession: "جارٍ التحقق من الحساب…",
      submitting: "جارٍ التحقق والتأكيد…",
      saving: "جارٍ الحفظ…",
      refresh: "تحديث",
      backToHome: "العودة إلى الرئيسية",
      backToLessons: "العودة إلى قائمة الدروس",
      continue: "متابعة",
      nextLesson: "الدرس التالي",
      previousLesson: "الدرس السابق",
      backToLessonList: "العودة إلى قائمة الدروس",
      home: "الرئيسية",
      completed: "دروس مكتملة",
      totalLessons: "مجموع الدروس",
      questions: "أسئلة",
      completedLabel: "مكتمل",
      unlockedLabel: "متاح",
      lockedLabel: "مغلق",
      watchVideo: "مشاهدة شرح الدرس بالفيديو",
      watchVideoOnYouTube: "شاهد على YouTube",
      copyright: "منصة دام التعليمية",
      allRightsReserved: "جميع الحقوق محفوظة",
      lessonNotFound: "هذا الدرس غير متوفر حاليًا.",
      returnToList: "العودة إلى قائمة المواد",
      greatWork: "عمل رائع !",
      unlockedNextLesson: "أحسنت ! لقد اجتزت هذا الدرس وفُتح لك الدرس الموالي.",
      completedSubject: "تهانينا ! لقد أتممت جميع دروس هذه المادة بنجاح.",
      continueWhileFresh: "واصل تقدمك واستثمر حماسك لاستيعاب المزيد.",
      headBackOrReview: "يمكنك مراجعة الدروس السابقة أو اختيار مادة دراسية أخرى.",
      openLesson: "بدء هذا الدرس",
      noSubjects: "لا توجد مواد دراسية متاحة لهذا المستوى حاليًا.",
      noLessons: "لا توجد دروس متاحة في هذه المادة حاليًا.",
      noPlacementTests: "لا توجد اختبارات مستوى متاحة في الوقت الحالي.",
      placementReady: "اختبار تحديد المستوى جاهز للبدء.",
      placementComplete: "تم إكمال اختبار المستوى بنجاح.",
      placementRequired: "يرجى إجراء اختبار المستوى للانطلاق في المسار.",
      answerEveryQuestion: "يرجى الإجابة عن جميع الأسئلة قبل تأكيد الإرسال.",
      lessonPath: "المسار التعليمي",
      chooseSubject: "المواد الدراسية المقررة",
      levelBadge: (level: number) => `المستوى ${level} ابتدائي`,
    },
    landing: {
      steps: [
        "حدّد مستواك الدراسي ونقاط قوتك من البداية",
        "تابع الدروس بتسلسل تربوي مدروس ومبسط",
        "ثبّت فهمك لكل درس باختبارات تقويمية فورية",
      ],
      highlightLabels: ["منهاج معتمد", "تقييم فوري", "إدارة مبسطة"],
      highlightValues: [
        "من المستوى 1 إلى 6 ابتدائي",
        "تصحيح ونقاط آنية",
        "أدوات مخصصة للأساتذة",
      ],
    },
    subjects: {
      title: "المواد الدراسية المقررة",
      lead: "اختر المادة لمتابعة شروحات الفيديو والتمارين التفاعلية المخصصة لمستواك.",
      placedBanner: "اكتمل التقييم التشخيصي ! مسارك التعليمي جاهز الآن للانطلاق.",
      openLessons: "الدخول إلى الدروس",
    },
    lessonIndex: {
      title: "مسار الدروس",
      lead: "اتبع الدروس بالتسلسل، وشاهد فيديوهات الشرح، واجتز الاختبار القصير لفتح الدرس الموالي.",
      progressLabel: "التقدم الإجمالي",
      continueLabel: "متابعة الدرس",
      reviewNextLabel: "مراجعة الدرس",
      lessonPrefix: "الدرس",
      openLessonCopy: "شاهد فيديو الشرح واختبر مدى استيعابك للمفاهيم.",
    },
    lessonDetail: {
      title: "تفاصيل الدرس",
      lead: "شاهد فيديو الشرح بانتباه، ثم أجب عن أسئلة الاختبار أسفله لتثبيت فهمك.",
      lessonPrefix: "الدرس",
      passToUnlock: "هذا الدرس مغلق حاليًا. يرجى اجتياز اختبار الدرس السابق لفتحه.",
    },
    quiz: {
      title: "اختبار الفهم والتقييم",
      lead: "أجب عن الأسئلة التالية للتحقق من استيعابك لمحتوى هذا الدرس.",
      progressText: (answered, total, pct) => `تمت الإجابة عن ${answered} من ${total} أسئلة (${pct}%)`,
      submit: "تأكيد الإجابات",
      submitting: "جارٍ التحقق من الإجابات…",
      passedBadge: "أحسنت ! تم اجتياز الاختبار بنجاح",
      failedBadge: "يحتاج إلى مراجعة — أعد المحاولة للتأكيد",
      scoreSummary: (score, correct, total) => `النتيجة : ${score}% · ${correct} من ${total} إجابات صحيحة`,
      answerAllPrompt: "يرجى اختيار إجابة لكل سؤال قبل تأكيد الإرسال.",
      noQuestions: "لا توجد أسئلة اختبار متاحة لهذا الدرس حاليًا.",
    },
    placement: {
      eyebrow: "التقييم التشخيصي",
      title: "اختبار تحديد المستوى",
      lead: "أجب عن هذه الأسئلة البسيطة بكل هدوء لمساعدتنا في تحديد مستواك واقتراح الدروس الأنسب لك.",
      submitAssessment: "تأكيد إرسال التقييم",
      noPlacementTests: "لا توجد اختبارات تحديد مستوى متاحة حاليًا.",
      submitPlacementTest: "تأكيد إرسال الاختبار",
      passSummary: "تم تسجيل إجابات التقييم بنجاح.",
      videoEyebrow: "إرشادات قبل البدء",
      videoTitle: "كيفية اجتياز اختبار المستوى",
      videoLead: "شاهد هذا المقطع القصير للتعرف على طريقة إجراء التقييم التشخيصي بكل أريحية.",
      progressText: (answered, total, pct) => `تمت الإجابة عن ${answered} من ${total} أسئلة (${pct}%)`,
    },
    levels: {
      1: "المستوى الأول ابتدائي (السنة 1)",
      2: "المستوى الثاني ابتدائي (السنة 2)",
      3: "المستوى الثالث ابتدائي (السنة 3)",
      4: "المستوى الرابع ابتدائي (السنة 4)",
      5: "المستوى الخامس ابتدائي (السنة 5)",
      6: "المستوى السادس ابتدائي (السنة 6)",
    },
    admin: {
      title: "فضاء الإدارة التربوية",
      lead: "إدارة المواد الدراسية، وتنظيم تسلسل الدروس، وإنشاء الاختبارات التفاعلية وضبط اختبارات المستوى.",
      subjects: "المواد الدراسية",
      lessons: "الدروس والاختبارات",
      placement: "اختبارات المستوى",
      createSubject: "إضافة مادة دراسية جديدة",
      subjectName: "اسم المادة الدراسية",
      subjectNamePlaceholder: "مثال: الرياضيات، اللغة العربية، النشاط العلمي…",
      schoolLevel: "المستوى الدراسي",
      allLevels: "جميع المستويات",
      levelFilter: (lvl) => `المستوى ${lvl}`,
      addSubject: "إضافة المادة",
      editSubject: "تعديل المادة",
      saveSubject: "حفظ التعديلات",
      createLesson: "إضافة درس جديد للمنهاج",
      editLesson: "تعديل الدرس",
      saveLesson: "حفظ التعديلات",
      cancelEdit: "إلغاء",
      addLesson: "إضافة الدرس",
      addQuizQuestion: "إضافة سؤال إلى اختبار الدرس",
      lessonTitle: "عنوان الدرس",
      lessonDescription: "الوصف البيداغوجي",
      youtubeUrl: "رابط فيديو الشرح (YouTube)",
      order: "ترتيب الدرس",
      passPercent: "نسبة النجاح المطلوبة (%)",
      chooseSubject: "اختر مادة دراسية",
      chooseLesson: "اختر درسًا",
      addPlacementTest: "إنشاء اختبار تحديد مستوى",
      addAnotherQuestion: "إضافة سؤال آخر",
      createPlacementTest: "حفظ اختبار المستوى",
      placementQuestion: "نص السؤال",
      optionsSeparated: "خيارات الإجابة (مفصولة بفواصل)",
      correctAnswerText: "الإجابة الصحيحة",
      tests: "اختبارات المستوى الحالية",
      refresh: "تحديث",
      delete: "حذف",
      deleteLesson: "حذف الدرس",
      addQuizHere: "إضافة اختبار",
      noQuizQuestions: "لا توجد أسئلة اختبار لهذا الدرس.",
      loading: "جارٍ تحميل البيانات الإدارية…",
      subjectCreated: "تمت إضافة المادة الدراسية بنجاح.",
      subjectUpdated: "تم تعديل المادة الدراسية بنجاح.",
      subjectDeleted: "تم حذف المادة الدراسية بنجاح.",
      lessonCreated: "تمت إضافة الدرس بنجاح.",
      lessonUpdated: "تم تعديل الدرس بنجاح.",
      lessonDeleted: "تم حذف الدرس بنجاح.",
      quizQuestionAdded: "تمت إضافة السؤال بنجاح.",
      quizQuestionDeleted: "تم حذف السؤال بنجاح.",
      placementTestCreated: "تم إنشاء اختبار المستوى بنجاح.",
      placementTestDeleted: "تم حذف اختبار المستوى بنجاح.",
      errorChooseSubject: "يرجى اختيار مادة دراسية.",
      errorChooseLesson: "يرجى اختيار درس.",
      errorPlacementValidation: "يجب أن يحتوي كل سؤال على نص، وخيارين على الأقل، وإجابة صحيحة.",
    },
    status: {
      completed: "تم الاجتياز",
      unlocked: "متاح",
      locked: "مغلق",
    },
    role: {
      admin: "أستاذ / مشرف تربوي",
      student: "تلميذ",
    },
  },
};

type LocaleContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("edu_locale") as Locale | null;
    if (saved === "ar" || saved === "fr") {
      setLocaleState(saved);
    } else if (navigator.language.toLowerCase().startsWith("ar")) {
      setLocaleState("ar");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("edu_locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dir: (locale === "ar" ? "rtl" : "ltr") as "ltr" | "rtl",
      setLocale,
      t: messages[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
