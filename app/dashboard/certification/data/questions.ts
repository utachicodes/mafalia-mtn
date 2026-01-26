
export interface Question {
    id: number;
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
    category: string;
}

export const quizQuestions: Question[] = [
    // Partie 1: Vision Mafalia et infrastructure numérique
    {
        id: 1,
        category: "Vision Mafalia et infrastructure numérique",
        question: "Mafalia est avant tout",
        options: [
            { id: "A", text: "Une application de caisse" },
            { id: "B", text: "Une infrastructure numérique pour les commerces africains" },
            { id: "C", text: "Une banque" },
            { id: "D", text: "Une application de livraison" },
        ],
        correctAnswer: "B",
    },
    {
        id: 2,
        category: "Vision Mafalia et infrastructure numérique",
        question: "Le rôle principal de Mafalia dans un commerce est de",
        options: [
            { id: "A", text: "Remplacer le personnel" },
            { id: "B", text: "Centraliser les opérations et structurer les données" },
            { id: "C", text: "Augmenter les charges" },
            { id: "D", text: "Imposer des process complexes" },
        ],
        correctAnswer: "B",
    },
    {
        id: 3,
        category: "Vision Mafalia et infrastructure numérique",
        question: "L’approche Mafalia repose sur",
        options: [
            { id: "A", text: "La technologie seule" },
            { id: "B", text: "La donnée, l’IA et l’accompagnement métier" },
            { id: "C", text: "Le matériel uniquement" },
            { id: "D", text: "Le marketing" },
        ],
        correctAnswer: "B",
    },
    {
        id: 4,
        category: "Vision Mafalia et infrastructure numérique",
        question: "Mafalia permet une prise de décision dite éclairée parce que",
        options: [
            { id: "A", text: "Les rapports sont manuels" },
            { id: "B", text: "Les données sont centralisées et analysées par l’IA" },
            { id: "C", text: "Le client devine" },
            { id: "D", text: "Les décisions sont imposées" },
        ],
        correctAnswer: "B",
    },

    // Partie 2: Segmentation des offres Mafalia
    {
        id: 5,
        category: "Segmentation des offres Mafalia",
        question: "Mafalia Restaurants Hotels Fast Foods s’adresse principalement à",
        options: [
            { id: "A", text: "L’industrie lourde" },
            { id: "B", text: "Les établissements de restauration et d’hôtellerie" },
            { id: "C", text: "Les administrations" },
            { id: "D", text: "Les particuliers" },
        ],
        correctAnswer: "B",
    },
    {
        id: 6,
        category: "Segmentation des offres Mafalia",
        question: "Pour un restaurant ou fast food, Mafalia permet notamment",
        options: [
            { id: "A", text: "Gérer les menus, commandes, stocks et clients" },
            { id: "B", text: "Faire uniquement la comptabilité" },
            { id: "C", text: "Créer un site web" },
            { id: "D", text: "Gérer les livraisons internationales" },
        ],
        correctAnswer: "A",
    },
    {
        id: 7,
        category: "Segmentation des offres Mafalia",
        question: "Pour un hôtel, Mafalia permet",
        options: [
            { id: "A", text: "Uniquement la réservation" },
            { id: "B", text: "La gestion chambres, check in check out, room service et paiements" },
            { id: "C", text: "La gestion RH" },
            { id: "D", text: "Le marketing uniquement" },
        ],
        correctAnswer: "B",
    },
    {
        id: 8,
        category: "Segmentation des offres Mafalia",
        question: "Mafalia Commercial est conçu pour",
        options: [
            { id: "A", text: "Les grandes surfaces européennes" },
            { id: "B", text: "Les commerces, boutiques et épiceries africaines" },
            { id: "C", text: "Les usines" },
            { id: "D", text: "Les écoles" },
        ],
        correctAnswer: "B",
    },
    {
        id: 9,
        category: "Segmentation des offres Mafalia",
        question: "Pour une épicerie, la valeur principale de Mafalia est",
        options: [
            { id: "A", text: "La décoration" },
            { id: "B", text: "La visibilité sur les ventes, marges et stocks" },
            { id: "C", text: "La publicité" },
            { id: "D", text: "Le recrutement" },
        ],
        correctAnswer: "B",
    },

    // Partie 3: IA et décisions éclairées
    {
        id: 10,
        category: "IA et décisions éclairées",
        question: "L’IA dans Mafalia sert principalement à",
        options: [
            { id: "A", text: "Remplacer le commerçant" },
            { id: "B", text: "Analyser les données et suggérer des actions" },
            { id: "C", text: "Espionner les clients" },
            { id: "D", text: "Faire de la publicité" },
        ],
        correctAnswer: "B",
    },
    {
        id: 11,
        category: "IA et décisions éclairées",
        question: "Un exemple de décision éclairée proposée par Mafalia est",
        options: [
            { id: "A", text: "Augmenter les prix au hasard" },
            { id: "B", text: "Suggérer les produits à re-stocker ou à promouvoir" },
            { id: "C", text: "Fermer le commerce" },
            { id: "D", text: "Changer de métier" },
        ],
        correctAnswer: "B",
    },
    {
        id: 12,
        category: "IA et décisions éclairées",
        question: "Grâce à l’IA, Mafalia peut aider à",
        options: [
            { id: "A", text: "Anticiper les ruptures de stock" },
            { id: "B", text: "Mieux cibler les promotions" },
            { id: "C", text: "Améliorer la rentabilité" },
            { id: "D", text: "Toutes les réponses" },
        ],
        correctAnswer: "D",
    },
    {
        id: 13,
        category: "IA et décisions éclairées",
        question: "Pour un commercial, l’IA Mafalia est un argument car elle",
        options: [
            { id: "A", text: "Est complexe" },
            { id: "B", text: "Aide le client à gagner plus et perdre moins" },
            { id: "C", text: "Remplace le commercial" },
            { id: "D", text: "Est invisible" },
        ],
        correctAnswer: "B",
    },

    // Partie 4: Lendia et accès au crédit
    {
        id: 14,
        category: "Lendia et accès au crédit",
        question: "Lendia est",
        options: [
            { id: "A", text: "Une banque traditionnelle" },
            { id: "B", text: "Un module facilitant l’accès au crédit via le scoring" },
            { id: "C", text: "Une application de messagerie" },
            { id: "D", text: "Un service externe sans lien" },
        ],
        correctAnswer: "B",
    },
    {
        id: 15,
        category: "Lendia et accès au crédit",
        question: "Le scoring Lendia est basé principalement sur",
        options: [
            { id: "A", text: "Le discours du commerçant" },
            { id: "B", text: "Les données réelles d’activité issues de Mafalia" },
            { id: "C", text: "Le hasard" },
            { id: "D", text: "Les garanties immobilières uniquement" },
        ],
        correctAnswer: "B",
    },
    {
        id: 16,
        category: "Lendia et accès au crédit",
        question: "Lendia permet aux commerçants",
        options: [
            { id: "A", text: "De demander un crédit sans données" },
            { id: "B", text: "D’améliorer leur crédibilité financière" },
            { id: "C", text: "D’éviter les banques" },
            { id: "D", text: "D’emprunter sans remboursement" },
        ],
        correctAnswer: "B",
    },
    {
        id: 17,
        category: "Lendia et accès au crédit",
        question: "Pour un commercial, Lendia est surtout un levier de vente car",
        options: [
            { id: "A", text: "Les clients aiment le crédit" },
            { id: "B", text: "Il répond à un besoin clé de financement" },
            { id: "C", text: "Il est obligatoire" },
            { id: "D", text: "Il est gratuit" },
        ],
        correctAnswer: "B",
    },

    // Partie 5: Techniques de vente terrain adaptées à Mafalia
    {
        id: 18,
        category: "Techniques de vente terrain adaptées à Mafalia",
        question: "Lors d’une prospection, la meilleure approche est",
        options: [
            { id: "A", text: "Vendre la technologie" },
            { id: "B", text: "Partir des problèmes réels du commerce" },
            { id: "C", text: "Parler du prix" },
            { id: "D", text: "Comparer aux concurrents" },
        ],
        correctAnswer: "B",
    },
    {
        id: 19,
        category: "Techniques de vente terrain adaptées à Mafalia",
        question: "Un bon pitch Mafalia commence par",
        options: [
            { id: "A", text: "Les fonctionnalités" },
            { id: "B", text: "Les douleurs du commerçant" },
            { id: "C", text: "Le contrat" },
            { id: "D", text: "Le paiement" },
        ],
        correctAnswer: "B",
    },
    {
        id: 20,
        category: "Techniques de vente terrain adaptées à Mafalia",
        question: "Adapter son discours signifie",
        options: [
            { id: "A", text: "Dire la même chose à un hôtel et une épicerie" },
            { id: "B", text: "Mettre en avant les bénéfices adaptés à chaque segment" },
            { id: "C", text: "Aller plus vite" },
            { id: "D", text: "Parler plus fort" },
        ],
        correctAnswer: "B",
    },
    {
        id: 21,
        category: "Techniques de vente terrain adaptées à Mafalia",
        question: "Face à l’objection 'c’est trop cher', la bonne réponse est",
        options: [
            { id: "A", text: "Baisser le prix" },
            { id: "B", text: "Montrer le retour sur investissement" },
            { id: "C", text: "Insister" },
            { id: "D", text: "Arrêter" },
        ],
        correctAnswer: "B",
    },
    {
        id: 22,
        category: "Techniques de vente terrain adaptées à Mafalia",
        question: "Le closing Mafalia consiste à",
        options: [
            { id: "A", text: "Forcer la signature" },
            { id: "B", text: "Valider la valeur et proposer l’étape suivante" },
            { id: "C", text: "Mettre la pression" },
            { id: "D", text: "Disparaître" },
        ],
        correctAnswer: "B",
    },

    // Partie 6: Éthique et posture partenaire
    {
        id: 23,
        category: "Éthique et posture partenaire",
        question: "Le partenaire Mafalia doit se positionner comme",
        options: [
            { id: "A", text: "Un vendeur agressif" },
            { id: "B", text: "Un conseiller de transformation digitale" },
            { id: "C", text: "Un technicien" },
            { id: "D", text: "Un banquier" },
        ],
        correctAnswer: "B",
    },
    {
        id: 24,
        category: "Éthique et posture partenaire",
        question: "Les données collectées via Mafalia doivent être",
        options: [
            { id: "A", text: "Partagées librement" },
            { id: "B", text: "Sécurisées et utilisées de façon responsable" },
            { id: "C", text: "Vendues" },
            { id: "D", text: "Ignorées" },
        ],
        correctAnswer: "B",
    },
    {
        id: 25,
        category: "Éthique et posture partenaire",
        question: "Un partenariat Mafalia réussi repose sur",
        options: [
            { id: "A", text: "La confiance, la performance et la transparence" },
            { id: "B", text: "La chance" },
            { id: "C", text: "La pression" },
            { id: "D", text: "Le hasard" },
        ],
        correctAnswer: "A",
    },
];
