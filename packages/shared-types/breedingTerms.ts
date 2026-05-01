/**
 * Genomik Islah Asistani — Glossary (TypeScript)
 *
 * Bilimsel terimlerin tek dogru kaynagi. Backend, ML servisi, frontend ve
 * admin panel ayni tipi import eder. Trait tanimlari degisirse once burasi
 * guncellenir, sonra seed SQL ve ML servis schema'lari turetilir.
 *
 * Kaynak: "Islah Programinizi Dijitallestirmek" sunumu (28 Nisan 2026, A. Sahin)
 */

// ============================================
// Olcum Birimleri
// ============================================
export const traitUnitValues = [
  'kg/da',          // verim
  'g',              // tane agirligi
  'cm',             // bitki boyu
  '%',              // protein, brix, oran
  'gun',            // olgunlasma, cimlenme
  'score-0-9',      // hastalik direnci, yatma direnci
  'celsius',        // sicaklik toleransi
  'pH',
  'index',          // kuraklik indeksi vb. turevsel
] as const;
export type TraitUnit = (typeof traitUnitValues)[number];

// ============================================
// Olcum Yontemleri
// ============================================
export const traitMeasurementMethodValues = [
  'tarla-tarti',          // tarla hasat tartimi
  'lab-spektrometre',     // brix, protein, nem
  'gozlemsel-skor',       // hastalik 0-9 skor
  'kumulatif-gun',        // olgunlasma gun
  'image-analysis',       // gorsel olcum (yaprak alani vb.)
  'sensor-otomatik',      // IoT'den
  'turevsel',             // baska olcumlerden hesaplanan
] as const;
export type TraitMeasurementMethod = (typeof traitMeasurementMethodValues)[number];

// ============================================
// Trait Onceligi (Secim indeksinde agirlik)
// ============================================
export const traitPriorityValues = ['primary', 'secondary', 'tertiary'] as const;
export type TraitPriority = (typeof traitPriorityValues)[number];

// ============================================
// Trait Tanimi (glossary kaydi)
// ============================================
export interface TraitDefinition {
  id: string;                  // ornek: "yield", "disease_resistance"
  nameTr: string;
  nameEn: string;
  unit: TraitUnit;
  measurementMethod: TraitMeasurementMethod;
  rangeMin: number;
  rangeMax: number;
  defaultPriority: TraitPriority;
  description?: string;
  // Yuksek deger iyi mi (verim) yoksa dusuk deger iyi mi (olgunlasma suresi)?
  optimizationDirection: 'maximize' | 'minimize';
}

// ============================================
// Genotip
// ============================================
export const markerTypeValues = ['SNP', 'SSR', 'InDel', 'CNV'] as const;
export type MarkerType = (typeof markerTypeValues)[number];

export interface SnpRecord {
  cultivarId: string;
  chromosome: string;
  position: number;
  alleleA: string;
  alleleB: string;
  genotype: '00' | '01' | '11' | 'NA';  // homozigot ref / hetero / homozigot alt / eksik
}

export interface GenotypeFile {
  id: string;
  cultivarId: string;
  format: 'VCF' | 'PARQUET' | 'CSV';
  storageUri: string;          // s3:// veya file://
  markerCount: number;
  fileHash: string;
  uploadedAt: string;
}

// ============================================
// Fenotip Kaydi (Tarla)
// ============================================
export interface PhenotypeRecord {
  id: string;
  cultivarId: string;
  trialId: string;
  traitId: string;
  value: number;
  measuredAt: string;          // ISO date
  measuredBy?: string;
  notes?: string;
}

// ============================================
// Cesit (Cultivar) ve Cigar (Pedigree)
// ============================================
export const cultivarTypeValues = ['parent', 'F1', 'F2', 'F3+', 'commercial'] as const;
export type CultivarType = (typeof cultivarTypeValues)[number];

export interface Cultivar {
  id: string;
  code: string;                // dahili kod
  type: CultivarType;
  parentMaleId?: string | null;
  parentFemaleId?: string | null;
  speciesScientific: string;   // ornek: "Solanum lycopersicum"
  notes?: string;
}

// ============================================
// Islah Donemi ve Tarla Denemesi
// ============================================
export interface BreedingCycle {
  id: string;
  year: number;
  season: 'ilkbahar' | 'yaz' | 'sonbahar' | 'kis';
  goalSummary: string;         // bu donemin hedefi
  startedAt: string;
  endedAt?: string | null;
}

export interface FieldTrial {
  id: string;
  cycleId: string;
  cultivarIds: string[];
  location: string;
  plotSizeM2: number;
  replications: number;
  plantedAt: string;
  harvestedAt?: string | null;
}

// ============================================
// GEBV Sonucu (Tahmin)
// ============================================
export interface GebvResult {
  id: string;
  cultivarId: string;
  traitId: string;
  modelRunId: string;          // MLflow run ID
  predicted: number;
  confidenceLower: number;
  confidenceUpper: number;
  predictedAt: string;
  inputHash: string;           // input verisinin hash'i — tekrar uretilebilirlik
}

// ============================================
// Enerji Maliyeti Analizi (Metabolik)
// ============================================
export interface EnergyCostAnalysis {
  id: string;
  cultivarId: string;
  geneId: string;
  geneName: string;
  yieldImpactPct: number;      // verime etkisi (% — pozitif veya negatif)
  atpCostRelative: number;     // bagil ATP maliyeti (1.0 = baseline)
  netBenefitScore: number;     // (yieldImpact - atpCost) * agirlik
  llmComment?: string;         // "Bu gen verimi %12 artiriyor ama ATP maliyeti yuksek..."
  analyzedAt: string;
}

// ============================================
// Caprazlama / Secim Onerisi
// ============================================
export interface BreedingRecommendation {
  id: string;
  cycleId: string;
  recommendationType: 'crossing' | 'selection' | 'elimination';
  parentMaleId?: string;
  parentFemaleId?: string;
  targetCultivarId?: string;
  rationale: string;           // neden? (LLM uretebilir, uzman gozden gecirir)
  expectedGain: { traitId: string; expectedDelta: number }[];
  selectionIndexScore: number;
  reviewedByExpert: boolean;
  generatedAt: string;
}

// ============================================
// Model Versiyon
// ============================================
export interface ModelVersion {
  id: string;
  mlflowRunId: string;
  modelType: 'ridge' | 'gblup-sommer' | 'rrblup' | 'bayesian-bglr' | 'rf';
  trainedAt: string;
  trainingDatasetHash: string;
  metrics: {
    r2?: number;
    rmse?: number;
    accuracy?: number;
    [key: string]: number | undefined;
  };
  isProduction: boolean;
}
